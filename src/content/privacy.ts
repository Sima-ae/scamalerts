import { BRAND_DOMAIN, BRAND_NAME, BRAND_URL } from "@/lib/brand";

export const PRIVACY_UPDATED = "9 oktober 2026";

export const privacyNav = [
  { id: "inleiding", label: "Inleiding" },
  { id: "verantwoordelijke", label: "Verantwoordelijke" },
  { id: "gegevens", label: "Welke gegevens" },
  { id: "doelen", label: "Doeleinden" },
  { id: "grondslagen", label: "Grondslagen" },
  { id: "bewaartermijnen", label: "Bewaartermijnen" },
  { id: "delen", label: "Delen met derden" },
  { id: "rechten", label: "Jouw rechten" },
  { id: "avg", label: "AVG" },
  { id: "gdpr", label: "GDPR" },
  { id: "dora", label: "DORA" },
  { id: "nis2", label: "NIS2" },
  { id: "iso27001", label: "ISO 27001" },
  { id: "soc", label: "SOC" },
  { id: "star", label: "CSA STAR" },
  { id: "phished", label: "Phished" },
  { id: "cyber-essentials", label: "Cyber Essentials" },
  { id: "beveiliging", label: "Beveiliging" },
  { id: "contact", label: "Contact" },
] as const;

export const complianceLogos = [
  {
    id: "nis2",
    title: "NIS2 Compliant",
    src: "/logos/NIS2.svg",
    width: 62,
    height: 70,
  },
  {
    id: "gdpr",
    title: "GDPR",
    src: "/logos/GDPR.svg",
    width: 61,
    height: 72,
  },
  {
    id: "iso27001",
    title: "ISO 27001",
    src: "/logos/DQS.svg",
    width: 74,
    height: 70,
  },
  {
    id: "soc",
    title: "AICPA SOC",
    src: "/logos/AICPASOC.svg",
    width: 70,
    height: 70,
  },
  {
    id: "dora",
    title: "DORA",
    src: "/logos/DORA.svg",
    width: 69,
    height: 68,
  },
  {
    id: "assurance",
    title: "Assurance Mark",
    src: "/logos/Assurance-Mark.svg",
    width: 64,
    height: 70,
  },
  {
    id: "cyber-essentials",
    title: "Cyber Essentials Plus",
    src: "/logos/CyberEssentials.svg",
    width: 58,
    height: 70,
  },
  {
    id: "star",
    title: "CSA STAR Level One",
    src: "/logos/StarLevelOne.svg",
    width: 70,
    height: 70,
  },
] as const;

