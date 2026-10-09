import { BRAND_DOMAIN, BRAND_NAME, BRAND_URL } from "@/lib/brand";

export const TERMS_UPDATED = "9 oktober 2026";

export const termsNav = [
  { id: "inleiding", label: "Inleiding" },
  { id: "definities", label: "Definities" },
  { id: "dienst", label: "De dienst" },
  { id: "account", label: "Account" },
  { id: "content", label: "Meldingen en content" },
  { id: "scores", label: "Trust Scores" },
  { id: "verboden", label: "Verboden gebruik" },
  { id: "ie", label: "Intellectueel eigendom" },
  { id: "aansprakelijkheid", label: "Aansprakelijkheid" },
  { id: "vrijwaring", label: "Vrijwaring" },
  { id: "privacy", label: "Privacy en cookies" },
  { id: "wijzigingen", label: "Wijzigingen" },
  { id: "recht", label: "Toepasselijk recht" },
  { id: "contact", label: "Contact" },
] as const;

export const termsHighlights = [
  {
    title: "Informatief, geen advies",
    text: "Trust Scores, artikelen en meldingen zijn hulpmiddelen. Geen juridisch advies of officiële uitspraak.",
  },
  {
    title: "Jij beslist",
    text: "Beslissingen over betalen, klikken of contact opnemen blijven altijd jouw verantwoordelijkheid.",
  },
  {
    title: "Eerlijke meldingen",
    text: "Plaats alleen feitelijke, niet-kwaadwillige content. Wij mogen misbruik weigeren of verwijderen.",
  },
  {
    title: "Veilig gebruik",
    text: "Geen scraping, spam, omzeilen van beveiliging of het schaden van anderen via het platform.",
  },
] as const;

export const termsMeta = {
  brand: BRAND_NAME,
  domain: BRAND_DOMAIN,
  url: BRAND_URL,
  email: `legal@${BRAND_DOMAIN}`,
  supportEmail: `support@${BRAND_DOMAIN}`,
  updated: TERMS_UPDATED,
};
