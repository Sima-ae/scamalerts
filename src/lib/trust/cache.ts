import { promises as fs } from "fs";
import os from "os";
import path from "path";

type Entry<T> = { value: Promise<T>; expires: number };

const store = new Map<string, Entry<unknown>>();

/**
 * Memoize an async lookup with a TTL. Concurrent callers share one
 * in-flight promise; rejected lookups are not cached.
 */
export function memo<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expires > now) return hit.value;

  const value = fn();
  store.set(key, { value, expires: now + ttlMs });
  value.catch(() => store.delete(key));

  if (store.size > 5000) {
    for (const [k, e] of store) if (e.expires <= now) store.delete(k);
  }
  return value;
}

let dirPromise: Promise<string> | null = null;

/** Writable directory for downloaded reference lists. */
export function cacheDir(): Promise<string> {
  dirPromise ??= (async () => {
    const candidates = [
      process.env.TRUST_CACHE_DIR,
      path.join(process.cwd(), ".cache", "trust"),
      path.join(os.tmpdir(), "scamalerts-trust"),
    ].filter((d): d is string => Boolean(d));
    for (const dir of candidates) {
      try {
        await fs.mkdir(dir, { recursive: true });
        await fs.access(dir, fs.constants.W_OK);
        return dir;
      } catch {
        continue;
      }
    }
    return os.tmpdir();
  })();
  return dirPromise;
}

export async function fetchWithTimeout(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = 5000, ...rest } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: {
        "User-Agent": "AllScamsTrustBot/1.0 (+https://all-scams.com)",
        ...rest.headers,
      },
    });
  } finally {
    clearTimeout(timer);
  }
}
