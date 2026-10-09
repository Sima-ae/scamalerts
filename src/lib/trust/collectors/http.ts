import { parse } from "tldts";
import type { TrustSignal } from "@/lib/trust/types";
import type { DomainParts } from "@/lib/trust/domain-parts";
import { resolveRedirectHost } from "@/lib/trust/redirect";

const base = { key: "https", label: "Bereikbaarheid en doorverwijzing", weight: 12, group: "technisch" as const };

export async function collectHttp(parts: DomainParts): Promise<TrustSignal[]> {
  const finalHost = await resolveRedirectHost(parts.host);

  if (!finalHost) {
    return [{
      ...base,
      positive: false,
      delta: -8,
      detail: "Geen HTTP(S)-antwoord binnen 4,5 seconden (offline, geblokkeerd of time-out).",
      source: "HTTP(S)-verzoek",
    }];
  }

  const finalRegistrable = parse(finalHost).domain ?? finalHost;
  const leaves = finalRegistrable !== parts.registrable;

  return [{
    ...base,
    positive: leaves ? null : true,
    delta: leaves ? 0 : 4,
    detail: leaves
      ? `Bereikbaar; stuurt bezoekers door naar een ander domein: ${finalHost}.`
      : `Bereikbaar; eindigt op ${finalHost} zonder doorverwijzing naar een ander domein.`,
    source: "HTTP(S)-verzoek",
    raw: { finalHost, redirectedAway: leaves },
  }];
}
