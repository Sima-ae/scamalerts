import { BRAND_DOMAIN, BRAND_NAME } from "@/lib/brand";
import { PageShell } from "@/components/ui/page-shell";

export const metadata = { title: "Takedown" };

export default function TakedownPage() {
  return (
    <PageShell
      narrow
      hero={{ eyebrow: "Juridisch", title: "Notice & takedown" }}
    >
      <p className="leading-relaxed text-muted">
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
    </PageShell>
  );
}
