import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { loadCategoryOptGroups } from "@/lib/categories";
import { deleteReport, saveReport } from "@/app/admin/actions";
import { requireRole } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export const metadata = { title: "Melding bewerken" };

export default async function AdminReportEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const [report, groups] = await Promise.all([
    prisma.scamReport.findUnique({
      where: { id },
      include: { domain: true, category: true, evidence: true },
    }),
    loadCategoryOptGroups(),
  ]);
  if (!report) notFound();

  return (
    <div className="section-shell py-10 md:py-14">
      <Link href="/admin/meldingen" className="text-sm font-semibold text-accent hover:underline">
        ← Alle meldingen
      </Link>
      <h1 className="font-display mt-4 text-4xl text-ink">Melding bewerken</h1>
      {report.domain && (
        <p className="mt-2 text-sm text-muted">
          Domein:{" "}
          <Link href={`/controleren/${report.domain.domain}`} className="text-accent hover:underline">
            {report.domain.domain}
          </Link>
        </p>
      )}

      <form action={saveReport} className="mt-8 max-w-3xl space-y-4">
        <input type="hidden" name="id" value={report.id} />
        <label className="block text-sm font-medium text-ink">
          Titel
          <input name="title" required defaultValue={report.title} className="input-field mt-1" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Beschrijving
          <textarea name="description" required defaultValue={report.description} rows={8} className="input-field mt-1" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Kanaal
          <input name="channel" defaultValue={report.channel ?? ""} className="input-field mt-1" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Status
          <select name="status" defaultValue={report.status} className="input-field mt-1">
            <option value="PENDING">Wacht op moderatie</option>
            <option value="APPROVED">Gepubliceerd</option>
            <option value="REJECTED">Afgewezen</option>
            <option value="HIDDEN">Verborgen</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Categorie
          <select name="categoryId" defaultValue={report.categoryId ?? ""} className="input-field mt-1">
            <option value="">Geen categorie</option>
            {groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        {report.evidence.length > 0 && (
          <p className="text-sm text-muted">{report.evidence.length} bewijsbestand(en) gekoppeld.</p>
        )}
        <button className="btn-ink">Opslaan</button>
      </form>

      {session.user.role === "ADMIN" && (
        <form action={deleteReport} className="mt-8">
          <input type="hidden" name="id" value={report.id} />
          <button className="text-sm font-semibold text-red-700">Melding verwijderen</button>
        </form>
      )}
    </div>
  );
}
