import { BRAND_DOMAIN, BRAND_NAME, BRAND_URL } from "@/lib/brand";

export const GUIDELINES_UPDATED = "9 oktober 2026";

export const guidelinesNav = [
  { id: "inleiding", label: "Inleiding" },
  { id: "doel", label: "Waarom dit bestaat" },
  { id: "goede-melding", label: "Een goede melding" },
  { id: "bewijs", label: "Bewijs uploaden" },
  { id: "privacy", label: "Privacy van anderen" },
  { id: "verboden", label: "Wat niet mag" },
  { id: "moderatie", label: "Moderatie" },
  { id: "takedown", label: "Onterechte content" },
  { id: "tips", label: "Praktische tips" },
  { id: "contact", label: "Contact" },
] as const;

export const guidelinesHighlights = [
  {
    title: "Feiten eerst",
    text: "Beschrijf wat er gebeurde: kanaal, tijdstip, belofte, bedrag en hoe je erop uitkwam.",
  },
  {
    title: "Geen doxing",
    text: "Focus op domeinen, methodes en openbare signalen — niet op privépersonen.",
  },
  {
    title: "Bewijs met zorg",
    text: "Upload alleen wat je mag delen en maskeer gevoelige gegevens vooraf.",
  },
  {
    title: "Respectvol",
    text: "Geen haat, dreigementen of laster. We houden het platform bruikbaar voor iedereen.",
  },
] as const;

export const goodReportChecklist = [
  {
    title: "Wat gebeurde er?",
    text: "Korte, chronologische beschrijving van het contact of de scam-poging.",
  },
  {
    title: "Via welk kanaal?",
    text: "Website, telefoon, sms, e-mail, social media, betaalverzoek of iets anders.",
  },
  {
    title: "Welke signalen?",
    text: "Domeinnaam, telefoonnummer, afzender, betaalontvanger, beloften of druktechnieken.",
  },
  {
    title: "Wat was het gevolg?",
    text: "Heb je betaald, ingelogd, gegevens gedeeld, of juist op tijd gestopt?",
  },
] as const;

export const evidenceTips = [
  "Maskeer volledige IBAN’s, creditcardnummers en wachtwoorden.",
  "Verwijder of blur persoonsgegevens van derden die niet relevant zijn.",
  "Upload geen scan of foto van een ID-bewijs, paspoort of rijbewijs.",
  "Deel alleen screenshots of bestanden waar je zelf rechten voor hebt.",
  "Houd bestanden relevant: liever één duidelijk bewijs dan twintig onduidelijke foto’s.",
] as const;

export const forbiddenItems = [
  "Lasterlijke of aantoonbaar onware beschuldigingen te goeder of kwader trouw",
  "Doxing: privéadressen, privételefoons of andere persoonsgegevens van burgers publiceren",
  "Haatzaaien, discriminatie, dreigementen of intimidatie",
  "Spam, phishing-materiaal, malware of links naar schadelijke software",
  "Illegale content of content die rechten van derden schendt",
  "Wachtwoorden, volledige betaalgegevens of kopieën van identiteitsbewijzen in openbare velden",
  "Accounts misbruiken om concurrenten of personen te belagen",
] as const;

export const guidelinesMeta = {
  brand: BRAND_NAME,
  domain: BRAND_DOMAIN,
  url: BRAND_URL,
  email: `support@${BRAND_DOMAIN}`,
  reportEmail: `report@${BRAND_DOMAIN}`,
  updated: GUIDELINES_UPDATED,
};
