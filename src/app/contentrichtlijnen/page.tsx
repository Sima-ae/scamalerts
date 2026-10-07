import { BRAND_NAME } from "@/lib/brand";
import { PageShell } from "@/components/ui/page-shell";

export const metadata = { title: "Contentrichtlijnen" };

export default function ContentGuidelinesPage() {
  return (
    <PageShell
      narrow
      hero={{ eyebrow: "Community", title: "Contentrichtlijnen" }}
    >
      <p className="text-muted">
        Zo houden we {BRAND_NAME} bruikbaar en veilig voor iedereen:
      </p>
      <ul className="mt-6 list-disc space-y-3 pl-5 text-muted">
        <li>
          Beschrijf feiten: wat gebeurde er, wanneer, via welk kanaal, welk
          bedrag of welke belofte.
        </li>
        <li>
          Geen doxing van privépersonen. Focus op domeinen, methodes en
          openbaar herkenbare signalen.
        </li>
        <li>Geen haatzaaien, dreigementen of illegale content.</li>
        <li>
          Upload alleen bewijs als je daar rechten voor hebt en gevoelige data
          hebt afgeschermd.
        </li>
        <li>
          Geen wachtwoorden, volledige IBAN’s of kopieën van ID-bewijzen in
          openbare velden.
        </li>
      </ul>
    </PageShell>
  );
}
