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
    await prisma.article.upsert({
      where: { slug: "herken-belastingdienst-phishing" },
      update: {},
      create: {
        title: "Belastingdienst-phishing herkennen in 2026",
        slug: "herken-belastingdienst-phishing",
        excerpt:
          "Leer de signalen van valse sms’jes en e-mails die zich voordoen als de Belastingdienst.",
        content: `## Waarom dit zo vaak voorkomt

Scammers misbruiken de autoriteit van de Belastingdienst. Ze creëren urgentie: een teruggave, een boete of een geblokkeerde DigiD.

## Rode vlaggen

- Links die niet eindigen op belastingdienst.nl
- Verzoek om te betalen via Tikkie, giftcards of crypto
- Dreigementen met directe beslaglegging zonder dossiernummer
- Slechte Nederlandse spelling of generieke begroetingen

## Wat te doen

1. Open nooit de link uit het bericht
2. Ga zelf naar belastingdienst.nl via je browser
3. Meld het via all-scams.com en Fraudehelpdesk
4. Doe aangifte bij de politie bij financieel verlies`,
        status: "PUBLISHED",
        publishedAt: new Date(),
        categoryId: phishing.id,
      },
    });
  }

  await prisma.siteSetting.upsert({
    where: { key: "site" },
    update: {
      value: {
        name: "Scam Alerts",
        domain: "all-scams.com",
        locale: "nl-NL",
      },
    },
    create: {
      key: "site",
      value: {
        name: "Scam Alerts",
        domain: "all-scams.com",
        locale: "nl-NL",
      },
    },
  });

  console.log("Seed voltooid: categorieën, admin, voorbeelden.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
