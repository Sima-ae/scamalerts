import type { TrustSignal } from "@/lib/trust/types";

const SUSPICIOUS_TLDS = [
  ".xyz",
  ".top",
  ".buzz",
  ".work",
  ".click",
  ".loan",
  ".shop",
  ".icu",
  ".cfd",
  ".sbs",
];

export function collectHeuristics(domain: string): TrustSignal[] {
  const signals: TrustSignal[] = [];

  const hasValidTld = /\.[a-z]{2,}$/i.test(domain);
  signals.push({
    key: "format",
    label: "Domeinformat",
    positive: hasValidTld,
    detail: hasValidTld ? "Geldig domeinformat" : "Ongeldig of verdacht formaat",
    weight: 10,
    group: "heuristiek",
    delta: hasValidTld ? 5 : -25,
  });

  const badTld = SUSPICIOUS_TLDS.some((t) => domain.endsWith(t));
  signals.push({
    key: "tld",
    label: "TLD-risico",
    positive: badTld ? false : true,
    detail: badTld
      ? `Extensie ${domain.slice(domain.lastIndexOf("."))} komt vaker voor bij frauduleuze sites`
      : "Geen hoog-risico TLD gedetecteerd",
    weight: 8,
    group: "heuristiek",
    delta: badTld ? -12 : 2,
    raw: { tld: domain.slice(domain.lastIndexOf(".")) },
  });

  const hyphenCount = (domain.match(/-/g) || []).length;
  const hyphenHeavy = hyphenCount >= 2;
  signals.push({
    key: "hyphens",
    label: "Domeinnaamstructuur",
    positive: hyphenHeavy ? false : null,
    detail: hyphenHeavy
      ? `${hyphenCount} koppeltekens — vaak gebruikt bij nabootsing`
      : "Geen opvallende nabootsingspatronen in de structuur",
    weight: 5,
    group: "heuristiek",
    delta: hyphenHeavy ? -8 : 0,
    raw: { hyphenCount },
  });

  const lengthOk = domain.length >= 5 && domain.length <= 40;
  signals.push({
    key: "length",
    label: "Domeinlengte",
    positive: lengthOk ? true : null,
    detail: lengthOk
      ? `Normale lengte (${domain.length} tekens)`
      : `Opvallende lengte (${domain.length} tekens)`,
    weight: 3,
    group: "heuristiek",
    delta: lengthOk ? 0 : -4,
    raw: { length: domain.length },
  });

  return signals;
}
