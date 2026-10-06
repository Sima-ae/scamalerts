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
      include: { domain: true, category: true, author: true },
      orderBy: { createdAt: "asc" },
      take: 50,
    }),
    prisma.scamReport.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  return (
    <div className="section-shell py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Admin
      </p>
      <h1 className="font-display mt-2 text-4xl text-ink">
        Moderatie & overzicht
      </h1>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
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
            <div className="flex flex-wrap items-start justify-between gap-3">
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
              </div>
              <div className="flex gap-2">
                <form action={moderateReport}>
                  <input type="hidden" name="id" value={report.id} />
                  <input type="hidden" name="action" value="APPROVED" />
                  <button className="btn-ink px-3 py-1.5 text-sm">
                    Goedkeuren
                  </button>
                </form>
                <form action={moderateReport}>
                  <input type="hidden" name="id" value={report.id} />
                  <input type="hidden" name="action" value="REJECTED" />
                  <button className="rounded-md border border-danger/40 px-3 py-1.5 text-sm text-danger">
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
