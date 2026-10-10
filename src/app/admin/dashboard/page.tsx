import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { listManagedGuides, listPublishedGuides } from "@/lib/guides";
import { moderateReport } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin dashboard" };

const reportLabel: Record<string, string> = {
  PENDING: "Wacht op moderatie",
  APPROVED: "Gepubliceerd",
  REJECTED: "Afgewezen",
  HIDDEN: "Verborgen",
};

export default async function AdminDashboardPage() {
  const [reportGroups, pending, published, managed] = await Promise.all([
    prisma.scamReport
      .groupBy({ by: ["status"], _count: { _all: true } })
      .catch(() => []),
    prisma.scamReport
      .findMany({
        where: { status: "PENDING" },
        include: { category: true, domain: true },
        orderBy: { createdAt: "asc" },
        take: 8,
      })
      .catch(() => []),
    listPublishedGuides(),
    listManagedGuides(),
  ]);

  const reportCount = Object.fromEntries(
    reportGroups.map((row) => [row.status, row._count._all]),
  ) as Record<string, number>;
  const totalReports = Object.values(reportCount).reduce((sum, n) => sum + n, 0);
  const drafts = managed.filter((guide) => guide.status === "DRAFT").length;
  const archived = managed.filter((guide) => guide.status === "ARCHIVED").length;

  const stats = [
    { label: "Meldingen", value: totalReports, href: "/admin/meldingen" },
    { label: "Wacht op moderatie", value: reportCount.PENDING ?? 0, href: "/admin/meldingen?status=PENDING" },
    { label: "Gepubliceerde meldingen", value: reportCount.APPROVED ?? 0, href: "/admin/meldingen?status=APPROVED" },
    { label: "Kennisbank live", value: published.length, href: "/admin/artikelen" },
    { label: "Conceptartikelen", value: drafts, href: "/admin/artikelen" },
    { label: "Gearchiveerde gidsen", value: archived, href: "/admin/artikelen" },
  ];

  return (
    <div className="section-shell py-10 md:py-14">
      <h1 className="font-display text-center text-4xl text-ink md:text-left">
        Dashboard
      </h1>
      <p className="mt-2 text-center text-muted md:text-left">
        Meldingen, moderatie en kennisbank op één plek. Wijzigingen zijn direct zichtbaar op de site.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-line bg-white/80 p-5 transition hover:border-accent/40"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </p>
            <p className="font-display mt-2 text-4xl text-ink">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-3 md:flex-row">
        <h2 className="font-display text-2xl text-ink">Wachtend op moderatie</h2>
        <Link href="/admin/meldingen?status=PENDING" className="text-sm font-semibold text-accent hover:underline">
          Alle openstaande meldingen
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {pending.map((report) => (
          <article key={report.id} className="rounded-2xl border border-line bg-white/80 p-5">
            <p className="text-xs text-muted">
              {formatDateNL(report.createdAt)}
              {report.category ? ` · ${report.category.name}` : ""}
              {report.domain ? ` · ${report.domain.domain}` : ""}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{report.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{report.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/admin/meldingen/${report.id}`} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink">
                Bekijken
              </Link>
              {(["APPROVED", "REJECTED", "HIDDEN"] as const).map((action) => (
                <form key={action} action={moderateReport}>
                  <input type="hidden" name="id" value={report.id} />
                  <input type="hidden" name="action" value={action} />
                  <button className="rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink">
                    {reportLabel[action]}
                  </button>
                </form>
              ))}
            </div>
          </article>
        ))}
        {pending.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line px-5 py-8 text-center text-muted">
            Geen meldingen die op moderatie wachten.
          </p>
        )}
      </div>
    </div>
  );
}
