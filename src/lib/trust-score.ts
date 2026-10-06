import { TrustLabel } from "@prisma/client";
import { normalizeDomain } from "@/lib/utils";

export type TrustSignal = {
  key: string;
  label: string;
  positive: boolean | null;
  detail: string;
  weight: number;
};

export type TrustResult = {
  domain: string;
  score: number;
  label: TrustLabel;
  signals: TrustSignal[];
};

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

export async function analyzeDomain(raw: string): Promise<TrustResult> {
  const domain = normalizeDomain(raw);
  const signals: TrustSignal[] = [];
  let score = 55;

  const hasValidTld = /\.[a-z]{2,}$/i.test(domain);
  signals.push({
    key: "format",
    label: "Domeinformat",
    positive: hasValidTld,
    detail: hasValidTld ? "Geldig domeinformat" : "Ongeldig of verdacht formaat",
    weight: 10,
  });
  score += hasValidTld ? 5 : -25;

  const suspiciousTlds = [".xyz", ".top", ".buzz", ".work", ".click", ".loan", ".shop"];
  const badTld = suspiciousTlds.some((t) => domain.endsWith(t));
  signals.push({
    key: "tld",
    label: "TLD-risico",
    positive: badTld ? false : true,
    detail: badTld
      ? "Domeinextensie komt vaker voor bij frauduleuze sites"
      : "Geen hoog-risico TLD gedetecteerd",
    weight: 8,
  });
  if (badTld) score -= 12;

  const hyphenHeavy = (domain.match(/-/g) || []).length >= 2;
  signals.push({
    key: "hyphens",
    label: "Domeinnaamstructuur",
    positive: hyphenHeavy ? false : null,
    detail: hyphenHeavy
      ? "Meerdere koppeltekens — vaak gebruikt bij nabootsing"
      : "Geen opvallende nabootsingspatronen",
    weight: 5,
  });
  if (hyphenHeavy) score -= 8;

  const brandSpoof =
    /(belastingdienst|ing-|abn-|rabobank|paypal-|microsoft-|apple-|kvk-|tikkie)/i.test(
      domain,
    );
  signals.push({
    key: "spoof",
    label: "Merk-/overheidsnabootsing",
    positive: brandSpoof ? false : true,
    detail: brandSpoof
      ? "Mogelijke nabootsing van bekende NL-merken of diensten"
      : "Geen duidelijke merknabootsing in de domeinnaam",
    weight: 20,
  });
  if (brandSpoof) score -= 30;

  let httpsOk: boolean | null = null;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`https://${domain}`, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timer);
    httpsOk = res.ok || res.status < 500;
  } catch {
    httpsOk = false;
  }
  signals.push({
    key: "https",
    label: "HTTPS-bereikbaarheid",
    positive: httpsOk,
    detail: httpsOk
      ? "Site reageert via HTTPS"
      : "Geen betrouwbare HTTPS-respons (kan offline of geblokkeerd zijn)",
    weight: 12,
  });
  score += httpsOk ? 10 : -10;

  const lengthOk = domain.length >= 5 && domain.length <= 40;
  signals.push({
    key: "length",
    label: "Domeinlengte",
    positive: lengthOk ? true : null,
    detail: lengthOk ? "Normale domeinlengte" : "Opvallend kort of lang domein",
    weight: 3,
  });
  if (!lengthOk) score -= 4;

  score = Math.max(1, Math.min(99, Math.round(score)));
  return {
    domain,
    score,
    label: scoreToLabel(score),
    signals,
  };
}
