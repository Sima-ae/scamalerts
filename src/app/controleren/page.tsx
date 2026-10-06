import { DomainSearch } from "@/components/domain-search";

export const metadata = {
  title: "Website controleren",
};

export default function ControlerenPage() {
  return (
    <div className="hero-glow mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
        Controleer een website
      </h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        Voer een domein of URL in. We berekenen een Trust Score op basis van
        technische signalen, nabootsingspatronen en eerdere meldingen.
      </p>
      <div className="mt-8">
        <DomainSearch large />
      </div>
    </div>
  );
}
