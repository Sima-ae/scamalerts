import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import {
  evidenceTips,
  forbiddenItems,
  goodReportChecklist,
  guidelinesHighlights,
  guidelinesMeta,
  guidelinesNav,
} from "@/content/guidelines";

export const metadata: Metadata = {
  title: "Contentrichtlijnen",
  description: `Contentrichtlijnen van ${guidelinesMeta.brand}: hoe je veilig, feitelijk en respectvol scam-meldingen deelt.`,
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

export default function ContentGuidelinesPage() {
  const { brand, email, reportEmail, updated } = guidelinesMeta;

  return (
    <PageShell
      hero={{
        eyebrow: "Community",
        title: "Contentrichtlijnen",
        description: `Zo houden we ${brand} bruikbaar, veilig en betrouwbaar: feitelijke meldingen, respect voor privacy, en duidelijke grenzen.`,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-line/70 pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Spelregels voor meldingen
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Laatst bijgewerkt: {updated}. Deze richtlijnen horen bij onze{" "}
                <Link
                  href="/voorwaarden"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  gebruiksvoorwaarden
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              <Link
                href="/melden"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Scam melden
              </Link>
              <Link
                href="/takedown"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Takedown
              </Link>
              <Link
                href="/voorwaarden"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Voorwaarden
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {guidelinesHighlights.map((item) => (
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
              {guidelinesNav.map((item) => (
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
            <Section id="inleiding" title="1. Inleiding">
              <p>
                {brand} werkt het best wanneer meldingen feitelijk, bruikbaar en
                respectvol zijn. Deze contentrichtlijnen helpen je om
                scam-ervaringen te delen zonder anderen onnodig bloot te stellen
                of het platform te vervuilen.
              </p>
              <p>
                Door content te plaatsen ga je akkoord met deze richtlijnen en
                met onze gebruiksvoorwaarden. Bij twijfel: deel minder
                persoonsgegevens en focus op het patroon.
              </p>
            </Section>

            <Section id="doel" title="2. Waarom dit bestaat">
              <p>We willen dat anderen sneller herkennen wat er speelt — met context, zonder paniekzaaierij. Goede content:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>waarschuwt op basis van concrete signalen;</li>
                <li>helpt patronen herkennen (druk, nabootsing, betaaltrucs);</li>
                <li>beschermt privacy van betrokkenen die geen verdachte partij zijn;</li>
                <li>houdt de community geloofwaardig en veilig.</li>
              </ul>
            </Section>

            <Section id="goede-melding" title="3. Een goede melding">
              <p>
                Een sterke melding is kort, concreet en navolgbaar. Gebruik
                bij voorkeur deze bouwstenen:
              </p>
              <div className="grid gap-4 pt-2 sm:grid-cols-2">
                {goodReportChecklist.map((item) => (
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
              <p>
                Vermijd vage beschuldigingen zonder context. “Dit is een scam”
                helpt minder dan: welk domein, welke belofte, welke
                betaalmethode, en wat je wantrouwde.
              </p>
            </Section>

            <Section id="bewijs" title="4. Bewijs uploaden">
              <p>
                Screenshots, berichten of bestanden kunnen een melding
                versterken. Upload alleen bewijs als je daar rechten voor hebt
                en gevoelige data eerst hebt afgeschermd.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {evidenceTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
              <p>
                Wij mogen bestanden weigeren, redigeren of verwijderen als ze
                privacygevoelig, irrelevant of in strijd met deze richtlijnen
                zijn.
              </p>
            </Section>

            <Section id="privacy" title="5. Privacy van anderen">
              <p>
                Focus op methodes en openbaar herkenbare signalen — niet op
                privépersonen. Noem geen buur, collega of willekeurige burger
                met naam, adres of privécontactgegevens, tenzij dat strikt
                noodzakelijk is én openbaar en relevant voor het scam-patroon.
              </p>
              <p>
                Bij twijfel: beschrijf de rol (“een beller die zich voordeed als
                bank”) in plaats van iemands privé-identiteit. Meer over onze
                verwerking van persoonsgegevens staat in de{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>
                .
              </p>
            </Section>

            <Section id="verboden" title="6. Wat niet mag">
              <p>De volgende content is niet toegestaan:</p>
              <ul className="list-disc space-y-2 pl-5">
                {forbiddenItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Overtredingen kunnen leiden tot verwijdering van content,
                beperking van functies of blokkering van accounts.
              </p>
            </Section>

            <Section id="moderatie" title="7. Moderatie">
              <p>
                We beoordelen meldingen waar nodig om kwaliteit en veiligheid te
                bewaken. Dat kan betekenen dat we content:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>weigeren of verbergen;</li>
                <li>redigeren (bijvoorbeeld gevoelige data maskeren);</li>
                <li>vragen om aanvulling of verduidelijking;</li>
                <li>verwijderen bij schending van deze richtlijnen.</li>
              </ul>
              <p>
                Moderatie is geen belofte dat elke melding handmatig wordt
                gecontroleerd voordat die zichtbaar is. Misbruik of fouten
                kun je melden via de takedownroute.
              </p>
            </Section>

            <Section id="takedown" title="8. Onterechte content">
              <p>
                Denk je dat content onrechtmatig is, feitelijk onjuist of in
                strijd met deze richtlijnen? Gebruik onze{" "}
                <Link
                  href="/takedown"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  notice- en takedownprocedure
                </Link>
                .
              </p>
              <p>
                Stuur een gemotiveerd verzoek naar{" "}
                <a
                  href={`mailto:${reportEmail}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {reportEmail}
                </a>{" "}
                met de URL, je reden, eventueel bewijs en je contactgegevens.
              </p>
            </Section>

            <Section id="tips" title="9. Praktische tips">
              <ul className="list-disc space-y-2 pl-5">
                <li>Schrijf alsof je een vriend waarschuwt: helder, kalm, concreet.</li>
                <li>Gebruik de echte domeinnaam of het echte nummer, niet alleen een merksuggestie.</li>
                <li>Noem druktechnieken: “nu betalen”, “geheim houden”, “account geblokkeerd”.</li>
                <li>Vermeld of je wel of niet hebt betaald — dat helpt anderen het risico inschatten.</li>
                <li>
                  Twijfel je over een site? Controleer eerst via{" "}
                  <Link
                    href="/controleren"
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    Website controleren
                  </Link>
                  .
                </li>
              </ul>
            </Section>

            <Section id="contact" title="10. Contact">
              <p>
                Vragen over deze contentrichtlijnen? Mail{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {email}
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
                  href="/takedown"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  takedownprocedure
                </Link>
                .
              </p>
              <p>Laatst bijgewerkt: {updated}.</p>
            </Section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
