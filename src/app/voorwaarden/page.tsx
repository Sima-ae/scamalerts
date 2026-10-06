export const metadata = { title: "Voorwaarden" };

export default function VoorwaardenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white">
        Gebruiksvoorwaarden
      </h1>
      <div className="mt-6 space-y-4 text-slate-300 leading-relaxed">
        <p>
          Door all-scams.com te gebruiken accepteer je dat Trust Scores en
          content informatief zijn en geen juridisch advies vormen.
        </p>
        <p>
          Het is niet toegestaan om lasterlijke, onware of kwaadwillige meldingen
          te plaatsen. Wij behouden het recht content te weigeren, te verwijderen
          of accounts te blokkeren.
        </p>
      </div>
    </div>
  );
}
