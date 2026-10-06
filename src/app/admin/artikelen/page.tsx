import Link from "next/link";
import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { createArticle } from "@/app/admin/artikelen/actions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  await requireRole(["ADMIN", "EDITOR"]);
  const [articles, categories] = await Promise.all([
    prisma.article.findMany({ orderBy: { updatedAt: "desc" }, take: 50 }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="section-shell py-12 md:py-16">
      <Link href="/admin" className="text-sm font-semibold text-accent hover:underline">
        ← Terug naar admin
      </Link>
      <h1 className="font-display mt-4 text-4xl text-ink">CMS artikelen</h1>

      <form
        action={createArticle}
        className="mt-8 max-w-2xl space-y-4 border border-line bg-white p-5"
      >
        <h2 className="text-lg font-semibold text-ink">Nieuw artikel</h2>
        <input
          name="title"
          required
          placeholder="Titel"
          className="input-field"
        />
        <input
          name="slug"
          required
          placeholder="slug-voorbeeld"
          className="input-field"
        />
        <textarea
          name="excerpt"
          placeholder="Korte samenvatting"
          className="input-field"
          rows={2}
        />
        <textarea
          name="content"
          required
          placeholder="Volledige inhoud"
          className="input-field"
          rows={8}
        />
        <select name="categoryId" className="input-field">
          <option value="">Geen categorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="publish" value="1" /> Direct publiceren
        </label>
        <button className="btn-ink">Opslaan</button>
      </form>

      <ul className="mt-10 divide-y divide-line">
        {articles.map((a) => (
          <li key={a.id} className="flex justify-between py-3 text-sm">
            <span className="text-ink">{a.title}</span>
            <span className="text-muted">{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
