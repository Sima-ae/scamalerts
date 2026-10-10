import Link from "next/link";
import { DomainSearch } from "@/components/domain-search";
import { MediaFrame } from "@/components/ui/media-frame";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { TopicMarquee } from "@/components/home/topic-marquee";
import { ResultPreview } from "@/components/home/result-preview";
import { SplitFeature } from "@/components/home/split-feature";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { MeldingCard } from "@/components/melding-card";
import { reportRiskView } from "@/lib/report-risk";
import { MEDIA } from "@/lib/media";
import {
  ShoppingBag,
  Landmark,
  Briefcase,
  Heart,
  TrendingUp,
  Gauge,
  ArrowRight,
  Link2,
  ScanSearch,
  Building2,
  MessageCircle,
  Store,
  ShieldQuestion,
} from "lucide-react";
import { homepageTopics } from "@/content/kennisbank/taxonomy";
import { listPublishedGuides } from "@/lib/guides";

export const dynamic = "force-dynamic";

const topicIcons: Record<string, typeof ShoppingBag> = {
  "online-winkelen": ShoppingBag,
  "bank-phishing": Landmark,
  overheid: Building2,
  "whatsapp-tikkie": MessageCircle,
  marktplaats: Store,
  "investeringen-crypto": TrendingUp,
  vacatures: Briefcase,
  romantiek: Heart,
  "trust-score": ShieldQuestion,
};

const topics = [
  ...homepageTopics()
    .filter((t) => t.slug !== "trust-score")
    .slice(0, 5)
    .map((t) => ({
      href: `/kennisbank?onderwerp=${t.slug}`,
      icon: topicIcons[t.slug] ?? Gauge,
      title: t.title,
      text: t.text,
    })),
  {
    href: "/kennisbank?onderwerp=trust-score",
    icon: ShieldQuestion,
    title: "Hoe wordt een score bepaald",
    text: "DNS, TLS, leeftijd, nabootsing en bronnen — wat we meten en waarom.",
  },
];

const steps = [
  {
    icon: Link2,
    title: "Plak een link",
    text: "Een domein, volledige URL of link uit een sms of mail.",
  },
  {
    icon: ScanSearch,
    title: "Wij onderzoeken",
    text: "DNS, TLS, domeinleeftijd, HTTPS-gedrag, nabootsing en meldingen.",
  },
  {
    icon: Gauge,
    title: "Heldere Trust Score",
    text: "Een score van 1–100 met uitleg per signaal, zonder vakjargon.",
  },
];

