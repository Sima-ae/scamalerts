import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import { AnimatedItem } from "@/components/ui/animated-section";

export const metadata = {
  title: "Voor bedrijven",
  description: `Claim je domein bij ${BRAND_NAME}, reageer op meldingen en laat zien hoe jullie omgaan met misbruik van jullie merk.`,
};

export default function ZakelijkPage() {
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
      <div className="mx-auto grid max-w-lg gap-10 text-center sm:max-w-none md:grid-cols-3 md:text-left">
        {[
          {
            title: "Domein claimen",
            text: "Koppel je bedrijf aan het juiste domein en voorkom verwarring met nagebootste sites.",
          },
          {
            title: "Score blijft onafhankelijk",
            text: "Claimen of zichtbaarheid kopen verandert de Trust Score niet. Transparantie wel.",
          },
          {
            title: "Sneller reageren",
            text: "Wees bereikbaar wanneer iemand een melding plaatst over jullie merk of een lookalike.",
          },
        ].map((item, i) => (
          <AnimatedItem key={item.title} delay={i * 0.08}>
            <h2 className="font-display text-2xl text-ink">{item.title}</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted md:mx-0 md:max-w-none">
              {item.text}
            </p>
          </AnimatedItem>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
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
    </PageShell>
  );
}
