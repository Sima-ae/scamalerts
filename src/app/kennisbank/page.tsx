import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kennisbank",
};

export default async function KennisbankPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
        Kennisbank
      </h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        Uitgebreide gidsen over Nederlandse scam-vormen, rode vlaggen en wat je
        kunt doen na fraude.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/kennisbank/${article.slug}`}
            className="border-t border-white/10 pt-5 transition hover:border-teal-400/40"
          >
            <p className="text-xs text-slate-500">
              {article.publishedAt ? formatDateNL(article.publishedAt) : ""}
              {article.category ? ` · ${article.category.name}` : ""}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-white">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
