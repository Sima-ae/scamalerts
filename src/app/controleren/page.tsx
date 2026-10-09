import Link from "next/link";
import {
  ShieldAlert,
  Copy,
  CalendarClock,
  Globe,
  Users,
} from "lucide-react";
import { DomainSearch } from "@/components/domain-search";
import { PageShell } from "@/components/ui/page-shell";
import { AnimatedItem } from "@/components/ui/animated-section";
import { MEDIA } from "@/lib/media";

export const metadata = {
  title: "Website controleren",
  description:
    "Controleer een domein of URL bij All Scams. De Trust Score combineert dreigingslijsten, nabootsing, registratie, technische signalen en meldingen.",
};

const groups = [
  {
    icon: ShieldAlert,
    title: "Reputatie en dreigingslijsten",
    text: "Of het domein al bekend is bij dreigingsfeeds, en hoe bekend het is bij gewone bezoekers.",
    href: "/kennisbank?onderwerp=phishing-malwarelijsten",
    signals: [
      {
        title: "Phishing- en malwarelijsten",
        text: "Cloudflare Security DNS, Quad9 en de OpenPhish-feed. Google Safe Browsing en abuse.ch URLhaus tellen mee wanneer die bronnen beschikbaar zijn.",
        href: "/kennisbank?onderwerp=phishing-malwarelijsten",
      },
      {
        title: "Populariteit",
        text: "Positie op de Tranco-ranglijst van veelbezochte domeinen, op basis van 30 dagen verkeersdata. Kleinere en nieuwe sites staan er meestal niet op.",
        href: "/kennisbank?onderwerp=tranco-populariteit",
      },
    ],
  },
  {
    icon: Copy,
    title: "Nabootsing en domeinnaam",
    text: "Of de naam op een merk, bank of overheidsdienst lijkt, en of de opbouw zelf opvalt.",
    href: "/kennisbank?onderwerp=nabootsing",
    signals: [
      {
        title: "Merk- en domeinnabootsing",
        text: "Typosquats, lookalike-tekens, merkwoorden met login-termen en verwisselde extensies van banken, webshops en overheidsdiensten.",
        href: "/kennisbank?onderwerp=nabootsing",
      },
      {
        title: "Opbouw van de naam",
        text: "Veel koppeltekens, een lange cijferreeks, diepe subdomeinen of een extreem lange naam. Dat patroon komt vaak voor bij wegwerpdomeinen.",
        href: "/kennisbank?onderwerp=domeinnaam-opbouw",
      },
      {
        title: "Domeinextensie",
        text: "Extensies die in publieke misbruikstatistieken relatief vaak voorkomen. Een zwak signaal naast de rest van de scan.",
        href: "/kennisbank?onderwerp=domeinextensie",
      },
      {
        title: "Internationale tekens",
        text: "Niet-Latijnse of verwisselbare tekens in de naam, inclusief de technische punycode-vorm.",
        href: "/kennisbank?onderwerp=idn-tekens",
      },
    ],
  },
  {
    icon: CalendarClock,
    title: "Registratie en certificaat",
    text: "Hoe lang het domein bestaat en of de verbinding een geldig certificaat heeft.",
    href: "/kennisbank?onderwerp=domeinleeftijd",
    signals: [
      {
        title: "Domeinregistratie",
        text: "Leeftijd, registrar en vervaldatum via het domeinregister. Zeer jonge of niet-geregistreerde domeinen wegen zwaar.",
        href: "/kennisbank?onderwerp=domeinregistratie",
      },
      {
        title: "TLS-certificaat",
        text: "Uitgever, geldigheid en of browsers de certificaatketen vertrouwen. Versleuteling zegt niets over de eigenaar.",
        href: "/kennisbank?onderwerp=tls-certificaat",
      },
    ],
  },
  {
    icon: Globe,
    title: "Technisch",
    text: "Of de site bereikbaar is, waar je uitkomt, en hoe e-mail namens dit domein is ingericht.",
    href: "/kennisbank?onderwerp=dns-en-email",
    signals: [
      {
        title: "DNS-resolutie",
        text: "Of het domein naar een webserver wijst, via IPv4 of IPv6.",
        href: "/kennisbank?onderwerp=dns-en-email",
      },
      {
        title: "E-mailbeveiliging",
        text: "MX-records plus SPF en DMARC: of anderen mail namens dit domein kunnen versturen.",
        href: "/kennisbank?onderwerp=dns-en-email",
      },
      {
        title: "Bereikbaarheid en doorverwijzing",
        text: "Of de site antwoordt, en of je op een ander domein uitkomt dan het adres dat je invoerde.",
        href: "/kennisbank?onderwerp=https-en-redirects",
      },
    ],
  },
  {
    icon: Users,
    title: "Community",
    text: "Wat andere bezoekers over dit domein hebben gemeld, na moderatie.",
    href: "/kennisbank?onderwerp=community-meldingen",
    signals: [
      {
        title: "Community-meldingen",
        text: "Goedgekeurde meldingen wegen mee in de score. Geen meldingen betekent niet dat een site veilig is.",
        href: "/kennisbank?onderwerp=community-meldingen",
      },
    ],
  },
];

export default function ControlerenPage() {
  return (
    <PageShell
      hero={{
        eyebrow: "Controleren",
        title: "Controleer een website",
        description:
          "Plak een domein of volledige URL. Je krijgt een Trust Score met uitleg per signaal: dreigingslijsten, nabootsing, registratie, techniek en meldingen.",
        media: MEDIA.signals,
        children: <DomainSearch large variant="hero" />,
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Wat we onderzoeken
        </p>
        <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl">
          Meerdere controles, één score
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          Elke scan haalt deze signalen live op. Opbouw, extensie en
          internationale tekens verschijnen alleen wanneer ze op dit domein van
          toepassing zijn.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {groups.map((group, i) => (
          <AnimatedItem key={group.title} delay={i * 0.05}>
            <article className="rounded-xl border border-line bg-white/75 p-6 md:p-8">
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-5 md:text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <group.icon className="h-5 w-5" />
                </span>
                <div className="mt-4 min-w-0 md:mt-0">
                  <h3 className="font-display text-2xl text-ink">
                    <Link href={group.href} className="hover:text-accent">
                      {group.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {group.text}
                  </p>
                </div>
              </div>
              <ul
                className={`mt-6 grid gap-3 ${
                  group.signals.length > 1 ? "sm:grid-cols-2" : ""
                }`}
              >
                {group.signals.map((signal) => (
                  <li
                    key={signal.title}
                    className="rounded-lg border border-line/80 bg-white/80 px-4 py-3.5 text-center md:text-left"
                  >
                    <p className="font-semibold text-ink">
                      <Link href={signal.href} className="hover:text-accent">
                        {signal.title}
                      </Link>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {signal.text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedItem>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-line bg-white/60 p-6 text-center md:p-8 md:text-left">
        <h2 className="font-display text-2xl text-ink md:text-3xl">
          Hoe de score tot stand komt
        </h2>
        <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-muted md:mx-0 md:text-base">
          De score start op 50 en elk signaal telt op of af. Een vermelding op
          een dreigingslijst, sterke merknabootsing of meerdere goedgekeurde
          meldingen begrenzen de score, ook als certificaat en DNS er netjes
          uitzien. Bronnen die niet bereikbaar waren tellen niet mee.{" "}
          <Link
            href="/kennisbank?onderwerp=trust-score"
            className="font-semibold text-accent hover:underline"
          >
            Lees alle gidsen over de Trust Score
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
