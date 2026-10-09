import { BRAND_DOMAIN, BRAND_NAME, BRAND_URL } from "@/lib/brand";

export const COOKIES_UPDATED = "9 oktober 2026";

export const cookiesNav = [
  { id: "inleiding", label: "Inleiding" },
  { id: "wat-zijn-cookies", label: "Wat zijn cookies" },
  { id: "soorten", label: "Soorten cookies" },
  { id: "gebruik", label: "Wat wij gebruiken" },
  { id: "rechtsgrond", label: "Rechtsgrond" },
  { id: "derden", label: "Derden" },
  { id: "beheer", label: "Cookies beheren" },
  { id: "bewaartermijnen", label: "Bewaartermijnen" },
  { id: "wijzigingen", label: "Wijzigingen" },
  { id: "contact", label: "Contact" },
] as const;

export const cookieCategories = [
  {
    id: "noodzakelijk",
    title: "Noodzakelijke cookies",
    summary:
      "Essentieel om in te loggen, sessies veilig te houden en basisfuncties te laten werken. Zonder deze cookies werkt het platform niet betrouwbaar.",
    examples: [
      "Sessie- en authenticatiecookies (bijvoorbeeld voor inloggen)",
      "Beveiligingstokens tegen misbruik van formulieren",
      "Technische voorkeuren die nodig zijn voor de werking van de site",
    ],
  },
  {
    id: "functioneel",
    title: "Functionele cookies",
    summary:
      "Onthouden keuzes die jouw ervaring verbeteren, zonder dat ze bedoeld zijn voor marketingtracking.",
    examples: [
      "Voorkeuren die je zelf instelt op het platform",
      "Tijdelijke status tijdens het invullen van formulieren",
      "Instellingen die helpen om herhaalde stappen te vermijden",
    ],
  },
  {
    id: "analytisch",
    title: "Analytische cookies",
    summary:
      "Helpen ons te begrijpen hoe het platform wordt gebruikt, zodat we prestaties en inhoud kunnen verbeteren. We plaatsen geen marketingcookies zonder duidelijke grondslag.",
    examples: [
      "Geaggregeerde gebruiksstatistieken (alleen indien actief)",
      "Fout- en prestatiemetingen om storingen sneller te herkennen",
      "Geen advertentieprofilering voor derden via All Scams",
    ],
  },
] as const;

export const cookiesHighlights = [
  {
    title: "Transparant",
    text: "We leggen uit welke cookies of vergelijkbare technieken we gebruiken en waarom.",
  },
  {
    title: "Minimaal",
    text: "We beperken ons tot wat nodig is voor veiligheid, functionaliteit en verbetering van de dienst.",
  },
  {
    title: "Jouw controle",
    text: "Via je browser kun je cookies blokkeren of wissen. Sommige functies werken dan mogelijk beperkt.",
  },
  {
    title: "Privacy first",
    text: "Cookiegebruik sluit aan bij onze privacyverklaring en de AVG/GDPR.",
  },
] as const;

export const cookiesMeta = {
  brand: BRAND_NAME,
  domain: BRAND_DOMAIN,
  url: BRAND_URL,
  email: `privacy@${BRAND_DOMAIN}`,
  updated: COOKIES_UPDATED,
};
