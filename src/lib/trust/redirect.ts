import http from "http";
import https from "https";
import { normalizeDomain } from "@/lib/utils";
import { memo } from "@/lib/trust/cache";

/**
 * Follow redirects with lax TLS so parked/typo domains that share a
 * brand redirect cert still reveal their final host.
 */
export function resolveRedirectHost(
  domain: string,
  timeoutMs = 4500,
): Promise<string | null> {
  return memo(`redirect:${domain}`, 10 * 60 * 1000, async () => {
    const urls = [`https://${domain}/`, `http://${domain}/`];
    for (const start of urls) {
      const host = await follow(start, timeoutMs);
      if (host) return host;
    }
    return null;
  });
}

function follow(startUrl: string, timeoutMs: number): Promise<string | null> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (value: string | null) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const timer = setTimeout(() => done(null), timeoutMs);
    let hops = 0;
    const current = startUrl;

    const step = (url: string) => {
      hops += 1;
      if (hops > 8) {
        clearTimeout(timer);
        try {
          done(normalizeDomain(new URL(url).hostname));
        } catch {
          done(null);
        }
        return;
      }

      let parsed: URL;
      try {
        parsed = new URL(url);
      } catch {
        clearTimeout(timer);
        done(null);
        return;
      }

      const lib = parsed.protocol === "http:" ? http : https;
      const req = lib.request(
        {
          protocol: parsed.protocol,
          hostname: parsed.hostname,
          port: parsed.port || (parsed.protocol === "http:" ? 80 : 443),
          path: parsed.pathname + parsed.search,
          method: "GET",
          timeout: timeoutMs,
          headers: {
            "User-Agent": "AllScamsTrustBot/1.0 (+https://all-scams.com)",
            Accept: "text/html,application/xhtml+xml",
            Host: parsed.hostname,
          },
          rejectUnauthorized: false,
        },
        (res) => {
          const status = res.statusCode ?? 0;
          const location = res.headers.location;
          res.resume();

          if (status >= 300 && status < 400 && location) {
            try {
              const next = new URL(location, url).toString();
              step(next);
              return;
            } catch {
              clearTimeout(timer);
              done(normalizeDomain(parsed.hostname));
              return;
            }
          }

          clearTimeout(timer);
          done(normalizeDomain(parsed.hostname));
        },
      );

      req.on("timeout", () => {
        req.destroy();
        clearTimeout(timer);
        done(null);
      });
      req.on("error", () => {
        clearTimeout(timer);
        done(null);
      });
      req.end();
    };

    step(current);
  });
}

/** True when `from` ultimately lands on `to` (ignoring www). */
export function hostsMatch(a: string, b: string): boolean {
  const na = normalizeDomain(a);
  const nb = normalizeDomain(b);
  return (
    na === nb ||
    na === `www.${nb}` ||
    nb === `www.${na}` ||
    na.endsWith(`.${nb}`) ||
    nb.endsWith(`.${na}`)
  );
}
