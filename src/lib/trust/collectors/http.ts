import type { TrustSignal } from "@/lib/trust/types";
import { normalizeDomain } from "@/lib/utils";

export async function collectHttp(domain: string): Promise<TrustSignal[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    const res = await fetch(`https://${domain}`, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "AllScamsTrustBot/1.0 (+https://all-scams.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timer);

    const finalUrl = res.url || `https://${domain}`;
    let finalHost = domain;
    try {
      finalHost = normalizeDomain(new URL(finalUrl).hostname);
    } catch {
      finalHost = domain;
    }

    const redirectedAway =
      finalHost !== domain &&
      !finalHost.endsWith(`.${domain}`) &&
      !domain.endsWith(`.${finalHost}`);

    const ok = res.ok || (res.status >= 200 && res.status < 500);
    const status = res.status;
    const parts = [`HTTPS status ${status}`];
    if (redirectedAway) {
      parts.push(`redirect naar ander host: ${finalHost}`);
    } else if (finalHost !== domain) {
      parts.push(`eindigt op ${finalHost}`);
    } else {
      parts.push("geen verdachte host-redirect");
    }

    let positive: boolean | null = ok ? true : false;
    let delta = ok ? 8 : -10;
    if (redirectedAway) {
      positive = false;
      delta = -12;
    }

    return [
      {
        key: "https",
        label: "HTTPS-gedrag",
        positive,
        detail: parts.join("; "),
        weight: 12,
        group: "technisch",
        delta,
        raw: {
          status,
          finalUrl,
          finalHost,
          redirectedAway,
        },
      },
    ];
  } catch {
    clearTimeout(timer);
    return [
      {
        key: "https",
        label: "HTTPS-gedrag",
        positive: false,
        detail:
          "Geen betrouwbare HTTPS-respons (offline, timeout of geblokkeerd)",
        weight: 12,
        group: "technisch",
        delta: -10,
      },
    ];
  }
}
