import { promises as fs } from "fs";
import path from "path";
import { parse } from "tldts";
import { cacheDir, fetchWithTimeout, memo } from "@/lib/trust/cache";

/**
 * Tranco research ranking (https://tranco-list.eu): a 30-day aggregate of
 * Chrome UX Report, Cloudflare Radar, Cisco Umbrella, Majestic and Farsight.
 */

const LIST_SIZE = Number(process.env.TRANCO_LIST_SIZE) || 250_000;
/** Only sites at least this popular are treated as impersonation targets. */
export const TRANCO_TARGET_MAX_RANK = 50_000;
const REFRESH_MS = 24 * 60 * 60 * 1000;

type Meta = { listId: string; createdOn: string; size: number; fetchedAt: string };

export type TrancoList = {
  listId: string;
  createdOn: string;
  size: number;
  rank(domain: string): number | null;
  /** Best-ranked target domain (rank ≤ TRANCO_TARGET_MAX_RANK) with this label */
  byLabel(label: string): { domain: string; rank: number } | null;
};

async function readMeta(file: string): Promise<Meta | null> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as Meta;
  } catch {
    return null;
  }
}

async function download(csvFile: string, metaFile: string): Promise<Meta> {
  const latest = await fetchWithTimeout("https://tranco-list.eu/api/lists/date/latest", {
    timeoutMs: 8000,
  });
  if (!latest.ok) throw new Error(`Tranco latest: HTTP ${latest.status}`);
  const info = (await latest.json()) as { list_id?: string; created_on?: string };
  if (!info.list_id) throw new Error("Tranco latest: no list id");

  const res = await fetchWithTimeout(
    `https://tranco-list.eu/download/${info.list_id}/${LIST_SIZE}`,
    { timeoutMs: 60_000 },
  );
  if (!res.ok) throw new Error(`Tranco download: HTTP ${res.status}`);
  const body = await res.text();
  if (!/^1,[a-z0-9.-]+/.test(body)) throw new Error("Tranco download: unexpected format");

  const tmp = `${csvFile}.${process.pid}.tmp`;
  await fs.writeFile(tmp, body);
  await fs.rename(tmp, csvFile);
  const meta: Meta = {
    listId: info.list_id,
    createdOn: info.created_on ?? new Date().toISOString(),
    size: LIST_SIZE,
    fetchedAt: new Date().toISOString(),
  };
  await fs.writeFile(metaFile, JSON.stringify(meta));
  return meta;
}

async function load(): Promise<TrancoList> {
  const dir = await cacheDir();
  const csvFile = path.join(dir, "tranco.csv");
  const metaFile = path.join(dir, "tranco-meta.json");

  let meta = await readMeta(metaFile);
  const stale =
    !meta ||
    meta.size !== LIST_SIZE ||
    Date.now() - new Date(meta.fetchedAt).getTime() > REFRESH_MS;

  if (stale) {
    try {
      meta = await download(csvFile, metaFile);
    } catch (err) {
      if (!meta) throw err;
      console.warn("[trust] Tranco refresh failed, using cached list", err);
    }
  }

  const csv = await fs.readFile(csvFile, "utf8");
  const ranks = new Map<string, number>();
  const labels = new Map<string, { domain: string; rank: number }>();

  for (const line of csv.split("\n")) {
    const comma = line.indexOf(",");
    if (comma < 1) continue;
    const rank = Number(line.slice(0, comma));
    const domain = line.slice(comma + 1).trim();
    if (!rank || !domain) continue;
    ranks.set(domain, rank);
    if (rank <= TRANCO_TARGET_MAX_RANK) {
      const label = parse(domain).domainWithoutSuffix;
      if (label && !labels.has(label)) labels.set(label, { domain, rank });
    }
  }

  const m = meta!;
  return {
    listId: m.listId,
    createdOn: m.createdOn,
    size: ranks.size,
    rank: (domain) => ranks.get(domain) ?? null,
    byLabel: (label) => labels.get(label) ?? null,
  };
}

export function getTranco(): Promise<TrancoList> {
  return memo("tranco", 6 * 60 * 60 * 1000, load);
}

/** Start loading in the background so the first scan is not delayed. */
export function warmTranco(): void {
  getTranco().catch(() => undefined);
}
