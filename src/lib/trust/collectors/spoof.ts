import { promises as dns } from "dns";
import type { TrustSignal } from "@/lib/trust/types";
import { hostsMatch, resolveRedirectHost } from "@/lib/trust/redirect";
import {
  brandNeedleHit,
  generateTypoLabels,
  isPlausibleTypo,
  levenshtein,
  sharesStrongShape,
  splitDomain,
} from "@/lib/trust/typo-variants";

const resolver = new dns.Resolver();
resolver.setServers(["1.1.1.1", "8.8.8.8"]);

const KNOWN_BRANDS = [
  { brand: "belastingdienst.nl", needles: ["belastingdienst", "belasting-dienst"] },
  { brand: "ing.nl", needles: ["ing-", "ingbank", "mijn-ing"] },
  { brand: "abnamro.nl", needles: ["abn-", "abnamro", "abn-amro"] },
  { brand: "rabobank.nl", needles: ["rabobank", "rabo-"] },
  { brand: "bunq.com", needles: ["bunq-", "bunq."] },
  { brand: "paypal.com", needles: ["paypal-", "pay-pal"] },
  { brand: "microsoft.com", needles: ["microsoft-", "office365-", "m365-"] },
  { brand: "apple.com", needles: ["apple-", "icloud-"] },
  { brand: "apple.nl", needles: ["apple-"] },
  { brand: "kvk.nl", needles: ["kvk-", "kamer-van-koophandel"] },
  { brand: "tikkie.me", needles: ["tikkie-", "tikkie."] },
  { brand: "digid.nl", needles: ["digid-", "digi-d"] },
  { brand: "marktplaats.nl", needles: ["marktplaats-", "markt-plaats"] },
  { brand: "postnl.nl", needles: ["postnl-", "post-nl"] },
  { brand: "bol.com", needles: ["bolcom-", "bol-com"] },
  { brand: "amazon.com", needles: ["amazon-", "amzn-"] },
  { brand: "google.com", needles: ["google-", "gmail-"] },
  { brand: "facebook.com", needles: ["facebook-", "meta-login"] },
  { brand: "instagram.com", needles: ["instagram-", "insta-"] },
  { brand: "netflix.com", needles: ["netflix-"] },
  { brand: "yourhosting.nl", needles: ["yourhosting", "your-hosting"] },
  { brand: "transip.nl", needles: ["transip", "trans-ip"] },
  { brand: "hostnet.nl", needles: ["hostnet"] },
  { brand: "versio.nl", needles: ["versio"] },
  { brand: "antagonist.nl", needles: ["antagonist"] },
  { brand: "mijndomein.nl", needles: ["mijndomein", "mijn-domein"] },
  { brand: "godaddy.com", needles: ["godaddy", "go-daddy"] },
  { brand: "ideal.nl", needles: ["ideal-login", "idealbetalen"] },
];

const KNOWN_SET = new Set(KNOWN_BRANDS.map((b) => b.brand));
const FAMOUS_LABELS = new Set(
  KNOWN_BRANDS.map((b) => splitDomain(b.brand).label).filter((l) => l.length >= 4),
);

function normalizeCanonical(host: string): string {
  const bare = host.toLowerCase().replace(/^www\./, "");
  if (KNOWN_SET.has(bare)) return bare;
  return bare;
}

function isFamousLabel(label: string): boolean {
  return FAMOUS_LABELS.has(label.toLowerCase());
}

function needlesForBrandLabel(brandLabel: string): string[] {
  const out: string[] = [];
  for (const entry of KNOWN_BRANDS) {
    if (splitDomain(entry.brand).label === brandLabel) {
      out.push(...entry.needles);
    }
  }
  return out;
}

function closestFamousLabel(
  label: string,
): { label: string; distance: number } | null {
  let best: { label: string; distance: number } | null = null;
  for (const famous of FAMOUS_LABELS) {
    if (!isPlausibleTypo(label, famous)) continue;
    const distance = levenshtein(label, famous);
    if (!best || distance < best.distance) {
      best = { label: famous, distance };
    }
  }
  return best;
}

