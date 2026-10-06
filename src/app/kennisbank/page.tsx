import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kennisbank",
  description:
    "Praktische gidsen van All Scams over Nederlandse scams: rode vlaggen, voorbeelden en wat je kunt doen na fraude.",
};

export default async function KennisbankPage({
  searchParams,
}: {
  searchParams: Promise<{ onderwerp?: string }>;
}) {
  const sp = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(sp.onderwerp ? { category: { slug: sp.onderwerp } } : {}),
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="section-shell py-14 md:py-16">
      <h1 className="font-display text-4xl text-ink md:text-5xl">Kennisbank</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Uitleg over scam-vormen die in Nederland veel voorkomen: hoe ze werken,
        welke signalen je moet zien en wat je kunt doen als het misgaat.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/kennisbank"
          className={`rounded-md px-3 py-1.5 text-sm ${
            !sp.onderwerp
              ? "bg-ink text-white"
              : "border border-line bg-white text-ink"
          }`}
        >
          Alles
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/kennisbank?onderwerp=${c.slug}`}
            className={`rounded-md px-3 py-1.5 text-sm ${
              sp.onderwerp === c.slug
                ? "bg-ink text-white"
                : "border border-line bg-white text-ink"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/kennisbank/${article.slug}`}
            className="border-t border-ink/10 pt-5 transition hover:border-accent"
          >
            <p className="text-xs text-muted">
              {article.publishedAt ? formatDateNL(article.publishedAt) : ""}
              {article.category ? ` · ${article.category.name}` : ""}
            </p>
            <h2 className="font-display mt-2 text-2xl text-ink">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
          </Link>
        ))}
        {articles.length === 0 && (
          <p className="text-muted">
            Nog geen artikelen in dit onderwerp. Bekijk alle gidsen of kom later
            terug.
          </p>
        )}
      </div>
    </div>
  );
}
