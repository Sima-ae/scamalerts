import type { SourceStatus, TrustSignal } from "@/lib/trust/types";
import type { DomainParts } from "@/lib/trust/domain-parts";
import type { TrancoList } from "@/lib/trust/sources/tranco";
import { checkBlocklists } from "@/lib/trust/sources/blocklists";

function popularitySignal(parts: DomainParts, tranco: TrancoList | null): TrustSignal {
  const base = { key: "popularity", label: "Populariteit (Tranco)", weight: 14, group: "reputatie" as const };
  if (!tranco) {
    return { ...base, positive: null, delta: 0, unavailable: true, detail: "De Tranco-ranglijst kon nu niet worden geladen.", source: "Tranco" };
  }
  const source = `Tranco-lijst ${tranco.listId} (${tranco.createdOn.slice(0, 10)})`;
  if (parts.onPlatform) {
    return {
      ...base,
      positive: null,
      delta: 0,
      detail: `Gehost op het gedeelde platform ${parts.registrable}; de populariteit van het platform zegt niets over deze site.`,
      source,
    };
  }
  const rank = tranco.rank(parts.registrable);
  if (rank === null) {
    return {
      ...base,
      positive: null,
      delta: 0,
      detail: `Staat niet in de top ${tranco.size.toLocaleString("nl-NL")} meest bezochte domeinen. Dat is normaal voor kleinere en nieuwe sites en op zichzelf geen risico.`,
      source,
      raw: { rank: null },
    };
  }
  const nl = rank.toLocaleString("nl-NL");
  const [delta, tier] =
    rank <= 1_000 ? [16, "behoort tot de meest bezochte domeinen ter wereld"]
    : rank <= 10_000 ? [12, "zeer veel bezocht"]
    : rank <= 100_000 ? [8, "veel bezocht"]
    : [4, "staat in de wereldwijde ranglijst"];
  return {
    ...base,
    positive: true,
    delta,
    detail: `Positie #${nl} wereldwijd: ${tier}. Gebaseerd op 30 dagen verkeersdata van Chrome, Cloudflare, Cisco Umbrella, Majestic en Farsight.`,
    source,
    raw: { rank },
  };
}

export async function collectReputation(
  parts: DomainParts,
  tranco: TrancoList | null,
): Promise<{ signals: TrustSignal[]; sources: SourceStatus[] }> {
  const rank = parts.onPlatform ? null : (tranco?.rank(parts.registrable) ?? null);
  const results = await checkBlocklists({
    host: parts.host,
    registrablePrivate: parts.registrablePrivate,
    popular: rank !== null && rank <= 10_000,
  });

  const listed = results.filter((r) => r.status === "listed");
  const clean = results.filter((r) => r.status === "clean");
  const unavailable = results.filter((r) => r.status === "unavailable");
  const checkedNames = [...listed, ...clean].map((r) => r.name);

  let blocklist: TrustSignal;
  const base = { key: "blocklists", label: "Phishing- en malwarelijsten", weight: 30, group: "reputatie" as const, source: checkedNames.join(" · ") || "Blocklists" };
  if (listed.length) {
    blocklist = {
      ...base,
      positive: false,
      delta: -60,
      detail: `Gemeld als gevaarlijk door ${listed.map((r) => `${r.name}${r.detail ? ` (${r.detail})` : ""}`).join("; ")}. Bezoek deze site niet en vul geen gegevens in.`,
      raw: { listed: listed.map((r) => r.name) },
    };
  } else if (clean.length) {
    blocklist = {
      ...base,
      positive: true,
      delta: 3,
      detail: `Niet gevonden op ${clean.length} actuele dreigingslijst${clean.length === 1 ? "" : "en"} (${clean.map((r) => r.name).join(", ")}). Nieuwe fraudesites staan er vaak nog niet op; dit is geen garantie.${unavailable.length ? ` Niet bereikbaar: ${unavailable.map((r) => r.name).join(", ")}.` : ""}`,
      raw: { checked: clean.map((r) => r.name) },
    };
  } else {
    blocklist = {
      ...base,
      positive: null,
      delta: 0,
      unavailable: true,
      detail: "Dreigingslijsten konden nu niet worden geraadpleegd.",
    };
  }

  const sources: SourceStatus[] = results.map((r) => ({
    name: r.name,
    status: r.status === "listed" || r.status === "clean" ? "ok" : r.status,
    detail: r.status === "listed" ? "vermelding gevonden" : r.detail,
  }));

  return { signals: [blocklist, popularitySignal(parts, tranco)], sources };
}
