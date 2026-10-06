import Link from "next/link";

export const metadata = { title: "Bedankt" };

export default function BedanktPage() {
  return (
    <div className="section-shell max-w-2xl py-24 text-center">
      <h1 className="font-display text-4xl text-ink">Bedankt voor je melding</h1>
      <p className="mt-4 text-muted">
        Ons team bekijkt je rapport. Na goedkeuring verschijnt het bij de
        openbare meldingen. Bij financieel verlies: doe ook aangifte en meld bij
        Fraudehelpdesk.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/meldingen" className="btn-ink text-sm">
          Naar meldingen
        </Link>
        <Link
          href="/"
          className="rounded-md border border-line bg-white px-4 py-2 text-sm text-ink"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
