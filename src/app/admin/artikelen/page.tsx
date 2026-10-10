import Link from "next/link";
import { listManagedGuides } from "@/lib/guides";

export const dynamic = "force-dynamic";

export const metadata = { title: "Kennisbank beheren" };

const statusLabel: Record<string, string> = {
  DRAFT: "Concept",
  PUBLISHED: "Live",
  ARCHIVED: "Gearchiveerd",
};

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const query = (sp.q ?? "").trim().toLowerCase();
  const status = sp.status ?? "ALL";
  const guides = await listManagedGuides();
  const visible = guides.filter((guide) => {
    if (status !== "ALL" && guide.status !== status) return false;
    if (!query) return true;
    return [guide.title, guide.slug, guide.excerpt, guide.categoryName, guide.parentName]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  return (
    <div className="section-shell py-10 md:py-14">
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="font-display text-4xl text-ink">Kennisbank</h1>
          <p className="mt-2 text-muted">
            {visible.length} van {guides.length} gidsen. Live-artikelen staan op de kennisbank.
          </p>
        </div>
        <Link href="/admin/artikelen/nieuw" className="btn-primary text-sm">
          Nieuw artikel
        </Link>
      </div>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input name="q" defaultValue={sp.q ?? ""} placeholder="Zoek op titel, slug of categorie" className="input-field sm:max-w-sm" />
        <select name="status" defaultValue={status} className="input-field sm:max-w-48">
          <option value="ALL">Alle statussen</option>
          <option value="PUBLISHED">Live</option>
          <option value="DRAFT">Concept</option>
          <option value="ARCHIVED">Gearchiveerd</option>
        </select>
        <button className="btn-ink w-full sm:w-auto">Filteren</button>
      </form>

      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white/70">
        {visible.map((guide) => (
          <div key={guide.slug} className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-ink">{guide.title}</p>
              <p className="text-xs text-muted">
                {guide.parentName ? `${guide.parentName} · ` : ""}
                {guide.categoryName ?? "Geen categorie"}
                {` · ${statusLabel[guide.status] ?? guide.status}`}
                {guide.source === "database" ? " · Eigen artikel" : ""}
              </p>
            </div>
            <div className="flex gap-4 text-sm font-semibold">
              {guide.status === "PUBLISHED" && (
                <Link href={`/kennisbank/${guide.slug}`} className="text-muted hover:text-ink">
                  Bekijken
                </Link>
              )}
              <Link href={`/admin/artikelen/${guide.slug}`} className="text-accent hover:underline">
                Bewerken
              </Link>
            </div>
          </div>
        ))}
        {visible.length === 0 && <p className="px-4 py-8 text-center text-muted">Geen artikelen gevonden.</p>}
      </div>
    </div>
  );
}
