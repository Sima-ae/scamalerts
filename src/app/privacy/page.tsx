import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import {
  complianceLogos,
  frameworks,
  partnerBlocks,
  privacyMeta,
  privacyNav,
} from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: `Privacyverklaring van ${privacyMeta.brand}: hoe wij omgaan met AVG, GDPR, DORA, NIS2, Phished en Cyber Essentials Plus.`,
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

export default function PrivacyPage() {
  const { brand, domain, email, updated } = privacyMeta;

  return (
    <PageShell
      hero={{
        eyebrow: "Juridisch en compliance",
        title: "Privacyverklaring",
        description: `Hoe ${brand} persoonsgegevens verwerkt, welke rechten je hebt, en hoe wij werken volgens AVG/GDPR en principes uit DORA, NIS2, Phished en Cyber Essentials Plus.`,
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Compliance badges */}
        <div className="flex flex-col items-center gap-5 border-b border-line/70 pb-10 md:flex-row md:items-center md:justify-between">
          <div className="shrink-0 text-center md:max-w-[16rem] md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Compliance en partnerschappen
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Laatst bijgewerkt: {updated}. Spring naar een onderwerp of lees
              de volledige verklaring hieronder.
            </p>
          </div>
          <div className="flex min-w-0 flex-nowrap items-center justify-center gap-1.5 overflow-x-auto md:justify-end md:gap-2">
            {complianceLogos.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex shrink-0 transition hover:opacity-90"
                title={item.title}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  className="privacy-badge"
                />
              </a>
            ))}
            <a
              href="#phished"
              className="inline-flex shrink-0 rounded-lg bg-white px-2 py-1 shadow-sm ring-1 ring-line/60 transition hover:ring-ink/20"
              title="Certified Phished Partner"
            >
              <img
                src="/Certified-Phished-Partner.png?v=9"
                alt="Certified Phished Partner"
                width={160}
                height={56}
                className="privacy-partner"
              />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          {/* Side nav */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Inhoud
            </p>
            <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {privacyNav.map((item) => (
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
                {brand} ({domain}) helpt mensen websites, telefoonnummers en
                betaalverzoeken te controleren, scam-ervaringen te delen en
                fraudepatronen sneller te herkennen. Bij dat werk verwerken we
                persoonsgegevens. In deze privacyverklaring leggen we uit welke
                gegevens dat zijn, waarom we ze verwerken, hoe lang we ze
                bewaren en welke rechten je hebt.
              </p>
              <p>
                We verwerken gegevens zorgvuldig, proportioneel en met
                passende beveiliging. Openbare meldingen zijn bedoeld om
                anderen te waarschuwen — niet om privépersonen te doxen of
                gevoelige gegevens te verspreiden.
              </p>
            </Section>

            <Section id="verantwoordelijke" title="2. Verwerkingsverantwoordelijke">
              <p>
                Verwerkingsverantwoordelijke voor de verwerking van
                persoonsgegevens via {domain}:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="font-semibold text-ink">{brand}</strong>
                </li>
                <li>
                  Website:{" "}
                  <a
                    href={`https://${domain}`}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {domain}
                  </a>
                </li>
                <li>
                  Privacycontact:{" "}
                  <a
                    href={`mailto:${email}`}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {email}
                  </a>
                </li>
              </ul>
            </Section>

            <Section id="gegevens" title="3. Welke gegevens verwerken we?">
              <p>Afhankelijk van hoe je het platform gebruikt, kunnen we verwerken:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold text-ink">Accountgegevens</strong>{" "}
                  — e-mailadres, wachtwoordhash, rol/rechten, optionele
                  profielinformatie.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Meldingen</strong>{" "}
                  — beschrijving van het incident, categorie, verdachte
                  domeinen/nummers/kanalen, bedragen, tijdstippen en eventuele
                  bewijsuploads.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Controleverzoeken</strong>{" "}
                  — domeinnamen of andere signalen die je laat scannen voor een
                  Trust Score.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Technische gegevens</strong>{" "}
                  — IP-adres, apparaat-/browsergegevens, logbestanden,
                  tijdstempels en beveiligingssignalen (bijv. misbruikdetectie).
                </li>
                <li>
                  <strong className="font-semibold text-ink">Communicatie</strong>{" "}
                  — berichten die je stuurt naar support of privacy@{domain}.
                </li>
              </ul>
              <p>
                Deel geen wachtwoorden, volledige IBAN’s, kopieën van
                identiteitsbewijzen of andere zeer gevoelige gegevens in
                openbare velden. Bewijsuploads moeten waar mogelijk worden
                afgeschermd.
              </p>
            </Section>

            <Section id="doelen" title="4. Doeleinden van de verwerking">
              <ul className="list-disc space-y-2 pl-5">
                <li>Accountbeheer, authenticatie en rechtenbeheer</li>
                <li>
                  Publiceren en modereren van scam-meldingen (na review)
                </li>
                <li>
                  Uitvoeren van websitecontroles en tonen van Trust Scores
                </li>
                <li>
                  Beveiliging van het platform (fraude, spam, misbruik,
                  aanvallen)
                </li>
                <li>
                  Verbeteren van content, kennisbank en gebruikerservaring
                </li>
                <li>
                  Voldoen aan wettelijke verplichtingen en verzoeken van
                  bevoegde autoriteiten waar nodig
                </li>
                <li>
                  Contact opnemen over je melding, account of privacyverzoek
                </li>
              </ul>
            </Section>

            <Section id="grondslagen" title="5. Rechtsgrondslagen (AVG/GDPR)">
              <p>We verwerken persoonsgegevens op basis van:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold text-ink">
                    Uitvoering van een overeenkomst
                  </strong>{" "}
                  — wanneer je een account aanmaakt of diensten van het
                  platform gebruikt.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Gerechtvaardigd belang
                  </strong>{" "}
                  — voor beveiliging, misbruikpreventie, moderatie,
                  platformverbetering en waarschuwing van het publiek over
                  scamrisico’s, afgewogen tegen jouw privacybelangen.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Toestemming</strong>{" "}
                  — waar we die expliciet vragen (bijvoorbeeld voor bepaalde
                  optionele verwerkingen).
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Wettelijke verplichting
                  </strong>{" "}
                  — wanneer bewaring of verstrekking wettelijk vereist is.
                </li>
              </ul>
            </Section>

            <Section id="bewaartermijnen" title="6. Bewaartermijnen">
              <p>
                We bewaren persoonsgegevens niet langer dan nodig voor de
                doelen hierboven, of dan wettelijk vereist is. Richtlijnen:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Accountgegevens: zolang je account actief is, plus een korte
                  periode daarna voor afronding of beveiliging.
                </li>
                <li>
                  Openbare meldingen: zolang zij relevant blijven voor
                  waarschuwing en onderzoek, of tot verwijdering na review.
                </li>
                <li>
                  Bewijsuploads: gekoppeld aan de melding; bij afwijzing of
                  verwijdering worden bestanden niet langer bewaard dan nodig.
                </li>
                <li>
                  Beveiligings- en serverlogs: beperkt, voor detectie van
                  misbruik en incidentanalyse.
                </li>
                <li>
                  Support-/privacycorrespondentie: zolang nodig om je verzoek
                  af te handelen en dossiervorming waar nodig.
                </li>
              </ul>
            </Section>

            <Section id="delen" title="7. Delen met derden">
              <p>
                We verkopen jouw persoonsgegevens niet. We kunnen gegevens delen
                met:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Hosting-, e-mail- en infrastructuurpartners die nodig zijn om
                  het platform te draaien
                </li>
                <li>
                  Beveiligings- en awareness-partners (zoals in het kader van
                  ons Phished-partnerschap), voor zover relevant en begrensd
                </li>
                <li>
                  Moderatie- of supportrollen binnen {brand}
                </li>
                <li>
                  Bevoegde autoriteiten wanneer wetgeving of een geldig verzoek
                  daartoe verplicht
                </li>
              </ul>
              <p>
                Met verwerkers maken we passende afspraken (waaronder
                verwerkersovereenkomsten) over vertrouwelijkheid, beveiliging
                en subverwerking.
              </p>
            </Section>

            <Section id="rechten" title="8. Jouw rechten">
              <p>Onder de AVG/GDPR kun je — voor zover van toepassing — vragen om:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Inzage in jouw persoonsgegevens</li>
                <li>Correctie van onjuiste gegevens</li>
                <li>Verwijdering (“recht op vergetelheid”)</li>
                <li>Beperking van de verwerking</li>
                <li>Overdraagbaarheid van gegevens</li>
                <li>Bezwaar tegen verwerking op basis van gerechtvaardigd belang</li>
                <li>Intrekking van toestemming, waar verwerking daarop berust</li>
              </ul>
              <p>
                Stuur je verzoek naar{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {email}
                </a>
                . We reageren binnen de wettelijke termijnen. Je kunt ook een
                klacht indienen bij de Autoriteit Persoonsgegevens (
                <a
                  href="https://www.autoriteitpersoonsgegevens.nl"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  autoriteitpersoonsgegevens.nl
                </a>
                ).
              </p>
            </Section>

            {/* Framework deep-dives */}
            <div id="kaders" className="scroll-mt-28 space-y-8">
              <div>
                <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  9. Compliancekaders
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">
                  Hieronder leggen we uit hoe {brand} zich verhoudt tot AVG,
                  GDPR, DORA en NIS2. AVG/GDPR zijn onze juridische basis voor
                  privacy. DORA en NIS2 gebruiken we als richtinggevende
                  kaders voor digitale weerbaarheid en cybersecurity.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {frameworks.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="scroll-mt-28 rounded-2xl border border-line/80 bg-white/70 p-5 md:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={item.badge}
                        alt={item.title}
                        width={240}
                        height={240}
                        className={`privacy-badge-lg shrink-0${
                          item.id === "dora" ? " privacy-badge-invert" : ""
                        }`}
                      />
                      <p className="min-w-0 pt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                        {item.subtitle}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {item.summary}
                    </p>
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            {/* Partners */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  10. Partnerschappen en certificeringen
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">
                  Naast privacywetgeving werken we met partners en
                  certificeringskaders die phishing-bewustzijn en
                  cybersecurity versterken.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {partnerBlocks.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="scroll-mt-28 rounded-2xl border border-line/80 bg-white/70 p-5 md:p-6"
                  >
                    <div className="flex items-center gap-4">
                      {item.id === "phished" ? (
                        <span className="inline-flex rounded-xl bg-white px-3 py-2 ring-1 ring-line/60">
                          <img
                            src={item.badge}
                            alt=""
                            width={160}
                            height={56}
                            className="privacy-partner"
                            aria-hidden
                          />
                        </span>
                      ) : (
                        <img
                          src={item.badge}
                          alt=""
                          width={90}
                          height={108}
                          className="privacy-cyber"
                          aria-hidden
                        />
                      )}
                      <h3 className="font-display text-xl text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {item.summary}
                    </p>
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {item.href && (
                      <p className="mt-4 text-sm">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-accent underline-offset-2 hover:underline"
                        >
                          {item.linkLabel}
                        </a>
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <Section id="beveiliging" title="11. Beveiliging">
              <p>
                We nemen passende technische en organisatorische maatregelen
                om persoonsgegevens te beschermen tegen verlies, misbruik of
                ongeautoriseerde toegang. Denk aan:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Versleutelde verbindingen (HTTPS)</li>
                <li>Toegangsbeheer en minimale rechten</li>
                <li>Beveiligde opslag van wachtwoorden (hashes)</li>
                <li>Monitoring op misbruik en verdachte activiteit</li>
                <li>Moderatieprocessen voor openbare content</li>
                <li>
                  Leverancierskeuze en afspraken in lijn met privacy- en
                  security-eisen
                </li>
              </ul>
              <p>
                Geen enkel systeem is 100% risicoloos. Ontdek je een
                kwetsbaarheid of vermoed je een incident? Neem contact op via{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {email}
                </a>
                .
              </p>
            </Section>

            <Section id="contact" title="12. Contact en updates">
              <p>
                Vragen over deze privacyverklaring of je persoonsgegevens?
                Mail{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {email}
                </a>
                .
              </p>
              <p>
                We kunnen deze verklaring bijwerken wanneer wetgeving,
                diensten of processen wijzigen. De actuele versie staat altijd
                op deze pagina. Laatst bijgewerkt: {updated}.
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
