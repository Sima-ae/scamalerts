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
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <Link href="/admin" className="text-sm text-teal-300 hover:underline">
        ← Terug naar admin
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-white">
        CMS artikelen
      </h1>

      <form action={createArticle} className="mt-8 max-w-2xl space-y-4 rounded-xl border border-white/10 p-5">
        <h2 className="text-lg text-white">Nieuw artikel</h2>
        <input
          name="title"
          required
          placeholder="Titel"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
        <input
          name="slug"
          required
          placeholder="slug-voorbeeld"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
        <textarea
          name="excerpt"
          placeholder="Korte samenvatting"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          rows={2}
        />
        <textarea
          name="content"
          required
          placeholder="Volledige inhoud (Markdown-achtige tekst)"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          rows={8}
        />
        <select
          name="categoryId"
          className="w-full rounded-md border border-white/15 bg-[#0b1a29] px-3 py-2 text-white"
        >
          <option value="">Geen categorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" name="publish" value="1" /> Direct publiceren
        </label>
        <button className="rounded-md bg-teal-400 px-4 py-2 font-medium text-[#062018]">
          Opslaan
        </button>
      </form>

      <ul className="mt-10 divide-y divide-white/10">
        {articles.map((a) => (
          <li key={a.id} className="flex justify-between py-3 text-sm">
            <span className="text-white">{a.title}</span>
            <span className="text-slate-500">{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
