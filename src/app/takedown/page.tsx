import { BRAND_DOMAIN, BRAND_NAME } from "@/lib/brand";

export const metadata = { title: "Takedown" };

export default function TakedownPage() {
  return (
    <div className="section-shell prose-page py-14 md:py-16">
      <h1 className="font-display text-4xl text-ink">Notice & takedown</h1>
      <p className="mt-6 leading-relaxed text-muted">
        Denk je dat content op {BRAND_NAME} onrechtmatig is of feitelijk
        onjuist? Stuur een gemotiveerd verzoek naar{" "}
        <a
          className="font-semibold text-accent hover:underline"
          href={`mailto:report@${BRAND_DOMAIN}`}
        >
          report@{BRAND_DOMAIN}
        </a>{" "}
        met de URL, je reden, eventueel bewijs en je contactgegevens. We streven
        ernaar zichtbaar onrechtmatige content snel te beoordelen en waar nodig
        aan te passen of te verwijderen.
      </p>
    </div>
  );
}
