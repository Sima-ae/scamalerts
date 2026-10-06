/** Generate likely typosquat / mistype candidates for a domain label (no TLD). */

const KEYBOARD_NEAR: Record<string, string> = {
  a: "sqwz",
  b: "vghn",
  c: "xdfv",
  d: "sfcxe",
  e: "wrsdf",
  f: "dgcvr",
  g: "fhtbv",
  h: "gjynb",
  i: "ujko",
  j: "hkunm",
  k: "jlim",
  l: "kop",
  m: "njk",
  n: "bhjm",
  o: "iklp",
  p: "ol",
  q: "wa",
  r: "edft",
  s: "awedxz",
  t: "rfgy",
  u: "yhji",
  v: "cfgb",
  w: "qase",
  x: "zsdc",
  y: "tghu",
  z: "asx",
};

export function levenshtein(a: string, b: string): number {
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

/**
 * Generate edit-distance ~1 candidates that often appear in phishing:
 * double-letter removal, deletions, adjacent swaps, nearby keys.
 */
export function generateTypoLabels(label: string, max = 48): string[] {
  const base = label.toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (base.length < 4) return [];

  const out = new Set<string>();

  // Collapse doubled letters: yourhossting → yourhosting
  for (let i = 0; i < base.length - 1; i++) {
    if (base[i] === base[i + 1] && /[a-z]/.test(base[i]!)) {
      out.add(base.slice(0, i) + base.slice(i + 1));
    }
  }

  // Missing letter (common when attacker adds one): delete each char once
  if (base.length <= 22) {
    for (let i = 0; i < base.length; i++) {
      out.add(base.slice(0, i) + base.slice(i + 1));
    }
  }

  // Adjacent transposition
  for (let i = 0; i < base.length - 1; i++) {
    const chars = base.split("");
    const tmp = chars[i]!;
    chars[i] = chars[i + 1]!;
    chars[i + 1] = tmp;
    out.add(chars.join(""));
  }

  // Adjacent keyboard substitution (limited)
  for (let i = 0; i < base.length; i++) {
    const ch = base[i]!;
    const near = KEYBOARD_NEAR[ch];
    if (!near) continue;
    for (const n of near.slice(0, 3)) {
      out.add(base.slice(0, i) + n + base.slice(i + 1));
    }
  }

  // Hyphen insertion/removal variants for brand-like names
  if (base.includes("-")) {
    out.add(base.replace(/-/g, ""));
  } else if (base.length >= 8 && base.length <= 18) {
    // try a mid hyphen (cheap heuristic)
    const mid = Math.floor(base.length / 2);
    out.add(base.slice(0, mid) + "-" + base.slice(mid));
  }

  out.delete(base);
  return [...out]
    .filter((v) => v.length >= 3 && v.length <= 63 && !v.startsWith("-") && !v.endsWith("-"))
    .slice(0, max);
}

export function splitDomain(domain: string): { label: string; tld: string } {
  const parts = domain.toLowerCase().split(".");
  if (parts.length < 2) return { label: domain, tld: "" };
  // handle co.uk-style lightly: use last two labels when middle is short
  if (parts.length >= 3 && ["co", "com", "net", "org"].includes(parts[parts.length - 2]!)) {
    return {
      label: parts.slice(0, -2).join("."),
      tld: parts.slice(-2).join("."),
    };
  }
  return {
    label: parts.slice(0, -1).join("."),
    tld: parts[parts.length - 1]!,
  };
}
