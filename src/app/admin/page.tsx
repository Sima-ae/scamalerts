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
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-teal-300/80">
        Admin
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-white">
        Moderatie & overzicht
      </h1>

      <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
        {stats.map((s) => (
          <div key={s.status} className="rounded-md border border-white/10 px-4 py-3">
            <p className="text-xs uppercase text-slate-500">{s.status}</p>
            <p className="text-2xl text-white">{s._count}</p>
          </div>
        ))}
        <Link
          href="/admin/artikelen"
          className="rounded-md border border-teal-400/40 px-4 py-3 text-teal-300"
        >
          CMS artikelen →
        </Link>
      </div>

      <h2 className="mt-12 text-2xl text-white">Wachtend op moderatie</h2>
      <div className="mt-4 space-y-6">
        {pending.map((report) => (
          <article
            key={report.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">
                  {formatDateNL(report.createdAt)}
                  {report.category ? ` · ${report.category.name}` : ""}
                </p>
                <h3 className="mt-1 text-lg text-white">{report.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{report.description}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {report.domain?.domain ?? report.identifierValue ?? "geen domein"}
                  {report.reporterEmail ? ` · ${report.reporterEmail}` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <form action={moderateReport}>
                  <input type="hidden" name="id" value={report.id} />
                  <input type="hidden" name="action" value="APPROVED" />
                  <button className="rounded-md bg-teal-400 px-3 py-1.5 text-sm font-medium text-[#062018]">
                    Goedkeuren
                  </button>
                </form>
                <form action={moderateReport}>
                  <input type="hidden" name="id" value={report.id} />
                  <input type="hidden" name="action" value="REJECTED" />
                  <button className="rounded-md border border-rose-400/40 px-3 py-1.5 text-sm text-rose-300">
                    Afwijzen
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
        {pending.length === 0 && (
          <p className="text-slate-400">Geen openstaande meldingen.</p>
        )}
      </div>
    </div>
  );
}