async function loadReports() {
  return prisma.scamReport
    .findMany({
      where: { status: "APPROVED" },
      include: { domain: true, category: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
    })
    .catch(() => []);
}

export default async function HomePage() {
  const [reports, articles] = await Promise.all([
    loadReports(),
    listPublishedGuides().then((guides) => guides.slice(0, 3)),
  ]);

  return (
    <div className="w-full">
      <section className="hero-plane relative w-full">
        <MediaFrame media={MEDIA.hero} priority overlay="ink" />
        <div className="section-shell relative z-10 grid items-center gap-10 py-12 md:min-h-[min(calc(100svh-9.75rem+30px),810px)] md:gap-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="mx-auto w-full max-w-3xl text-center lg:mx-0 lg:text-left">
            <h1 className="animate-rise mx-auto max-w-xl text-xl font-medium text-white md:text-2xl lg:mx-0">
              Weet je zeker dat die website te vertrouwen is?
            </h1>
            <p className="animate-rise-delay mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/75 md:text-lg lg:mx-0">
              Check een domein in seconden, deel wat je meemaakt en lees hoe
              andere scams werken in Nederland.
            </p>
            <div className="animate-rise-late mx-auto mt-10 flex w-full max-w-2xl justify-center lg:mx-0 lg:justify-start">
              <DomainSearch large variant="hero" />
            </div>
            <div className="animate-rise-late mt-6 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Link href="/melden" className="btn-primary w-full sm:w-auto">
                Scam melden
              </Link>
              <Link href="/meldingen" className="btn-secondary w-full sm:w-auto">
                Bekijk meldingen
              </Link>
            </div>
          </div>
          <div className="animate-rise-late hidden justify-end lg:flex">
            <ResultPreview />
          </div>
        </div>
      </section>

      <TopicMarquee />

      <AnimatedSection className="section-band relative py-16 md:py-24">
        <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="section-shell relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Hoe het werkt
            </p>
            <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl lg:text-5xl">
              Van twijfel naar duidelijkheid in drie stappen
            </h2>
          </div>
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div
              className="step-line absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-linear-to-r from-accent/60 via-line to-trust/60 md:block"
              aria-hidden
            />
            <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <AnimatedItem
                    delay={i * 0.12}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white text-accent shadow-[0_12px_30px_-20px_rgba(15,28,46,0.5)]">
                      <step.icon className="h-6 w-6" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="font-display mt-5 text-2xl text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted md:text-base">
                      {step.text}
                    </p>
                  </AnimatedItem>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </AnimatedSection>

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
              className="btn-ink group gap-2 text-sm"
            >
              Alles bekijken
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          {reports.length === 0 ? (
            <p className="mt-10 rounded-xl border border-dashed border-line bg-white/60 px-6 py-12 text-center text-muted">
              Nog geen goedgekeurde meldingen. Wees de eerste om te melden.
            </p>
          ) : (
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {reports.map((report, i) => (
                <AnimatedItem key={report.id} delay={Math.min(i, 5) * 0.05}>
                  <MeldingCard
                    dateLabel={formatDateNL(report.publishedAt ?? report.createdAt)}
                    categoryName={report.category?.name}
                    title={report.title}
                    description={report.description}
                    identifier={report.domain?.domain ?? report.identifierValue}
                    trustLabel={reportRiskView(report.risk, report.domain?.trustLabel)?.label}
                    riskColor={reportRiskView(report.risk, report.domain?.trustLabel)?.color}
                  />
                </AnimatedItem>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      <section className="section-band relative py-16 md:py-24">
        <div className="section-shell relative z-10">
          <SplitFeature
            eyebrow="Melden"
            title="Jouw ervaring waarschuwt de volgende"
            text="Kreeg je een verdacht sms’je, betaalverzoek of webshop-link? Meld het in een paar minuten. Elke melding wordt eerst gemodereerd en helpt de Trust Score van dat domein scherper te maken."
            media={MEDIA.community}
            href="/melden"
            cta="Scam melden"
          />
        </div>
      </section>

      <AnimatedSection className="section-band section-band--media relative">
        <MediaFrame media={MEDIA.signals} overlay="ink" />
        <div className="section-shell relative z-10 flex min-h-90 items-center justify-between gap-10 py-16 md:min-h-110 md:py-24">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Signalen die tellen
            </p>
            <h2 className="font-display mt-3 text-3xl text-white md:text-4xl lg:text-5xl">
              DNS, TLS, leeftijd, nabootsing — in één overzicht
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/75 lg:mx-0">
              Geen magische knop: wel een heldere uitleg van wat we meten en wat
              dat voor jou betekent vóór je iets betaalt of deelt.
            </p>
            <Link href="/controleren" className="btn-primary mt-8 inline-flex w-full sm:w-auto">
              Start een check
            </Link>
          </div>
          <div
            className="signal-graphic float-soft hidden h-56 w-56 shrink-0 rounded-full lg:block xl:h-64 xl:w-64"
            aria-hidden
          />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-band relative py-16 md:py-24">
        <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="section-shell relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Onderwerpen
            </p>
            <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl lg:text-5xl">
              Leer hoe scams in verschillende hoeken werken
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Van nepwebshops tot valse vacatures: dezelfde druktechnieken, andere
              verpakking. Kies een thema en lees de signalen.
            </p>
          </div>
          <div className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <AnimatedItem key={topic.title} delay={i * 0.05}>
                <Link
                  href={topic.href}
                  className="group flex h-full w-full flex-col items-center rounded-xl border border-line bg-white/70 p-6 text-center transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white md:items-start md:text-left"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent transition group-hover:bg-accent group-hover:text-white">
                    <topic.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display mt-4 text-xl text-ink">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {topic.text}
                  </p>
                </Link>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="section-band section-band--surface py-16 md:py-24">
        <div className="section-shell">
          <SplitFeature
            eyebrow="Kennisbank"
            title="Dieper lezen, beter herkennen"
            text="Praktische gidsen met rode vlaggen, echte voorbeelden en herstelstappen als het toch misgaat."
            media={MEDIA.knowledge}
            href="/kennisbank"
            cta="Naar de kennisbank"
            reverse
          >
            {articles.length > 0 && (
              <ul className="mt-6 w-full divide-y divide-line border-y border-line text-center lg:text-left">
                {articles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/kennisbank/${article.slug}`}
                      className="group flex flex-col items-center gap-1 py-3.5 lg:flex-row lg:justify-between lg:gap-4"
                    >
                      <span className="font-semibold text-ink transition group-hover:text-accent">
                        {article.title}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </SplitFeature>
        </div>
      </section>

      <AnimatedSection className="section-band section-band--media relative">
        <MediaFrame media={MEDIA.business} overlay="ink" />
        <div className="section-shell relative z-10 flex min-h-95 items-center py-16 md:min-h-115 md:py-24">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Zakelijk
            </p>
            <h2 className="font-display mt-3 text-3xl text-white md:text-4xl lg:text-5xl">
              Bedrijf of merk? Claim je profiel
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/75 lg:mx-0">
              Laat zien dat jullie bereikbaar zijn voor vragen over misbruik van
              jullie naam. Claimen verandert geen Trust Score — transparantie wel.
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Link href="/zakelijk" className="btn-primary w-full sm:w-auto">
                Meer over zakelijk
              </Link>
              <Link href="/zakelijk/claimen" className="btn-secondary w-full sm:w-auto">
                Domein claimen
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
