import Link from "next/link";
import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { moderateReport } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireRole(["ADMIN", "EDITOR"]);

  const [pending, stats] = await Promise.all([
    prisma.scamReport.findMany({
      where: { status: "PENDING" },
      include: {
        domain: true,
        category: true,
        author: true,
        evidence: { select: { id: true, filename: true, mimeType: true } },
      },
      orderBy: { createdAt: "asc" },
      take: 50,
    }),
    prisma.scamReport.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  return (
    <div className="section-shell py-12 text-center md:py-16 md:text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Admin
      </p>
      <h1 className="font-display mt-2 text-4xl text-ink">
        Moderatie en overzicht
      </h1>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm md:justify-start">
        {stats.map((s) => (
          <div key={s.status} className="border border-line bg-white px-4 py-3">
            <p className="text-xs uppercase text-muted">{s.status}</p>
            <p className="text-2xl font-semibold text-ink">{s._count}</p>
          </div>
        ))}
        <Link
          href="/admin/artikelen"
          className="border border-accent/40 bg-accent-soft px-4 py-3 font-medium text-accent"
        >
          CMS artikelen →
        </Link>
      </div>

      <h2 className="mt-12 text-2xl font-semibold text-ink">
        Wachtend op moderatie
      </h2>
      <div className="mt-4 space-y-6">
        {pending.map((report) => (
          <article
            key={report.id}
            className="border border-line bg-white p-5"
          >
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs text-muted">
                  {formatDateNL(report.createdAt)}
                  {report.category ? ` · ${report.category.name}` : ""}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink">
                  {report.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{report.description}</p>
                <p className="mt-2 text-xs text-muted">
                  {report.domain?.domain ??
                    report.identifierValue ??
                    "geen domein"}
                  {report.reporterEmail ? ` · ${report.reporterEmail}` : ""}
                </p>
                {report.evidence.length > 0 && (
                  <p className="mt-2 text-xs text-ink">
                    {report.evidence.length}{" "}
                    {report.evidence.length === 1 ? "bijlage" : "bijlagen"}
                    {": "}
                    {report.evidence.map((f) => f.filename).join(", ")}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <form action={moderateReport} className="w-full sm:w-auto">
                  <input type="hidden" name="id" value={report.id} />
                  <input type="hidden" name="action" value="APPROVED" />
                  <button className="btn-ink w-full px-3 py-1.5 text-sm sm:w-auto">
                    Goedkeuren
                  </button>
                </form>
                <form action={moderateReport} className="w-full sm:w-auto">
                  <input type="hidden" name="id" value={report.id} />
                  <input type="hidden" name="action" value="REJECTED" />
                  <button className="w-full rounded-md border border-danger/40 px-3 py-1.5 text-sm text-danger sm:w-auto">
                    Afwijzen
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
        {pending.length === 0 && (
          <p className="text-muted">Geen openstaande meldingen.</p>
        )}
      </div>
    </div>
  );
}
