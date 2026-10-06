export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 prose-like">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white">
        Privacyverklaring (AVG)
      </h1>
      <div className="mt-6 space-y-4 text-slate-300 leading-relaxed">
        <p>
          all-scams.com verwerkt persoonsgegevens alleen voor accountbeheer,
          scam-meldingen, moderatie en beveiliging van het platform.
        </p>
        <p>
          Meldingen kunnen (gedeeltelijk) openbaar worden na moderatie. Gevoelige
          gegevens zoals volledige bankrekeningnummers of identiteitsdocumenten
          hoef je niet te delen in openbare velden.
        </p>
        <p>
          Voor inzage, correctie of verwijdering kun je contact opnemen via
          privacy@all-scams.com.
        </p>
      </div>
    </div>
  );
}
