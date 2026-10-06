export const metadata = { title: "Takedown" };

export default function TakedownPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white">
        Notice & takedown
      </h1>
      <p className="mt-6 text-slate-300 leading-relaxed">
        Meen je dat content onrechtmatig is? Stuur een gemotiveerd verzoek naar{" "}
        <a className="text-teal-300" href="mailto:report@all-scams.com">
          report@all-scams.com
        </a>{" "}
        met URL, reden en contactgegevens. We streven ernaar zichtbaar onrechtmatige
        content snel te beoordelen.
      </p>
    </div>
  );
}
