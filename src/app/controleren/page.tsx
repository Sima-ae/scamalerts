import { DomainSearch } from "@/components/domain-search";
import { PageShell, PageHero } from "@/components/ui/page-shell";

export const metadata = {
  title: "Website controleren",
  description:
    "Controleer een domein of URL bij All Scams. Ontvang een Trust Score op basis van technische signalen en meldingen.",
};

export default function ControlerenPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Controleren"
        title="Controleer een website"
        description="Plak een domein of volledige URL. We berekenen een Trust Score met technische signalen, nabootsingspatronen en eerdere goedgekeurde meldingen. Geen juridisch oordeel — wel een snelle risico-indicatie."
      >
        <div className="mx-auto flex max-w-2xl justify-center">
          <DomainSearch large />
        </div>
      </PageHero>
    </PageShell>
  );
}
