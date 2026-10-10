import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import type { ReportStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata = { title: "Meldingen beheren" };

const filters: { id: "ALL" | ReportStatus; label: string }[] = [
  { id: "ALL", label: "Alles" },
  { id: "PENDING", label: "Moderatie" },
  { id: "APPROVED", label: "Gepubliceerd" },
  { id: "REJECTED", label: "Afgewezen" },
  { id: "HIDDEN", label: "Verborgen" },
];

const statusLabel: Record<string, string> = {
  PENDING: "Wacht op moderatie",
  APPROVED: "Gepubliceerd",
  REJECTED: "Afgewezen",
  HIDDEN: "Verborgen",
};

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const status = filters.some((item) => item.id === sp.status) ? sp.status : "ALL";
  const query = sp.q?.trim() ?? "";

  const reports = await prisma.scamReport
    .findMany({
      where: {
        ...(status !== "ALL" ? { status: status as ReportStatus } : {}),
        ...(query
          ? {
              OR: [
                { title: { contains: query } },
                { description: { contains: query } },
                { domain: { domain: { contains: query } } },
              ],
            }
          : {}),
      },
      include: { category: true, domain: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    .catch(() => []);

  return (
    <div className="section-shell py-10 md:py-14">
      <h1 className="font-display text-center text-4xl text-ink md:text-left">Meldingen</h1>
      <p className="mt-2 text-center text-muted md:text-left">
        Bekijk, bewerk en moderereer meldingen. Gepubliceerde meldingen staan op /meldingen.
      </p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input name="q" defaultValue={query} placeholder="Zoek op titel, tekst of domein" className="input-field sm:max-w-sm" />
        {status !== "ALL" && <input type="hidden" name="status" value={status} />}
        <button className="btn-ink w-full sm:w-auto">Zoeken</button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
        {filters.map((filter) => (
          <Link
            key={filter.id}
            href={filter.id === "ALL" ? "/admin/meldingen" : `/admin/meldingen?status=${filter.id}`}
            className={`rounded-full px-3 py-1 text-sm ${
              status === filter.id ? "bg-ink text-white" : "border border-line bg-white text-ink"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white/70">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-ink">{report.title}</p>
              <p className="text-xs text-muted">
                {formatDateNL(report.createdAt)}
                {report.category ? ` · ${report.category.name}` : ""}
                {report.domain ? ` · ${report.domain.domain}` : ""}
                {` · ${statusLabel[report.status] ?? report.status}`}
              </p>
            </div>
            <Link href={`/admin/meldingen/${report.id}`} className="text-sm font-semibold text-accent hover:underline">
              Bekijken en bewerken
            </Link>
          </div>
        ))}
        {reports.length === 0 && <p className="px-4 py-8 text-center text-muted">Geen meldingen gevonden.</p>}
      </div>
    </div>
  );
}
