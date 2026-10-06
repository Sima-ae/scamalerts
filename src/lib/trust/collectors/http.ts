import type { TrustSignal } from "@/lib/trust/types";
import { hostsMatch, resolveRedirectHost } from "@/lib/trust/redirect";

export async function collectHttp(domain: string): Promise<TrustSignal[]> {
  const finalHost = await resolveRedirectHost(domain);

  if (!finalHost) {
    return [
      {
        key: "https",
        label: "HTTPS-gedrag",
        positive: false,
        detail:
          "Geen betrouwbare HTTP(S)-respons (offline, timeout of geblokkeerd)",
        weight: 12,
        group: "technisch",
        delta: -10,
      },
    ];
  }

  const redirectedAway = !hostsMatch(finalHost, domain);
  const parts = ["HTTP(S) bereikbaar"];
  if (redirectedAway) {
    parts.push(`redirect naar ${finalHost}`);
  } else {
    parts.push("geen verdachte host-redirect");
  }

  // Redirect to a related brand host is informational, not automatically hostile.
  let positive: boolean | null = true;
  let delta = 8;
  if (redirectedAway) {
    positive = null;
    delta = 2;
    parts[1] = `redirect naar gerelateerde host ${finalHost}`;
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
        finalHost,
        redirectedAway,
      },
    },
  ];
}
