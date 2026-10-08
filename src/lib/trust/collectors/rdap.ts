import type { TrustSignal } from "@/lib/trust/types";
import type { DomainParts } from "@/lib/trust/domain-parts";
import { ageInDays, lookupRdap } from "@/lib/trust/sources/rdap";

function formatAge(days: number) {
  if (days < 1) return "minder dan 1 dag";
  if (days === 1) return "1 dag";
  if (days < 60) return `${days} dagen`;
  if (days < 730) return `${Math.round(days / 30)} maanden`;
  return `${Math.floor(days / 365)} jaar`;
}

/** Close a sentence without doubling a period from e.g. "B.V." */
function sentence(text: string): string {
  return text.endsWith(".") ? text : `${text}.`;
}

const base = {
  key: "rdap_age",
  label: "Domeinregistratie",
  weight: 16,
  group: "certificaat" as const,
};

export async function collectRdap(parts: DomainParts): Promise<TrustSignal[]> {
  if (parts.onPlatform) {
    return [{
      ...base,
      positive: null,
      delta: 0,
      detail: `Deze site draait op het gedeelde platform ${parts.registrable}. De registratiedatum van het platform zegt niets over deze specifieke site.`,
      source: "Public Suffix List",
      raw: { platform: parts.registrable },
    }];
  }

  const info = await lookupRdap(parts.registrable);

  if (info.status === "unavailable") {
    return [{
      ...base,
      positive: null,
      delta: 0,
      unavailable: true,
      detail: `Registratiegegevens konden niet worden opgehaald (${info.reason}).`,
      source: "Domeinregister (RDAP/WHOIS)",
    }];
  }

  if (info.status === "not_found") {
    return [{
      ...base,
      positive: false,
      delta: -15,
      detail: `${parts.registrable} is volgens het register niet geregistreerd. Een adres dat zich als website of afzender voordoet maar niet bestaat, is niet te vertrouwen.`,
      source: `Domeinregister · ${info.server}`,
      raw: { registered: false },
    }];
  }

  const source = `Domeinregister · ${info.server}`;
  const registrar = info.registrar ? `; registrar: ${info.registrar}` : "";
  const expires = info.expiresAt ? `; verloopt ${info.expiresAt.toISOString().slice(0, 10)}` : "";

  if (!info.registeredAt) {
    return [{
      ...base,
      positive: null,
      delta: 0,
      detail: sentence(`Het register publiceert geen registratiedatum voor dit domein${registrar}${expires}`),
      source,
      raw: { registrar: info.registrar },
    }];
  }

  const age = ageInDays(info.registeredAt);
  const date = info.registeredAt.toISOString().slice(0, 10);
  const facts = `geregistreerd op ${date} (${formatAge(age)} geleden)${registrar}${expires}`;

  let positive: boolean | null = true;
  let delta = 8;
  let detail = sentence(`Gevestigd domein: ${facts}`);
  if (age <= 7) {
    positive = false;
    delta = -25;
    detail = `${sentence(`Zeer nieuw domein: ${facts}`)} Veel fraudesites worden kort voor gebruik geregistreerd.`;
  } else if (age <= 30) {
    positive = false;
    delta = -18;
    detail = sentence(`Jong domein: ${facts}`);
  } else if (age <= 180) {
    positive = null;
    delta = -6;
    detail = sentence(`Relatief nieuw domein: ${facts}`);
  } else if (age < 365 * 2) {
    positive = true;
    delta = 4;
  } else if (age >= 365 * 5) {
    delta = 14;
  }

  return [{
    ...base,
    positive,
    delta,
    detail,
    source,
    raw: {
      registeredAt: info.registeredAt.toISOString(),
      expiresAt: info.expiresAt?.toISOString() ?? null,
      registrar: info.registrar,
      ageDays: age,
    },
  }];
}
