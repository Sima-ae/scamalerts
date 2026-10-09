import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import {
  termsHighlights,
  termsMeta,
  termsNav,
} from "@/content/terms";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden",
  description: `Gebruiksvoorwaarden van ${termsMeta.brand}: regels voor gebruik van Trust Scores, meldingen, accounts en het platform.`,
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

export default function VoorwaardenPage() {
  const { brand, domain, email, supportEmail, updated } = termsMeta;

  return (
    <PageShell
      hero={{
        eyebrow: "Juridisch",
        title: "Gebruiksvoorwaarden",
        description: `Duidelijke spelregels voor het gebruik van ${brand}: wat je mag verwachten, wat niet mag, en wie waarvoor verantwoordelijk is.`,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-line/70 pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Platformregels
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Laatst bijgewerkt: {updated}. Door {domain} te gebruiken ga je
                akkoord met deze voorwaarden.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              <Link
                href="/privacy"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Privacy
              </Link>
              <Link
                href="/cookiebeleid"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Cookiebeleid
              </Link>
              <Link
                href="/contentrichtlijnen"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Contentrichtlijnen
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {termsHighlights.map((item) => (
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
              {termsNav.map((item) => (
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
                Deze gebruiksvoorwaarden gelden voor het gebruik van {brand} (
                {domain}), inclusief websites, tools, meldingen, kennisbank en
                gerelateerde diensten. Door het platform te bezoeken of te
                gebruiken, accepteer je deze voorwaarden.
              </p>
              <p>
                {brand} helpt mensen websites, telefoonnummers en
                betaalverzoeken te controleren en scam-ervaringen te delen. We
                bieden context en signalen — geen paniekzaaierij en geen
                belofte van volledige zekerheid.
              </p>
            </Section>

            <Section id="definities" title="2. Definities">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold text-ink">Platform:</strong>{" "}
                  de website en diensten van {brand}.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Gebruiker:</strong>{" "}
                  iedereen die het platform bezoekt, een account aanmaakt of
                  content plaatst.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Melding:</strong>{" "}
                  door gebruikers gedeelde informatie over vermoedelijke scams
                  of verdachte signalen.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Trust Score:
                  </strong>{" "}
                  een informatieve risicoscore of samenvatting op basis van
                  beschikbare signalen.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Content:</strong>{" "}
                  tekst, uploads, bewijsbestanden en andere bijdragen.
                </li>
              </ul>
            </Section>

            <Section id="dienst" title="3. De dienst">
              <p>
                {brand} biedt onder meer domeincontroles, communitymeldingen,
                kennisartikelen en gerelateerde hulpmiddelen. Functies kunnen
                wijzigen, tijdelijk niet beschikbaar zijn of verder worden
                ontwikkeld.
              </p>
              <p>
                We streven naar zorgvuldige, actuele informatie, maar kunnen
                niet garanderen dat elke score, melding of bron volledig,
                foutloos of up-to-date is. Externe bronnen, registries en
                openbare data kunnen onvolledig of vertraagd zijn.
              </p>
              <p>
                Zakelijke of premium diensten (indien aangeboden) kunnen
                aanvullende afspraken of voorwaarden hebben.
              </p>
            </Section>

            <Section id="account" title="4. Account">
              <p>
                Voor sommige functies heb je een account nodig. Je bent
                verantwoordelijk voor:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>juiste en actuele accountgegevens;</li>
                <li>het geheim houden van inloggegevens;</li>
                <li>alle activiteit die via jouw account plaatsvindt.</li>
              </ul>
              <p>
                Vermoed je misbruik van je account? Neem zo snel mogelijk
                contact op via{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {supportEmail}
                </a>
                . Wij mogen accounts opschorten of beëindigen bij schending van
                deze voorwaarden of bij veiligheidsrisico’s.
              </p>
            </Section>

            <Section id="content" title="5. Meldingen en content">
              <p>
                Door content te plaatsen geef je {brand} een niet-exclusieve,
                wereldwijde, royaltyvrije licentie om die content te hosten,
                weer te geven, te modereren en technisch te verwerken voor de
                dienst. Jij blijft verantwoordelijk voor wat je deelt.
              </p>
              <p>Je garandeert dat je content:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>feitelijk en te goeder trouw is bedoeld;</li>
                <li>geen onrechtmatige, lasterlijke of aantoonbaar valse beschuldigingen bevat;</li>
                <li>geen privacy van derden schendt (geen doxing);</li>
                <li>
                  geen wachtwoorden, volledige betaalgegevens of
                  identiteitsbewijzen in openbare velden plaatst;
                </li>
                <li>
                  voldoet aan onze{" "}
                  <Link
                    href="/contentrichtlijnen"
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    contentrichtlijnen
                  </Link>
                  .
                </li>
              </ul>
              <p>
                Wij mogen content weigeren, bewerken (bijvoorbeeld voor
                redactie van gevoelige data), verbergen of verwijderen, en
                accounts beperken bij misbruik. Zie ook onze{" "}
                <Link
                  href="/takedown"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  takedownprocedure
                </Link>
                .
              </p>
            </Section>

            <Section id="scores" title="6. Trust Scores en informatie">
              <p>
                Trust Scores, artikelen, waarschuwingen en community-inzichten
                zijn informatief. Ze vormen:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>geen juridisch, financieel of beleggingsadvies;</li>
                <li>geen garantie dat iets veilig of onveilig is;</li>
                <li>
                  geen officiële beoordeling door overheid, politie of
                  toezichthouder;
                </li>
                <li>geen vervanging van je eigen verificatie.</li>
              </ul>
              <p>
                Bij twijfel: stop de betaling of het gesprek, controleer via
                officiële kanalen en schakel zo nodig{" "}
                <a
                  href="https://www.fraudehelpdesk.nl"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Fraudehelpdesk
                </a>{" "}
                of de politie in.
              </p>
            </Section>

            <Section id="verboden" title="7. Verboden gebruik">
              <p>Het is niet toegestaan om het platform te gebruiken om:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>lasterlijke, kwaadwillige of aantoonbaar onware meldingen te plaatsen;</li>
                <li>spam, phishing, malware of social engineering te verspreiden;</li>
                <li>automatisch te scrapen, te overbelasten of beveiliging te omzeilen;</li>
                <li>accounts, systemen of data van anderen te ontvreemden of te verstoren;</li>
                <li>illegale content te uploaden of rechten van derden te schenden;</li>
                <li>
                  het platform te gebruiken voor doeleinden die in strijd zijn
                  met wet- of regelgeving.
                </li>
              </ul>
            </Section>

            <Section id="ie" title="8. Intellectueel eigendom">
              <p>
                Merknaam, ontwerp, software, teksten van {brand} (voor zover
                niet door gebruikers aangeleverd) en gerelateerde materialen
                zijn beschermd. Je mag het platform gebruiken binnen deze
                voorwaarden, maar je krijgt geen eigendom of brede
                hergebruikrechten.
              </p>
              <p>
                Gebruikerscontent blijft eigendom van de bijdrager of
                rechthebbende, onder de licentie die hierboven is beschreven.
              </p>
            </Section>

            <Section id="aansprakelijkheid" title="9. Aansprakelijkheid">
              <p>
                Voor zover wettelijk toegestaan is {brand} niet aansprakelijk
                voor schade die voortvloeit uit:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>beslissingen op basis van Trust Scores, meldingen of artikelen;</li>
                <li>onvolledige, vertraagde of onjuiste externe databronnen;</li>
                <li>tijdelijke storingen, onderhoud of wijzigingen aan de dienst;</li>
                <li>content van gebruikers of derden;</li>
                <li>verlies van data of inkomsten, of gevolgschade.</li>
              </ul>
              <p>
                Niets in deze voorwaarden beperkt aansprakelijkheid die volgens
                dwingend recht niet mag worden uitgesloten, zoals bij opzet of
                bewuste roekeloosheid.
              </p>
            </Section>

            <Section id="vrijwaring" title="10. Vrijwaring">
              <p>
                Je vrijwaart {brand} tegen claims van derden die voortvloeien
                uit content die jij plaatst, of uit jouw schending van deze
                voorwaarden of toepasselijke wetgeving, voor zover die claims
                redelijkerwijs aan jouw handelen zijn toe te rekenen.
              </p>
            </Section>

            <Section id="privacy" title="11. Privacy en cookies">
              <p>
                Hoe wij persoonsgegevens verwerken staat in onze{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>
                . Informatie over cookies en vergelijkbare technieken staat in
                ons{" "}
                <Link
                  href="/cookiebeleid"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  cookiebeleid
                </Link>
                .
              </p>
            </Section>

            <Section id="wijzigingen" title="12. Wijzigingen">
              <p>
                We kunnen deze voorwaarden aanpassen wanneer wetgeving,
                diensten of processen wijzigen. De actuele versie staat altijd
                op deze pagina. Bij ingrijpende wijzigingen streven we ernaar
                om gebruikers waar relevant te informeren.
              </p>
              <p>Laatst bijgewerkt: {updated}.</p>
            </Section>

            <Section id="recht" title="13. Toepasselijk recht">
              <p>
                Op deze voorwaarden is Nederlands recht van toepassing. Geschillen
                worden bij voorkeur in onderling overleg opgelost. Als dat niet
                lukt, is de bevoegde rechter in Nederland bevoegd, voor zover
                dwingend recht niet anders voorschrijft.
              </p>
            </Section>

            <Section id="contact" title="14. Contact">
              <p>
                Vragen over deze gebruiksvoorwaarden? Mail{" "}
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
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
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
            </Section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
