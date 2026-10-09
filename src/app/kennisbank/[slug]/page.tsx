import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { ArticleBody } from "@/components/kennisbank/article-body";
import { GuideCard } from "@/components/kennisbank/guide-card";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || article.status !== "PUBLISHED") {
    return { title: "Artikel" };
  }
  return {
    title: article.title,
    description: article.excerpt ?? `${article.title} — ${BRAND_NAME}`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: { include: { parent: true } } },
  });
  if (!article || article.status !== "PUBLISHED") notFound();

  const categoryId = article.categoryId;
  const parentId = article.category?.parentId ?? article.category?.id;

  const related = categoryId
    ? await prisma.article
        .findMany({
          where: {
            status: "PUBLISHED",
            id: { not: article.id },
            OR: [
              { categoryId },
              ...(parentId
                ? [{ category: { parentId } }, { categoryId: parentId }]
                : []),
            ],
          },
          include: { category: { include: { parent: true } } },
          orderBy: { publishedAt: "desc" },
          take: 3,
        })
        .catch(() => [])
    : [];

  const isTrustGuide =
    article.category?.slug === "trust-score" ||
    article.category?.parent?.slug === "trust-score";

  return (
    <div className="relative overflow-hidden">
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
      <article className="section-shell prose-page relative z-10 mx-auto py-14 text-center md:py-16 md:text-left">
        <p className="text-sm text-muted">
          <Link
            href="/kennisbank"
            className="font-semibold text-accent hover:underline"
          >
            Kennisbank
          </Link>
          {article.category?.parent && (
            <>
              {" · "}
              <Link
                href={`/kennisbank?onderwerp=${article.category.parent.slug}`}
                className="font-semibold text-accent hover:underline"
              >
                {article.category.parent.name}
              </Link>
            </>
          )}
          {article.category && (
            <>
              {" · "}
              <Link
                href={`/kennisbank?onderwerp=${article.category.slug}`}
                className="font-semibold text-accent hover:underline"
              >
                {article.category.name}
              </Link>
            </>
          )}
        </p>
        <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
        )}
        <div className="mt-10">
          <ArticleBody content={article.content} />
        </div>

        <div className="mt-12 flex w-full flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:flex-wrap">
          {isTrustGuide ? (
            <Link href="/controleren" className="btn-primary w-full sm:w-auto">
              Probeer zelf een check
            </Link>
          ) : (
            <>
              <Link href="/melden" className="btn-primary w-full sm:w-auto">
                Scam melden
              </Link>
              <Link href="/controleren" className="btn-secondary w-full sm:w-auto">
                Domein controleren
              </Link>
            </>
          )}
          <a
            href="https://www.fraudehelpdesk.nl"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 sm:w-auto"
          >
            Fraudehelpdesk
          </a>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-shell relative z-10 pb-16">
          <h2 className="font-display text-center text-2xl text-ink md:text-left md:text-3xl">
            Gerelateerde gidsen
          </h2>
          <div className="mt-8 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <GuideCard
                key={item.id}
                href={`/kennisbank/${item.slug}`}
                title={item.title}
                excerpt={item.excerpt}
                categoryName={item.category?.name}
                parentName={item.category?.parent?.name}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
