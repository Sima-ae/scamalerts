import { BRAND_NAME } from "@/lib/brand";

export const metadata = { title: "Contentrichtlijnen" };

export default function ContentGuidelinesPage() {
  return (
    <div className="section-shell prose-page py-14 md:py-16">
      <h1 className="font-display text-4xl text-ink">Contentrichtlijnen</h1>
      <p className="mt-4 text-muted">
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
    </div>
  );
}
