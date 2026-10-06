import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Online winkelen",
    slug: "online-winkelen",
    description: "Nepwebshops, non-delivery en betaalfraude.",
  },
  {
    name: "Bank & phishing",
    slug: "bank-phishing",
    description: "Valse bankmails, sms en spoofing van Nederlandse banken.",
  },
  {
    name: "Belastingdienst & overheid",
    slug: "overheid",
    description: "Nabootsing van Belastingdienst, DigiD of gemeenten.",
  },
  {
    name: "WhatsApp & Tikkie",
    slug: "whatsapp-tikkie",
    description: "Familie-noodscenario’s, valse Tikkies en iDEAL-links.",
  },
  {
    name: "Marktplaats",
    slug: "marktplaats",
    description: "Vooruitbetaling, valse kopers en pakketscams.",
  },
  {
    name: "Investeringen & crypto",
    slug: "investeringen-crypto",
    description: "Nepbeleggingen, recovery-scams en valse brokers.",
  },
  {
    name: "Vacatures",
    slug: "vacatures",
    description: "Nepbanen, registratiekosten en identiteitsfraude.",
  },
  {
    name: "Romantiek",
    slug: "romantiek",
    description: "Romance scams en catfishing voor financieel gewin.",
  },
];

const articles = [
  {
    slug: "herken-belastingdienst-phishing",
    title: "Belastingdienst-phishing herkennen in 2026",
    excerpt:
      "Hoe je valse sms’jes en e-mails ontmaskert die zich voordoen als de Belastingdienst — en wat je wél mag verwachten van echte berichten.",
    categorySlug: "overheid",
    content: `## Waarom dit zo vaak werkt

Scammers lenen de autoriteit van de Belastingdienst. Ze creëren spoed: een teruggave die “vervalt”, een boete, of een DigiD die “geblokkeerd” zou zijn. Die druk zorgt ervoor dat mensen klikken vóórdat ze nadenken.

## Signalen om op te letten

- Links die niet eindigen op belastingdienst.nl
- Verzoeken om te betalen via Tikkie, giftcards of crypto
- Dreigementen met directe beslaglegging zonder duidelijk dossiernummer
- Generieke begroetingen of opvallend slordige taal
- Bijlagen of QR-codes die je naar een inlogpagina sturen

## Wat je beter wél doet

1. Open geen link uit het bericht
2. Ga zelf naar belastingdienst.nl via je browser of de officiële app
3. Meld het via All Scams en via Fraudehelpdesk
4. Doe aangifte bij de politie als er geld of gegevens zijn weggelekt`,
  },
  {
    slug: "nepwebshops-en-te-mooie-kortingen",
    title: "Nepwebshops herkennen vóór je afrekent",
    excerpt:
      "Onrealistische kortingen, vage contactgegevens en rare betaalroutes: zo spot je een nepshop voordat het geld weg is.",
    categorySlug: "online-winkelen",
    content: `## Het klassieke plaatje

Een webshop belooft merkkleding of elektronica met een korting die te mooi is om waar te zijn. De site ziet er strak uit, reviews staan erbij, en afrekenen lijkt vertrouwd — tot levering uitblijft of de klantenservice verdwijnt.

## Rode vlaggen

- Domein is net geregistreerd of lijkt op een bekende shop met een typfout
- Alleen vooruitbetaling via persoonlijke Tikkie, crypto of giftcards
- Geen KvK, geen fysiek adres, of een adres dat niet klopt
- Reviews die allemaal dezelfde toon hebben
- Retourbeleid ontbreekt of is onmogelijk streng

## Voor je betaalt

Check het domein op All Scams, zoek naar onafhankelijke ervaringen en wantrouw “nu of nooit”-druk. Bij twijfel: niet betalen en elders bestellen.`,
  },
  {
    slug: "whatsapp-familie-en-valse-tikkies",
    title: "WhatsApp-familie-scams en valse Tikkies",
    excerpt:
      "Een bericht van ‘mama’ of ‘je kind’ met spoed en een betaallink. Zo herken je de truc en bescherm je je contacten.",
    categorySlug: "whatsapp-tikkie",
    content: `## Hoe de truc werkt

Iemand kaapt of nabootst een WhatsApp-account en speelt een familielid in nood. Er is haast, schaamte of geheimhouding (“vertel het papa niet”). Daarna volgt een Tikkie of iDEAL-link.

## Wat je kunt checken

- Bel of app het familielid via een ander kanaal
- Let op afwijkende schrijfstijl of plotselinge urgentie
- Weiger betaallinks zolang je niet 100% zeker bent
- Vraag een foto of een gezamenlijke inside joke die alleen jullie kennen

## Na een betaling

Blokkeer het gesprek, bewaar screenshots, meld bij je bank, Fraudehelpdesk en All Scams. Waarschuw familie zodat de keten stopt.`,
  },
  {
    slug: "valse-vacatures-en-registratiekosten",
    title: "Valse vacatures: wanneer een ‘baan’ om geld vraagt",
    excerpt:
      "Te mooie thuiswerkbanen, registratiefees en nep-recruiters. Zo bescherm je je gegevens én je portemonnee.",
    categorySlug: "vacatures",
    content: `## Waarom job-scams toenemen

Werkzoekenden zijn gemotiveerd en vaak bereid snel te reageren. Scammers misbruiken dat met glamoureuze functietitels, vage bedrijven en druk om “vandaag nog” te starten.

## Alarmbellen

- Je moet betalen om te solliciteren of materialen te ontvangen
- Het bedrijf is niet terug te vinden via KvK of een serieus LinkedIn-profiel
- Gesprekken verlopen alleen via chat of privémail
- Ze vragen om kopieën van ID, bankpas of DigiD zonder duidelijke reden

## Beter zo

Solliciteer via officiële kanalen, verifieer de werkgever en deel nooit betaalgegevens voor een ‘onboarding’. Twijfel? Controleer namen en domeinen op All Scams.`,
  },
  {
    slug: "investeringsbeloftes-die-te-mooi-zijn",
    title: "Investeringsbeloftes die te mooi klinken",
    excerpt:
      "Gegarandeerd rendement, pushende ‘accountmanagers’ en recovery-scams: zo blijf je uit de fuik.",
    categorySlug: "investeringen-crypto",
    content: `## Het verhaal dat ze verkopen

Hoge winst, weinig risico, en een vriendelijke coach die je helpt “instappen”. Vaak volgt druk om meer te storten. Als je wilt opnemen, verschijnen er opeens kosten of verdwijnt de support.

## Let hierop

- Gegarandeerde rendementen bestaan vrijwel nooit
- Platforms zonder duidelijke vergunning of bedrijfslocatie
- Opnames die steeds worden uitgesteld
- Mensen die je via social media “toevallig” helpen beleggen

## Als je al geld hebt overgemaakt

Stop verdere betalingen, bewaar bewijs, meld bij Fraudehelpdesk en politie. Wantrouw ook “recovery”-diensten die beloven je geld terug te halen tegen vooruitbetaling — dat is vaak een tweede scam.`,
  },
  {
    slug: "marktplaats-vooruitbetaling-trucs",
    title: "Marktplaats-trucs: vooruitbetaling en valse kopers",
    excerpt:
      "Te snelle deals, betaalverzoeken buiten het platform en ‘bezorgers’ die geld vragen. Praktische checks voor kopers en verkopers.",
    categorySlug: "marktplaats",
    content: `## Populaire scenario’s

Kopers die te graag vooruitbetalen via een rare link, verkopers die alleen via Tikkie willen afrekenen, of ‘PostNL’-berichten over een toeslag vóór levering.

## Simpele regels

- Houd betaling en communicatie waar mogelijk binnen het platform
- Wantrouw druk om buiten Marktplaats om verder te gaan
- Check of het betaalverzoek echt bij het juiste bedrijf hoort
- Bij ophalen: afspreken op een openbare plek

Meld verdachte accounts en domeinen ook op All Scams, zodat anderen sneller dezelfde truc herkennen.`,
  },
];

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  const passwordHash = await bcrypt.hash("AdminAllScams2026!", 12);
  await prisma.user.upsert({
    where: { email: "admin@all-scams.com" },
    update: { role: Role.ADMIN, passwordHash, name: "Beheerder" },
    create: {
      email: "admin@all-scams.com",
      name: "Beheerder",
      role: Role.ADMIN,
      passwordHash,
      emailVerified: new Date(),
    },
  });

  const shopping = await prisma.category.findUnique({
    where: { slug: "online-winkelen" },
  });
  const phishing = await prisma.category.findUnique({
    where: { slug: "bank-phishing" },
  });
  const jobs = await prisma.category.findUnique({
    where: { slug: "vacatures" },
  });

  const domains = [
    {
      domain: "voorbeeld-webshop.shop",
      trustScore: 18,
      trustLabel: "HIGH_RISK" as const,
    },
    {
      domain: "veiligvoorbeeld.nl",
      trustScore: 84,
      trustLabel: "VERY_LIKELY_SAFE" as const,
    },
    {
      domain: "snelthuiswerk-vacature.online",
      trustScore: 24,
      trustLabel: "HIGH_RISK" as const,
    },
  ];

  for (const d of domains) {
    await prisma.domainProfile.upsert({
      where: { domain: d.domain },
      update: d,
      create: {
        ...d,
        signals: { seeded: true },
      },
    });
  }

  const risky = await prisma.domainProfile.findUnique({
    where: { domain: "voorbeeld-webshop.shop" },
  });
  const jobDomain = await prisma.domainProfile.findUnique({
    where: { domain: "snelthuiswerk-vacature.online" },
  });

  if (risky && shopping) {
    const existing = await prisma.scamReport.findFirst({
      where: { title: "Nepwebshop vroeg vooruitbetaling via Tikkie" },
    });
    if (!existing) {
      await prisma.scamReport.create({
        data: {
          title: "Nepwebshop vroeg vooruitbetaling via Tikkie",
          description:
            "De webshop beloofde stevige korting op elektronica. Na betaling via een persoonlijke Tikkie bleef levering uit en verdween de klantenservice.",
          channel: "Website",
          status: "APPROVED",
          publishedAt: new Date(),
          reporterName: "Anoniem",
          domainId: risky.id,
          categoryId: shopping.id,
          identifierType: "domain",
          identifierValue: risky.domain,
        },
      });
    }
  }

  if (phishing) {
    const bankExisting = await prisma.scamReport.findFirst({
      where: { title: "Sms over geblokkeerde bankpas bleek vals" },
    });
    if (!bankExisting) {
      await prisma.scamReport.create({
        data: {
          title: "Sms over geblokkeerde bankpas bleek vals",
          description:
            "Er kwam een sms over een geblokkeerde pas met een link naar een nagebootste inlogpagina. De URL week af van de echte bank. Geen geld verloren dankzij snelle check.",
          channel: "Sms",
          status: "APPROVED",
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          reporterName: "Anoniem",
          categoryId: phishing.id,
          identifierType: "other",
          identifierValue: "sms-phishing",
        },
      });
    }
  }

  if (jobDomain && jobs) {
    const jobExisting = await prisma.scamReport.findFirst({
      where: { title: "Thuiswerkvacature vroeg registratiekosten" },
    });
    if (!jobExisting) {
      await prisma.scamReport.create({
        data: {
          title: "Thuiswerkvacature vroeg registratiekosten",
          description:
            "Een ‘remote assistant’-vacature beloofde een hoog uurloon, maar vroeg eerst een registratiebedrag en een kopie van een ID-bewijs. Geen serieus bedrijf te vinden.",
          channel: "Website",
          status: "APPROVED",
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
          reporterName: "Anoniem",
          domainId: jobDomain.id,
          categoryId: jobs.id,
          identifierType: "domain",
          identifierValue: jobDomain.domain,
        },
      });
    }
  }

  for (const article of articles) {
    const category = await prisma.category.findUnique({
      where: { slug: article.categorySlug },
    });
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        status: "PUBLISHED",
        publishedAt: new Date(),
        categoryId: category?.id,
      },
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        status: "PUBLISHED",
        publishedAt: new Date(),
        categoryId: category?.id,
      },
    });
  }

  await prisma.siteSetting.upsert({
    where: { key: "site" },
    update: {
      value: {
        name: "All Scams",
        domain: "all-scams.com",
        locale: "nl-NL",
      },
    },
    create: {
      key: "site",
      value: {
        name: "All Scams",
        domain: "all-scams.com",
        locale: "nl-NL",
      },
    },
  });

  console.log("Seed voltooid: categorieën, admin, meldingen, artikelen.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
