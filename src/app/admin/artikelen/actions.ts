"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function createArticle(formData: FormData) {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
  const excerpt = String(formData.get("excerpt") ?? "");
  const content = String(formData.get("content") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "") || null;
  const publish = formData.get("publish") === "1";

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      categoryId,
      authorId: session.user.id,
      status: publish ? "PUBLISHED" : "DRAFT",
      publishedAt: publish ? new Date() : null,
    },
  });

  revalidatePath("/admin/artikelen");
  revalidatePath("/kennisbank");
}
