import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import {
  aboutHighlights,
  aboutMeta,
  aboutNav,
  aboutPillars,
  approachSteps,
} from "@/content/about";

export const metadata: Metadata = {
  title: "Over ons",
  description: `Over ${aboutMeta.brand}: het platform om websites te controleren, scams te melden en fraude beter te begrijpen — onafhankelijk en Nederlandstalig.`,
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
        {children}
      </div>
    </section>
  );
}

export default function OverOnsPage() {
  const { brand, domain, email, reportEmail, updated } = aboutMeta;

  return (
    <PageShell
      hero={{
        eyebrow: "Platform",
        title: `Over ${brand}`,
        description:
          "Onafhankelijk, Nederlandstalig en zonder paniektaal: zo helpen we je online fraude eerder te herkennen.",
        media: MEDIA.hero,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-line/70 pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Wie we zijn
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {brand} ({domain}) — oriëntatie bij verdachte sites, nummers en
                betaalverzoeken. Bijgewerkt: {updated}.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              <Link
                href="/controleren"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Controleren
              </Link>
              <Link
                href="/melden"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Melden
              </Link>
              <Link
                href="/zakelijk"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Voor bedrijven
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {aboutHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line/80 bg-white/70 p-5"
              >
                <p className="font-display text-lg tracking-tight text-ink">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Inhoud
            </p>
            <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {aboutNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-md px-2.5 py-1.5 text-sm text-ink/70 transition hover:bg-white hover:text-accent lg:px-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-12 text-left md:space-y-14">
            <Section id="missie" title="1. Missie">
              <p>
                {brand} helpt mensen sneller te herkennen wanneer iets niet
                pluis voelt — zonder paniektaal, vage claims of valse zekerheid.
                We willen dat je betere vragen stelt voordat je betaalt,
                inlogt of persoonlijke gegevens deelt.
              </p>
              <p>
                Online fraude speelt met haast, vertrouwen en herkenbare
                merken. Ons doel is dat jij die druk beter herkent, met
                concrete signalen en begrijpelijke uitleg.
              </p>
            </Section>

            <Section id="wat-we-doen" title="2. Wat we doen">
              <p>
                Het platform combineert checks, meldingen en uitleg op één
                plek:
              </p>
              <div className="grid gap-4 pt-2 sm:grid-cols-2">
                {aboutPillars.map((item) => (
                  <div
                    key={item.title}
                    className="flex h-full flex-col rounded-2xl border border-line/80 bg-white/70 p-5 md:p-6"
                  >
                    <p className="font-display text-xl tracking-tight text-ink">
                      {item.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-4 text-sm font-semibold text-accent underline-offset-2 hover:underline"
                    >
                      {item.cta}
                    </Link>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="aanpak" title="3. Onze aanpak">
              <p>
                We bouwen niet op één bron. Sterke oriëntatie komt uit de
                combinatie van techniek, praktijk en uitleg:
              </p>
              <div className="grid gap-4 pt-2 md:grid-cols-3">
                {approachSteps.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-line/80 bg-white/70 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Stap {index + 1}
                    </p>
                    <p className="font-display mt-2 text-lg tracking-tight text-ink">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="trust-score" title="4. Trust Score">
              <p>
                De Trust Score is een informatieve samenvatting van beschikbare
                signalen. Het is een hulpmiddel om risico te duiden — geen
                keurmerk, geen koopwaar en geen garantie dat iets veilig of
                onveilig is.
              </p>
              <p>
                Scores kunnen veranderen wanneer nieuwe data, meldingen of
                bronnen beschikbaar komen. Lees altijd de onderliggende
                signalen en gebruik je gezonde verstand. Meer uitleg staat in
                de{" "}
                <Link
                  href="/kennisbank"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  kennisbank
                </Link>
                .
              </p>
            </Section>

            <Section id="onafhankelijk" title="5. Onafhankelijkheid">
              <p>
                Betaalde zichtbaarheid, domeinclaimen of zakelijke diensten
                staan los van risicoscores. We willen dat gebruikers erop
                kunnen vertrouwen dat een hogere of lagere score niet te koop
                is.
              </p>
              <p>
                Transparantie wél: bedrijven mogen laten zien hoe klanten hun
                echte kanalen herkennen en hoe zij omgaan met misbruik van hun
                merk. Dat verandert de score niet automatisch.
              </p>
            </Section>

            <Section id="voor-wie" title="6. Voor wie">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold text-ink">
                    Particulieren
                  </strong>{" "}
                  die een site, nummer of betaalverzoek willen checken voordat
                  ze verdergaan.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Mensen die iets verdachts meemaakten
                  </strong>{" "}
                  en dat feitelijk willen delen voor anderen.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Bedrijven</strong>{" "}
                  die hun domein willen claimen en bereikbaar willen zijn bij
                  meldingen of lookalikes.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Iedereen die wil leren
                  </strong>{" "}
                  hoe scam-patronen werken — via de kennisbank.
                </li>
              </ul>
            </Section>

            <Section id="grenzen" title="7. Wat we niet zijn">
              <p>{brand} is een hulpmiddel voor oriëntatie. We zijn niet:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>een vervanging van politie, Fraudehelpdesk of toezichthouders;</li>
                <li>een bron van juridisch, financieel of beleggingsadvies;</li>
                <li>een absolute waarheid of officiële black-/whitelist;</li>
                <li>een plek voor laster, doxing of paniekzaaierij.</li>
              </ul>
              <p>
                Bij schade: doe melding bij{" "}
                <a
                  href="https://www.fraudehelpdesk.nl"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Fraudehelpdesk
                </a>{" "}
                en — waar nodig — aangifte bij de politie.
              </p>
            </Section>

            <Section id="samenwerking" title="8. Samenwerking">
              <p>
                We werken met partners en standaarden rond awareness, privacy en
                cybersecurity — bijvoorbeeld Phished en richtinggevende kaders
                zoals AVG/GDPR. Details staan op onze{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>
                .
              </p>
              <p>
                Zie je iets dat niet klopt op het platform? Gebruik de{" "}
                <Link
                  href="/takedown"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  takedownprocedure
                </Link>{" "}
                of mail{" "}
                <a
                  href={`mailto:${reportEmail}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {reportEmail}
                </a>
                . We willen snel, zorgvuldig en eerlijk blijven.
              </p>
            </Section>

            <Section id="contact" title="9. Contact">
              <p>
                Vragen over {brand}? Mail{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {email}
                </a>
                .
              </p>
              <p>
                Juridisch en community:{" "}
                <Link
                  href="/voorwaarden"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  voorwaarden
                </Link>
                ,{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacy
                </Link>
                ,{" "}
                <Link
                  href="/cookiebeleid"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  cookiebeleid
                </Link>{" "}
                en{" "}
                <Link
                  href="/contentrichtlijnen"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  contentrichtlijnen
                </Link>
                .
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <Link href="/controleren" className="btn-primary w-full sm:w-auto">
                  Website controleren
                </Link>
                <Link
                  href="/melden"
                  className="inline-flex w-full items-center justify-center rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 sm:w-auto"
                >
                  Scam melden
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
