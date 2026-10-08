/**
 * Live regression check for the domain scan: runs the full analysis
 * (without DB persistence) and compares verdicts with expectations.
 *
 *   npx tsx scripts/trust-eval.ts [domain ...]
 */
import { analyzeDomain, trustLabelNL } from "@/lib/trust-score";

type Expect = "safe" | "not_flagged" | "spoof" | "blocked";

const CASES: [string, Expect][] = [
  // Official / established domains must never be flagged as impersonation
  ["ing.nl", "safe"],
  ["bol.com", "safe"],
  ["marktplaats.nl", "safe"],
  ["belastingdienst.nl", "safe"],
  ["booking.com", "safe"],
  ["mijn.ing.nl", "safe"],
  ["google.de", "not_flagged"],
  ["tweakers.net", "not_flagged"],
  ["nu.nl", "not_flagged"],
  // Words that contain brand names but are unrelated
  ["shopping.nl", "not_flagged"],
  ["pineapple.nl", "not_flagged"],
  ["conversion.com", "not_flagged"],
  ["parking.nl", "not_flagged"],
  ["lng.nl", "not_flagged"],
  ["knap.nl", "not_flagged"],
  ["apply.com", "not_flagged"],
  ["idealista.com", "not_flagged"],
  ["wikipedia.org", "not_flagged"],
  // Defensive registrations owned or forwarded by the brand
  ["ingbank.nl", "not_flagged"],
  ["paypal.nl", "not_flagged"],
  ["netflx.com", "not_flagged"],
  ["rabobamk.nl", "not_flagged"],
  // Impersonation patterns
  ["paypa1.com", "blocked"],
  ["rab0bank-login.nl", "spoof"],
  ["paypa1-verify.com", "spoof"],
  ["ing-inloggen.nl", "spoof"],
  ["paypallogin.com", "spoof"],
  ["belastingdienst-toeslagen.nl", "spoof"],
  ["mijn-ing-verificatie.com", "spoof"],
  ["paypal.com.secure-login.xyz", "spoof"],
  ["xn--pypal-4ve.com", "spoof"],
  ["marktplaatz.nl", "spoof"],
  ["postnl-pakket.nl", "spoof"],
  ["amazon-retour.nl", "spoof"],
  ["dhl-pakket-levering.com", "spoof"],
  ["abnamro-veilig.com", "spoof"],
  // Blocklist test hosts
  ["malware.testcategory.com", "blocked"],
  ["isitblocked.org", "blocked"],
];

function verdictOf(signals: { key: string; positive: boolean | null; raw?: Record<string, unknown> }[]) {
  const spoof = signals.find((s) => s.key === "spoof");
  const block = signals.find((s) => s.key === "blocklists");
  return {
    spoofFlagged: spoof?.positive === false,
    spoofMethod: (spoof?.raw?.method as string) ?? "-",
    official: spoof?.raw?.method === "official",
    blocked: block?.positive === false,
  };
}

async function run(domain: string, expect?: Expect) {
  const started = Date.now();
  const r = await analyzeDomain(domain, { persist: false, refresh: true });
  const v = verdictOf(r.signals);
  const ok =
    expect === undefined ? true
    : expect === "safe" ? !v.spoofFlagged && !v.blocked && r.score >= 61
    : expect === "not_flagged" ? !v.spoofFlagged && !v.blocked
    : expect === "spoof" ? v.spoofFlagged && r.score <= 55
    : v.blocked && r.score <= 10;
  const spoof = r.signals.find((s) => s.key === "spoof");
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${domain.padEnd(30)} ${String(r.score).padStart(2)}  ${trustLabelNL(r.label).padEnd(28)} spoof=${v.spoofMethod}${v.blocked ? " BLOCKED" : ""}  ${Date.now() - started}ms`,
  );
  if (!ok || process.env.VERBOSE) {
    console.log(`      ${spoof?.detail}`);
    if (v.blocked) console.log(`      ${r.signals.find((s) => s.key === "blocklists")?.detail}`);
  }
  return ok;
}

async function main() {
  const args = process.argv.slice(2);
  const list: [string, Expect | undefined][] = args.length ? args.map((d) => [d, undefined]) : CASES;
  let failed = 0;
  for (let i = 0; i < list.length; i += 4) {
    const batch = list.slice(i, i + 4);
    const results = await Promise.all(batch.map(([d, e]) => run(d, e).catch((err) => {
      console.log(`ERROR ${d}: ${err}`);
      return false;
    })));
    failed += results.filter((ok) => !ok).length;
  }
  console.log(`\n${list.length - failed}/${list.length} passed`);
  process.exit(failed ? 1 : 0);
}

void main();
