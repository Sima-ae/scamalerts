import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { KENNISBANK_TAXONOMY } from "../src/content/kennisbank/taxonomy";
import { KENNISBANK_ARTICLES } from "../src/content/kennisbank/articles";

const prisma = new PrismaClient();

async function seedTaxonomy() {
  for (const parent of KENNISBANK_TAXONOMY) {
    const parentRow = await prisma.category.upsert({
      where: { slug: parent.slug },
      update: {
        name: parent.name,
        description: parent.description,
        parentId: null,
      },
      create: {
        slug: parent.slug,
        name: parent.name,
        description: parent.description,
      },
    });

    for (const child of parent.children) {
      await prisma.category.upsert({
        where: { slug: child.slug },
        update: {
          name: child.name,
          description: child.description,
          parentId: parentRow.id,
        },
        create: {
          slug: child.slug,
          name: child.name,
          description: child.description,
          parentId: parentRow.id,
        },
      });
    }
  }
}

async function seedArticles() {
  const keepSlugs = KENNISBANK_ARTICLES.map((a) => a.slug);
  for (const article of KENNISBANK_ARTICLES) {
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
  await prisma.article.deleteMany({
    where: { slug: { notIn: keepSlugs } },
  });
}

async function main() {
  const passwordHash = await bcrypt.hash("AdminAllScams2026!", 12);
  await prisma.user.upsert({
    where: { email: "admin@all-scams.com" },
    update: { passwordHash, role: Role.ADMIN, name: "All Scams Admin" },
    create: {
      email: "admin@all-scams.com",
      name: "All Scams Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await seedTaxonomy();
  await seedArticles();

  const shopping = await prisma.category.findUnique({
    where: { slug: "nepwebshops" },
  });
  const phishing = await prisma.category.findUnique({
    where: { slug: "phishing-sms" },
  });
  const jobs = await prisma.category.findUnique({
    where: { slug: "valse-vacatures" },
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

  console.log(
    `Seed voltooid: ${KENNISBANK_TAXONOMY.length} hoofdgroepen, ${KENNISBANK_ARTICLES.length} artikelen.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
