import Link from "next/link";

export default function BedanktPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white">
        Bedankt voor je melding
      </h1>
      <p className="mt-4 text-slate-300">
        Ons team beoordeelt je rapport. Bij goedkeuring verschijnt het in de
        openbare meldingen. Bij financieel verlies: doe ook aangifte en meld bij
        Fraudehelpdesk.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/meldingen"
          className="rounded-md bg-teal-400 px-4 py-2 font-medium text-[#062018]"
        >
          Naar meldingen
        </Link>
        <Link
          href="/"
          className="rounded-md border border-white/15 px-4 py-2 text-slate-200"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
