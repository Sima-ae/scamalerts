import { BRAND_DOMAIN, BRAND_NAME, BRAND_URL } from "@/lib/brand";

export const ABOUT_UPDATED = "9 oktober 2026";

export const aboutNav = [
  { id: "missie", label: "Missie" },
  { id: "wat-we-doen", label: "Wat we doen" },
  { id: "aanpak", label: "Onze aanpak" },
  { id: "trust-score", label: "Trust Score" },
  { id: "onafhankelijk", label: "Onafhankelijkheid" },
  { id: "voor-wie", label: "Voor wie" },
  { id: "grenzen", label: "Wat we niet zijn" },
  { id: "samenwerking", label: "Samenwerking" },
  { id: "contact", label: "Contact" },
] as const;

export const aboutHighlights = [
  {
    title: "Onafhankelijk",
    text: "Risicoscores staan los van betaalde zichtbaarheid of accreditatie.",
  },
  {
    title: "Nederlandstalig",
    text: "Duidelijke uitleg zonder paniektaal — gemaakt voor mensen in NL/BE.",
  },
  {
    title: "Signalen + context",
    text: "Technische checks, communitymeldingen en kennisbank in één plek.",
  },
  {
    title: "Oriëntatie, geen orakel",
    text: "Een hulpmiddel om sneller te twijfelen — geen officiële uitspraak.",
  },
] as const;

export const aboutPillars = [
  {
    title: "Websites controleren",
    text: "Technische en openbare signalen helpen je een domein sneller te duiden voordat je betaalt of inlogt.",
    href: "/controleren",
    cta: "Ga naar controleren",
  },
  {
    title: "Scams melden",
    text: "Deel feitelijke ervaringen zodat anderen dezelfde truc eerder herkennen.",
    href: "/melden",
    cta: "Melding plaatsen",
  },
  {
    title: "Kennisbank",
    text: "Heldere gidsen over phishing, shoppingfraude, investeringscams en hoe Trust Scores werken.",
    href: "/kennisbank",
    cta: "Bekijk alle artikelen",
  },
  {
    title: "Voor bedrijven",
    text: "Claim je domein, geef context bij meldingen en help klanten jullie echte kanalen herkennen.",
    href: "/zakelijk",
    cta: "Lees meer",
  },
] as const;

export const approachSteps = [
  {
    title: "Technische signalen",
    text: "We kijken naar openbare en technische indicatoren die risico of normaliteit kunnen duiden.",
  },
  {
    title: "Community-inzichten",
    text: "Gemodereerde meldingen voegen praktijk toe: wat mensen écht tegenkomen.",
  },
  {
    title: "Redactionele uitleg",
    text: "De kennisbank vertaalt signalen naar begrijpelijke stappen — zonder paniekzaaierij.",
  },
] as const;

export const aboutMeta = {
  brand: BRAND_NAME,
  domain: BRAND_DOMAIN,
  url: BRAND_URL,
  email: `support@${BRAND_DOMAIN}`,
  reportEmail: `report@${BRAND_DOMAIN}`,
  updated: ABOUT_UPDATED,
};
