import {
  Globe,
  Lock,
  CalendarClock,
  ArrowLeftRight,
  Copy,
  Users,
} from "lucide-react";
import { DomainSearch } from "@/components/domain-search";
import { PageShell } from "@/components/ui/page-shell";
import { AnimatedItem } from "@/components/ui/animated-section";
import { MEDIA } from "@/lib/media";

export const metadata = {
  title: "Website controleren",
  description:
    "Controleer een domein of URL bij All Scams. Ontvang een Trust Score op basis van technische signalen en meldingen.",
};

const checks = [
  {
    icon: Globe,
    title: "DNS & e-mail",
    text: "Lost het domein op, en zijn MX, SPF en DMARC netjes ingericht?",
  },
  {
    icon: Lock,
    title: "TLS-certificaat",
    text: "Uitgever, geldigheid en of de keten vertrouwd wordt.",
  },
  {
    icon: CalendarClock,
    title: "Domeinleeftijd",
    text: "Registratiedatum via RDAP — jonge domeinen verdienen extra aandacht.",
  },
  {
    icon: ArrowLeftRight,
    title: "HTTPS & redirects",
    text: "Waar je écht uitkomt, en of dat past bij het domein.",
  },
  {
    icon: Copy,
    title: "Nabootsing",
    text: "Typosquats en lookalikes van bekende merken en overheidsdiensten.",
  },
  {
    icon: Users,
    title: "Community",
    text: "Gemodereerde meldingen van andere bezoekers over dit domein.",
  },
];

export default function ControlerenPage() {
  return (
    <PageShell
      hero={{
        eyebrow: "Controleren",
        title: "Controleer een website",
        description:
          "Plak een domein of volledige URL. Je krijgt een Trust Score met uitleg per signaal. Geen juridisch oordeel — wel een snelle, onderbouwde risico-indicatie.",
        media: MEDIA.signals,
        children: <DomainSearch large variant="hero" />,
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Wat we onderzoeken
        </p>
        <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl">
          Zes signalen, één score
        </h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-lg gap-4 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
        {checks.map((check, i) => (
          <AnimatedItem key={check.title} delay={i * 0.05}>
            <div className="flex h-full flex-col items-center rounded-xl border border-line bg-white/75 p-6 text-center sm:items-start sm:text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <check.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-4 text-xl text-ink">{check.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{check.text}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </PageShell>
  );
}
