import { Prisma, TrustLabel } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseDomain, type DomainParts } from "@/lib/trust/domain-parts";
import { collectHeuristics } from "@/lib/trust/collectors/heuristics";
import { collectDns } from "@/lib/trust/collectors/dns";
import { collectTls } from "@/lib/trust/collectors/tls";
import { collectRdap } from "@/lib/trust/collectors/rdap";
import { collectHttp } from "@/lib/trust/collectors/http";
import { collectReports } from "@/lib/trust/collectors/reports";
import { collectSpoof } from "@/lib/trust/collectors/spoof";
import { collectReputation } from "@/lib/trust/collectors/reputation";
import { getTranco, warmTranco, type TrancoList } from "@/lib/trust/sources/tranco";
import { warmBlocklists } from "@/lib/trust/sources/blocklists";
import {
  TRUST_CACHE_TTL_MS,
  TRUST_SIGNALS_VERSION,
  type SignalsPayload,
  type SourceStatus,
  type TrustResult,
  type TrustSignal,
  type TrustSignalGroup,
} from "@/lib/trust/types";

if (process.env.NEXT_PHASE !== "phase-production-build") {
  warmTranco();
  warmBlocklists();
}

export class InvalidDomainError extends Error {
  constructor(input: string) {
    super(`Geen geldig domein: ${input}`);
    this.name = "InvalidDomainError";
  }
}

const LABEL_BY_SCORE: { min: number; label: TrustLabel }[] = [
  { min: 81, label: "VERY_LIKELY_SAFE" },
  { min: 61, label: "LIKELY_SAFE" },
  { min: 41, label: "NEUTRAL" },
  { min: 21, label: "POTENTIALLY_UNSAFE" },
  { min: 1, label: "HIGH_RISK" },
  { min: 0, label: "VERY_LIKELY_UNSAFE" },
];

export function scoreToLabel(score: number): TrustLabel {
  const clamped = Math.max(0, Math.min(100, score));
  return LABEL_BY_SCORE.find((b) => clamped >= b.min)?.label ?? "NEUTRAL";
}

export function trustLabelNL(label: TrustLabel): string {
  const map: Record<TrustLabel, string> = {
    VERY_LIKELY_UNSAFE: "Zeer waarschijnlijk onveilig",
    HIGH_RISK: "Hoog risico",
    POTENTIALLY_UNSAFE: "Mogelijk onveilig",
    NEUTRAL: "Neutraal",
    LIKELY_SAFE: "Waarschijnlijk veilig",
    VERY_LIKELY_SAFE: "Zeer waarschijnlijk veilig",
  };
  return map[label];
}

function rawOf(signals: TrustSignal[], key: string): Record<string, unknown> | undefined {
  return signals.find((s) => s.key === key)?.raw;
}

/**
 * Additive score from 50, then hard ceilings so that decisive evidence
 * (blocklist hit, strong impersonation, many reports) cannot be outweighed
 * by generic technical hygiene.
 */
function computeScore(signals: TrustSignal[]): number {
  const delta = signals.reduce((sum, s) => sum + (s.unavailable ? 0 : (s.delta ?? 0)), 0);
  let score = Math.max(1, Math.min(99, Math.round(50 + delta)));

  const blocklist = signals.find((s) => s.key === "blocklists");
  if (blocklist?.positive === false) score = Math.min(score, 8);

  const spoofVerdict = rawOf(signals, "spoof")?.verdict;
  if (spoofVerdict === "high") score = Math.min(score, 20);
  if (spoofVerdict === "medium") score = Math.min(score, 55);

  const reports = Number(rawOf(signals, "community")?.count ?? 0);
  if (reports >= 4) score = Math.min(score, 20);
  else if (reports >= 2) score = Math.min(score, 35);

  if (rawOf(signals, "rdap_age")?.registered === false) score = Math.min(score, 30);

  const age = rawOf(signals, "rdap_age")?.ageDays;
  if (typeof age === "number" && age <= 30) score = Math.min(score, 60);

  return score;
}

function parseCachedSignals(raw: unknown): SignalsPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (obj.version !== TRUST_SIGNALS_VERSION) return null;
  if (typeof obj.collectedAt !== "string" || !Array.isArray(obj.items) || !Array.isArray(obj.sources)) {
    return null;
  }
  return obj as unknown as SignalsPayload;
}

function isFresh(collectedAt: string): boolean {
  const anchor = new Date(collectedAt);
  if (Number.isNaN(anchor.getTime())) return false;
  return Date.now() - anchor.getTime() < TRUST_CACHE_TTL_MS;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}

async function loadTranco(): Promise<TrancoList | null> {
  try {
    return await withTimeout(getTranco(), 15_000);
  } catch (err) {
    console.warn("[trust] Tranco unavailable", err);
    return null;
  }
}

function unavailableSignal(key: string, label: string, group: TrustSignalGroup): TrustSignal {
  return {
    key,
    label,
    positive: null,
    delta: 0,
    weight: 0,
    group,
    unavailable: true,
    detail: "Deze controle kon nu niet worden uitgevoerd. Probeer later opnieuw te scannen.",
  };
}

