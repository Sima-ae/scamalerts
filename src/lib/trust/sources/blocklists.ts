import { promises as dns } from "dns";
import { parse } from "tldts";
import { fetchWithTimeout, memo } from "@/lib/trust/cache";

export type BlocklistResult = {
  name: string;
  status: "listed" | "clean" | "unavailable" | "not_configured";
  detail?: string;
};

function resolverFor(server: string) {
  const r = new dns.Resolver({ timeout: 2500, tries: 2 });
  r.setServers([server]);
  return r;
}

const cloudflareFamily = resolverFor("1.1.1.2");
const quad9Secure = resolverFor("9.9.9.9");
const quad9Unfiltered = resolverFor("9.9.9.10");

const NO_RECORD = new Set(["ENOTFOUND", "ENODATA"]);

function errCode(err: unknown): string {
  return (err as { code?: string })?.code ?? "UNKNOWN";
}

/** Cloudflare 1.1.1.2 answers 0.0.0.0 for hosts on its malware/phishing feed. */
async function checkCloudflare(host: string): Promise<BlocklistResult> {
  const name = "Cloudflare Security DNS";
  try {
    const ips = await cloudflareFamily.resolve4(host);
    return ips.includes("0.0.0.0")
      ? { name, status: "listed", detail: "geblokkeerd als malware/phishing" }
      : { name, status: "clean" };
  } catch (err) {
    if (NO_RECORD.has(errCode(err))) return { name, status: "clean" };
    return { name, status: "unavailable" };
  }
}

/** Quad9 returns NXDOMAIN for blocked hosts; confirm with its unfiltered resolver. */
async function checkQuad9(host: string): Promise<BlocklistResult> {
  const name = "Quad9 Threat Intelligence";
  try {
    await quad9Secure.resolve4(host);
    return { name, status: "clean" };
  } catch (err) {
    const code = errCode(err);
    if (code === "ENODATA") return { name, status: "clean" };
    if (code !== "ENOTFOUND") return { name, status: "unavailable" };
  }
  try {
    await quad9Unfiltered.resolve4(host);
    return { name, status: "listed", detail: "geblokkeerd door Quad9-dreigingsfeeds" };
  } catch (err) {
    if (NO_RECORD.has(errCode(err))) return { name, status: "clean" };
    return { name, status: "unavailable" };
  }
}

type PhishFeed = { hosts: Set<string>; byDomain: Map<string, number>; size: number };

function openPhishFeed(): Promise<PhishFeed> {
  return memo("openphish", 60 * 60 * 1000, async () => {
    const res = await fetchWithTimeout("https://openphish.com/feed.txt", {
      timeoutMs: 8000,
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`OpenPhish HTTP ${res.status}`);
    const hosts = new Set<string>();
    const byDomain = new Map<string, number>();
    let size = 0;
    for (const line of (await res.text()).split("\n")) {
      const url = line.trim();
      if (!url) continue;
      try {
        const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
        hosts.add(host);
        size++;
        const d = parse(host, { allowPrivateDomains: true }).domain;
        if (d) byDomain.set(d, (byDomain.get(d) ?? 0) + 1);
      } catch {
        continue;
      }
    }
    return { hosts, byDomain, size };
  });
}

/**
 * Exact host match always counts. A match on the registrable domain only
 * counts for non-popular domains, so phishing pages hosted on large shared
 * platforms do not flag the platform itself.
 */
async function checkOpenPhish(
  host: string,
  registrablePrivate: string,
  popular: boolean,
): Promise<BlocklistResult> {
  const name = "OpenPhish";
  let feed: PhishFeed;
  try {
    feed = await openPhishFeed();
  } catch {
    return { name, status: "unavailable" };
  }
  if (feed.hosts.has(host)) {
    return { name, status: "listed", detail: "staat in de actuele phishingfeed" };
  }
  const count = feed.byDomain.get(registrablePrivate) ?? 0;
  if (count > 0 && !popular) {
    return {
      name,
      status: "listed",
      detail: `${count} actuele phishing-URL${count === 1 ? "" : "'s"} op dit domein`,
    };
  }
  return { name, status: "clean", detail: `${feed.size} actuele URL's vergeleken` };
}

async function checkSafeBrowsing(host: string): Promise<BlocklistResult> {
  const name = "Google Safe Browsing";
  const key = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  if (!key) return { name, status: "not_configured" };
  try {
    const res = await fetchWithTimeout(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        timeoutMs: 5000,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: { clientId: "all-scams", clientVersion: "1.0" },
          threatInfo: {
            threatTypes: [
              "MALWARE",
              "SOCIAL_ENGINEERING",
              "UNWANTED_SOFTWARE",
              "POTENTIALLY_HARMFUL_APPLICATION",
            ],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: `http://${host}/` }, { url: `https://${host}/` }],
          },
        }),
      },
    );
    if (!res.ok) return { name, status: "unavailable" };
    const json = (await res.json()) as { matches?: { threatType: string }[] };
    if (json.matches?.length) {
      const types = [...new Set(json.matches.map((m) => m.threatType))];
      return { name, status: "listed", detail: types.join(", ").toLowerCase() };
    }
    return { name, status: "clean" };
  } catch {
    return { name, status: "unavailable" };
  }
}

async function checkUrlhaus(host: string): Promise<BlocklistResult> {
  const name = "abuse.ch URLhaus";
  const key = process.env.URLHAUS_AUTH_KEY;
  if (!key) return { name, status: "not_configured" };
  try {
    const res = await fetchWithTimeout("https://urlhaus-api.abuse.ch/v1/host/", {
      method: "POST",
      timeoutMs: 5000,
      headers: { "Auth-Key": key, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ host }).toString(),
    });
    if (!res.ok) return { name, status: "unavailable" };
    const json = (await res.json()) as {
      query_status?: string;
      urls?: { url_status?: string }[];
    };
    if (json.query_status === "no_results") return { name, status: "clean" };
    if (json.query_status !== "ok") return { name, status: "unavailable" };
    const online = json.urls?.filter((u) => u.url_status === "online").length ?? 0;
    if (online > 0) {
      return { name, status: "listed", detail: `${online} actieve malware-URL('s)` };
    }
    return { name, status: "clean", detail: "alleen historische, offline vermeldingen" };
  } catch {
    return { name, status: "unavailable" };
  }
}

export function checkBlocklists(opts: {
  host: string;
  registrablePrivate: string;
  popular: boolean;
}): Promise<BlocklistResult[]> {
  const { host, registrablePrivate, popular } = opts;
  return Promise.all([
    checkCloudflare(host),
    checkQuad9(host),
    checkOpenPhish(host, registrablePrivate, popular),
    checkSafeBrowsing(host),
    checkUrlhaus(host),
  ]);
}

export function warmBlocklists(): void {
  openPhishFeed().catch(() => undefined);
}
