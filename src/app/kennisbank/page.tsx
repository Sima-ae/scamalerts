import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import { AnimatedItem } from "@/components/ui/animated-section";

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
  }).catch(() => []);

  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(sp.onderwerp ? { category: { slug: sp.onderwerp } } : {}),
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  }).catch(() => []);

  return (
    <PageShell
      hero={{
        eyebrow: "Leren",
        title: "Kennisbank",
        description:
          "Uitleg over scam-vormen die in Nederland veel voorkomen: hoe ze werken, welke signalen je moet zien en wat je kunt doen als het misgaat.",
        media: MEDIA.knowledge,
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 md:max-w-none md:justify-start">
        <Link
          href="/kennisbank"
          className={`rounded-md px-3 py-1.5 text-sm transition ${
            !sp.onderwerp
              ? "bg-ink text-white"
              : "border border-line bg-white text-ink hover:border-ink/30"
          }`}
        >
          Alles
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/kennisbank?onderwerp=${c.slug}`}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              sp.onderwerp === c.slug
                ? "bg-ink text-white"
                : "border border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-lg gap-10 sm:max-w-none md:grid-cols-2 lg:gap-12">
        {articles.map((article, i) => (
          <AnimatedItem key={article.id} delay={Math.min(i, 5) * 0.05}>
            <Link
              href={`/kennisbank/${article.slug}`}
              className="topic-link group block text-center md:text-left"
            >
              <p className="text-xs text-muted">
                {article.publishedAt ? formatDateNL(article.publishedAt) : ""}
                {article.category ? ` · ${article.category.name}` : ""}
              </p>
              <h2 className="font-display mt-2 text-2xl text-ink transition group-hover:text-accent">
                {article.title}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted md:mx-0">
                {article.excerpt}
              </p>
            </Link>
          </AnimatedItem>
        ))}
        {articles.length === 0 && (
          <p className="text-center text-muted md:col-span-2 md:text-left">
            Geen artikelen in deze filter.
          </p>
        )}
      </div>
    </PageShell>
  );
}
