import Link from "next/link";
import { DomainSearch } from "@/components/domain-search";
import { MediaFrame } from "@/components/ui/media-frame";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
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
  ArrowRight,
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
    <div className="w-full">
      {/* Hero — brand first, one composition, full-bleed media */}
      <section className="hero-plane relative w-full">
        <MediaFrame
          src="/media/hero-trust.jpg"
          alt=""
          priority
          overlay="ink"
          /* videoSrc="/media/hero-trust.mp4" — drop a muted loop here later */
        />
        <div className="section-shell relative z-10 flex min-h-[min(92vh,920px)] flex-col justify-center py-20 md:py-28">
          <div className="mx-auto w-full max-w-4xl text-center md:mx-0 md:max-w-3xl md:text-left">
            <h1 className="animate-rise font-display text-[clamp(3.25rem,10vw,6.5rem)] leading-[0.92] tracking-tight text-white">
              {BRAND_NAME}
            </h1>
            <p className="animate-rise-delay mx-auto mt-6 max-w-xl text-xl font-medium text-white md:mx-0 md:text-2xl">
              Weet je zeker dat die website te vertrouwen is?
            </p>
            <p className="animate-rise-delay mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/75 md:mx-0 md:text-lg">
              Check een domein in seconden, deel wat je meemaakt en lees hoe
              Nederlandse scams écht werken.
            </p>
            <div className="animate-rise-late mx-auto mt-10 max-w-2xl md:mx-0">
              <DomainSearch large variant="hero" />
            </div>
            <div className="animate-rise-late mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link href="/melden" className="btn-primary">
                Scam melden
              </Link>
              <Link href="/meldingen" className="btn-secondary">
                Bekijk meldingen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props — motion on scroll */}
      <AnimatedSection className="section-band relative py-16 md:py-24">
        <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="section-shell relative z-10">
          <div className="mx-auto grid max-w-5xl gap-12 text-center sm:grid-cols-3 sm:gap-8 sm:text-left lg:max-w-none lg:gap-14">
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
            ].map((item, i) => (
              <AnimatedItem key={item.title} delay={i * 0.08}>
                <item.icon className="mx-auto h-7 w-7 text-accent sm:mx-0" />
                <h2 className="font-display mt-4 text-2xl text-ink md:text-3xl">
                  {item.title}
                </h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted sm:mx-0 sm:max-w-none md:text-base">
                  {item.text}
                </p>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Reports */}
      <AnimatedSection className="section-band section-band--surface">
        <div className="section-shell py-16 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:mx-0 md:max-w-none md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Actueel
              </p>
              <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl lg:text-5xl">
                Laatste scam-meldingen
              </h2>
            </div>
            <Link
              href="/meldingen"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:gap-2.5"
            >
              Alles bekijken
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line md:mx-0 md:max-w-none">
            {reports.length === 0 && (
              <p className="py-10 text-center text-muted md:text-left">
                Nog geen goedgekeurde meldingen. Wees de eerste om te melden.
              </p>
            )}
            {reports.map((report, i) => (
              <AnimatedItem key={report.id} delay={Math.min(i, 4) * 0.05}>
                <article className="interactive-row grid gap-3 rounded-lg px-2 py-6 md:grid-cols-[1fr_auto] md:items-start md:px-4">
                  <div className="text-center md:text-left">
                    <p className="text-xs text-muted">
                      {report.publishedAt
                        ? formatDateNL(report.publishedAt)
                        : formatDateNL(report.createdAt)}
                      {report.category ? ` · ${report.category.name}` : ""}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-ink md:text-xl">
                      {report.title}
                    </h3>
                    <p className="mx-auto mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted md:mx-0">
                      {report.description}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
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
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Topics */}
      <AnimatedSection className="section-band relative py-16 md:py-24">
        <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="section-shell relative z-10">
          <div className="mx-auto max-w-2xl text-center md:mx-0 md:max-w-3xl md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Onderwerpen
            </p>
            <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl lg:text-5xl">
              Leer hoe scams in verschillende hoeken werken
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted md:mx-0">
              Van nepwebshops tot valse vacatures: dezelfde druktechnieken, andere
              verpakking. Kies een thema en lees de signalen.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-x-10 gap-y-10 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <AnimatedItem key={topic.title} delay={i * 0.05}>
                <Link href={topic.href} className="topic-link group text-center sm:text-left">
                  <topic.icon className="mx-auto h-5 w-5 text-ink/70 transition group-hover:text-accent sm:mx-0" />
                  <h3 className="font-display mt-3 text-xl text-ink transition group-hover:text-accent">
                    {topic.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted sm:mx-0 sm:max-w-none">
                    {topic.text}
                  </p>
                </Link>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Media band — photo now, video-ready later */}
      <AnimatedSection className="section-band section-band--media relative min-h-[320px] md:min-h-[420px]">
        <MediaFrame
          src="/media/section-signal.jpg"
          alt=""
          overlay="ink"
          /* videoSrc="/media/section-signal.mp4" */
        />
        <div className="section-shell relative z-10 flex min-h-[320px] items-center py-16 md:min-h-[420px] md:py-24">
          <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Signalen die tellen
            </p>
            <h2 className="font-display mt-3 text-3xl text-white md:text-4xl lg:text-5xl">
              DNS, TLS, leeftijd, nabootsing — in één overzicht
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/75 md:mx-0">
              Geen magische knop: wel een heldere uitleg van wat we meten en wat
              dat voor jou betekent vóór je iets betaalt of deelt.
            </p>
            <Link
              href="/controleren"
              className="btn-primary mt-8 inline-flex"
            >
              Start een check
            </Link>
          </div>
          <div
            className="signal-graphic float-soft ml-auto hidden h-56 w-56 lg:block xl:h-64 xl:w-64"
            aria-hidden
          />
        </div>
      </AnimatedSection>

      {/* Knowledge */}
      <AnimatedSection className="section-band section-band--surface">
        <div className="section-shell py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Kennisbank
            </p>
            <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl lg:text-5xl">
              Dieper lezen, beter herkennen
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-10 sm:max-w-none md:grid-cols-3 md:gap-8">
            {articles.map((article, i) => (
              <AnimatedItem key={article.id} delay={i * 0.08}>
                <Link
                  href={`/kennisbank/${article.slug}`}
                  className="topic-link group block text-center md:text-left"
                >
                  <h3 className="font-display text-xl text-ink transition group-hover:text-accent md:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted md:mx-0">
                    {article.excerpt}
                  </p>
                </Link>
              </AnimatedItem>
            ))}
            {articles.length === 0 && (
              <p className="text-center text-muted md:col-span-3 md:text-left">
                Artikelen worden binnenkort toegevoegd.
              </p>
            )}
          </div>
          <div className="mt-12 flex justify-center md:justify-start">
            <Link href="/kennisbank" className="btn-ink text-sm">
              Naar de kennisbank
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Business CTA */}
      <AnimatedSection className="section-band relative py-16 md:py-24">
        <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="section-shell relative z-10">
          <div className="mx-auto grid max-w-3xl items-center gap-8 text-center md:max-w-none md:grid-cols-[1.3fr_0.7fr] md:text-left">
            <div>
              <h2 className="font-display text-3xl text-ink md:text-4xl lg:text-5xl">
                Bedrijf of merk? Claim je profiel
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted md:mx-0">
                Laat zien dat jullie bereikbaar zijn voor vragen over misbruik van
                jullie naam. Claimen verandert geen Trust Score — transparantie wel.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link href="/zakelijk" className="btn-primary">
                Meer over zakelijk
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
