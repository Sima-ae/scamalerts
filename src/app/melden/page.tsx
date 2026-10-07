import { ReportForm } from "@/components/report-form";
import { prisma } from "@/lib/prisma";
import { PageShell, PageHero } from "@/components/ui/page-shell";

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
  }).catch(() => []);

  return (
    <PageShell>
      <PageHero
        eyebrow="Melden"
        title="Meld een scam"
        description="Deel wat je hebt meegemaakt zodat anderen eerder doorhebben wat er speelt. Een account is niet verplicht; wel moderatie voordat iets openbaar wordt. Beschrijf feiten die je veilig kunt delen."
      />
      <div className="mx-auto mt-10 max-w-2xl">
        <ReportForm
          categories={categories}
          initialDomain={sp.domain ?? ""}
        />
      </div>
    </PageShell>
  );
}
