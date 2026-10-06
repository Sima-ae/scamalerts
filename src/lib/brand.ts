export const BRAND_NAME = "All Scams";
export const BRAND_DOMAIN = "all-scams.com";
export const BRAND_URL = `https://${BRAND_DOMAIN}`;

export function copyrightLine(year = new Date().getFullYear()) {
  return `${BRAND_NAME} © ${year}`;
}
