import { promises as dns } from "dns";
import type { TrustSignal } from "@/lib/trust/types";

const resolver = new dns.Resolver();
resolver.setServers(["1.1.1.1", "8.8.8.8"]);

async function resolveSafe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function collectDns(domain: string): Promise<TrustSignal[]> {
  const signals: TrustSignal[] = [];

  const [a, aaaa, mx, txt] = await Promise.all([
    resolveSafe(() => resolver.resolve4(domain), [] as string[]),
    resolveSafe(() => resolver.resolve6(domain), [] as string[]),
    resolveSafe(() => resolver.resolveMx(domain), [] as { exchange: string; priority: number }[]),
    resolveSafe(() => resolver.resolveTxt(domain), [] as string[][]),
  ]);

  const ipv4 = a.length;
  const ipv6 = aaaa.length;
  const resolves = ipv4 + ipv6 > 0;

  signals.push({
    key: "dns_resolve",
    label: "DNS-resolutie",
    positive: resolves,
    detail: resolves
      ? `Lost op naar ${ipv4} IPv4${ipv6 ? ` en ${ipv6} IPv6` : ""} adres(sen)`
      : "Geen A/AAAA-records gevonden — domein lijkt niet actief",
    weight: 14,
    group: "technisch",
    delta: resolves ? 8 : -18,
    raw: { a: a.slice(0, 5), aaaa: aaaa.slice(0, 3) },
  });

  const txtFlat = txt.map((parts) => parts.join(""));
  const hasSpf = txtFlat.some((t) => /v=spf1/i.test(t));
  let hasDmarc = false;
  try {
    const dmarcTxt = await resolveSafe(
      () => resolver.resolveTxt(`_dmarc.${domain}`),
      [] as string[][],
    );
    hasDmarc = dmarcTxt.some((parts) => /v=dmarc1/i.test(parts.join("")));
  } catch {
    hasDmarc = false;
  }

  const hasMx = mx.length > 0;
  const mailParts: string[] = [];
  if (hasMx) mailParts.push(`MX aanwezig (${mx.length})`);
  else mailParts.push("geen MX");
  mailParts.push(hasSpf ? "SPF aanwezig" : "SPF ontbreekt");
  mailParts.push(hasDmarc ? "DMARC aanwezig" : "DMARC ontbreekt");

  let mailPositive: boolean | null = null;
  let mailDelta = 0;
  if (hasMx && hasSpf && hasDmarc) {
    mailPositive = true;
    mailDelta = 8;
  } else if (hasMx && (hasSpf || hasDmarc)) {
    mailPositive = true;
    mailDelta = 3;
  } else if (!hasMx && !hasSpf && !hasDmarc) {
    mailPositive = null;
    mailDelta = 0;
  } else if (hasMx && !hasSpf && !hasDmarc) {
    mailPositive = false;
    mailDelta = -4;
  }

  signals.push({
    key: "mail",
    label: "E-mailconfiguratie",
    positive: mailPositive,
    detail: mailParts.join("; "),
    weight: 10,
    group: "technisch",
    delta: mailDelta,
    raw: {
      mx: mx.slice(0, 5).map((m) => m.exchange),
      hasSpf,
      hasDmarc,
    },
  });

  return signals;
}
