import { parse } from "tldts";
import type { TrustSignal } from "@/lib/trust/types";
import type { DomainParts } from "@/lib/trust/domain-parts";
import { BRANDS, PHISHING_KEYWORDS, officialBrandFor, type Brand } from "@/lib/trust/brands";
import {
  describeEdit,
  distanceOneVariants,
  editDistance,
  lookalikeReadings,
  segmentsAsBrandPlusKeywords,
  unicodeSkeleton,
} from "@/lib/trust/typo-variants";
import { resolveRedirectHost } from "@/lib/trust/redirect";
import { getCertificate } from "@/lib/trust/collectors/tls";
import { ageInDays, lookupRdap } from "@/lib/trust/sources/rdap";
import type { TrancoList } from "@/lib/trust/sources/tranco";

/** 3 = strong evidence, 2 = moderate, 1 = weak */
type Strength = 1 | 2 | 3;

type Finding = {
  brand: string;
  target: string;
  officialDomains: string[];
  method: "homoglyph" | "subdomain" | "combosquat" | "typosquat" | "tld_swap" | "popular_typo";
  strength: Strength;
  evidence: string;
  /** Brand is not a public registrar, so "registered via <brand>" proves ownership */
  registrarProof: boolean;
};

/** Brands that sell domain registrations to the public. */
const PUBLIC_REGISTRAR_BRANDS = new Set(["Amazon", "Google"]);

const SOURCE_BASE = `Merkregister (${BRANDS.length} merken/instanties)`;

function isKeywordish(part: string): boolean {
  if (PHISHING_KEYWORDS.has(part)) return true;
  for (let i = 2; i <= part.length - 2; i++) {
    if (PHISHING_KEYWORDS.has(part.slice(0, i)) && PHISHING_KEYWORDS.has(part.slice(i))) return true;
  }
  return false;
}

