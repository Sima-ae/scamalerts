import type { ArticleStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  getCatalogGuide,
  listCatalogGuides,
  type CatalogGuide,
} from "@/lib/kennisbank-catalog";
import {
  findTaxonomyBySlug,
  type TaxonomyChild,
  type TaxonomyParent,
} from "@/content/kennisbank/taxonomy";

export type ManagedGuide = CatalogGuide & {
  dbId: string | null;
  status: ArticleStatus;
  source: "builtin" | "database";
  updatedAt: string | null;
};

function fromCatalog(guide: CatalogGuide): ManagedGuide {
  return {
    ...guide,
    dbId: null,
    status: "PUBLISHED",
    source: "builtin",
    updatedAt: null,
  };
}

function fromRow(
  row: {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    status: ArticleStatus;
    updatedAt: Date;
    category: {
      slug: string;
      name: string;
      parent: { slug: string; name: string } | null;
    } | null;
  },
  builtin: boolean,
): ManagedGuide {
  const categorySlug = row.category?.slug ?? "";
  const located = categorySlug ? findTaxonomyBySlug(categorySlug) : null;
  return {
    id: row.id,
    dbId: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content,
    categorySlug,
    categoryName: row.category?.name ?? located?.child?.name ?? located?.parent.name ?? null,
    parentSlug: row.category?.parent?.slug ?? (located?.kind === "child" ? located.parent.slug : null),
    parentName: row.category?.parent?.name ?? (located?.kind === "child" ? located.parent.name : null),
    status: row.status,
    source: builtin ? "builtin" : "database",
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function loadRows() {
  return prisma.article
    .findMany({
      include: { category: { include: { parent: true } } },
      orderBy: { updatedAt: "desc" },
    })
    .catch(() => []);
}

export async function listManagedGuides(): Promise<ManagedGuide[]> {
  const rows = await loadRows();
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  const merged: ManagedGuide[] = [];

  for (const guide of listCatalogGuides()) {
    const row = bySlug.get(guide.slug);
    if (row) {
      merged.push(fromRow(row, true));
      bySlug.delete(guide.slug);
    } else {
      merged.push(fromCatalog(guide));
    }
  }

  for (const row of bySlug.values()) {
    merged.push(fromRow(row, false));
  }

  return merged;
}

export async function listPublishedGuides(): Promise<ManagedGuide[]> {
  const guides = await listManagedGuides();
  return guides.filter((guide) => guide.status === "PUBLISHED");
}

export async function getManagedGuide(slug: string): Promise<ManagedGuide | null> {
  const guides = await listManagedGuides();
  return guides.find((guide) => guide.slug === slug) ?? null;
}

export async function getPublishedGuide(slug: string): Promise<ManagedGuide | null> {
  const guide = await getManagedGuide(slug);
  if (!guide || guide.status !== "PUBLISHED") return null;
  return guide;
}

export function guidesInTopic(
  guides: ManagedGuide[],
  filter: {
    kind: "parent" | "child";
    parent: TaxonomyParent;
    child?: TaxonomyChild;
  },
): ManagedGuide[] {
  if (filter.kind === "child" && filter.child) {
    return guides.filter((guide) => guide.categorySlug === filter.child!.slug);
  }
  const childSlugs = new Set(filter.parent.children.map((child) => child.slug));
  return guides.filter(
    (guide) =>
      guide.categorySlug === filter.parent.slug || childSlugs.has(guide.categorySlug),
  );
}

export function countInTopic(guides: ManagedGuide[], slug: string): number {
  const found = findTaxonomyBySlug(slug);
  if (!found) return 0;
  return guidesInTopic(guides, found).length;
}

export function builtinGuide(slug: string) {
  return getCatalogGuide(slug);
}
