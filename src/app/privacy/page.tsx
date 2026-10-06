import { BRAND_NAME, BRAND_DOMAIN } from "@/lib/brand";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="section-shell prose-page py-14 md:py-16">
      <h1 className="font-display text-4xl text-ink">
        Privacyverklaring (AVG)
      </h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          {BRAND_NAME} ({BRAND_DOMAIN}) verwerkt persoonsgegevens alleen voor
          accountbeheer, scam-meldingen, moderatie, beveiliging en het
          verbeteren van het platform.
        </p>
        <p>
          Meldingen kunnen na moderatie (gedeeltelijk) openbaar worden.
          Gevoelige gegevens zoals volledige bankrekeningnummers,
          identiteitsdocumenten of wachtwoorden hoef je niet te delen in
          openbare velden — en dat raden we ook af.
        </p>
        <p>
          We bewaren gegevens niet langer dan nodig voor deze doelen of dan
          wettelijk vereist is. Voor inzage, correctie of verwijdering kun je
          contact opnemen via privacy@{BRAND_DOMAIN}.
        </p>
        <p>
          Waar we diensten van derden gebruiken (hosting, e-mail, analytics),
          doen we dat met passende afspraken. Deze verklaring kan worden
          bijgewerkt; de meest recente versie staat altijd op deze pagina.
        </p>
      </div>
    </div>
  );
}
