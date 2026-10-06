import { ReportForm } from "@/components/report-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scam melden",
  description:
    "Meld een scam bij All Scams. Je rapport helpt anderen en wordt eerst gemodereerd voordat het openbaar is.",
};

export default async function MeldenPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string }>;
}) {
  const sp = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="section-shell py-14 md:py-16">
      <h1 className="font-display text-4xl text-ink md:text-5xl">
        Meld een scam
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Deel wat je hebt meegemaakt zodat anderen eerder doorhebben wat er
        speelt. Een account is niet verplicht; wel moderatie voordat iets
        openbaar wordt. Beschrijf feiten die je veilig kunt delen.
      </p>
      <div className="mt-10">
        <ReportForm
          categories={categories}
          initialDomain={sp.domain ?? ""}
        />
      </div>
    </div>
  );
}
