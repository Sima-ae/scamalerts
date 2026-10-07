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

function commonPrefixLen(a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  return i;
}

function commonSuffixLen(a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[a.length - 1 - i] === b[b.length - 1 - i]) i++;
  return i;
}

function longestCommonSubsequence(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i]![j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]! + 1
          : Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!);
    }
  }
  return dp[m]![n]!;
}

function isKeyboardNear(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length !== 1 || b.length !== 1) return false;
  const near = KEYBOARD_NEAR[a];
  return Boolean(near && near.includes(b));
}

/** True when two labels share a brand-like silhouette (prefix/suffix/LCS/keys). */
export function sharesStrongShape(aRaw: string, bRaw: string): boolean {
  const a = aRaw.toLowerCase();
  const b = bRaw.toLowerCase();
  if (!a || !b || a === b) return false;

  if (commonPrefixLen(a, b) >= 2) return true;
  if (commonSuffixLen(a, b) >= 2) return true;

  const minLen = Math.min(a.length, b.length);
  if (longestCommonSubsequence(a, b) >= minLen - 1) return true;

  // Same length: majority of positions equal or keyboard-adjacent
  if (a.length === b.length && a.length >= 4) {
    let close = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i] || isKeyboardNear(a[i]!, b[i]!)) close++;
    }
    if (close / a.length >= 0.75 && a[0] === b[0]) return true;
  }

  return false;
}

/**
 * Gate weak Levenshtein hits (e.g. bpne ↔ bunq at distance 2).
 * Short brands only allow a single edit; distance-2 needs a shared shape.
 */
export function isPlausibleTypo(subjectRaw: string, brandRaw: string): boolean {
  const subject = subjectRaw.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const brand = brandRaw.toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!subject || !brand || subject === brand) return false;

  const distance = levenshtein(subject, brand);
  if (distance < 1) return false;

  const minLen = Math.min(subject.length, brand.length);
  const maxLen = Math.max(subject.length, brand.length);
  if (Math.abs(subject.length - brand.length) > 2) return false;
  if (distance / maxLen > 0.4) return false;

  // 4-letter brands (bunq, digid): only classic single-edit typos
  if (minLen <= 4) return distance === 1;

  // 5-letter: distance 2 only with strong shared shape
  if (minLen <= 5) {
    if (distance === 1) return true;
    return distance === 2 && sharesStrongShape(subject, brand);
  }

  if (distance === 1) return true;
  if (distance === 2) return sharesStrongShape(subject, brand);
  return false;
}

/** Brand stem / phishing needle appears inside the label (secure-bunq-login). */
export function brandNeedleHit(
  labelRaw: string,
  brandLabel: string,
  needles: string[] = [],
): boolean {
  const label = labelRaw.toLowerCase();
  const brand = brandLabel.toLowerCase();
  if (!label || !brand || label === brand) return false;

  if (brand.length >= 4 && label.includes(brand) && label !== brand) {
    return true;
  }

  for (const needle of needles) {
    const n = needle.toLowerCase().replace(/^\.+|\.+$/g, "");
    if (!n) continue;
    if (label.includes(n.replace(/-$/, "")) || label.startsWith(n)) return true;
  }
  return false;
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
