import Link from "next/link";
import { DomainSearch } from "@/components/domain-search";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { trustLabelNL } from "@/lib/trust-score";
import { BRAND_NAME } from "@/lib/brand";
import {
  ShieldCheck,
  Megaphone,
  BookOpen,
  ShoppingBag,
  Landmark,
  Briefcase,
  Heart,
  TrendingUp,
  Clapperboard,
} from "lucide-react";

export const dynamic = "force-dynamic";

const topics = [
  {
    href: "/kennisbank?onderwerp=online-winkelen",
    icon: ShoppingBag,
    title: "Online winkelen",
    text: "Nepwebshops, te mooie kortingen en betaaltrucs herkennen vóór je afrekent.",
  },
  {
    href: "/kennisbank?onderwerp=bank-phishing",
    icon: Landmark,
    title: "Bank & betalen",
    text: "Valse sms’jes, nagebootste bankportalen en verdachte Tikkie- of iDEAL-links.",
  },
  {
    href: "/kennisbank?onderwerp=vacatures",
    icon: Briefcase,
    title: "Vacatures",
    text: "Registratiekosten, nep-recruiters en aanbiedingen die te soepel klinken.",
  },
  {
    href: "/kennisbank?onderwerp=romantiek",
    icon: Heart,
    title: "Dating & romantiek",
    text: "Emotionele druk, plotselinge geldvragen en profiles die niet kloppen.",
  },
  {
    href: "/kennisbank?onderwerp=investeringen-crypto",
    icon: TrendingUp,
    title: "Beleggen & crypto",
    text: "Onrealistische rendementen, verborgen voorwaarden en recovery-trucs.",
  },
  {
    href: "/kennisbank",
    icon: Clapperboard,
    title: "Meer onderwerpen",
    text: "Van Marktplaats tot DigiD-nabootsing: alle gidsen op één plek.",
  },
];

async function loadHomeData() {
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
  return { reports, articles };
}

export default async function HomePage() {
  const { reports, articles } = await loadHomeData().catch(() => ({
    reports: [],
    articles: [],
  }));

  return (
    <div>
      <section className="hero-plane relative min-h-[88vh]">
        <div className="section-shell relative z-10 flex min-h-[88vh] flex-col justify-center py-20 md:py-28">
          <h1 className="animate-rise font-display text-6xl leading-[0.95] tracking-tight text-white md:text-8xl">
            {BRAND_NAME}
          </h1>
          <p className="animate-rise-delay mt-6 max-w-xl text-xl font-medium text-white md:text-2xl">
            Weet je zeker dat die website te vertrouwen is?
          </p>
          <p className="animate-rise-delay mt-3 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
            Check een domein in seconden, deel wat je meemaakt en lees hoe
            Nederlandse scams écht werken.
          </p>
          <div className="animate-rise-late mt-10">
            <DomainSearch large variant="hero" />
          </div>
          <div className="animate-rise-late mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/melden" className="btn-primary">
              Scam melden
            </Link>
            <Link href="/meldingen" className="btn-secondary">
              Bekijk meldingen
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {[
            {
              icon: ShieldCheck,
              title: "Trust Score",
              text: "Een leesbare score op basis van technische signalen, nabootsingspatronen en goedgekeurde meldingen.",
            },
            {
              icon: Megaphone,
              title: "Meldingen uit NL",
              text: "Actuele rapporten over Tikkie, Marktplaats, bankphishing, nepwebshops en meer.",
            },
            {
              icon: BookOpen,
              title: "Kennisbank",
              text: "Uitleg met rode vlaggen en herstelstappen — geen dunne SEO-pagina’s, wel bruikbare context.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-ink/15 pt-5">
              <item.icon className="h-6 w-6 text-accent" />
              <h2 className="font-display mt-4 text-2xl text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="section-shell py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Actueel
              </p>
              <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl">
                Laatste scam-meldingen
              </h2>
            </div>
            <Link
              href="/meldingen"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Alles bekijken
            </Link>
          </div>

          <div className="mt-10 divide-y divide-line">
            {reports.length === 0 && (
              <p className="py-8 text-muted">
                Nog geen goedgekeurde meldingen. Wees de eerste om te melden.
              </p>
            )}
            {reports.map((report) => (
              <article
                key={report.id}
                className="grid gap-3 py-6 md:grid-cols-[1fr_auto] md:items-start"
              >
                <div>
                  <p className="text-xs text-muted">
                    {report.publishedAt
                      ? formatDateNL(report.publishedAt)
                      : formatDateNL(report.createdAt)}
                    {report.category ? ` · ${report.category.name}` : ""}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">
                    {report.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted">
                    {report.description}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm font-semibold text-ink">
                    {report.domain?.domain ?? report.identifierValue ?? "—"}
                  </p>
                  {report.domain && (
                    <p className="mt-1 text-sm text-accent">
                      {trustLabelNL(report.domain.trustLabel)}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Onderwerpen
        </p>
        <h2 className="font-display mt-2 max-w-2xl text-3xl text-ink md:text-4xl">
          Leer hoe scams in verschillende hoeken werken
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Van nepwebshops tot valse vacatures: dezelfde druktechnieken, andere
          verpakking. Kies een thema en lees de signalen.
        </p>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group border-t border-ink/15 pt-4 transition hover:border-accent"
            >
              <topic.icon className="h-5 w-5 text-ink/70 transition group-hover:text-accent" />
              <h3 className="font-display mt-3 text-xl text-ink group-hover:text-accent">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {topic.text}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="section-shell py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Kennisbank
          </p>
          <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl">
            Dieper lezen, beter herkennen
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/kennisbank/${article.slug}`}
                className="group border-t border-ink/10 pt-4 transition hover:border-accent"
              >
                <h3 className="font-display text-xl text-ink group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
              </Link>
            ))}
            {articles.length === 0 && (
              <p className="text-muted">
                Artikelen worden binnenkort toegevoegd.
              </p>
            )}
          </div>
          <div className="mt-10">
            <Link href="/kennisbank" className="btn-ink text-sm">
              Naar de kennisbank
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Bedrijf of merk? Claim je profiel
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Laat zien dat jullie bereikbaar zijn voor vragen over
              misbruik van jullie naam. Claimen verandert geen Trust Score —
              transparantie wel.
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link href="/zakelijk" className="btn-primary">
              Meer over zakelijk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