function brandFindings(parts: DomainParts): Finding[] {
  // For IDN labels, compare the de-confused Unicode form, not the xn-- punycode.
  const idnReading = parts.isIdn ? unicodeSkeleton(parts.unicodeLabel) : null;
  const label = idnReading ?? parts.siteLabel;
  const labelParts = label.split("-").filter(Boolean);
  const subParts = parts.siteSubdomain.split(/[.-]/).filter(Boolean);
  const keywordInHost = [...labelParts, ...subParts].some(isKeywordish);

  const readings = new Set<string>(lookalikeReadings(label));
  const shortReadings = new Set<string>(lookalikeReadings(label, false));
  if (idnReading) {
    readings.add(idnReading);
    shortReadings.add(idnReading);
  }
  // Lookalike readings of individual hyphen parts (rab0bank-login → rabobank)
  const partReadings = new Map<string, string>();
  if (labelParts.length > 1) {
    for (const p of labelParts) {
      for (const r of lookalikeReadings(p, p.length >= 5)) partReadings.set(r, p);
    }
  }

  const findings: Finding[] = [];

  for (const brand of BRANDS) {
    const registrarProof = brand.sector !== "hosting" && !PUBLIC_REGISTRAR_BRANDS.has(brand.name);
    const add = (f: Omit<Finding, "brand" | "target" | "officialDomains" | "registrarProof">) =>
      findings.push({ ...f, brand: brand.name, target: brand.domains[0]!, officialDomains: brand.domains, registrarProof });

    for (const { t: token, keywordOnly } of brand.tokens) {
      const distinctive = !keywordOnly && token.length >= 4;

      // Reads as the brand through lookalike characters (pаypal, paypa1, rnicrosoft)
      if (token.length >= 3 && (token.length >= 5 ? readings : shortReadings).has(token)) {
        add({
          method: "homoglyph",
          strength: 3,
          evidence: parts.isIdn
            ? `de naam “${parts.unicodeLabel}” bevat tekens uit een ander schrift die eruitzien als “${token}”`
            : `“${label}” leest als “${token}” door gelijkende tekens`,
        });
        continue;
      }
      const lookalikePart = partReadings.get(token);
      if (lookalikePart && token.length >= 3 && (distinctive || keywordInHost)) {
        add({
          method: "homoglyph",
          strength: keywordInHost ? 3 : 2,
          evidence: `“${lookalikePart}” leest als “${token}” door gelijkende tekens`,
        });
        continue;
      }

      // Brand in the subdomain on someone else's domain (paypal.com.secure-check.xyz)
      const officialInSub = brand.domains.find((d) => `.${parts.siteSubdomain}.`.includes(`.${d}.`));
      if (officialInSub) {
        add({ method: "subdomain", strength: 3, evidence: `het officiële adres “${officialInSub}” staat vooraan in een ander domein` });
        continue;
      }
      if (subParts.includes(token) && (distinctive || keywordInHost)) {
        add({
          method: "subdomain",
          strength: keywordInHost ? 3 : 2,
          evidence: `merknaam “${token}” als subdomein op een domein dat niet van ${brand.name} is`,
        });
        continue;
      }

      // Same name under another extension (paypal.nl when the brand uses paypal.com)
      if (label === token) {
        if (!keywordOnly && token.length >= 4) {
          add({ method: "tld_swap", strength: 2, evidence: `zelfde naam als ${brand.domains[0]}, maar onder een andere extensie` });
        }
        continue;
      }

      // Brand + keywords, hyphenated (ing-inloggen) or concatenated (paypallogin)
      if (labelParts.length > 1 && labelParts.includes(token)) {
        if (keywordInHost) {
          add({ method: "combosquat", strength: 3, evidence: `merknaam “${token}” gecombineerd met termen die vaak in phishing voorkomen` });
        } else if (distinctive) {
          add({ method: "combosquat", strength: 2, evidence: `bevat de merknaam “${token}”` });
        }
        continue;
      }
      const concatHit = labelParts.some((p) =>
        segmentsAsBrandPlusKeywords(p, token, PHISHING_KEYWORDS, token.length < 5),
      );
      if (concatHit) {
        add({ method: "combosquat", strength: 3, evidence: `merknaam “${token}” vastgeplakt aan termen die vaak in phishing voorkomen` });
        continue;
      }

      // Typo of the brand name
      if (keywordOnly || token.length < 4) continue;
      const maxDistance = token.length >= 10 ? 2 : 1;
      const candidates = labelParts.length > 1 ? [label, ...labelParts] : [label];
      for (const candidate of candidates) {
        if (Math.abs(candidate.length - token.length) > maxDistance) continue;
        const d = editDistance(candidate, token);
        if (d < 1 || d > maxDistance) continue;
        const whole = candidate === label;
        // Short brand names collide with ordinary words (knab/knap), so a
        // single edit on its own is only weak evidence for them.
        const strength: Strength =
          !whole && keywordInHost ? 3
          : token.length >= 6 ? (whole ? 3 : 2)
          : token.length === 5 ? 2
          : 1;
        add({ method: "typosquat", strength, evidence: `${describeEdit(candidate, token)} ten opzichte van “${token}”` });
        break;
      }
    }
  }
  return findings;
}

