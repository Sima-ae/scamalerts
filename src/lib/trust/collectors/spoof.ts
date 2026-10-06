import { promises as dns } from "dns";
import type { TrustSignal } from "@/lib/trust/types";
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

function detectKnownBrand(domain: string): {
  hit: string | null;
  method: string;
} {
  const lower = domain.toLowerCase();
  for (const entry of KNOWN_BRANDS) {
    if (lower === entry.brand) {
      return { hit: null, method: "exact" };
    }
    for (const needle of entry.needles) {
      if (lower.includes(needle) && lower !== entry.brand) {
        // Avoid flagging the real brand domain itself via needle
        if (lower === entry.brand) continue;
        // yourhosting.nl contains needle — only flag if not exact brand
        const brandLabel = entry.brand.split(".")[0] ?? "";
        const domainLabel = splitDomain(lower).label;
        if (domainLabel === brandLabel) continue;
        if (
          domainLabel.includes(needle.replace(/-/g, "")) ||
          lower.includes(needle)
        ) {
          // Require similarity so "hostingprovider.nl" isn't false positive for hostnet
          if (
            levenshtein(domainLabel, brandLabel) <= 3 ||
            domainLabel.includes(brandLabel) ||
            brandLabel.includes(domainLabel)
          ) {
            return { hit: entry.brand, method: "needle" };
          }
        }
      }
    }
    const brandHost = entry.brand.split(".")[0] ?? entry.brand;
    const domainHost = splitDomain(lower).label;
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

async function findTyposquatTarget(domain: string): Promise<{
  target: string;
  distance: number;
  reason: string;
} | null> {
  const { label, tld } = splitDomain(domain);
  if (!tld || label.length < 4) return null;

  const candidates = generateTypoLabels(label);
  // Prefer collapsing doubles / deletions (distance 1) first
  const ranked = candidates
    .map((c) => ({
      label: c,
      domain: `${c}.${tld}`,
      distance: levenshtein(label, c),
    }))
    .filter((c) => c.distance >= 1 && c.distance <= 2)
    .sort((a, b) => a.distance - b.distance || a.label.length - b.label.length);

  // Check known brands with same TLD first (fast path)
  for (const entry of KNOWN_BRANDS) {
    const b = splitDomain(entry.brand);
    if (b.tld !== tld) continue;
    const dist = levenshtein(label, b.label);
    if (dist >= 1 && dist <= 2) {
      const ok = await resolves(entry.brand);
      if (ok) {
        return {
          target: entry.brand,
          distance: dist,
          reason: "bekend merk met bijna-identieke spelling",
        };
      }
    }
  }

  // Live DNS check on generated variants (batched)
  const batchSize = 8;
  for (let i = 0; i < ranked.length; i += batchSize) {
    const batch = ranked.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (c) => ({
        ...c,
        ok: await resolves(c.domain),
      })),
    );
    const hit = results.find((r) => r.ok);
    if (hit) {
      return {
        target: hit.domain,
        distance: hit.distance,
        reason:
          hit.distance === 1
            ? "actief domein op 1 typfout afstand"
            : "actief domein op 2 typfouten afstand",
      };
    }
  }

  return null;
}

export async function collectSpoof(domain: string): Promise<TrustSignal[]> {
  const known = detectKnownBrand(domain);
  let target = known.hit;
  let method = known.method;
  let reason = "";

  const typo = await findTyposquatTarget(domain);
  if (typo) {
    // Prefer live typosquat when found (more specific)
    if (!target || typo.distance <= 2) {
      target = typo.target;
      method = "typosquat";
      reason = typo.reason;
    }
  }

  // Self-check: don't flag the real brand
  if (target && target === domain) {
    target = null;
  }

  const inputResolves = await resolves(domain);

  if (target) {
    const inactiveNote = inputResolves
      ? ""
      : " Het gecontroleerde domein lijkt daarnaast niet actief (geen DNS).";
    const detail =
      method === "typosquat"
        ? `Waarschijnlijke typosquat van ${target} (${reason}).${inactiveNote}`
        : `Lijkt sterk op ${target} (${method === "distance" ? "bijna-identieke spelling" : "merkfragment in de naam"}).${inactiveNote}`;

    return [
      {
        key: "spoof",
        label: "Merk-/overheidsnabootsing",
        positive: false,
        detail,
        weight: 24,
        group: "heuristiek",
        delta: inputResolves ? -28 : -34,
        raw: {
          target,
          method,
          reason,
          inputResolves,
          distance:
            typo && typo.target === target ? typo.distance : undefined,
        },
      },
    ];
  }

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
      raw: { method: "none", inputResolves },
    },
  ];
}
