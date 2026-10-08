import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";

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
    include: { category: true },
  });
  if (!article || article.status !== "PUBLISHED") notFound();

  return (
    <div className="relative overflow-hidden">
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
      <article className="section-shell prose-page relative z-10 mx-auto py-14 text-center md:py-16 md:text-left">
        <p className="text-xs text-muted">
          {article.publishedAt ? formatDateNL(article.publishedAt) : ""}
          {article.category ? ` · ${article.category.name}` : ""}
        </p>
        <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
        )}
        <div className="mt-10 space-y-4 whitespace-pre-wrap text-center leading-relaxed text-ink/90 md:text-left">
          {article.content}
        </div>
        <div className="mt-12 border-t border-line pt-6 text-center md:text-left">
          <Link
            href="/kennisbank"
            className="text-sm font-semibold text-accent hover:underline"
          >
            ← Terug naar kennisbank
          </Link>
        </div>
      </article>
    </div>
  );
}
