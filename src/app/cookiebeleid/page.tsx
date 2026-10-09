import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import {
  cookieCategories,
  cookiesHighlights,
  cookiesMeta,
  cookiesNav,
} from "@/content/cookies";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: `Cookiebeleid van ${cookiesMeta.brand}: welke cookies we gebruiken, waarom, en hoe je ze beheert.`,
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

export default function CookiebeleidPage() {
  const { brand, domain, email, updated } = cookiesMeta;

  return (
    <PageShell
      hero={{
        eyebrow: "Juridisch en privacy",
        title: "Cookiebeleid",
        description: `Hoe ${brand} cookies en vergelijkbare technieken gebruikt — transparant, minimaal en in lijn met de AVG.`,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-line/70 pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Cookies en vergelijkbare technieken
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Laatst bijgewerkt: {updated}. Dit beleid hoort bij onze{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>
                .
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
                href="/voorwaarden"
                className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-sm text-ink transition hover:border-ink/25"
              >
                Voorwaarden
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cookiesHighlights.map((item) => (
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
              {cookiesNav.map((item) => (
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
                Dit cookiebeleid legt uit hoe {brand} ({domain}) cookies en
                vergelijkbare technieken gebruikt wanneer je onze website
                bezoekt. We willen dat duidelijk is wat er gebeurt, waarom dat
                nodig is, en hoe je zelf controle houdt.
              </p>
              <p>
                Persoonsgegevens die via cookies of sessies worden verwerkt,
                vallen ook onder onze{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>
                .
              </p>
            </Section>

            <Section id="wat-zijn-cookies" title="2. Wat zijn cookies">
              <p>
                Cookies zijn kleine tekstbestanden die een website op je
                apparaat plaatst. Ze helpen bijvoorbeeld om je ingelogd te
                houden, voorkeuren te onthouden of de werking van de site te
                verbeteren.
              </p>
              <p>
                Naast cookies kunnen vergelijkbare technieken worden gebruikt,
                zoals lokale opslag in de browser (localStorage) of sessietokens.
                In dit beleid noemen we die voor het gemak ook “cookies”, tenzij
                anders vermeld.
              </p>
            </Section>

            <Section id="soorten" title="3. Soorten cookies">
              <p>
                We onderscheiden de volgende categorieën. Niet elke categorie is
                altijd actief; dat hangt af van hoe je het platform gebruikt en
                welke diensten op dat moment zijn ingeschakeld.
              </p>
              <div className="grid gap-4 pt-2">
                {cookieCategories.map((item) => (
                  <div
                    key={item.id}
                    id={item.id}
                    className="scroll-mt-28 rounded-2xl border border-line/80 bg-white/70 p-5 md:p-6"
                  >
                    <h3 className="font-display text-xl tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                      {item.summary}
                    </p>
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted md:text-[15px]">
                      {item.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="gebruik" title="4. Wat wij gebruiken">
              <p>
                Op dit moment richt {brand} zich vooral op cookies en
                sessietechnieken die nodig zijn voor:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>inloggen en sessiebeheer;</li>
                <li>beveiliging van formulieren en accounts;</li>
                <li>basiswerking van het platform;</li>
                <li>
                  functionele voorkeuren die jouw gebruikservaring ondersteunen.
                </li>
              </ul>
              <p>
                We plaatsen geen advertentiecookies om je over websites heen te
                profileren. Als we in de toekomst aanvullende analytische tools
                activeren, werken we dit beleid bij en zorgen we waar nodig voor
                een passende rechtsgrond of keuze.
              </p>
            </Section>

            <Section id="rechtsgrond" title="5. Rechtsgrond">
              <p>
                Noodzakelijke cookies verwerken we op basis van ons gerechtvaardigd
                belang om een veilige, werkende dienst te leveren, en waar
                relevant om een overeenkomst met jou uit te voeren (bijvoorbeeld
                een account).
              </p>
              <p>
                Voor niet-noodzakelijke cookies die persoonsgegevens verwerken,
                vragen we waar wettelijk vereist toestemming, of gebruiken we
                een andere passende grondslag onder de AVG/GDPR. Details over
                verwerking van persoonsgegevens staan in de{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>
                .
              </p>
            </Section>

            <Section id="derden" title="6. Derden">
              <p>
                Sommige technische diensten (bijvoorbeeld hosting of
                authenticatie-infrastructuur) kunnen cookies of vergelijkbare
                technieken verwerken om de dienst te laten werken. We kiezen
                leveranciers zorgvuldig en delen alleen wat nodig is voor die
                functie.
              </p>
              <p>
                We verkopen jouw cookiegegevens niet aan derden voor
                advertentiedoeleinden.
              </p>
            </Section>

            <Section id="beheer" title="7. Cookies beheren">
              <p>
                Je kunt cookies beheren of verwijderen via de instellingen van
                je browser. Je kunt ook instellen dat nieuwe cookies worden
                geweigerd. Houd er rekening mee dat het platform dan mogelijk
                niet volledig werkt — bijvoorbeeld inloggen of het onthouden
                van voorkeuren.
              </p>
              <p>
                Instructies verschillen per browser. Zoek in de helpfunctie van
                je browser naar “cookies” of “sitegegevens” voor de actuele
                stappen.
              </p>
            </Section>

            <Section id="bewaartermijnen" title="8. Bewaartermijnen">
              <p>
                Sessiecookies verdwijnen meestal wanneer je de browser sluit.
                Persistente cookies blijven langer staan, tot ze verlopen of je
                ze verwijdert. De exacte duur hangt af van het doel (bijvoorbeeld
                sessiebeveiliging versus een voorkeursinstelling).
              </p>
              <p>
                Bewaartermijnen voor persoonsgegevens in bredere zin staan
                beschreven in onze privacyverklaring.
              </p>
            </Section>

            <Section id="wijzigingen" title="9. Wijzigingen">
              <p>
                We kunnen dit cookiebeleid bijwerken wanneer wetgeving,
                techniek of onze diensten wijzigen. De actuele versie staat
                altijd op deze pagina.
              </p>
              <p>Laatst bijgewerkt: {updated}.</p>
            </Section>

            <Section id="contact" title="10. Contact">
              <p>
                Vragen over cookies of privacy? Mail{" "}
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
                  href="/privacy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>{" "}
                en{" "}
                <Link
                  href="/voorwaarden"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  gebruiksvoorwaarden
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
