import { BRAND_DOMAIN, BRAND_NAME, BRAND_URL } from "@/lib/brand";

export const BUSINESS_UPDATED = "9 oktober 2026";

export const businessNav = [
  { id: "waarom", label: "Waarom zakelijk" },
  { id: "voordelen", label: "Voordelen" },
  { id: "werken", label: "Hoe het werkt" },
  { id: "score", label: "Trust Score" },
  { id: "lookalikes", label: "Lookalikes" },
  { id: "voor-wie", label: "Voor wie" },
  { id: "start", label: "Aan de slag" },
  { id: "faq", label: "Veelgestelde vragen" },
  { id: "contact", label: "Contact" },
] as const;

export const businessHighlights = [
  {
    title: "Domein claimen",
    text: "Koppel jullie bedrijf aan het juiste domein en verminder verwarring met nagebootste sites.",
  },
  {
    title: "Score blijft onafhankelijk",
    text: "Claimen of zichtbaarheid kopen verandert de Trust Score niet. Transparantie wel.",
  },
  {
    title: "Sneller reageren",
    text: "Wees bereikbaar wanneer iemand een melding plaatst over jullie merk of een lookalike.",
  },
  {
    title: "Echte kanalen tonen",
    text: "Help klanten herkennen hoe ze jullie officieel kunnen bereiken.",
  },
] as const;

export const businessBenefits = [
  {
    title: "Bereikbaar bij meldingen",
    text: "Reageer met context wanneer gebruikers iets melden over jullie merk, domein of een lookalike.",
  },
  {
    title: "Minder merkverwarring",
    text: "Maak duidelijk welk domein bij jullie hoort, zodat klanten nagebootste sites sneller herkennen.",
  },
  {
    title: "Professionele uitstraling",
    text: "Laat zien dat jullie misbruik serieus nemen — zonder de onafhankelijkheid van scores aan te tasten.",
  },
  {
    title: "Eén plek voor oriëntatie",
    text: "Mensen die jullie naam googlen of een verdachte link checken, vinden sneller betrouwbare context.",
  },
] as const;

export const businessSteps = [
  {
    title: "Account aanmaken",
    text: "Maak een account aan waarmee je zakelijke claims kunt indienen en beheren.",
  },
  {
    title: "Domein claimen",
    text: "Dien een claim in met bedrijfsnaam, contact en optioneel bewijs (KvK, website, etc.).",
  },
  {
    title: "Beoordeling",
    text: "We bekijken de claim om te verifiëren dat jullie rechtmatig bij het domein horen.",
  },
  {
    title: "Context geven",
    text: "Wees bereikbaar bij meldingen en help gebruikers jullie echte kanalen te herkennen.",
  },
] as const;

export const businessFaqs = [
  {
    q: "Verandert claimen onze Trust Score?",
    a: "Nee. Domeinclaimen, accreditatie of betaalde zichtbaarheid staan los van de Trust Score. Scores blijven gebaseerd op signalen, niet op betaling.",
  },
  {
    q: "Wat als iemand een lookalike van ons merk gebruikt?",
    a: "Gebruikers kunnen lookalikes melden en controleren. Met een geclaimd domein kun je sneller context geven over jullie officiële kanalen.",
  },
  {
    q: "Welk bewijs moeten we meesturen?",
    a: "Een bewijs-URL helpt, bijvoorbeeld jullie website, KvK-vermelding of een ander openbaar document dat de relatie met het domein ondersteunt.",
  },
  {
    q: "Is dit alleen voor grote merken?",
    a: "Nee. Elk bedrijf waarvan het domein of merk online wordt nagebootst of bevraagd, kan baat hebben bij een helder, geclaimd profiel.",
  },
] as const;

export const businessMeta = {
  brand: BRAND_NAME,
  domain: BRAND_DOMAIN,
  url: BRAND_URL,
  email: `zakelijk@${BRAND_DOMAIN}`,
  supportEmail: `support@${BRAND_DOMAIN}`,
  updated: BUSINESS_UPDATED,
};
