import type { TrustSignal } from "@/lib/trust/types";

type RdapEvent = { eventAction?: string; eventDate?: string };
type RdapResponse = {
  events?: RdapEvent[];
  ldhName?: string;
  errorCode?: number;
};

function daysSince(date: Date) {
  return Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function formatAge(days: number) {
  if (days < 1) return "minder dan 1 dag";
  if (days === 1) return "1 dag";
  if (days < 60) return `${days} dagen`;
  if (days < 730) return `${Math.round(days / 30)} maanden`;
  return `${Math.round(days / 365)} jaar`;
}

function pickRegistrationDate(events: RdapEvent[] | undefined): Date | null {
  if (!events?.length) return null;
  const preferred = ["registration", "registered", "last changed creation"];
  for (const action of preferred) {
    const hit = events.find(
      (e) => e.eventAction?.toLowerCase() === action && e.eventDate,
    );
    if (hit?.eventDate) {
      const d = new Date(hit.eventDate);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  const any = events.find((e) => e.eventDate);
  if (!any?.eventDate) return null;
  const d = new Date(any.eventDate);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function fetchRdap(url: string, timeoutMs = 4000): Promise<RdapResponse | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      headers: { Accept: "application/rdap+json, application/json" },
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return (await res.json()) as RdapResponse;
  } catch {
    return null;
  }
}

function rdapEndpointsFor(domain: string): string[] {
  const tld = domain.split(".").pop()?.toLowerCase() ?? "";
  const endpoints: string[] = [];
  if (tld === "nl") {
    endpoints.push(`https://rdap.sidn.nl/domain/${encodeURIComponent(domain)}`);
  }
  // IANA bootstrap / common gTLD RDAP services
  endpoints.push(`https://rdap.org/domain/${encodeURIComponent(domain)}`);
  endpoints.push(
    `https://rdap.verisign.com/com/v1/domain/${encodeURIComponent(domain)}`,
  );
  if (tld === "org") {
    endpoints.push(
      `https://rdap.publicinterestregistry.org/rdap/domain/${encodeURIComponent(domain)}`,
    );
  }
  return endpoints;
}

export async function collectRdap(domain: string): Promise<TrustSignal[]> {
  const endpoints = rdapEndpointsFor(domain);
  let data: RdapResponse | null = null;

  for (const url of endpoints) {
    data = await fetchRdap(url);
    if (data?.events?.length) break;
  }

  if (!data?.events?.length) {
    return [
      {
        key: "rdap_age",
        label: "Domeinleeftijd (RDAP)",
        positive: null,
        detail: "Registratiedatum niet beschikbaar via RDAP",
        weight: 16,
        group: "certificaat",
        delta: 0,
      },
    ];
  }

  const registeredAt = pickRegistrationDate(data.events);
  if (!registeredAt) {
    return [
      {
        key: "rdap_age",
        label: "Domeinleeftijd (RDAP)",
        positive: null,
        detail: "RDAP-antwoord zonder bruikbare registratiedatum",
        weight: 16,
        group: "certificaat",
        delta: 0,
      },
    ];
  }

  const ageDays = Math.max(0, daysSince(registeredAt));
  let positive: boolean | null = true;
  let delta = 10;
  let detail = `Geregistreerd ${formatAge(ageDays)} geleden (${registeredAt.toISOString().slice(0, 10)})`;

  if (ageDays <= 7) {
    positive = false;
    delta = -22;
    detail = `Zeer nieuw domein — geregistreerd ${formatAge(ageDays)} geleden (${registeredAt.toISOString().slice(0, 10)})`;
  } else if (ageDays <= 30) {
    positive = false;
    delta = -14;
    detail = `Jong domein — geregistreerd ${formatAge(ageDays)} geleden (${registeredAt.toISOString().slice(0, 10)})`;
  } else if (ageDays <= 180) {
    positive = null;
    delta = -4;
  } else if (ageDays >= 365 * 3) {
    positive = true;
    delta = 14;
  }

  return [
    {
      key: "rdap_age",
      label: "Domeinleeftijd (RDAP)",
      positive,
      detail,
      weight: 16,
      group: "certificaat",
      delta,
      raw: {
        registeredAt: registeredAt.toISOString(),
        ageDays,
      },
    },
  ];
}
