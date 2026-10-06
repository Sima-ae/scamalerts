import { DomainSearch } from "@/components/domain-search";

export const metadata = {
  title: "Website controleren",
  description:
    "Controleer een domein of URL bij All Scams. Ontvang een Trust Score op basis van technische signalen en meldingen.",
};

export default function ControlerenPage() {
  return (
    <div className="section-shell py-14 md:py-20">
      <h1 className="font-display text-4xl text-ink md:text-5xl">
        Controleer een website
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Plak een domein of volledige URL. We berekenen een Trust Score met
        technische signalen, nabootsingspatronen en eerdere goedgekeurde
        meldingen. Geen juridisch oordeel — wel een snelle risico-indicatie.
      </p>
      <div className="mt-8">
        <DomainSearch large />
      </div>
    </div>
  );
}
