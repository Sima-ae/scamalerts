import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { getManagedGuide } from "@/lib/guides";
import { requireRole } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export const metadata = { title: "Artikel bewerken" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const guide = await getManagedGuide(slug);
  if (!guide) notFound();

  return (
    <div className="section-shell py-10 md:py-14">
      <Link href="/admin/artikelen" className="text-sm font-semibold text-accent hover:underline">
        ← Alle artikelen
      </Link>
      <h1 className="font-display mt-4 text-4xl text-ink">Artikel bewerken</h1>
      {guide.status === "PUBLISHED" && (
        <p className="mt-2 text-sm">
          <Link href={`/kennisbank/${guide.slug}`} className="font-semibold text-accent hover:underline">
            Bekijk op de kennisbank
          </Link>
        </p>
      )}
      <div className="mt-8">
        <ArticleForm guide={guide} isAdmin={session.user.role === "ADMIN"} />
      </div>
    </div>
  );
}
