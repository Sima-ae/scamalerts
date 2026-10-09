import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import { AnimatedItem } from "@/components/ui/animated-section";
import { CategoryCard } from "@/components/kennisbank/category-card";
import { GuideCard } from "@/components/kennisbank/guide-card";
import { SubcategoryChips } from "@/components/kennisbank/subcategory-chips";
import {
  KennisbankSearch,
  type KennisbankSearchItem,
} from "@/components/kennisbank/kennisbank-search";
import {
  KENNISBANK_TAXONOMY,
  findTaxonomyBySlug,
} from "@/content/kennisbank/taxonomy";

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kennisbank",
  description:
    "Praktische gidsen van All Scams over Nederlandse scams en hoe de Trust Score wordt bepaald: rode vlaggen, voorbeelden en wat je kunt doen.",
};

export default async function KennisbankPage({
  searchParams,
}: {
  searchParams: Promise<{ onderwerp?: string }>;
}) {
  const sp = await searchParams;
  const filter = sp.onderwerp ? findTaxonomyBySlug(sp.onderwerp) : null;

  const categories = await prisma.category
    .findMany({
      include: {
        children: true,
        parent: true,
        _count: { select: { articles: { where: { status: "PUBLISHED" } } } },
      },
    })
    .catch(() => []);

  const bySlug = new Map(categories.map((c) => [c.slug, c]));

  const articleWhere = filter
    ? filter.kind === "parent"
      ? {
          status: "PUBLISHED" as const,
          OR: [
            { category: { slug: filter.parent.slug } },
            { category: { parent: { slug: filter.parent.slug } } },
          ],
        }
      : {
          status: "PUBLISHED" as const,
          category: { slug: filter.child!.slug },
        }
    : { status: "PUBLISHED" as const };

  const [articles, allArticles] = await Promise.all([
    prisma.article
      .findMany({
        where: articleWhere,
        include: {
          category: { include: { parent: true } },
        },
        orderBy: { publishedAt: "desc" },
        ...(filter ? {} : { take: 6 }),
      })
      .catch(() => []),
    prisma.article
      .findMany({
        where: { status: "PUBLISHED" },
        select: {
          slug: true,
          title: true,
          excerpt: true,
          content: true,
          category: {
            select: {
              name: true,
              parent: { select: { name: true } },
            },
          },
        },
        orderBy: { publishedAt: "desc" },
      })
      .catch(() => []),
  ]);

  const searchArticles: KennisbankSearchItem[] = allArticles.map((article) => {
    const categoryName = article.category?.name ?? null;
    const parentName = article.category?.parent?.name ?? null;
    return {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      categoryName,
      parentName,
      haystack: normalizeSearchText(
        [
          article.title,
          article.excerpt ?? "",
          article.content,
          categoryName ?? "",
          parentName ?? "",
        ].join(" "),
      ),
    };
  });

  const parentCards = KENNISBANK_TAXONOMY.map((parent) => {
    const row = bySlug.get(parent.slug);
    const childCounts = parent.children.reduce((sum, child) => {
      const childRow = bySlug.get(child.slug);
      return sum + (childRow?._count.articles ?? 0);
    }, 0);
    return {
      ...parent,
      articleCount: (row?._count.articles ?? 0) + childCounts,
      subcategoryCount: parent.children.length,
    };
  });

  return (
    <PageShell
      hero={{
        eyebrow: "Leren",
        title: "Kennisbank",
        description:
          "Gidsen over scam-vormen in Nederland en uitleg van elk Trust Score-signaal. Leer rode vlaggen herkennen en wat je kunt doen als het misgaat.",
        media: MEDIA.knowledge,
      }}
    >
      <KennisbankSearch articles={searchArticles}>
        {!filter && (
          <>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Onderwerpen
              </p>
              <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl">
                Kies een thema om te verdiepen
              </h2>
            </div>
            <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {parentCards.map((parent, i) => (
                <AnimatedItem key={parent.slug} delay={Math.min(i, 5) * 0.05}>
                  <CategoryCard
                    href={`/kennisbank?onderwerp=${parent.slug}`}
                    name={parent.name}
                    description={parent.description}
                    subcategoryCount={parent.subcategoryCount}
                    articleCount={parent.articleCount}
                  />
                </AnimatedItem>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Uitgelicht
              </p>
              <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl">
                Recente gidsen
              </h2>
            </div>
            <div className="mt-10 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article, i) => (
                <AnimatedItem key={article.id} delay={Math.min(i, 5) * 0.05}>
                  <GuideCard
                    href={`/kennisbank/${article.slug}`}
                    title={article.title}
                    excerpt={article.excerpt}
                    categoryName={article.category?.name}
                    parentName={article.category?.parent?.name}
                  />
                </AnimatedItem>
              ))}
            </div>
          </>
        )}

        {filter?.kind === "parent" && (
          <>
            <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
              <Link
                href="/kennisbank"
                className="text-sm font-semibold text-accent hover:underline"
              >
                ← Alle onderwerpen
              </Link>
              <h2 className="font-display mt-4 text-3xl text-ink md:text-4xl">
                {filter.parent.name}
              </h2>
              <p className="mt-3 text-muted">{filter.parent.description}</p>
            </div>
            <div className="mt-8">
              <SubcategoryChips
                items={filter.parent.children.map((c) => ({
                  slug: c.slug,
                  name: c.name,
                }))}
              />
            </div>
            <div className="mt-10 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article, i) => (
                <AnimatedItem key={article.id} delay={Math.min(i, 5) * 0.05}>
                  <GuideCard
                    href={`/kennisbank/${article.slug}`}
                    title={article.title}
                    excerpt={article.excerpt}
                    categoryName={article.category?.name}
                    parentName={article.category?.parent?.name}
                  />
                </AnimatedItem>
              ))}
              {articles.length === 0 && (
                <p className="text-center text-muted md:col-span-2 md:text-left xl:col-span-3">
                  Nog geen gidsen in dit onderwerp.
                </p>
              )}
            </div>
          </>
        )}

        {filter?.kind === "child" && (
          <>
            <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
              <p className="text-sm text-muted">
                <Link
                  href="/kennisbank"
                  className="font-semibold text-accent hover:underline"
                >
                  Kennisbank
                </Link>
                {" · "}
                <Link
                  href={`/kennisbank?onderwerp=${filter.parent.slug}`}
                  className="font-semibold text-accent hover:underline"
                >
                  {filter.parent.name}
                </Link>
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink md:text-4xl">
                {filter.child!.name}
              </h2>
              <p className="mt-3 text-muted">{filter.child!.description}</p>
            </div>
            <div className="mt-8">
              <SubcategoryChips
                items={filter.parent.children.map((c) => ({
                  slug: c.slug,
                  name: c.name,
                }))}
                activeSlug={filter.child!.slug}
              />
            </div>
            <div className="mt-10 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article, i) => (
                <AnimatedItem key={article.id} delay={Math.min(i, 5) * 0.05}>
                  <GuideCard
                    href={`/kennisbank/${article.slug}`}
                    title={article.title}
                    excerpt={article.excerpt}
                    categoryName={article.category?.name}
                    parentName={article.category?.parent?.name}
                  />
                </AnimatedItem>
              ))}
              {articles.length === 0 && (
                <p className="text-center text-muted md:col-span-2 md:text-left xl:col-span-3">
                  Nog geen gidsen in dit onderwerp.
                </p>
              )}
            </div>
          </>
        )}

        {sp.onderwerp && !filter && (
          <p className="text-center text-muted md:text-left">
            Onbekend onderwerp.{" "}
            <Link
              href="/kennisbank"
              className="font-semibold text-accent hover:underline"
            >
              Terug naar de kennisbank
            </Link>
          </p>
        )}
      </KennisbankSearch>
    </PageShell>
  );
}
