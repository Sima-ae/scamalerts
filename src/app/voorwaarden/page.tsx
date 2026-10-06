import { BRAND_NAME, BRAND_DOMAIN } from "@/lib/brand";

export const metadata = { title: "Voorwaarden" };

export default function VoorwaardenPage() {
  return (
    <div className="section-shell prose-page py-14 md:py-16">
      <h1 className="font-display text-4xl text-ink">Gebruiksvoorwaarden</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          Door {BRAND_DOMAIN} te gebruiken accepteer je dat Trust Scores,
          artikelen en meldingen informatief zijn. Ze vormen geen juridisch
          advies, geen garantie en geen officiële beoordeling door overheid of
          toezichthouder.
        </p>
        <p>
          Het is niet toegestaan om lasterlijke, aantoonbaar onware of
          kwaadwillige meldingen te plaatsen, of het platform te gebruiken voor
          spam, scraping of het omzeilen van beveiliging. Wij mogen content
          weigeren, verwijderen of accounts blokkeren.
        </p>
        <p>
          Je blijft zelf verantwoordelijk voor beslissingen die je neemt op basis
          van informatie op {BRAND_NAME}. Bij twijfel: stop de betaling, verifieer
          via officiële kanalen en schakel Fraudehelpdesk of politie in.
        </p>
      </div>
    </div>
  );
}