function trancoFindings(parts: DomainParts, tranco: TrancoList): Finding[] {
  const idnReading = parts.isIdn ? unicodeSkeleton(parts.unicodeLabel) : null;
  const label = idnReading ?? parts.siteLabel;
  if (label.length < 5) return [];
  const own = parts.registrablePrivate;
  const findings: Finding[] = [];
  const asFinding = (hit: { domain: string; rank: number }, method: Finding["method"], strength: Strength, evidence: string): Finding => ({
    brand: hit.domain,
    target: hit.domain,
    officialDomains: [hit.domain],
    method,
    strength,
    evidence: `${evidence} (Tranco #${hit.rank.toLocaleString("nl-NL")})`,
    registrarProof: false,
  });

  const readings = new Set<string>(lookalikeReadings(label));
  if (idnReading) readings.add(idnReading);
  for (const r of readings) {
    const hit = tranco.byLabel(r);
    if (hit && hit.domain !== own) {
      const strength: Strength = r === idnReading ? 3 : 2;
      findings.push(asFinding(hit, "homoglyph", strength, `“${parts.unicodeLabel}” leest als “${r}”`));
    }
  }

  let best: { domain: string; rank: number; variant: string } | null = null;
  for (const v of distanceOneVariants(label)) {
    if (v.length < 5) continue;
    const hit = tranco.byLabel(v);
    if (!hit || hit.domain === own || hit.rank > 10_000) continue;
    if (!best || hit.rank < best.rank) best = { ...hit, variant: v };
  }
  if (best) {
    findings.push(asFinding(best, "popular_typo", 1, `${describeEdit(label, best.variant)} ten opzichte van ${best.domain}`));
  }
  return findings;
}

function signal(
  positive: boolean | null,
  delta: number,
  detail: string,
  source: string,
  raw: Record<string, unknown>,
): TrustSignal[] {
  return [{
    key: "spoof",
    label: "Merk- en domeinnabootsing",
    positive,
    detail,
    weight: 24,
    group: "heuristiek",
    delta,
    source,
    raw,
  }];
}

function registrableOf(host: string): string | null {
  return parse(host).domain ?? null;
}

