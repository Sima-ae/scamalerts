import { ReportForm } from "@/components/report-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scam melden",
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
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
        Meld een scam
      </h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        Je melding helpt anderen. Geen account nodig — wel moderatie voordat
        content openbaar wordt. Voeg zoveel feiten toe als je veilig kunt delen.
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
