"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleStatus, ReportRisk, ReportStatus } from "@prisma/client";
import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { builtinGuide } from "@/lib/guides";
import { findTaxonomyBySlug } from "@/content/kennisbank/taxonomy";

const reportStatuses = new Set<ReportStatus>([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "HIDDEN",
]);

const reportRisks = new Set<ReportRisk>(["HIGH", "LOW", "NONE"]);

const articleStatuses = new Set<ArticleStatus>([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function ensureCategory(slug: string) {
  const found = findTaxonomyBySlug(slug);
  if (!found) return null;
  if (found.kind === "parent") {
    return prisma.category.upsert({
      where: { slug: found.parent.slug },
      update: { name: found.parent.name },
      create: { slug: found.parent.slug, name: found.parent.name },
    });
  }
  const parent = await prisma.category.upsert({
    where: { slug: found.parent.slug },
    update: { name: found.parent.name },
    create: { slug: found.parent.slug, name: found.parent.name },
  });
  return prisma.category.upsert({
    where: { slug: found.child!.slug },
    update: { name: found.child!.name, parentId: parent.id },
    create: {
      slug: found.child!.slug,
      name: found.child!.name,
      parentId: parent.id,
    },
  });
}

function revalidateContent(slug?: string) {
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/meldingen");
  revalidatePath("/admin/artikelen");
  revalidatePath("/meldingen");
  revalidatePath("/kennisbank");
  revalidatePath("/user/dashboard");
  revalidatePath("/");
  if (slug) revalidatePath(`/kennisbank/${slug}`);
}

export async function moderateReport(formData: FormData) {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const id = String(formData.get("id") ?? "");
  const action = String(formData.get("action") ?? "") as ReportStatus;
  if (!id || !reportStatuses.has(action) || action === "PENDING") return;

  await prisma.scamReport.update({
    where: { id },
    data: {
      status: action,
      publishedAt: action === "APPROVED" ? new Date() : null,
    },
  });
  await prisma.moderationAction.create({
    data: {
      action,
      reportId: id,
      moderatorId: session.user.id,
      note: `Status gezet op ${action}`,
    },
  });
  revalidateContent();
}

export async function saveReport(formData: FormData) {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const status = String(formData.get("status") ?? "PENDING") as ReportStatus;
  const channel = String(formData.get("channel") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "") || null;
  const riskValue = String(formData.get("risk") ?? "");
  const risk = reportRisks.has(riskValue as ReportRisk)
    ? (riskValue as ReportRisk)
    : null;
  if (!id || !title || !description || !reportStatuses.has(status)) return;

  const existing = await prisma.scamReport.findUnique({
    where: { id },
    select: { publishedAt: true },
  });
  if (!existing) return;

  await prisma.scamReport.update({
    where: { id },
    data: {
      title,
      description,
      status,
      risk,
      channel: channel || null,
      categoryId,
      publishedAt: status === "APPROVED" ? (existing.publishedAt ?? new Date()) : null,
    },
  });
  await prisma.moderationAction.create({
    data: {
      action: status,
      reportId: id,
      moderatorId: session.user.id,
      note: "Melding bijgewerkt",
    },
  });
  revalidateContent();
  redirect("/admin/meldingen");
}

export async function deleteReport(formData: FormData) {
  await requireRole(["ADMIN"]);
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.scamReport.delete({ where: { id } });
  revalidateContent();
  redirect("/admin/meldingen");
}

export async function saveArticle(formData: FormData) {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = slugify(String(formData.get("slug") ?? "") || title);
  const originalSlug = slugify(String(formData.get("originalSlug") ?? ""));
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "");
  const status = String(formData.get("status") ?? "DRAFT") as ArticleStatus;
  if (!title || !requestedSlug || !content || !articleStatuses.has(status)) return;

  const category = categorySlug ? await ensureCategory(categorySlug) : null;

  const data = {
    title,
    slug: requestedSlug,
    excerpt: excerpt || null,
    content,
    categoryId: category?.id ?? null,
    authorId: session.user.id,
    status,
    publishedAt: status === "PUBLISHED" ? new Date() : null,
  };

  const existingSlug = originalSlug || requestedSlug;
  const existing = await prisma.article.findUnique({ where: { slug: existingSlug } });
  if (existing && existing.slug !== requestedSlug) {
    const clash = await prisma.article.findUnique({ where: { slug: requestedSlug } });
    if (clash) data.slug = existing.slug;
  }
  if (existing) {
    await prisma.article.update({ where: { id: existing.id }, data });
  } else {
    await prisma.article.create({ data });
  }
  if (
    originalSlug &&
    originalSlug !== data.slug &&
    builtinGuide(originalSlug)
  ) {
    const archived = builtinGuide(originalSlug)!;
    const archivedCategory = await ensureCategory(archived.categorySlug);
    await prisma.article.upsert({
      where: { slug: originalSlug },
      update: { status: "ARCHIVED", publishedAt: null },
      create: {
        slug: originalSlug,
        title: archived.title,
        excerpt: archived.excerpt,
        content: archived.content,
        categoryId: archivedCategory?.id ?? null,
        status: "ARCHIVED",
      },
    });
  }

  revalidateContent(requestedSlug);
  if (existingSlug && existingSlug !== requestedSlug) revalidateContent(existingSlug);
  redirect("/admin/artikelen");
}

export async function deleteArticle(formData: FormData) {
  await requireRole(["ADMIN"]);
  const slug = slugify(String(formData.get("slug") ?? ""));
  if (!slug) return;
  const builtin = builtinGuide(slug);
  const existing = await prisma.article.findUnique({ where: { slug } });

  if (builtin) {
    const category = await ensureCategory(builtin.categorySlug);
    const data = {
      title: builtin.title,
      excerpt: builtin.excerpt,
      content: builtin.content,
      categoryId: category?.id ?? existing?.categoryId ?? null,
      status: "ARCHIVED" as const,
      publishedAt: null,
    };
    if (existing) {
      await prisma.article.update({ where: { id: existing.id }, data });
    } else {
      await prisma.article.create({ data: { ...data, slug } });
    }
  } else if (existing) {
    await prisma.article.delete({ where: { id: existing.id } });
  }

  revalidateContent(slug);
  redirect("/admin/artikelen");
}