async function resolves(domain: string): Promise<boolean> {
  try {
    const a = await resolver.resolve4(domain);
    return a.length > 0;
  } catch {
    try {
      const aaaa = await resolver.resolve6(domain);
      return aaaa.length > 0;
    } catch {
      return false;
    }
  }
}

async function finalHost(domain: string): Promise<string | null> {
  return resolveRedirectHost(domain);
}

function isKnownBrand(domain: string): boolean {
  return KNOWN_SET.has(domain.toLowerCase());
}

type Lookalike = {
  domain: string;
  distance: number;
  reason: string;
  famous: boolean;
  confidence: "high" | "medium";
};

async function findLookalikes(domain: string): Promise<Lookalike[]> {
  const { label, tld } = splitDomain(domain);
  if (!tld || label.length < 4) return [];

  const found: Lookalike[] = [];
  const seen = new Set<string>();

  const push = (item: Lookalike) => {
    if (seen.has(item.domain)) return;
    seen.add(item.domain);
    found.push(item);
  };

  // Brand stem / phishing needles inside the label (secure-bunq-login.nl)
  for (const entry of KNOWN_BRANDS) {
    const b = splitDomain(entry.brand);
    if (!brandNeedleHit(label, b.label, entry.needles)) continue;
    if (!(await resolves(entry.brand))) continue;
    push({
      domain: entry.brand,
      distance: Math.max(1, levenshtein(label, b.label)),
      reason: `bevat merksignaal van ${entry.brand}`,
      famous: true,
      confidence: "high",
    });
  }

  // Famous brand labels (cross-TLD): applee.nl → apple.nl / apple.com
  const famous = closestFamousLabel(label);
  if (famous) {
    const shape = sharesStrongShape(label, famous.label);
    const confidence: "high" | "medium" =
      famous.distance === 1 || shape ? "high" : "medium";
    const sameTld = `${famous.label}.${tld}`;
    if (await resolves(sameTld)) {
      push({
        domain: sameTld,
        distance: famous.distance,
        reason: `sterke spellingsovereenkomst met bekend merk “${famous.label}”`,
        famous: true,
        confidence,
      });
    }
    for (const entry of KNOWN_BRANDS) {
      const b = splitDomain(entry.brand);
      if (b.label !== famous.label) continue;
      if (!(await resolves(entry.brand))) continue;
      push({
        domain: entry.brand,
        distance: famous.distance,
        reason: `sterke spellingsovereenkomst met ${entry.brand}`,
        famous: true,
        confidence,
      });
    }
  }

  // Exact known brand domains — only when typo gate passes
  for (const entry of KNOWN_BRANDS) {
    const b = splitDomain(entry.brand);
    if (!isPlausibleTypo(label, b.label)) continue;
    const distance = levenshtein(label, b.label);
    if (!(await resolves(entry.brand))) continue;
    const needle = brandNeedleHit(label, b.label, entry.needles);
    push({
      domain: entry.brand,
      distance,
      reason: needle
        ? `bevat merksignaal van ${entry.brand}`
        : "bekend merk met zeer vergelijkbare spelling",
      famous: true,
      confidence: distance === 1 || needle ? "high" : "medium",
    });
  }

  // Live DNS on generated typo variants (same TLD)
  const ranked = generateTypoLabels(label)
    .map((c) => ({
      label: c,
      domain: `${c}.${tld}`,
      distance: levenshtein(label, c),
    }))
    .filter(
      (c) =>
        c.distance >= 1 &&
        c.distance <= 2 &&
        isPlausibleTypo(label, c.label),
    )
    .sort((a, b) => a.distance - b.distance);

  const batchSize = 8;
  for (let i = 0; i < ranked.length && found.length < 8; i += batchSize) {
    const batch = ranked.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (c) => ({
        ...c,
        ok: !seen.has(c.domain) && (await resolves(c.domain)),
      })),
    );
    for (const hit of results) {
      if (!hit.ok) continue;
      const famousHit = isFamousLabel(hit.label);
      push({
        domain: hit.domain,
        distance: hit.distance,
        reason:
          hit.distance === 1
            ? "actief domein op 1 typfout afstand"
            : "actief domein op 2 typfouten afstand met gedeelde structuur",
        famous: famousHit,
        confidence: hit.distance === 1 || famousHit ? "high" : "medium",
      });
    }
  }

  return found;
}

