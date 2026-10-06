import { promises as dns } from "dns";
import type { TrustSignal } from "@/lib/trust/types";
import { hostsMatch, resolveRedirectHost } from "@/lib/trust/redirect";
import {
  generateTypoLabels,
  levenshtein,
  splitDomain,
} from "@/lib/trust/typo-variants";

const resolver = new dns.Resolver();
resolver.setServers(["1.1.1.1", "8.8.8.8"]);

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

function normalizeCanonical(host: string): string {
  // Collapse www. and match known brand apex when possible
  const bare = host.toLowerCase().replace(/^www\./, "");
  if (KNOWN_SET.has(bare)) return bare;
  return bare;
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

function findClosestKnownBrand(domain: string): {
  brand: string;
  distance: number;
} | null {
  const { label, tld } = splitDomain(domain);
  let best: { brand: string; distance: number } | null = null;
  for (const entry of KNOWN_BRANDS) {
    const b = splitDomain(entry.brand);
    if (b.tld !== tld) continue;
    const distance = levenshtein(label, b.label);
    if (distance < 1 || distance > 2) continue;
    if (!best || distance < best.distance) {
      best = { brand: entry.brand, distance };
    }
  }
  return best;
}

type Lookalike = {
  domain: string;
  distance: number;
  reason: string;
};

async function findLookalikes(domain: string): Promise<Lookalike[]> {
  const { label, tld } = splitDomain(domain);
  if (!tld || label.length < 4) return [];

  const found: Lookalike[] = [];
  const seen = new Set<string>();

  // Known brands at edit distance 1–2
  for (const entry of KNOWN_BRANDS) {
    const b = splitDomain(entry.brand);
    if (b.tld !== tld) continue;
    const distance = levenshtein(label, b.label);
    if (distance < 1 || distance > 2) continue;
    if (seen.has(entry.brand)) continue;
    if (!(await resolves(entry.brand))) continue;
    seen.add(entry.brand);
    found.push({
      domain: entry.brand,
      distance,
      reason: "bekend merk met bijna-identieke spelling",
    });
  }

  const ranked = generateTypoLabels(label)
    .map((c) => ({
      label: c,
      domain: `${c}.${tld}`,
      distance: levenshtein(label, c),
    }))
    .filter((c) => c.distance >= 1 && c.distance <= 2)
    .sort((a, b) => a.distance - b.distance);

  const batchSize = 8;
  for (let i = 0; i < ranked.length && found.length < 6; i += batchSize) {
    const batch = ranked.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (c) => ({
        ...c,
        ok: !seen.has(c.domain) && (await resolves(c.domain)),
      })),
    );
    for (const hit of results) {
      if (!hit.ok) continue;
      seen.add(hit.domain);
      found.push({
        domain: hit.domain,
        distance: hit.distance,
        reason:
          hit.distance === 1
            ? "actief domein op 1 typfout afstand"
            : "actief domein op 2 typfouten afstand",
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
};

async function assessAuthority(domain: string): Promise<Authority> {
  const known = isKnownBrand(domain);
  const dnsOk = await resolves(domain);
  const dest = dnsOk ? await finalHost(domain) : null;
  const redirectsTo =
    dest && !hostsMatch(dest, domain) ? normalizeCanonical(dest) : null;

  let score = 0;
  if (known) score += 100;
  if (dnsOk) score += 20;
  if (dest) score += 15;
  // Being a redirect *destination* is stronger than being a redirect source —
  // measured later via peer comparison.
  if (redirectsTo) score -= 25;
  // Slightly prefer longer labels when both are active (yourhosting > youhosting)
  score += Math.min(splitDomain(domain).label.length, 24);

  return { score, redirectsTo, resolves: dnsOk, known };
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

  // Canonical known brand → never treat as typosquat of a shorter alias.
  if (isKnownBrand(subject)) {
    return safeSignal(
      subject,
      "Bekend legitiem merkdomein — geen nabootsing gedetecteerd",
      10,
    );
  }

  const subjectAuth = await assessAuthority(subject);
  const lookalikes = await findLookalikes(subject);

  if (lookalikes.length === 0) {
    // Still check distance-to-known even if DNS on brand failed earlier
    const close = findClosestKnownBrand(subject);
    if (close && (await resolves(close.brand))) {
      lookalikes.push({
        domain: close.brand,
        distance: close.distance,
        reason: "bekend merk met bijna-identieke spelling",
      });
    }
  }

  if (lookalikes.length === 0) {
    return [
      {
        key: "spoof",
        label: "Merk-/overheidsnabootsing",
        positive: true,
        detail:
          "Geen actief lookalike-domein of bekende merknabootsing gevonden in de naam",
        weight: 20,
        group: "heuristiek",
        delta: 3,
        raw: { method: "none", inputResolves: subjectAuth.resolves },
      },
    ];
  }

  // Assess peers and pick the most authoritative lookalike
  const peers = await Promise.all(
    lookalikes.map(async (l) => ({
      ...l,
      auth: await assessAuthority(l.domain),
    })),
  );

  // Boost peer if subject redirects to them, or they are redirect target of subject
  for (const peer of peers) {
    if (
      subjectAuth.redirectsTo &&
      hostsMatch(subjectAuth.redirectsTo, peer.domain)
    ) {
      peer.auth.score += 40;
    }
    if (peer.auth.redirectsTo && hostsMatch(peer.auth.redirectsTo, subject)) {
      // Peer is just an alias pointing at us → we are the original
      subjectAuth.score += 50;
      peer.auth.score -= 30;
    }
  }

  peers.sort((a, b) => b.auth.score - a.auth.score);
  const best = peers[0]!;

  // Subject redirects to a stronger original → alias / secondary domain (not a scam clone)
  // Check this BEFORE raw score compare, so typo domains that 301 to the brand
  // are not treated as hostile typosquats.
  if (
    subjectAuth.redirectsTo &&
    (hostsMatch(subjectAuth.redirectsTo, best.domain) ||
      isKnownBrand(subjectAuth.redirectsTo))
  ) {
    const dest = isKnownBrand(subjectAuth.redirectsTo)
      ? subjectAuth.redirectsTo
      : best.domain;
    return [
      {
        key: "spoof",
        label: "Merk-/overheidsnabootsing",
        positive: null,
        detail: `Geen zelfstandige scam-site: dit domein verwijst door naar ${dest}. Niet het primaire merkdomein, wel gekoppeld aan het origineel.`,
        weight: 18,
        group: "heuristiek",
        delta: -8,
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

  // Subject is more (or equally) authoritative → not a fake typosquat
  if (subjectAuth.score >= best.auth.score) {
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
      "Geen sterkere lookalike gevonden; dit domein lijkt geen nabootsing",
      5,
    );
  }

  // True typosquat / impersonation risk
  const inactiveNote = subjectAuth.resolves
    ? ""
    : " Het gecontroleerde domein lijkt daarnaast niet actief (geen DNS).";

  return [
    {
      key: "spoof",
      label: "Merk-/overheidsnabootsing",
      positive: false,
      detail: `Waarschijnlijke typosquat van ${best.domain} (${best.reason}).${inactiveNote}`,
      weight: 24,
      group: "heuristiek",
      delta: subjectAuth.resolves ? -28 : -34,
      raw: {
        target: best.domain,
        method: "typosquat",
        reason: best.reason,
        inputResolves: subjectAuth.resolves,
        distance: best.distance,
        subjectScore: subjectAuth.score,
        peerScore: best.auth.score,
      },
    },
  ];
}
