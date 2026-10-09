import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import {
  businessBenefits,
  businessFaqs,
  businessHighlights,
  businessMeta,
  businessNav,
  businessSteps,
} from "@/content/business";

export const metadata: Metadata = {
  title: "Voor bedrijven",
  description: `Claim je domein bij ${businessMeta.brand}, reageer op meldingen en laat zien hoe jullie omgaan met misbruik van jullie merk — zonder invloed op de Trust Score.`,
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

export default function ZakelijkPage() {
  const { brand, email, supportEmail, updated } = businessMeta;

  return (
    <PageShell
      hero={{
        eyebrow: "Zakelijk",
        title: "Laat zien dat jullie merk serieus omgaat met misbruik",
        description:
          "Scammers lenen graag bekende namen. Met een geclaimd profiel kun je bereikbaar zijn voor vragen, context geven bij meldingen en laten zien hoe klanten jullie échte kanalen herkennen.",
        media: MEDIA.business,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-line/70 pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Voor bedrijven
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Domeinclaimen, context bij meldingen en heldere officiële
                kanalen — zonder de Trust Score te beïnvloeden. Bijgewerkt:{" "}
                {updated}.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:justify-center md:justify-end">
              <Link href="/zakelijk/claimen" className="btn-primary w-full sm:w-auto">
                Domein claimen
              </Link>
              <Link
                href="/registreren"
                className="inline-flex w-full items-center justify-center rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 sm:w-auto"
              >
                Eerst account aanmaken
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {businessHighlights.map((item) => (
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
              {businessNav.map((item) => (
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
            <Section id="waarom" title="1. Waarom zakelijk">
              <p>
                Fraudeurs bootsten graag bekende merken, webshops en
                dienstverleners na. Klanten die een verdachte link, mail of
                betaalverzoek krijgen, zoeken snel naar houvast: is dit echt
                jullie kanaal?
              </p>
              <p>
                Met {brand} voor bedrijven kun je het juiste domein claimen,
                bereikbaar zijn bij meldingen en laten zien hoe mensen jullie
                officieel herkennen — zonder paniektaal en zonder de
                onafhankelijkheid van risicoscores aan te tasten.
              </p>
            </Section>

            <Section id="voordelen" title="2. Voordelen">
              <div className="grid gap-4 sm:grid-cols-2">
                {businessBenefits.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-line/80 bg-white/70 p-5 md:p-6"
                  >
                    <p className="font-display text-xl tracking-tight text-ink">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="werken" title="3. Hoe het werkt">
              <div className="grid gap-4 sm:grid-cols-2">
                {businessSteps.map((item, index) => (
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

            <Section id="score" title="4. Trust Score blijft onafhankelijk">
              <p>
                Claimen is geen koop van vertrouwen. De Trust Score is een
                informatieve samenvatting van beschikbare signalen. Zakelijke
                diensten, zichtbaarheid of accreditatie staan daar los van.
              </p>
              <p>
                Wat wél helpt: transparantie. Duidelijke officiële kanalen en
                snelle, feitelijke context bij meldingen maken het voor klanten
                makkelijker om echte communicatie van misbruik te scheiden.
              </p>
              <p>
                Meer over hoe scores werken staat in onze{" "}
                <Link
                  href="/kennisbank"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  kennisbank
                </Link>{" "}
                en op{" "}
                <Link
                  href="/over-ons"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Over ons
                </Link>
                .
              </p>
            </Section>

            <Section id="lookalikes" title="5. Lookalikes en merkmisbruik">
              <p>
                Lookalike-domeinen, nagebootste webshops en valse
                betaalverzoeken gebruiken vaak jullie naam of huisstijl. Op{" "}
                {brand} kunnen gebruikers zulke signalen controleren en melden.
              </p>
              <p>
                Met een geclaimd domein kun je sneller laten zien welk kanaal
                bij jullie hoort en waar klanten veilig terechtkunnen — zonder
                dat dat automatisch de score van een lookalike verandert.
              </p>
            </Section>

            <Section id="voor-wie" title="6. Voor wie">
              <ul className="list-disc space-y-2 pl-5">
                <li>Webshops en merken die vaak worden nagebootst</li>
                <li>Dienstverleners met herkenbare merknamen of betaalstromen</li>
                <li>Bedrijven die bereikbaar willen zijn bij communitymeldingen</li>
                <li>
                  Organisaties die klanten willen helpen hun echte kanalen te
                  herkennen
                </li>
              </ul>
            </Section>

            <Section id="start" title="7. Aan de slag">
              <p>
                Klaar om jullie domein te claimen? Maak eerst een account aan
                als je die nog niet hebt, en dien daarna de claim in.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <Link
                  href="/zakelijk/claimen"
                  className="btn-primary w-full sm:w-auto"
                >
                  Domein claimen
                </Link>
                <Link
                  href="/registreren"
                  className="inline-flex w-full items-center justify-center rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 sm:w-auto"
                >
                  Account aanmaken
                </Link>
                <Link
                  href="/controleren"
                  className="inline-flex w-full items-center justify-center rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 sm:w-auto"
                >
                  Eerst een domein checken
                </Link>
              </div>
            </Section>

            <Section id="faq" title="8. Veelgestelde vragen">
              <div className="space-y-4">
                {businessFaqs.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-line/80 bg-white/70 p-5 md:p-6"
                  >
                    <p className="font-display text-lg tracking-tight text-ink">
                      {item.q}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="contact" title="9. Contact">
              <p>
                Vragen over zakelijke claims of samenwerking? Mail{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {email}
                </a>{" "}
                of{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {supportEmail}
                </a>
                .
              </p>
              <p>
                Zie ook onze{" "}
                <Link
                  href="/voorwaarden"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  gebruiksvoorwaarden
                </Link>
                ,{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
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
            </Section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