/** Without an IP address there is no website to test; avoid double-penalising. */
function neutraliseUnreachable(signals: TrustSignal[]): void {
  const dnsSignal = signals.find((s) => s.key === "dns_resolve");
  if (dnsSignal?.positive !== false) return;
  for (const s of signals) {
    if (s.key === "tls" || s.key === "https") {
      s.positive = null;
      s.delta = 0;
      s.detail = "Niet getest: er is geen webserver aan dit domein gekoppeld.";
    }
  }
}

function collectSources(signals: TrustSignal[], extra: SourceStatus[]): SourceStatus[] {
  const map = new Map<string, SourceStatus>();
  for (const s of extra) map.set(s.name, s);
  for (const s of signals) {
    if (!s.source || s.key === "blocklists") continue;
    const prev = map.get(s.source);
    if (!prev || prev.status === "ok") {
      map.set(s.source, { name: s.source, status: s.unavailable ? "unavailable" : "ok" });
    }
  }
  return [...map.values()];
}

export type AnalyzeOptions = {
  refresh?: boolean;
  /** When false, skip DB cache read/write (e.g. DB down) */
  persist?: boolean;
};

export async function analyzeDomain(
  input: string,
  options: AnalyzeOptions = {},
): Promise<TrustResult> {
  const parts: DomainParts | null = parseDomain(input);
  if (!parts) throw new InvalidDomainError(input);
  const domain = parts.host;
  const persist = options.persist !== false;

  if (persist && !options.refresh) {
    try {
      const existing = await prisma.domainProfile.findUnique({ where: { domain } });
      const payload = parseCachedSignals(existing?.signals);
      if (existing && payload && isFresh(payload.collectedAt)) {
        return {
          domain,
          score: existing.trustScore,
          label: existing.trustLabel,
          signals: payload.items,
          sources: payload.sources,
          cached: true,
          collectedAt: payload.collectedAt,
          version: TRUST_SIGNALS_VERSION,
        };
      }
    } catch {
      // fall through to live collection
    }
  }

  const collectedAt = new Date().toISOString();
  const tranco = await loadTranco();

  const jobs: { label: string; key: string; group: TrustSignalGroup; run: () => Promise<TrustSignal[]> }[] = [
    { key: "dns_resolve", label: "DNS-resolutie", group: "technisch", run: () => collectDns(parts) },
    { key: "tls", label: "TLS-certificaat", group: "certificaat", run: () => collectTls(parts) },
    { key: "rdap_age", label: "Domeinregistratie", group: "certificaat", run: () => collectRdap(parts) },
    { key: "https", label: "Bereikbaarheid en doorverwijzing", group: "technisch", run: () => collectHttp(parts) },
    { key: "community", label: "Community-meldingen", group: "community", run: async () => (await collectReports(domain)).signals },
    { key: "spoof", label: "Merk- en domeinnabootsing", group: "heuristiek", run: () => collectSpoof(parts, tranco) },
  ];

  let reputationSources: SourceStatus[] = [];
  const reputationJob = withTimeout(collectReputation(parts, tranco), 20_000).then(
    (r) => {
      reputationSources = r.sources;
      return r.signals;
    },
    (err) => {
      console.warn("[trust] reputation failed", err);
      return [unavailableSignal("blocklists", "Phishing- en malwarelijsten", "reputatie")];
    },
  );

  const settled = await Promise.all([
    reputationJob,
    ...jobs.map((job) =>
      withTimeout(job.run(), 20_000).catch((err) => {
        console.warn(`[trust] collector ${job.key} failed`, err);
        return [unavailableSignal(job.key, job.label, job.group)];
      }),
    ),
  ]);

  const signals: TrustSignal[] = [...settled.flat(), ...collectHeuristics(parts)];
  neutraliseUnreachable(signals);

  const score = computeScore(signals);
  const label = scoreToLabel(score);
  const sources = collectSources(signals, reputationSources);

  const payload: SignalsPayload = { version: TRUST_SIGNALS_VERSION, collectedAt, items: signals, sources };

  if (persist) {
    try {
      const signalsJson = payload as unknown as Prisma.InputJsonValue;
      await prisma.domainProfile.upsert({
        where: { domain },
        update: { trustScore: score, trustLabel: label, signals: signalsJson },
        create: { domain, trustScore: score, trustLabel: label, signals: signalsJson },
      });
    } catch (err) {
      console.warn("[trust] persist failed", err);
    }
  }

  return { domain, score, label, signals, sources, cached: false, collectedAt, version: TRUST_SIGNALS_VERSION };
}

/** Group signals for UI rendering */
export function groupSignals(signals: TrustSignal[]) {
  const order: TrustSignalGroup[] = ["reputatie", "heuristiek", "certificaat", "technisch", "community"];
  const labels: Record<TrustSignalGroup, string> = {
    reputatie: "Reputatie en dreigingslijsten",
    heuristiek: "Nabootsing en domeinnaam",
    certificaat: "Registratie en certificaat",
    technisch: "Technisch",
    community: "Community",
  };

  return order
    .map((group) => ({ group, title: labels[group], items: signals.filter((s) => s.group === group) }))
    .filter((g) => g.items.length > 0);
}
