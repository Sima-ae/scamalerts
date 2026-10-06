import Link from "next/link";
import { DomainSearch } from "@/components/domain-search";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { trustLabelNL } from "@/lib/trust-score";
import { ShieldCheck, Siren, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [reports, articles] = await Promise.all([
    prisma.scamReport.findMany({
      where: { status: "APPROVED" },
      include: { domain: true, category: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
    }),
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div>
      <section className="hero-glow relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-16 md:px-6 md:py-24">
          <p className="animate-rise text-xs uppercase tracking-[0.28em] text-teal-300/90">
            all-scams.com · Nederland
          </p>
          <h1 className="animate-rise font-[family-name:var(--font-display)] mt-4 max-w-3xl text-5xl leading-[1.05] text-white md:text-7xl">
            Scam Alerts
          </h1>
          <p className="animate-rise-delay mt-5 max-w-xl text-lg text-slate-300 md:text-xl">
            Controleer een website in seconden. Meld verdachte praktijken. Lees
            hoe Nederlandse scams écht werken — zonder paniek, mét context.
          </p>
          <div className="animate-rise-delay mt-10">
            <DomainSearch large />
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link
              href="/melden"
              className="rounded-md border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-rose-100 transition hover:bg-rose-500/20"
            >
              Scam melden
            </Link>
            <Link
              href="/meldingen"
              className="rounded-md border border-white/15 px-4 py-2 text-slate-200 transition hover:bg-white/5"
            >
              Bekijk meldingen
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Trust Score",
              text: "Duidelijke score op basis van technische signalen, nabootsingspatronen en meldingen.",
            },
            {
              icon: Siren,
              title: "Meldingen uit NL",
              text: "Actuele scam-rapporten over Tikkie, Marktplaats, bankphishing en nepwebshops.",
            },
            {
              icon: BookOpen,
              title: "Kennisbank",
              text: "Diepgaande gidsen en herstelstappen — meer dan dunne SEO-pagina’s.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border-t border-teal-400/30 pt-5"
            >
              <item.icon className="h-6 w-6 text-teal-300" />
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0a1724]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-teal-300/80">
                Actueel
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white md:text-4xl">
                Laatste scam-meldingen
              </h2>
            </div>
            <Link href="/meldingen" className="text-sm text-teal-300 hover:underline">
              Alles bekijken
            </Link>
          </div>
          <div className="mt-10 divide-y divide-white/10">
            {reports.length === 0 && (
              <p className="py-8 text-slate-400">
                Nog geen goedgekeurde meldingen. Wees de eerste om te melden.
              </p>
            )}
            {reports.map((report) => (
              <article key={report.id} className="grid gap-2 py-6 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-xs text-slate-500">
                    {report.publishedAt
                      ? formatDateNL(report.publishedAt)
                      : formatDateNL(report.createdAt)}
                    {report.category ? ` · ${report.category.name}` : ""}
                  </p>
                  <h3 className="mt-1 text-lg text-white">{report.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                    {report.description}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium text-teal-300">
                    {report.domain?.domain ?? report.identifierValue ?? "—"}
                  </p>
                  {report.domain && (
                    <p className="mt-1 text-slate-500">
                      {trustLabelNL(report.domain.trustLabel)}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-teal-300/80">
          Kennisbank
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white md:text-4xl">
          Leer scams herkennen
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/kennisbank/${article.slug}`}
              className="group border-t border-white/10 pt-4 transition hover:border-teal-400/50"
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl text-white group-hover:text-teal-300">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{article.excerpt}</p>
            </Link>
          ))}
          {articles.length === 0 && (
            <p className="text-slate-400">Artikelen worden binnenkort toegevoegd.</p>
          )}
        </div>
      </section>
    </div>
  );
}
