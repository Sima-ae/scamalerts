import Link from "next/link";
import { ArticleForm } from "@/components/admin/article-form";
import { requireRole } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export const metadata = { title: "Nieuw artikel" };

export default async function NewArticlePage() {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  return (
    <div className="section-shell py-10 md:py-14">
      <Link href="/admin/artikelen" className="text-sm font-semibold text-accent hover:underline">
        ← Alle artikelen
      </Link>
      <h1 className="font-display mt-4 text-4xl text-ink">Nieuw artikel</h1>
      <p className="mt-2 text-muted">
        Zet de status op Live om het artikel direct in de kennisbank te publiceren.
      </p>
      <div className="mt-8">
        <ArticleForm isAdmin={session.user.role === "ADMIN"} />
      </div>
    </div>
  );
}
