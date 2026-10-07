import { BRAND_NAME, BRAND_DOMAIN } from "@/lib/brand";
import { PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "Over ons",
  description: `Over ${BRAND_NAME}: het platform om websites te controleren, scams te melden en fraude beter te begrijpen.`,
};

export default function OverOnsPage() {
  return (
    <PageShell
      hero={{
        eyebrow: "Platform",
        title: `Over ${BRAND_NAME}`,
        description:
          "Onafhankelijk, Nederlandstalig en zonder paniektaal: zo helpen we je online fraude eerder te herkennen.",
      }}
    >
      <div className="prose-page mx-auto space-y-4 text-center leading-relaxed text-muted md:text-left">
        <p>
          {BRAND_NAME} ({BRAND_DOMAIN}) is een Nederlandstalig platform om
          websites te checken, verdachte praktijken te melden en heldere uitleg
          te geven over online fraude. We richten ons op mensen die snel willen
          weten of iets pluis is — zonder paniektaal of vage claims.
        </p>
        <p>
          We combineren technische signalen met gemodereerde gebruikersmeldingen
          en redactionele kennisbank-artikelen. Onze Trust Score is geen koopwaar:
          betaalde zichtbaarheid of accreditatie staat los van risicoscores.
        </p>
        <p>
          Bij schade raden we altijd aan om melding te doen bij Fraudehelpdesk en
          — waar nodig — aangifte te doen bij de politie. {BRAND_NAME} is een
          hulpmiddel voor oriëntatie, geen vervanging van officiële instanties.
        </p>
        <p>
          Zie je iets dat niet klopt op het platform? Gebruik de takedown-pagina
          of mail ons. We willen snel, zorgvuldig en eerlijk blijven.
        </p>
      </div>
    </PageShell>
  );
}
