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

const KNOWN_BRANDS = [
  { brand: "belastingdienst.nl", needles: ["belastingdienst", "belasting-dienst"] },
  { brand: "ing.nl", needles: ["ing-", "ingbank", "mijn-ing"] },
  { brand: "abnamro.nl", needles: ["abn-", "abnamro", "abn-amro"] },
  { brand: "rabobank.nl", needles: ["rabobank", "rabo-"] },
  { brand: "bunq.com", needles: ["bunq-"] },
  { brand: "paypal.com", needles: ["paypal-", "pay-pal"] },
  { brand: "microsoft.com", needles: ["microsoft-", "office365-", "m365-"] },
  { brand: "apple.com", needles: ["apple-", "icloud-"] },
  { brand: "kvk.nl", needles: ["kvk-", "kamer-van-koophandel"] },
  { brand: "tikkie.me", needles: ["tikkie-", "tikkie."] },
  { brand: "digid.nl", needles: ["digid-", "digi-d"] },
  { brand: "marktplaats.nl", needles: ["marktplaats-", "markt-plaats"] },
  { brand: "postnl.nl", needles: ["postnl-", "post-nl"] },
  { brand: "bol.com", needles: ["bolcom-", "bol-com"] },
];

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(
        dp[i - 1]![j]! + 1,
        dp[i]![j - 1]! + 1,
        dp[i - 1]![j - 1]! + cost,
      );
    }
  }
  return dp[m]![n]!;
}

function detectBrandSpoof(domain: string): { hit: string | null; method: string } {
  const lower = domain.toLowerCase();
  for (const entry of KNOWN_BRANDS) {
    if (lower === entry.brand) {
      return { hit: null, method: "exact" };
    }
    for (const needle of entry.needles) {
      if (lower.includes(needle) && lower !== entry.brand) {
        return { hit: entry.brand, method: "needle" };
      }
    }
    const brandHost = entry.brand.split(".")[0] ?? entry.brand;
    const domainHost = lower.split(".")[0] ?? lower;
    if (
      brandHost.length >= 4 &&
      domainHost !== brandHost &&
      levenshtein(domainHost, brandHost) <= 2 &&
      Math.abs(domainHost.length - brandHost.length) <= 2
    ) {
      return { hit: entry.brand, method: "distance" };
    }
  }
  return { hit: null, method: "none" };
}

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

  const spoof = detectBrandSpoof(domain);
  signals.push({
    key: "spoof",
    label: "Merk-/overheidsnabootsing",
    positive: spoof.hit ? false : true,
    detail: spoof.hit
      ? `Lijkt op bekende dienst ${spoof.hit} (${spoof.method === "distance" ? "vergelijkbare spelling" : "naamfragment"})`
      : "Geen duidelijke merknabootsing in de domeinnaam",
    weight: 20,
    group: "heuristiek",
    delta: spoof.hit ? -30 : 4,
    raw: spoof,
  });

  return signals;
}