type Authority = {
  score: number;
  redirectsTo: string | null;
  resolves: boolean;
  known: boolean;
  famousLabel: boolean;
};

async function assessAuthority(domain: string): Promise<Authority> {
  const { label } = splitDomain(domain);
  const known = isKnownBrand(domain);
  const famousLabel = isFamousLabel(label);
  const dnsOk = await resolves(domain);
  const dest = dnsOk ? await finalHost(domain) : null;
  const redirectsTo =
    dest && !hostsMatch(dest, domain) ? normalizeCanonical(dest) : null;

  let score = 0;
  if (known) score += 100;
  if (famousLabel) score += 90;
  if (dnsOk) score += 20;
  if (dest) score += 10;
  if (redirectsTo) score -= 25;

  return { score, redirectsTo, resolves: dnsOk, known, famousLabel };
}

function safeSignal(domain: string, detail: string, delta = 8): TrustSignal[] {
  return [
    {
      key: "spoof",
      label: "Merk-/overheidsnabootsing",
      positive: true,
      detail,
      weight: 20,
      group: "heuristiek",
      delta,
      raw: { method: "canonical", domain },
    },
  ];
}

export async function collectSpoof(domain: string): Promise<TrustSignal[]> {
  const subject = domain.toLowerCase();
  const subjectLabel = splitDomain(subject).label;

  if (isKnownBrand(subject)) {
    return safeSignal(
      subject,
      "Bekend legitiem merkdomein — geen nabootsing gedetecteerd",
      10,
    );
  }

  // Exact famous label on this host (apple.nl) counts as canonical for that brand.
  if (isFamousLabel(subjectLabel) && (await resolves(subject))) {
    return safeSignal(
      subject,
      "Domeinnaam komt overeen met een bekend merk — geen typosquat van een sterker origineel",
      8,
    );
  }

  const subjectAuth = await assessAuthority(subject);
  const lookalikes = await findLookalikes(subject);

  if (lookalikes.length === 0) {
    return [
      {
        key: "spoof",
        label: "Merk-/overheidsnabootsing",
        positive: true,
        detail:
          "Geen overtuigende merknabootsing of actief lookalike-domein gevonden",
        weight: 20,
        group: "heuristiek",
        delta: 3,
        raw: { method: "none", inputResolves: subjectAuth.resolves },
      },
    ];
  }

  const peers = await Promise.all(
    lookalikes.map(async (l) => ({
      ...l,
      auth: await assessAuthority(l.domain),
      brandLabel: splitDomain(l.domain).label,
    })),
  );

  for (const peer of peers) {
    if (
      subjectAuth.redirectsTo &&
      hostsMatch(subjectAuth.redirectsTo, peer.domain)
    ) {
      peer.auth.score += 40;
    }
    if (peer.auth.redirectsTo && hostsMatch(peer.auth.redirectsTo, subject)) {
      subjectAuth.score += 50;
      peer.auth.score -= 30;
    }
    // Famous brand always outranks a lookalike that is not famous.
    if (peer.famous || peer.auth.famousLabel || peer.auth.known) {
      if (!subjectAuth.famousLabel && !subjectAuth.known) {
        peer.auth.score += 80;
      }
    }
    // Downgrade weak medium-confidence name hits versus an independent active site
    if (peer.confidence === "medium" && subjectAuth.resolves) {
      peer.auth.score -= 35;
    }
  }

  peers.sort((a, b) => b.auth.score - a.auth.score);
  const best = peers[0]!;

  if (
    subjectAuth.redirectsTo &&
    (hostsMatch(subjectAuth.redirectsTo, best.domain) ||
      isKnownBrand(subjectAuth.redirectsTo) ||
      isFamousLabel(splitDomain(subjectAuth.redirectsTo).label))
  ) {
    const dest = isKnownBrand(subjectAuth.redirectsTo)
      ? subjectAuth.redirectsTo
      : best.domain;
    return [
      {
        key: "spoof",
        label: "Merk-/overheidsnabootsing",
        positive: null,
        detail: `Geen zelfstandige scam-site: dit domein verwijst door naar ${dest}. Score blijft voorzichtig-neutraal — controleer altijd of je op het echte merkdomein uitkomt.`,
        weight: 18,
        group: "heuristiek",
        delta: 38,
        raw: {
          target: dest,
          method: "redirect_alias",
          inputResolves: subjectAuth.resolves,
          distance: best.distance,
          subjectScore: subjectAuth.score,
          peerScore: best.auth.score,
        },
      },
    ];
  }

  const peerIsFamousBrand =
    best.famous || best.auth.famousLabel || best.auth.known;
  const subjectIsFamous = subjectAuth.famousLabel || subjectAuth.known;
  const needle = brandNeedleHit(
    subjectLabel,
    best.brandLabel,
    needlesForBrandLabel(best.brandLabel),
  );
  const plausible = isPlausibleTypo(subjectLabel, best.brandLabel) || needle;

  // Only hard-flag famous brands on high-confidence evidence
  // (single edit, brand needle, or strong shared shape — not loose distance-2).
  const forceTyposquat =
    peerIsFamousBrand &&
    !subjectIsFamous &&
    plausible &&
    best.confidence === "high" &&
    (best.distance === 1 ||
      needle ||
      sharesStrongShape(subjectLabel, best.brandLabel));

  if (!forceTyposquat && subjectAuth.score >= best.auth.score) {
    if (
      best.auth.redirectsTo &&
      hostsMatch(best.auth.redirectsTo, subject)
    ) {
      return safeSignal(
        subject,
        `Actief lookalike ${best.domain} verwijst terug naar dit domein — dit lijkt het origineel`,
        8,
      );
    }
    return safeSignal(
      subject,
      "Geen overtuigende nabootsing van een sterker merkdomein gevonden",
      5,
    );
  }

  // Medium-only famous hit without force evidence → informational, not a risk
  if (peerIsFamousBrand && !forceTyposquat && best.confidence !== "high") {
    return [
      {
        key: "spoof",
        label: "Merk-/overheidsnabootsing",
        positive: true,
        detail:
          "Geen overtuigende merknabootsing: zwakke spellingsovereenkomsten met bekende merken zijn genegeerd",
        weight: 20,
        group: "heuristiek",
        delta: 3,
        raw: {
          method: "weak_filtered",
          considered: best.domain,
          distance: best.distance,
          confidence: best.confidence,
        },
      },
    ];
  }

  if (!forceTyposquat && !peerIsFamousBrand) {
    return safeSignal(
      subject,
      "Geen sterkere lookalike gevonden; dit domein lijkt geen nabootsing",
      5,
    );
  }

  const inactiveNote = subjectAuth.resolves
    ? ""
    : " Het gecontroleerde domein lijkt daarnaast niet actief (geen DNS).";

  let delta = -28;
  if (!subjectAuth.resolves) delta = -34;
  if (forceTyposquat) {
    delta = subjectAuth.resolves ? -55 : -60;
  }

  return [
    {
      key: "spoof",
      label: "Merk-/overheidsnabootsing",
      positive: false,
      detail: `Sterke aanwijzing voor typosquat van ${best.domain} (${best.reason}).${inactiveNote}`,
      weight: 24,
      group: "heuristiek",
      delta,
      raw: {
        target: best.domain,
        method: "typosquat",
        reason: best.reason,
        inputResolves: subjectAuth.resolves,
        distance: best.distance,
        confidence: best.confidence,
        subjectScore: subjectAuth.score,
        peerScore: best.auth.score,
        forceTyposquat,
        needle,
      },
    },
  ];
}
