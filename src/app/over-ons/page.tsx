export const metadata = { title: "Over ons" };

export default function OverOnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
        Over Scam Alerts
      </h1>
      <div className="mt-6 space-y-4 text-slate-300 leading-relaxed">
        <p>
          Scam Alerts op <strong className="text-white">all-scams.com</strong>{" "}
          is een Nederlands platform om websites te controleren, scams te melden
          en betrouwbare uitleg te bieden over fraude.
        </p>
        <p>
          We combineren technische signalen met gemodereerde gebruikersmeldingen
          en redactionele kennisbank-artikelen. Onze Trust Score is geen
          koopwaar: betaalde accreditatie staat los van risicoscores.
        </p>
        <p>
          Bij schade raden we altijd aan om melding te doen bij Fraudehelpdesk en
          aangifte te doen bij de politie.
        </p>
      </div>
    </div>
  );
}
