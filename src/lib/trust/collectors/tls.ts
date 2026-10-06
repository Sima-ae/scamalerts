import tls from "tls";
import type { TrustSignal } from "@/lib/trust/types";

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function readCertificate(domain: string, timeoutMs = 4000) {
  return new Promise<{
    valid: boolean;
    issuer: string;
    validFrom: Date;
    validTo: Date;
    authorized: boolean;
  } | null>((resolve) => {
    const socket = tls.connect(
      {
        host: domain,
        port: 443,
        servername: domain,
        rejectUnauthorized: false,
        timeout: timeoutMs,
      },
      () => {
        const cert = socket.getPeerCertificate();
        const authorized = socket.authorized;
        socket.end();
        if (!cert || !cert.valid_to) {
          resolve(null);
          return;
        }
        const issuer =
          typeof cert.issuer === "object"
            ? (cert.issuer.O as string) ||
              (cert.issuer.CN as string) ||
              "Onbekende uitgever"
            : "Onbekende uitgever";
        resolve({
          valid: true,
          issuer,
          validFrom: new Date(cert.valid_from),
          validTo: new Date(cert.valid_to),
          authorized,
        });
      },
    );

    socket.on("error", () => resolve(null));
    socket.on("timeout", () => {
      socket.destroy();
      resolve(null);
    });
    setTimeout(() => {
      socket.destroy();
      resolve(null);
    }, timeoutMs + 200);
  });
}

export async function collectTls(domain: string): Promise<TrustSignal[]> {
  const cert = await readCertificate(domain);
  if (!cert) {
    return [
      {
        key: "tls",
        label: "TLS-certificaat",
        positive: false,
        detail: "Geen TLS-certificaat ophaalbaar op poort 443",
        weight: 14,
        group: "certificaat",
        delta: -12,
      },
    ];
  }

  const now = new Date();
  const daysLeft = daysBetween(now, cert.validTo);
  const ageDays = Math.max(0, daysBetween(cert.validFrom, now));
  const lifetimeDays = Math.max(1, daysBetween(cert.validFrom, cert.validTo));
  const expired = daysLeft < 0;
  // Short total lifetime is more suspicious than a recent renewal (LE renews often).
  const unusuallyShort = lifetimeDays <= 14;

  let positive: boolean | null = true;
  let delta = 10;
  let detail = `${cert.issuer}; geldig nog ${daysLeft} dagen; looptijd ${lifetimeDays} dagen`;

  if (expired) {
    positive = false;
    delta = -20;
    detail = `${cert.issuer}; certificaat verlopen (${Math.abs(daysLeft)} dagen)`;
  } else if (!cert.authorized) {
    positive = false;
    delta = -10;
    detail = `${cert.issuer}; keten niet vertrouwd door Node; nog ${daysLeft} dagen geldig`;
  } else if (unusuallyShort) {
    positive = false;
    delta = -8;
    detail = `${cert.issuer}; ongebruikelijk korte looptijd (${lifetimeDays} dagen)`;
  } else if (daysLeft > 30 && cert.authorized) {
    positive = true;
    delta = 12;
  }

  return [
    {
      key: "tls",
      label: "TLS-certificaat",
      positive,
      detail,
      weight: 14,
      group: "certificaat",
      delta,
      raw: {
        issuer: cert.issuer,
        validFrom: cert.validFrom.toISOString(),
        validTo: cert.validTo.toISOString(),
        ageDays,
        daysLeft,
        authorized: cert.authorized,
      },
    },
  ];
}
