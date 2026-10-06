import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";

export const metadata = {
  title: "Voor bedrijven",
  description: `Claim je domein bij ${BRAND_NAME}, reageer op meldingen en laat zien hoe jullie omgaan met misbruik van jullie merk.`,
};

export default function ZakelijkPage() {
  return (
    <div className="section-shell py-14 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Zakelijk
      </p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl text-ink md:text-5xl">
        Laat zien dat jullie merk serieus omgaat met misbruik
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Scammers lenen graag bekende namen. Met een geclaimd profiel kun je
        bereikbaar zijn voor vragen, context geven bij meldingen en laten zien
        hoe klanten jullie échte kanalen herkennen.
      </p>

      <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
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
        ].map((item) => (
          <div key={item.title}>
            <h2 className="font-display text-2xl text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/zakelijk/claimen" className="btn-primary">
          Domein claimen
        </Link>
        <Link
          href="/registreren"
          className="rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink"
        >
          Eerst account aanmaken
        </Link>
      </div>
    </div>
  );
}
