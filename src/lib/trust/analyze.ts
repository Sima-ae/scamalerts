import { Prisma, TrustLabel } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeDomain } from "@/lib/utils";
import { collectHeuristics } from "@/lib/trust/collectors/heuristics";
import { collectDns } from "@/lib/trust/collectors/dns";
import { collectTls } from "@/lib/trust/collectors/tls";
import { collectRdap } from "@/lib/trust/collectors/rdap";
import { collectHttp } from "@/lib/trust/collectors/http";
import { collectReports } from "@/lib/trust/collectors/reports";
import { collectSpoof } from "@/lib/trust/collectors/spoof";
import {
  TRUST_CACHE_TTL_MS,
  TRUST_SIGNALS_VERSION,
  type SignalsPayload,
  type TrustResult,
  type TrustSignal,
} from "@/lib/trust/types";

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

function computeScore(signals: TrustSignal[]): number {
  const base = 50;
  const delta = signals.reduce((sum, s) => sum + (s.delta ?? 0), 0);
  return Math.max(1, Math.min(99, Math.round(base + delta)));
}

function parseCachedSignals(raw: unknown): SignalsPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (obj.version !== TRUST_SIGNALS_VERSION) return null;
  if (typeof obj.collectedAt !== "string" || !Array.isArray(obj.items)) {
    return null;
  }
  return obj as unknown as SignalsPayload;
}

function isFresh(lastUpdated: Date, collectedAt?: string): boolean {
  const anchor = collectedAt ? new Date(collectedAt) : lastUpdated;
  if (Number.isNaN(anchor.getTime())) return false;
  return Date.now() - anchor.getTime() < TRUST_CACHE_TTL_MS;
}

export type AnalyzeOptions = {
  refresh?: boolean;
  /** When false, skip DB cache read/write (e.g. DB down) */
  persist?: boolean;
};

export async function analyzeDomain(
  raw: string,
  options: AnalyzeOptions = {},
): Promise<TrustResult> {
  const domain = normalizeDomain(raw);
  const persist = options.persist !== false;
  const refresh = Boolean(options.refresh);

  if (persist && !refresh) {
    try {
      const existing = await prisma.domainProfile.findUnique({
        where: { domain },
      });
      const payload = parseCachedSignals(existing?.signals);
      if (
        existing &&
        payload &&
        isFresh(existing.lastUpdated, payload.collectedAt)
      ) {
        return {
          domain,
          score: existing.trustScore,
          label: existing.trustLabel,
          signals: payload.items,
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
  const heuristicSignals = collectHeuristics(domain);

  const settled = await Promise.allSettled([
    collectDns(domain),
    collectTls(domain),
    collectRdap(domain),
    collectHttp(domain),
    collectReports(domain),
    collectSpoof(domain),
  ]);

  const signals: TrustSignal[] = [...heuristicSignals];

  for (let i = 0; i < settled.length; i++) {
    const result = settled[i]!;
    if (result.status === "rejected") {
      console.warn(`[trust] collector ${i} failed`, result.reason);
      continue;
    }
    if (i === 4) {
      const reportResult = result.value as Awaited<
        ReturnType<typeof collectReports>
      >;
      signals.push(...reportResult.signals);
    } else {
      signals.push(...(result.value as TrustSignal[]));
    }
  }

  let score = computeScore(signals);
  let label = scoreToLabel(score);

  // Redirect aliases of a real brand: high confidence it's not a scam clone,
  // but keep the public label Neutral so users stay careful about spoofing.
  const isRedirectAlias = signals.some(
    (s) =>
      s.key === "spoof" &&
      s.raw &&
      typeof s.raw === "object" &&
      (s.raw as { method?: string }).method === "redirect_alias",
  );
  if (isRedirectAlias) {
    score = Math.max(score, 88);
    score = Math.min(score, 92);
    label = "NEUTRAL";
  }

  const payload: SignalsPayload = {
    version: TRUST_SIGNALS_VERSION,
    collectedAt,
    items: signals,
  };

  if (persist) {
    try {
      const signalsJson = payload as unknown as Prisma.InputJsonValue;
      await prisma.domainProfile.upsert({
        where: { domain },
        update: {
          trustScore: score,
          trustLabel: label,
          signals: signalsJson,
        },
        create: {
          domain,
          trustScore: score,
          trustLabel: label,
          signals: signalsJson,
        },
      });
    } catch (err) {
      console.warn("[trust] persist failed", err);
    }
  }

  return {
    domain,
    score,
    label,
    signals,
    cached: false,
    collectedAt,
    version: TRUST_SIGNALS_VERSION,
  };
}

/** Group signals for UI rendering */
export function groupSignals(signals: TrustSignal[]) {
  const order = [
    "technisch",
    "certificaat",
    "community",
    "heuristiek",
  ] as const;
  const labels: Record<(typeof order)[number], string> = {
    technisch: "Technisch",
    certificaat: "Certificaat & leeftijd",
    community: "Community",
    heuristiek: "Structuur & nabootsing",
  };

  return order
    .map((group) => ({
      group,
      title: labels[group],
      items: signals.filter((s) => s.group === group),
    }))
    .filter((g) => g.items.length > 0);
}
