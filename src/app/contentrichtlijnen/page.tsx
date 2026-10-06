export const metadata = { title: "Contentrichtlijnen" };

export default function ContentGuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white">
        Contentrichtlijnen
      </h1>
      <ul className="mt-6 list-disc space-y-3 pl-5 text-slate-300">
        <li>Beschrijf feiten: wat, wanneer, welk kanaal, welk bedrag.</li>
        <li>Geen doxing van privépersonen; focus op domeinen en methodes.</li>
        <li>Geen haatzaaien, dreigementen of illegale content.</li>
        <li>Bewijsupload alleen als je rechten hebt om te delen.</li>
      </ul>
    </div>
  );
}
