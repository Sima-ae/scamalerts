import { KENNISBANK_TAXONOMY } from "@/content/kennisbank/taxonomy";
import { deleteArticle, saveArticle } from "@/app/admin/actions";
import type { ManagedGuide } from "@/lib/guides";

export function ArticleForm({
  guide,
  isAdmin,
}: {
  guide?: ManagedGuide;
  isAdmin: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <form action={saveArticle} className="space-y-4">
        {guide && <input type="hidden" name="originalSlug" value={guide.slug} />}
        <label className="block text-sm font-medium text-ink">
          Titel
          <input name="title" required defaultValue={guide?.title ?? ""} className="input-field mt-1" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Slug
          <input name="slug" required defaultValue={guide?.slug ?? ""} className="input-field mt-1" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Samenvatting
          <textarea name="excerpt" rows={3} defaultValue={guide?.excerpt ?? ""} className="input-field mt-1" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Inhoud
          <textarea name="content" required rows={16} defaultValue={guide?.content ?? ""} className="input-field mt-1 font-mono text-sm" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Categorie
          <select name="categorySlug" defaultValue={guide?.categorySlug ?? ""} className="input-field mt-1">
            <option value="">Geen categorie</option>
            {KENNISBANK_TAXONOMY.map((parent) => (
              <optgroup key={parent.slug} label={parent.name}>
                <option value={parent.slug}>{parent.name}</option>
                {parent.children.map((child) => (
                  <option key={child.slug} value={child.slug}>
                    {child.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Status
          <select name="status" defaultValue={guide?.status ?? "DRAFT"} className="input-field mt-1">
            <option value="DRAFT">Concept</option>
            <option value="PUBLISHED">Live</option>
            <option value="ARCHIVED">Gearchiveerd</option>
          </select>
        </label>
        {guide?.source === "builtin" && guide.status === "PUBLISHED" && !guide.dbId && (
          <p className="text-sm text-muted">
            Dit is een ingebouwde gids. Opslaan maakt een beheerversie die op de site de ingebouwde tekst vervangt.
          </p>
        )}
        <button className="btn-ink">Opslaan</button>
      </form>

      {guide && isAdmin && (
        <form action={deleteArticle} className="mt-8">
          <input type="hidden" name="slug" value={guide.slug} />
          <button className="text-sm font-semibold text-red-700">
            {guide.source === "builtin" ? "Gids van de site halen" : "Artikel verwijderen"}
          </button>
        </form>
      )}
    </div>
  );
}
