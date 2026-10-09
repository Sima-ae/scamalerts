export type TaxonomyParent = {
  slug: string;
  name: string;
  description: string;
  homepageTopic?: {
    title: string;
    text: string;
  };
  children: TaxonomyChild[];
};

export type TaxonomyChild = {
  slug: string;
  name: string;
  description: string;
  /** Shown in homepage marquee */
  showInTicker: boolean;
};

export const KENNISBANK_TAXONOMY: TaxonomyParent[] = [
  {
    slug: "online-winkelen",
    name: "Online winkelen",
    description:
      "Nepwebshops, valse tickets, boekingsphishing en QR-fraude bij online aankopen.",
    homepageTopic: {
      title: "Online winkelen",
      text: "Nepwebshops, te mooie kortingen en betaaltrucs herkennen vóór je afrekent.",
    },
    children: [
      {
        slug: "nepwebshops",
        name: "Nepwebshops",
        description: "Kortlevende shops die niets of namaak leveren.",
        showInTicker: true,
      },
      {
        slug: "valse-tickets",
        name: "Valse tickets",
        description: "Neppe concert-, festival- en sporttickets.",
        showInTicker: true,
      },
      {
        slug: "booking-phishing",
        name: "Booking-phishing",
        description: "Phishing na een echte reservering via verhuurplatforms.",
        showInTicker: true,
      },
      {
        slug: "quishing",
        name: "Quishing / QR-fraude",
        description: "Valse QR-codes die naar nagemaakte betaalpagina’s leiden.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "bank-phishing",
    name: "Bank en phishing",
    description:
      "Bankhelpdeskfraude, valse sms’jes, techhelpdesk en babbeltrucs rond bankpassen.",
    homepageTopic: {
      title: "Bank en betalen",
      text: "Valse sms’jes, nagebootste bankportalen en verdachte Tikkie- of iDEAL-links.",
    },
    children: [
      {
        slug: "bankhelpdesk-fraude",
        name: "Bankhelpdesk-fraude",
        description: "Nepbankmedewerkers die bellen over een ‘gehackte’ rekening.",
        showInTicker: true,
      },
      {
        slug: "bankpasfraude",
        name: "Bankpasfraude",
        description: "Trucs waarbij een bankpas of pincode wordt opgehaald.",
        showInTicker: true,
      },
      {
        slug: "phishing-sms",
        name: "Phishing-sms",
        description: "Sms’jes en links naar nagemaakte bankportalen.",
        showInTicker: true,
      },
      {
        slug: "techhelpdeskfraude",
        name: "Techhelpdeskfraude",
        description: "Microsoft- of virusmeldingen met schermdeling.",
        showInTicker: true,
      },
      {
        slug: "nepagenten",
        name: "Nepagenten",
        description: "Criminelen die zich voordoen als politie of beveiliging.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "overheid",
    name: "Belastingdienst en overheid",
    description:
      "Nabootsing van DigiD, Belastingdienst, CJIB en pakketdiensten.",
    homepageTopic: {
      title: "Overheid en DigiD",
      text: "Valse DigiD-, Belastingdienst- en overheidsberichten herkennen.",
    },
    children: [
      {
        slug: "digid-nabootsing",
        name: "DigiD-nabootsing",
        description: "Valse DigiD-berichten en nagemaakte inlogsites.",
        showInTicker: true,
      },
      {
        slug: "belastingdienst-phishing",
        name: "Belastingdienst-phishing",
        description: "Nepberichten over schuld, teruggave of beslag.",
        showInTicker: true,
      },
      {
        slug: "nepboetes",
        name: "Nepboetes",
        description: "Valse CJIB- of MijnOverheid-betaalverzoeken.",
        showInTicker: true,
      },
      {
        slug: "nep-pakketdiensten",
        name: "Nep-pakketdiensten",
        description: "Sms’jes namens PostNL, DHL of andere bezorgers.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "whatsapp-tikkie",
    name: "WhatsApp en Tikkie",
    description:
      "Familie- en vrienden-in-noodfraude, valse Tikkies en overgenomen accounts.",
    homepageTopic: {
      title: "WhatsApp en Tikkie",
      text: "Familie-noodscenario’s, valse Tikkies en verdachte betaallinks.",
    },
    children: [
      {
        slug: "tikkie-fraude",
        name: "Tikkie-fraude",
        description: "Valse Tikkie- of iDEAL-verzoeken om bankgegevens te stelen.",
        showInTicker: true,
      },
      {
        slug: "familie-en-vrienden-in-noodfraude",
        name: "Familie en vrienden in noodfraude",
        description:
          "WhatsApp-berichten van ‘familie of vrienden’ met een nieuw nummer die om geld vragen.",
        showInTicker: true,
      },
      {
        slug: "accountovername",
        name: "Accountovername",
        description: "Overgenomen WhatsApp-, Facebook- of Instagram-accounts.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "marktplaats",
    name: "Marktplaats",
    description: "Aankoop- en verkoopfraude via Marktplaats en vergelijkbare platforms.",
    homepageTopic: {
      title: "Marktplaats",
      text: "Vooruitbetaling, valse kopers en nep-bezorglinks herkennen.",
    },
    children: [
      {
        slug: "marktplaats-oplichting",
        name: "Marktplaats-oplichting",
        description: "Betalen voor een product dat nooit aankomt.",
        showInTicker: true,
      },
      {
        slug: "verkoopfraude",
        name: "Verkoopfraude",
        description: "Verkopers die via een nep-bezorg- of betaallink worden opgelicht.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "investeringen-crypto",
    name: "Investeringen en crypto",
    description:
      "Nepbeleggingen, chatgroepfraude, pump-and-dump en recovery-scams.",
    homepageTopic: {
      title: "Beleggen en crypto",
      text: "Onrealistische rendementen, verborgen voorwaarden en recovery-trucs.",
    },
    children: [
      {
        slug: "crypto-beleggingsfraude",
        name: "Crypto-beleggingsfraude",
        description: "Platforms met ‘gegarandeerd’ rendement die geld vasthouden.",
        showInTicker: true,
      },
      {
        slug: "chatgroepfraude",
        name: "Chatgroepfraude",
        description: "WhatsApp- of Telegramgroepen met nep-tips en FOMO.",
        showInTicker: true,
      },
      {
        slug: "pump-and-dump",
        name: "Pump-and-dump",
        description: "Opgepompte cryptomunten die daarna instorten.",
        showInTicker: true,
      },
      {
        slug: "recovery-scams",
        name: "Recovery-scams",
        description: "Nep-hulp om eerder gestolen geld ‘terug te halen’.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "vacatures",
    name: "Vacatures en diensten",
    description:
      "Nepbanen, verhuurfraude, malafide klusbedrijven en misleidende energiedeals.",
    homepageTopic: {
      title: "Vacatures",
      text: "Registratiekosten, nep-recruiters en aanbiedingen die te soepel klinken.",
    },
    children: [
      {
        slug: "valse-vacatures",
        name: "Valse vacatures",
        description: "Nep-thuiswerk en vacaturefraude via sms of WhatsApp.",
        showInTicker: true,
      },
      {
        slug: "verhuurfraude",
        name: "Verhuurfraude",
        description: "Betalen voor een woning die niet te huur is.",
        showInTicker: true,
      },
      {
        slug: "klusfraude",
        name: "Klusfraude",
        description: "Malafide slotenmakers en klusbedrijven met woekerfacturen.",
        showInTicker: true,
      },
      {
        slug: "thuisbatterij-fraude",
        name: "Thuisbatterij-fraude",
        description: "Misleidende telefonische verkoop van batterijen of isolatie.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "romantiek",
    name: "Romantiek en afpersing",
    description: "Datingfraude, sextortion en afpersmails met intimiderende claims.",
    homepageTopic: {
      title: "Dating en romantiek",
      text: "Emotionele druk, plotselinge geldvragen en profielen die niet kloppen.",
    },
    children: [
      {
        slug: "datingfraude",
        name: "Datingfraude",
        description: "Romance scams waarbij vertrouwen wordt opgebouwd voor geld.",
        showInTicker: true,
      },
      {
        slug: "sextortion",
        name: "Sextortion",
        description: "Afpersing met intieme of AI-gegenereerde beelden.",
        showInTicker: true,
      },
      {
        slug: "afpersmail",
        name: "Afpersmail",
        description: "Mails die beweren je webcam of wachtwoord te hebben.",
        showInTicker: true,
      },
    ],
  },
  {
    slug: "trust-score",
    name: "Hoe wordt een score bepaald",
    description:
      "Uitleg van elk Trust Score-signaal en elke bron die All Scams bij een domeincheck gebruikt.",
    homepageTopic: {
      title: "Hoe wordt een score bepaald",
      text: "DNS, TLS, leeftijd, nabootsing, dreigingslijsten en meldingen — wat we meten en waarom.",
    },
    children: [
      {
        slug: "score-uitleg",
        name: "Hoe de Trust Score werkt",
        description: "Startwaarde, plussen en minnen, hard ceilings en labels.",
        showInTicker: false,
      },
      {
        slug: "dns-en-email",
        name: "DNS en e-mail",
        description: "DNS-resolutie en e-mailbeveiliging (MX, SPF, DMARC).",
        showInTicker: true,
      },
      {
        slug: "tls-certificaat",
        name: "TLS-certificaat",
        description: "Uitgever, geldigheid en vertrouwde certificaatketen.",
        showInTicker: true,
      },
      {
        slug: "domeinleeftijd",
        name: "Domeinleeftijd",
        description: "Registratiedatum via RDAP en waarom jonge domeinen opvallen.",
        showInTicker: true,
      },
      {
        slug: "https-en-redirects",
        name: "HTTPS en redirects",
        description: "Bereikbaarheid en waar je écht uitkomt.",
        showInTicker: true,
      },
      {
        slug: "nabootsing",
        name: "Nabootsing",
        description: "Typosquats en lookalikes van merken en overheidsdiensten.",
        showInTicker: true,
      },
      {
        slug: "community-meldingen",
        name: "Community",
        description: "Gemodereerde meldingen en hun invloed op de score.",
        showInTicker: true,
      },
      {
        slug: "phishing-malwarelijsten",
        name: "Phishing- en malwarelijsten",
        description: "Cloudflare, Quad9, OpenPhish en optionele bronnen.",
        showInTicker: true,
      },
      {
        slug: "tranco-populariteit",
        name: "Populariteit (Tranco)",
        description: "Wat een hoge of lage Tranco-positie wel en niet betekent.",
        showInTicker: true,
      },
      {
        slug: "domeinregistratie",
        name: "Domeinregistratie",
        description: "RDAP/WHOIS: registrar, status en niet-geregistreerde domeinen.",
        showInTicker: false,
      },
      {
        slug: "domeinextensie",
        name: "Domeinextensie",
        description: "Risicosignalen rond bepaalde TLD’s.",
        showInTicker: false,
      },
      {
        slug: "domeinnaam-opbouw",
        name: "Opbouw domeinnaam",
        description: "Hyphens, lengte en verdachte patronen in de naam.",
        showInTicker: false,
      },
      {
        slug: "idn-tekens",
        name: "Internationale tekens",
        description: "IDN en lookalike-characters in domeinnamen.",
        showInTicker: false,
      },
      {
        slug: "bronnen-en-methode",
        name: "Bronnen en methode",
        description: "Wat ‘Geraadpleegd’, ‘Niet bereikbaar’ en ‘Niet ingeschakeld’ betekenen.",
        showInTicker: false,
      },
    ],
  },
];

export function allTaxonomyChildren(): (TaxonomyChild & { parentSlug: string })[] {
  return KENNISBANK_TAXONOMY.flatMap((parent) =>
    parent.children.map((child) => ({ ...child, parentSlug: parent.slug })),
  );
}

export function tickerItems(): { name: string; slug: string }[] {
  return allTaxonomyChildren()
    .filter((c) => c.showInTicker)
    .map((c) => ({ name: c.name, slug: c.slug }));
}

export function homepageTopics(): {
  slug: string;
  title: string;
  text: string;
}[] {
  return KENNISBANK_TAXONOMY.filter((p) => p.homepageTopic).map((p) => ({
    slug: p.slug,
    title: p.homepageTopic!.title,
    text: p.homepageTopic!.text,
  }));
}

export function findTaxonomyBySlug(slug: string): {
  kind: "parent" | "child";
  parent: TaxonomyParent;
  child?: TaxonomyChild;
} | null {
  for (const parent of KENNISBANK_TAXONOMY) {
    if (parent.slug === slug) return { kind: "parent", parent };
    const child = parent.children.find((c) => c.slug === slug);
    if (child) return { kind: "child", parent, child };
  }
  return null;
}
