import type { TrustSignal } from "@/lib/trust/types";
import type { DomainParts } from "@/lib/trust/domain-parts";

/**
 * Extensions that recur near the top of public abuse statistics
 * (Spamhaus TLD reputation, Interisle Phishing Landscape). Weak signal only.
 */
const HIGH_ABUSE_SUFFIXES = new Set([
  "xyz", "top", "buzz", "click", "icu", "cfd", "sbs", "bond", "cyou", "rest", "lol", "monster", "quest", "zip", "mov",
]);

export function collectHeuristics(parts: DomainParts): TrustSignal[] {
  const signals: TrustSignal[] = [];
  const suffix = parts.suffix;

  if (HIGH_ABUSE_SUFFIXES.has(suffix)) {
    signals.push({
      key: "tld",
      label: "Domeinextensie",
      positive: false,
      detail: `.${suffix} hoort bij de extensies met relatief veel misbruik in publieke statistieken. Legitieme sites gebruiken deze extensie ook; het is een zwak signaal.`,
      weight: 6,
      group: "heuristiek",
      delta: -6,
      source: "Spamhaus / Interisle misbruikstatistieken",
      raw: { suffix },
    });
  }

  const label = parts.siteLabel;
  const hyphens = (label.match(/-/g) ?? []).length;
  const digitRun = /\d{4,}/.test(label);
  const subLevels = parts.siteSubdomain ? parts.siteSubdomain.split(".").length : 0;
  const notes: string[] = [];
  if (hyphens >= 3) notes.push(`${hyphens} koppeltekens in de naam`);
  if (digitRun) notes.push("lange cijferreeks in de naam");
  if (subLevels >= 3) notes.push(`${subLevels} subdomeinniveaus`);
  if (label.length > 30) notes.push(`zeer lange naam (${label.length} tekens)`);

  if (notes.length) {
    signals.push({
      key: "structure",
      label: "Opbouw domeinnaam",
      positive: false,
      detail: `Opvallende opbouw: ${notes.join(", ")}. Komt vaak voor bij wegwerpdomeinen.`,
      weight: 5,
      group: "heuristiek",
      delta: -4 * notes.length,
      source: "Structuuranalyse",
      raw: { hyphens, digitRun, subLevels, length: label.length },
    });
  }

  if (parts.isIdn) {
    signals.push({
      key: "idn",
      label: "Internationale tekens",
      positive: null,
      detail: `Bevat niet-Latijnse of speciale tekens (${parts.unicodeHost}, technisch ${parts.host}). Controleer of dit niet op een bekende naam lijkt.`,
      weight: 5,
      group: "heuristiek",
      delta: 0,
      source: "Structuuranalyse",
    });
  }

  return signals;
}
