import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { ArticleBody } from "@/components/kennisbank/article-body";
import { GuideCard } from "@/components/kennisbank/guide-card";
import { getPublishedGuide, listPublishedGuides } from "@/lib/guides";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedGuide(slug);
  if (!article) return { title: "Artikel" };
  return {
    title: article.title,
    description: article.excerpt || `${article.title} — ${BRAND_NAME}`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedGuide(slug);
  if (!article) notFound();

  const published = await listPublishedGuides();
  const related = published
    .filter(
      (item) =>
        item.slug !== article.slug &&
        (item.categorySlug === article.categorySlug ||
          (article.parentSlug && item.parentSlug === article.parentSlug)),
    )
    .slice(0, 3);
  const isTrustGuide =
    article.categorySlug === "trust-score" || article.parentSlug === "trust-score";

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
          {article.parentSlug && article.parentName && (
            <>
              {" · "}
              <Link
                href={`/kennisbank?onderwerp=${article.parentSlug}`}
                className="font-semibold text-accent hover:underline"
              >
                {article.parentName}
              </Link>
            </>
          )}
          {article.categoryName && (
            <>
              {" · "}
              <Link
                href={`/kennisbank?onderwerp=${article.categorySlug}`}
                className="font-semibold text-accent hover:underline"
              >
                {article.categoryName}
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
                categoryName={item.categoryName}
                parentName={item.parentName}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
