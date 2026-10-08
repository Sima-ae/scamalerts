import { ASCII_LOOKALIKES, UNICODE_CONFUSABLES } from "@/lib/trust/brands";

/** Optimal string alignment distance (Levenshtein + adjacent transposition). */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => {
    const row = new Array<number>(n + 1).fill(0);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= n; j++) d[0]![j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        v = Math.min(v, d[i - 2]![j - 2]! + 1);
      }
      d[i]![j] = v;
    }
  }
  return d[m]![n]!;
}

/** Human-readable description of a single edit turning `brand` into `subject`. */
export function describeEdit(subject: string, brand: string): string {
  if (subject.length === brand.length) {
    const diff = [...subject].map((c, i) => (c === brand[i] ? -1 : i)).filter((i) => i >= 0);
    if (diff.length === 2 && diff[1] === diff[0]! + 1 &&
        subject[diff[0]!] === brand[diff[1]!] && subject[diff[1]!] === brand[diff[0]!]) {
      return `letters omgewisseld (“${brand.slice(diff[0], diff[0]! + 2)}” → “${subject.slice(diff[0], diff[0]! + 2)}”)`;
    }
    if (diff.length === 1) {
      return `“${brand[diff[0]!]}” vervangen door “${subject[diff[0]!]}”`;
    }
  }
  if (subject.length === brand.length + 1) {
    for (let i = 0; i < subject.length; i++) {
      if (subject.slice(0, i) + subject.slice(i + 1) === brand) {
        return subject[i] === subject[i - 1] || subject[i] === subject[i + 1]
          ? `letter “${subject[i]}” verdubbeld`
          : `extra teken “${subject[i]}” toegevoegd`;
      }
    }
  }
  if (subject.length + 1 === brand.length) {
    for (let i = 0; i < brand.length; i++) {
      if (brand.slice(0, i) + brand.slice(i + 1) === subject) {
        return `letter “${brand[i]}” weggelaten`;
      }
    }
  }
  return `${editDistance(subject, brand)} tekens verschil`;
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789-";

/** Every label at edit distance exactly 1 (OSA) from `label`. */
export function distanceOneVariants(label: string): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i < label.length; i++) {
    out.add(label.slice(0, i) + label.slice(i + 1));
    for (const c of ALPHABET) {
      if (c !== label[i]) out.add(label.slice(0, i) + c + label.slice(i + 1));
    }
    if (i < label.length - 1 && label[i] !== label[i + 1]) {
      out.add(label.slice(0, i) + label[i + 1] + label[i] + label.slice(i + 2));
    }
  }
  for (let i = 0; i <= label.length; i++) {
    for (const c of ALPHABET) out.add(label.slice(0, i) + c + label.slice(i));
  }
  out.delete(label);
  return out;
}

/** Map Unicode confusables and diacritics to plain ASCII. */
export function unicodeSkeleton(label: string): string {
  return [...label.normalize("NFKD").replace(/\p{M}/gu, "")]
    .map((c) => UNICODE_CONFUSABLES[c] ?? c)
    .join("");
}

/**
 * Labels this label could be read as through ASCII lookalikes
 * (paypa1 → paypal, rnicrosoft → microsoft). Excludes the label itself.
 */
export function lookalikeReadings(label: string, includeLetterSwaps = true): Set<string> {
  const out = new Set<string>();
  const isLetterSwap = (from: string) => from === "l" || from === "i";
  let all = label;
  for (const [from, to] of ASCII_LOOKALIKES) {
    if (isLetterSwap(from)) continue;
    all = all.split(from).join(to);
  }
  out.add(all);
  for (const [from, to] of ASCII_LOOKALIKES) {
    if (!includeLetterSwaps && isLetterSwap(from)) continue;
    let idx = label.indexOf(from);
    while (idx !== -1) {
      out.add(label.slice(0, idx) + to + label.slice(idx + from.length));
      idx = label.indexOf(from, idx + 1);
    }
  }
  out.delete(label);
  return out;
}

/**
 * Can `s` be split entirely into the brand token plus at least one keyword?
 * `brandAtStartOnly` restricts the brand token to the first segment.
 */
export function segmentsAsBrandPlusKeywords(
  s: string,
  token: string,
  keywords: Set<string>,
  brandAtStartOnly: boolean,
): boolean {
  if (s === token || !s.includes(token)) return false;
  const BRAND = 1;
  const KW = 2;
  // reach[i] is a bitmask of the 4 possible (usedBrand, usedKeyword) states
  const reach = new Array<number>(s.length + 1).fill(0);
  reach[0] = 1 << 0;
  for (let i = 0; i < s.length; i++) {
    for (let st = 0; st < 4; st++) {
      if (!(reach[i]! & (1 << st))) continue;
      if (s.startsWith(token, i) && !(brandAtStartOnly && i !== 0)) {
        reach[i + token.length]! |= 1 << (st | BRAND);
      }
      for (let len = 2; len <= 16 && i + len <= s.length; len++) {
        if (keywords.has(s.slice(i, i + len))) reach[i + len]! |= 1 << (st | KW);
      }
    }
  }
  return Boolean(reach[s.length]! & (1 << (BRAND | KW)));
}
