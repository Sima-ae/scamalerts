import { ReportForm } from "@/components/report-form";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import { loadCategoryOptGroups } from "@/lib/categories";

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
  const categories = await loadCategoryOptGroups();

  return (
    <PageShell
      hero={{
        eyebrow: "Melden",
        title: "Meld een scam",
        description:
          "Deel wat je hebt meegemaakt zodat anderen eerder doorhebben wat er speelt. Een account is niet verplicht; wel moderatie voordat iets openbaar wordt.",
        media: MEDIA.community,
      }}
    >
      <div className="mx-auto max-w-2xl">
        <ReportForm
          categories={categories}
          initialDomain={sp.domain ?? ""}
        />
      </div>
    </PageShell>
  );
}
