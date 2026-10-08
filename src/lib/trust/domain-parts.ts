import { domainToASCII, domainToUnicode } from "url";
import { parse } from "tldts";

export type DomainParts = {
  /** Full ASCII (punycode) hostname without www., e.g. login.paypal.com.evil.xyz */
  host: string;
  /** Unicode rendering of the host (differs from host for IDN domains) */
  unicodeHost: string;
  /** Registrable domain per the ICANN Public Suffix List, e.g. evil.xyz */
  registrable: string;
  /** Registrable domain including private PSL entries (site.blogspot.com) */
  registrablePrivate: string;
  /** Public suffix, e.g. co.uk */
  suffix: string;
  /** Registrable label without suffix (ASCII), e.g. paypal for paypal.co.uk */
  label: string;
  /** Unicode rendering of siteLabel */
  unicodeLabel: string;
  /** Subdomain part in front of the registrable domain ('' when none) */
  subdomain: string;
  /** Site label when private PSL entries count (paypal-login for paypal-login.vercel.app) */
  siteLabel: string;
  /** Subdomain in front of registrablePrivate */
  siteSubdomain: string;
  /** Hosted under a shared platform suffix (vercel.app, blogspot.com, …) */
  onPlatform: boolean;
  isIdn: boolean;
};

const HOST_RE = /^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9-]{2,63}$/;

/**
 * Parse a user-supplied domain or URL into PSL-aware parts.
 * Returns null for input that is not a registrable public hostname.
 */
export function parseDomain(input: string): DomainParts | null {
  let value = input.trim().toLowerCase();
  if (!value) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//.test(value)) value = `http://${value}`;

  let hostname: string;
  try {
    hostname = new URL(value).hostname;
  } catch {
    return null;
  }

  hostname = hostname.replace(/\.$/, "").replace(/^www\./, "");
  const ascii = domainToASCII(hostname);
  if (!ascii || !HOST_RE.test(ascii)) return null;

  const icann = parse(ascii, { allowPrivateDomains: false });
  if (!icann.domain || !icann.publicSuffix || !icann.isIcann || icann.isIp) {
    return null;
  }
  const priv = parse(ascii, { allowPrivateDomains: true });

  const label = icann.domainWithoutSuffix ?? "";
  if (!label) return null;

  return {
    host: ascii,
    unicodeHost: domainToUnicode(ascii) || ascii,
    registrable: icann.domain,
    registrablePrivate: priv.domain ?? icann.domain,
    suffix: icann.publicSuffix,
    label,
    unicodeLabel: domainToUnicode(`${priv.domainWithoutSuffix || label}.com`).replace(/\.com$/, ""),
    subdomain: icann.subdomain ?? "",
    siteLabel: priv.domainWithoutSuffix || label,
    siteSubdomain: priv.subdomain ?? "",
    onPlatform: Boolean(priv.domain) && priv.domain !== icann.domain,
    isIdn: ascii.split(".").some((p) => p.startsWith("xn--")),
  };
}
