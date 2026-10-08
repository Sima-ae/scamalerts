import net from "net";
import { fetchWithTimeout, memo } from "@/lib/trust/cache";

type RdapEvent = { eventAction?: string; eventDate?: string };
type RdapEntity = {
  roles?: string[];
  vcardArray?: [string, [string, Record<string, unknown>, string, unknown][]];
  entities?: RdapEntity[];
};
type RdapResponse = {
  events?: RdapEvent[];
  entities?: RdapEntity[];
  status?: string[];
};

export type RdapInfo =
  | {
      status: "found";
      server: string;
      registeredAt: Date | null;
      expiresAt: Date | null;
      registrar: string | null;
      domainStatus: string[];
    }
  | { status: "not_found"; server: string }
  | { status: "unavailable"; reason: string };

function bootstrap(): Promise<Map<string, string>> {
  return memo("rdap-bootstrap", 24 * 60 * 60 * 1000, async () => {
    const res = await fetchWithTimeout("https://data.iana.org/rdap/dns.json", {
      timeoutMs: 6000,
    });
    if (!res.ok) throw new Error(`IANA bootstrap HTTP ${res.status}`);
    const json = (await res.json()) as { services: [string[], string[]][] };
    const map = new Map<string, string>();
    for (const [tlds, urls] of json.services) {
      const url = urls.find((u) => u.startsWith("https://")) ?? urls[0];
      if (!url) continue;
      for (const tld of tlds) map.set(tld.toLowerCase(), url.replace(/\/?$/, "/"));
    }
    return map;
  });
}

function eventDate(events: RdapEvent[] | undefined, actions: string[]): Date | null {
  const hit = events?.find((e) => actions.includes(e.eventAction?.toLowerCase() ?? ""));
  if (!hit?.eventDate) return null;
  const d = new Date(hit.eventDate);
  return Number.isNaN(d.getTime()) ? null : d;
}

function registrarName(entities: RdapEntity[] | undefined): string | null {
  const registrar = entities?.find((e) => e.roles?.includes("registrar"));
  const fn = registrar?.vcardArray?.[1]?.find((p) => p[0] === "fn");
  return typeof fn?.[3] === "string" && fn[3].trim() ? fn[3].trim() : null;
}

async function query(registrable: string): Promise<RdapInfo> {
  const tld = registrable.split(".").pop() ?? "";
  let base: string | undefined;
  try {
    base = (await bootstrap()).get(tld);
  } catch {
    base = undefined;
  }
  const authoritative = Boolean(base);
  base ??= "https://rdap.org/";
  const url = `${base}domain/${encodeURIComponent(registrable)}`;
  const host = new URL(base).hostname;
  const server = `${host} (RDAP)`;

  let res: Response;
  try {
    res = await fetchWithTimeout(url, {
      timeoutMs: 6000,
      headers: { Accept: "application/rdap+json, application/json" },
      redirect: "follow",
    });
  } catch {
    return { status: "unavailable", reason: `${host} reageerde niet` };
  }

  if (res.status === 404 && authoritative) return { status: "not_found", server };
  if (!res.ok) return { status: "unavailable", reason: `${host} gaf HTTP ${res.status}` };

  let data: RdapResponse;
  try {
    data = (await res.json()) as RdapResponse;
  } catch {
    return { status: "unavailable", reason: `${host} gaf een ongeldig antwoord` };
  }

  return {
    status: "found",
    server,
    registeredAt: eventDate(data.events, ["registration"]),
    expiresAt: eventDate(data.events, ["expiration"]),
    registrar: registrarName(data.entities),
    domainStatus: data.status ?? [],
  };
}

const WHOIS_SERVERS: Record<string, string> = {
  nl: "whois.domain-registry.nl",
  be: "whois.dns.be",
  eu: "whois.eu",
  com: "whois.verisign-grs.com",
  net: "whois.verisign-grs.com",
  org: "whois.publicinterestregistry.org",
};

function whoisQuery(server: string, query: string, timeoutMs = 5000): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    const socket = net.connect({ host: server, port: 43 });
    socket.setTimeout(timeoutMs, () => {
      socket.destroy();
      reject(new Error("whois timeout"));
    });
    socket.on("connect", () => socket.write(`${query}\r\n`));
    socket.on("data", (chunk) => {
      data += chunk.toString("utf8");
      if (data.length > 200_000) socket.destroy();
    });
    socket.on("close", () => resolve(data));
    socket.on("error", reject);
  });
}

function parseWhoisDate(value: string): Date | null {
  const d = new Date(value.trim().replace(/^(\w{3}) (\w{3}) (\d+) (\d{4})$/, "$2 $3 $4"));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Port-43 WHOIS fallback for when the registry's RDAP service is unreachable. */
async function whoisFallback(registrable: string): Promise<RdapInfo | null> {
  const tld = registrable.split(".").pop() ?? "";
  let server: string | undefined = WHOIS_SERVERS[tld];
  try {
    if (!server) {
      const iana = await whoisQuery("whois.iana.org", tld);
      server = iana.match(/^refer:\s*(\S+)/im)?.[1];
    }
    if (!server) return null;
    const text = await whoisQuery(server, registrable);
    if (/^(no match|not found|status:\s*(free|available))|is free|no entries found|^%% not found/im.test(text)) {
      return { status: "not_found", server: `${server} (WHOIS)` };
    }
    const created = text.match(/^\s*(?:Creation Date|Created On|Created|Registered|Registration Time|Domain Registration Date)\s*:\s*(.+)$/im)?.[1];
    const expires = text.match(/^\s*(?:Registry Expiry Date|Expiration Date|Expiry Date)\s*:\s*(.+)$/im)?.[1];
    const registrar =
      text.match(/^\s*Registrar\s*:\s*(\S.*)$/im)?.[1]?.trim() ??
      text.match(/^Registrar:\s*\n\s+(.+)$/im)?.[1]?.trim() ??
      null;
    if (!created && !registrar) return null;
    return {
      status: "found",
      server: `${server} (WHOIS)`,
      registeredAt: created ? parseWhoisDate(created) : null,
      expiresAt: expires ? parseWhoisDate(expires) : null,
      registrar,
      domainStatus: [],
    };
  } catch {
    return null;
  }
}

async function queryWithFallback(registrable: string): Promise<RdapInfo> {
  const rdap = await query(registrable);
  if (rdap.status !== "unavailable" && !(rdap.status === "found" && !rdap.registeredAt)) {
    return rdap;
  }
  const whois = await whoisFallback(registrable);
  if (rdap.status === "found") {
    return whois?.status === "found" && whois.registeredAt
      ? { ...rdap, registeredAt: whois.registeredAt, server: `${rdap.server} + ${whois.server}` }
      : rdap;
  }
  return whois ?? rdap;
}

/** Registration data rarely changes; cache for a day to respect registry rate limits. */
export function lookupRdap(registrable: string): Promise<RdapInfo> {
  return memo(`rdap:${registrable}`, 24 * 60 * 60 * 1000, () => queryWithFallback(registrable));
}

export function ageInDays(date: Date): number {
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86_400_000));
}
