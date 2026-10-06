import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <p className="text-xs text-slate-500">
        {article.publishedAt ? formatDateNL(article.publishedAt) : ""}
        {article.category ? ` · ${article.category.name}` : ""}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
        {article.title}
      </h1>
      {article.excerpt && (
        <p className="mt-4 text-lg text-slate-300">{article.excerpt}</p>
      )}
      <div className="prose-scam mt-10 space-y-4 whitespace-pre-wrap text-slate-300 leading-relaxed">
        {article.content}
      </div>
    </article>
  );
}