function words(value: string): string[] {
  return value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

function orgMatchesBrand(org: string, brand: string): boolean {
  const orgWords = words(org);
  const brandWords = words(brand.replace(/\.[a-z]+$/, ""));
  if (!brandWords.length) return false;
  for (let i = 0; i + brandWords.length <= orgWords.length; i++) {
    if (brandWords.every((w, j) => orgWords[i + j] === w)) return true;
  }
  return false;
}

/**
 * CA-validated proof that the lookalike belongs to the brand: its valid
 * certificate also covers an official brand host, or is an OV/EV
 * certificate issued to the brand's organisation.
 */
async function sharedOwnership(
  parts: DomainParts,
  best: Finding,
  registrar: string | null,
): Promise<string | null> {
  if (best.registrarProof && registrar && orgMatchesBrand(registrar, best.brand)) {
    return `het domein is geregistreerd via ${registrar}, ${best.brand} zelf`;
  }
  const hosts = parts.host === parts.registrable ? [parts.host, `www.${parts.host}`] : [parts.host];
  for (const host of hosts) {
    const cert = await getCertificate(host);
    if (!cert?.authorized) continue;
    const covered = cert.san.find((name) => {
      const n = name.replace(/^\*\./, "");
      return best.officialDomains.some((d) => n === d || n.endsWith(`.${d}`));
    });
    if (covered) {
      return `het geldige TLS-certificaat van dit domein dekt ook ${covered}, een adres van ${best.brand}`;
    }
    if (cert.subjectOrg && orgMatchesBrand(cert.subjectOrg, best.brand)) {
      return `het TLS-certificaat is door ${cert.issuer} gevalideerd en uitgegeven aan ${cert.subjectOrg}`;
    }
  }
  return null;
}

export async function collectSpoof(
  parts: DomainParts,
  tranco: TrancoList | null,
): Promise<TrustSignal[]> {
  const source = tranco ? `${SOURCE_BASE} · Tranco-lijst ${tranco.listId}` : SOURCE_BASE;

  const official: Brand | null = parts.onPlatform ? null : officialBrandFor(parts.registrable);
  if (official) {
    return signal(true, 10, `Officieel domein van ${official.name}.`, SOURCE_BASE, {
      method: "official",
      brand: official.name,
    });
  }

  const findings = brandFindings(parts);
  if (tranco) findings.push(...trancoFindings(parts, tranco));

  if (findings.length === 0) {
    return signal(
      true,
      2,
      tranco
        ? `Geen gelijkenis gevonden met ${BRANDS.length} vaak nagebootste merken en instanties of met de ${tranco.size.toLocaleString("nl-NL")} meest bezochte sites.`
        : `Geen gelijkenis gevonden met ${BRANDS.length} vaak nagebootste merken en instanties. De vergelijking met populaire sites (Tranco) was nu niet beschikbaar.`,
      source,
      { method: "none" },
    );
  }

  findings.sort((a, b) => b.strength - a.strength);
  const best = findings[0]!;

  // Independent evidence of legitimacy weakens a name-only resemblance.
  const rank = parts.onPlatform ? null : (tranco?.rank(parts.registrable) ?? null);
  const rdap = parts.onPlatform ? null : await lookupRdap(parts.registrable);
  const registeredAt = rdap?.status === "found" ? rdap.registeredAt : null;
  const age = registeredAt ? ageInDays(registeredAt) : null;

  const context: string[] = [];
  let level: number = best.strength;
  if (rank !== null) {
    level -= 2;
    context.push(`dit domein staat zelf op Tranco #${rank.toLocaleString("nl-NL")}`);
  } else if (age !== null && age >= 5 * 365) {
    level -= 1;
    context.push(`dit domein is al sinds ${registeredAt!.getFullYear()} geregistreerd`);
  }
  if (age !== null && age < 90) {
    level = Math.min(3, level + 1);
    context.push(`het domein is pas ${age} dagen oud`);
  }
  if (rdap?.status === "not_found") {
    context.push("het domein is momenteel niet geregistreerd");
  }
  if (rdap?.status === "unavailable") {
    context.push("het domeinregister was niet bereikbaar, dus leeftijd en registrar konden niet worden meegewogen");
  }

  const finalHost = await resolveRedirectHost(parts.host);
  const finalRegistrable = finalHost ? registrableOf(finalHost) : null;
  if (finalRegistrable && finalRegistrable !== parts.registrable && best.officialDomains.includes(finalRegistrable)) {
    return signal(
      null,
      0,
      `Verwijst door naar ${finalRegistrable}, het officiële domein van ${best.brand}. Zo'n doorverwijzing is meestal in beheer van het merk zelf; controleer na het klikken altijd de adresbalk.`,
      source,
      { method: "redirect_alias", target: finalRegistrable, brand: best.brand },
    );
  }

  const owned = await sharedOwnership(
    parts,
    best,
    rdap?.status === "found" ? rdap.registrar : null,
  );
  if (owned) {
    return signal(
      true,
      5,
      `Lijkt op ${best.brand === best.target ? best.target : `${best.brand} (${best.target})`}, maar is aantoonbaar van dezelfde eigenaar: ${owned}.`,
      `${source} · TLS-certificaat`,
      { method: "brand_owned", target: best.target, brand: best.brand, evidence: owned },
    );
  }

  const raw = {
    method: best.method,
    target: best.target,
    brand: best.brand,
    strength: best.strength,
    level,
    evidence: best.evidence,
    tranco_rank: rank,
    age_days: age,
  };
  const ctx = context.length ? ` Context: ${context.join("; ")}.` : "";
  const who = best.brand === best.target ? best.target : `${best.brand} (${best.target})`;

  if (level >= 3) {
    return signal(false, -45, `Sterke aanwijzing voor nabootsing van ${who}: ${best.evidence}.${ctx}`, source, { ...raw, verdict: "high" });
  }
  if (level === 2) {
    return signal(false, -20, `Mogelijke nabootsing van ${who}: ${best.evidence}.${ctx} Ga na of je echt met ${best.brand} te maken hebt.`, source, { ...raw, verdict: "medium" });
  }
  if (level === 1) {
    return signal(null, 0, `Lijkt op ${who}: ${best.evidence}.${ctx} Op zichzelf geen bewijs van nabootsing.`, source, { ...raw, verdict: "low" });
  }
  return signal(true, 0, `Geen aanwijzing voor nabootsing: ${context[0] ?? "dit domein is zelfstandig gevestigd"}. De naam lijkt wel op ${who}.`, source, { ...raw, verdict: "dismissed" });
}
