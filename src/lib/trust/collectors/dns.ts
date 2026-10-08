import { promises as dns } from "dns";
import type { TrustSignal } from "@/lib/trust/types";
import type { DomainParts } from "@/lib/trust/domain-parts";

const resolver = new dns.Resolver({ timeout: 3000, tries: 2 });
resolver.setServers(["1.1.1.1", "8.8.8.8"]);

const SOURCE = "DNS · Cloudflare 1.1.1.1 / Google 8.8.8.8";

type Lookup<T> = { value: T; failed: boolean };

async function lookup<T>(fn: () => Promise<T>, empty: T): Promise<Lookup<T>> {
  try {
    return { value: await fn(), failed: false };
  } catch (err) {
    const code = (err as { code?: string }).code;
    const noRecord = code === "ENOTFOUND" || code === "ENODATA";
    return { value: empty, failed: !noRecord };
  }
}

async function addresses(host: string) {
  const [a, aaaa] = await Promise.all([
    lookup(() => resolver.resolve4(host), [] as string[]),
    lookup(() => resolver.resolve6(host), [] as string[]),
  ]);
  return { a: a.value, aaaa: aaaa.value, failed: a.failed && aaaa.failed };
}

export async function collectDns(parts: DomainParts): Promise<TrustSignal[]> {
  const { host, registrable } = parts;
  let resolvedHost = host;
  let addr = await addresses(host);
  if (addr.a.length + addr.aaaa.length === 0 && host === registrable) {
    const www = await addresses(`www.${host}`);
    if (www.a.length + www.aaaa.length > 0) {
      addr = www;
      resolvedHost = `www.${host}`;
    }
  }

  const [mx, txt, dmarc] = await Promise.all([
    lookup(() => resolver.resolveMx(registrable), [] as { exchange: string; priority: number }[]),
    lookup(() => resolver.resolveTxt(registrable), [] as string[][]),
    lookup(() => resolver.resolveTxt(`_dmarc.${registrable}`), [] as string[][]),
  ]);

  const signals: TrustSignal[] = [];
  const count = addr.a.length + addr.aaaa.length;

  if (count === 0 && addr.failed) {
    signals.push({
      key: "dns_resolve",
      label: "DNS-resolutie",
      positive: null,
      unavailable: true,
      detail: "DNS-servers gaven geen antwoord; resolutie kon niet worden vastgesteld.",
      weight: 14,
      group: "technisch",
      delta: 0,
      source: SOURCE,
    });
  } else {
    const via = resolvedHost !== host ? ` (via ${resolvedHost})` : "";
    signals.push({
      key: "dns_resolve",
      label: "DNS-resolutie",
      positive: count > 0 ? true : false,
      detail: count > 0
        ? `Lost op naar ${addr.a.length} IPv4- en ${addr.aaaa.length} IPv6-adres(sen)${via}: ${[...addr.a, ...addr.aaaa].slice(0, 3).join(", ")}`
        : "Geen A/AAAA-records: er draait op dit moment geen website op dit domein.",
      weight: 14,
      group: "technisch",
      delta: count > 0 ? 4 : -10,
      source: SOURCE,
      raw: { a: addr.a.slice(0, 5), aaaa: addr.aaaa.slice(0, 3), host: resolvedHost },
    });
  }

  if (mx.failed && txt.failed) return signals;

  const spf = txt.value.map((p) => p.join("")).find((t) => /^v=spf1/i.test(t));
  const dmarcRecord = dmarc.value.map((p) => p.join("")).find((t) => /^v=dmarc1/i.test(t));
  const dmarcPolicy = dmarcRecord?.match(/;\s*p=(\w+)/i)?.[1]?.toLowerCase() ?? null;
  const nullMx = mx.value.length === 1 && mx.value[0]!.exchange === "";
  const hasMx = mx.value.length > 0 && !nullMx;

  const facts = [
    hasMx ? `MX: ${mx.value.slice(0, 2).map((m) => m.exchange).join(", ")}` : nullMx ? "verstuurt bewust geen mail (null MX)" : "geen MX",
    spf ? "SPF aanwezig" : "geen SPF",
    dmarcRecord ? `DMARC p=${dmarcPolicy ?? "?"}` : "geen DMARC",
  ];

  let positive: boolean | null = null;
  let delta = 0;
  if (hasMx && spf && dmarcPolicy && dmarcPolicy !== "none") {
    positive = true;
    delta = 5;
  } else if (hasMx && spf && dmarcRecord) {
    positive = true;
    delta = 3;
  } else if (hasMx && !spf && !dmarcRecord) {
    positive = false;
    delta = -3;
  }

  signals.push({
    key: "mail",
    label: "E-mailbeveiliging",
    positive,
    detail: `${facts.join("; ")}.${positive === false ? " Zonder SPF/DMARC kan iedereen mail namens dit domein versturen." : ""}`,
    weight: 8,
    group: "technisch",
    delta,
    source: SOURCE,
    raw: {
      mx: mx.value.slice(0, 5).map((m) => m.exchange),
      spf: Boolean(spf),
      dmarcPolicy,
    },
  });

  return signals;
}