export const frameworks = [
  {
    id: "avg",
    title: "AVG",
    subtitle: "Algemene Verordening Gegevensbescherming",
    badge: "/avg-badge.svg",
    summary:
      "De Nederlandse implementatie van de Europese privacyregels. Dit is de primaire wet waarmee wij persoonsgegevens verwerken.",
    points: [
      "Rechtmatige, behoeftegedreven verwerking van persoonsgegevens",
      "Transparantie over doelen, bewaartermijnen en ontvangers",
      "Rechten van betrokkenen: inzage, correctie, verwijdering, bezwaar",
      "Dataminimalisatie: we vragen niet meer dan nodig is voor het platform",
      "Meldplicht bij ernstige datalekken via passende procedures",
    ],
  },
  {
    id: "gdpr",
    title: "GDPR",
    subtitle: "General Data Protection Regulation (EU) 2016/679",
    badge: "/logos/GDPR.svg",
    summary:
      "De GDPR is de Europese privacyverordening. De AVG is de Nederlandse uitwerking; inhoudelijk hanteren we dezelfde standaard.",
    points: [
      "Verwerking binnen de EU/EER of met passend beschermingsniveau",
      "Privacy by design en privacy by default in productkeuzes",
      "Documentatie van verwerkingen en beveiligingsmaatregelen",
      "Verwerkersovereenkomsten met relevante dienstverleners",
      "Duidelijke informatie aan gebruikers in begrijpelijke taal",
    ],
  },
  {
    id: "dora",
    title: "DORA",
    subtitle: "Digital Operational Resilience Act (EU) 2022/2554",
    badge: "/logos/DORA.svg",
    summary:
      "DORA stelt eisen aan digitale weerbaarheid van financiële entiteiten en hun ICT-keten. Wij gebruiken DORA-principes als richtlijn voor operationele weerbaarheid van {brand}.",
    points: [
      "Focus op beschikbaarheid, integriteit en herstel van digitale diensten",
      "Risicogestuurd omgaan met hosting, logging en wijzigingen",
      "Incidentbewustzijn: signaleren, indammen en leren van verstoringen",
      "Leveranciersbewustzijn bij cloud- en securitypartners",
      "Continue verbetering van monitoring en toegangsbeheer",
    ],
  },
  {
    id: "nis2",
    title: "NIS2",
    subtitle: "Network and Information Security Directive 2",
    badge: "/logos/NIS2.svg",
    summary:
      "NIS2 versterkt cybersecurity-eisen in de EU. Wij richten onze beveiligingsaanpak in lijn met NIS2-principes: risicobeheer, toegang, logging en incidentrespons.",
    points: [
      "Risicogebaseerde beveiliging van systemen en gegevens",
      "Toegangscontrole en minimale rechten voor accounts",
      "Bescherming tegen ongeautoriseerde toegang en misbruik",
      "Logging en monitoring voor misbruikdetectie op het platform",
      "Duidelijke escalatie bij beveiligingsincidenten",
    ],
  },
  {
    id: "iso27001",
    title: "ISO 27001",
    subtitle: "Information Security Management",
    badge: "/logos/DQS.svg",
    summary:
      "ISO 27001 is de internationale norm voor informatiebeveiligingsmanagement. We gebruiken dit kader als richtlijn voor beleid, risico’s en controls rondom data en systemen.",
    points: [
      "Risicogebaseerd informatiebeveiligingsbeleid",
      "Controles op toegang, logging en wijzigingen",
      "Leveranciers- en hostingafspraken met securityfocus",
      "Continue verbetering van technische en organisatorische maatregelen",
    ],
  },
  {
    id: "soc",
    title: "AICPA SOC",
    subtitle: "System and Organization Controls",
    badge: "/logos/AICPASOC.svg",
    summary:
      "SOC-rapportages (AICPA) tonen hoe serviceorganisaties controls rond security, beschikbaarheid en vertrouwelijkheid inrichten. Wij stemmen processen hier waar relevant op af.",
    points: [
      "Transparantie over controls bij dienstverlening",
      "Aandacht voor security, beschikbaarheid en vertrouwelijkheid",
      "Documentatie en aantoonbare processen",
      "Passende afspraken met infrastructuurpartners",
    ],
  },
  {
    id: "assurance",
    title: "Security assurance",
    subtitle: "Assurance mark",
    badge: "/logos/Assurance-Mark-dark.svg",
    summary:
      "Dit assurance-merk onderstreept onze inzet voor aantoonbare cybersecurity-hygiëne en onafhankelijke toetsing van basiscontrols.",
    points: [
      "Focus op aantoonbare security-basics",
      "Ondersteuning van vertrouwen bij gebruikers en partners",
      "Aansluiting op bredere compliance- en assurancekaders",
    ],
  },
  {
    id: "star",
    title: "CSA STAR Level One",
    subtitle: "Security Trust Assurance and Risk",
    badge: "/logos/StarLevelOne.svg",
    summary:
      "CSA STAR Level One (self-assessment) is een Cloud Security Alliance-kader voor transparantie over cloudsecurity. Wij gebruiken deze principes bij cloud- en platformkeuzes.",
    points: [
      "Transparantie over cloudsecurity-controls",
      "Risicobewuste keuzes bij hosting en dataopslag",
      "Aansluiting op internationale security best practices",
    ],
  },
].map((item) => ({
  ...item,
  summary: item.summary.replaceAll("{brand}", BRAND_NAME),
}));

export const partnerBlocks = [
  {
    id: "phished",
    title: "Certified Phished Partner",
    badge: "/Certified-Phished-Partner.png?v=9",
    badgeClass: "footer-partner-logo",
    href: "https://phished.io",
    linkLabel: "Meer over Phished",
    summary: `${BRAND_NAME} is Certified Phished Partner. Phished helpt organisaties phishing te herkennen en te voorkomen via awareness, training en realistische simulaties.`,
    points: [
      "Samenwerking gericht op phishing-bewustzijn en preventie",
      "Aansluiting bij diepgaande kennis over social engineering",
      "Versterking van onze educatieve content rond e-mail- en berichtenfraude",
      "Meer context voor gebruikers die verdachte berichten willen beoordelen",
    ],
  },
  {
    id: "cyber-essentials",
    title: "Cyber Essentials Plus",
    badge: "/logos/CyberEssentials.svg",
    badgeClass: "footer-cyber-badge",
    href: "https://iasme.co.uk/cyber-essentials/",
    linkLabel: "Meer over Cyber Essentials Plus",
    summary:
      "Cyber Essentials Plus is een Britse cybersecurity-certificering die basiscontroles voor organisaties toetst. Dit onderstreept onze inzet voor fundamentele digitale weerbaarheid.",
    points: [
      "Aandacht voor patchbeheer, malwarebescherming en veilige configuratie",
      "Controle op toegangsrechten en gebruikersbeheer",
      "Bescherming van grenssystemen en netwerktoegang",
      "Aantoonbare basis hygiene als onderdeel van onze security-aanpak",
    ],
  },
];

export const privacyMeta = {
  brand: BRAND_NAME,
  domain: BRAND_DOMAIN,
  url: BRAND_URL,
  email: `privacy@${BRAND_DOMAIN}`,
  updated: PRIVACY_UPDATED,
};
