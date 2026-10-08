import tls from "tls";
import type { TrustSignal } from "@/lib/trust/types";
import type { DomainParts } from "@/lib/trust/domain-parts";
import { memo } from "@/lib/trust/cache";

export type Cert = {
  host: string;
  issuer: string;
  /** Organisation in the certificate subject (only on CA-validated OV/EV certs) */
  subjectOrg: string | null;
  san: string[];
  validFrom: Date;
  validTo: Date;
  authorized: boolean;
  error: string | null;
};

const ERROR_NL: Record<string, string> = {
  ERR_TLS_CERT_ALTNAME_INVALID: "certificaat is uitgegeven voor een andere domeinnaam",
  DEPTH_ZERO_SELF_SIGNED_CERT: "zelfondertekend certificaat",
  SELF_SIGNED_CERT_IN_CHAIN: "zelfondertekend certificaat in de keten",
  CERT_HAS_EXPIRED: "certificaat is verlopen",
  UNABLE_TO_VERIFY_LEAF_SIGNATURE: "keten kan niet worden geverifieerd",
  UNABLE_TO_GET_ISSUER_CERT_LOCALLY: "uitgever onbekend bij vertrouwde CA's",
  CERT_NOT_YET_VALID: "certificaat is nog niet geldig",
};

function readCertificate(host: string, timeoutMs = 5000): Promise<Cert | null> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (v: Cert | null) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      socket.destroy();
      resolve(v);
    };
    const timer = setTimeout(() => finish(null), timeoutMs + 300);
    const socket = tls.connect(
      { host, port: 443, servername: host, rejectUnauthorized: false, timeout: timeoutMs },
      () => {
        const cert = socket.getPeerCertificate();
        if (!cert || !cert.valid_to) return finish(null);
        const issuer =
          (typeof cert.issuer === "object" && ((cert.issuer.O as string) || (cert.issuer.CN as string))) ||
          "onbekende uitgever";
        const subjectOrg =
          typeof cert.subject === "object" && typeof cert.subject.O === "string" ? cert.subject.O : null;
        const san = (cert.subjectaltname ?? "")
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e.startsWith("DNS:"))
          .map((e) => e.slice(4).toLowerCase());
        finish({
          host,
          issuer,
          subjectOrg,
          san,
          validFrom: new Date(cert.valid_from),
          validTo: new Date(cert.valid_to),
          authorized: socket.authorized,
          error: socket.authorized ? null : String(socket.authorizationError ?? "UNKNOWN"),
        });
      },
    );
    socket.on("error", () => finish(null));
    socket.on("timeout", () => finish(null));
  });
}

export function getCertificate(host: string): Promise<Cert | null> {
  return memo(`tls:${host}`, 10 * 60 * 1000, () => readCertificate(host));
}

const base = { key: "tls", label: "TLS-certificaat", weight: 14, group: "certificaat" as const };

export async function collectTls(parts: DomainParts): Promise<TrustSignal[]> {
  let cert = await getCertificate(parts.host);
  if ((!cert || !cert.authorized) && parts.host === parts.registrable) {
    const www = await getCertificate(`www.${parts.host}`);
    if (www && (!cert || www.authorized)) cert = www;
  }

  if (!cert) {
    return [{
      ...base,
      positive: false,
      delta: -10,
      detail: "Geen HTTPS-certificaat bereikbaar op poort 443. Gegevens naar deze site gaan onversleuteld.",
      source: "TLS-handshake (poort 443)",
    }];
  }

  const daysLeft = Math.floor((cert.validTo.getTime() - Date.now()) / 86_400_000);
  const issuedDaysAgo = Math.max(0, Math.floor((Date.now() - cert.validFrom.getTime()) / 86_400_000));
  const via = cert.host !== parts.host ? ` (op ${cert.host})` : "";
  const raw = {
    host: cert.host,
    issuer: cert.issuer,
    validFrom: cert.validFrom.toISOString(),
    validTo: cert.validTo.toISOString(),
    daysLeft,
    authorized: cert.authorized,
    error: cert.error,
  };
  const source = `TLS-handshake · ${cert.host}:443`;

  if (!cert.authorized) {
    const reason = ERROR_NL[cert.error ?? ""] ?? `verificatie mislukt (${cert.error})`;
    return [{
      ...base,
      positive: false,
      delta: cert.error === "CERT_HAS_EXPIRED" ? -15 : -12,
      detail: `Ongeldig certificaat${via}: ${reason}. Browsers tonen hier een beveiligingswaarschuwing. Uitgever: ${cert.issuer}.`,
      source,
      raw,
    }];
  }

  return [{
    ...base,
    positive: true,
    delta: 5,
    detail: `Geldig certificaat${via} van ${cert.issuer}, uitgegeven ${issuedDaysAgo} dagen geleden, nog ${daysLeft} dagen geldig. Versleuteling zegt niets over de betrouwbaarheid van de eigenaar.`,
    source,
    raw,
  }];
}
