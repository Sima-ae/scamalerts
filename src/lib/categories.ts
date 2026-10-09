import { prisma } from "@/lib/prisma";
import { KENNISBANK_TAXONOMY } from "@/content/kennisbank/taxonomy";

export type CategoryOption = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
};

export type CategoryOptGroup = {
  label: string;
  options: CategoryOption[];
};

/** Load categories ordered for optgroups: parents as labels, children as options. */
export async function loadCategoryOptGroups(): Promise<CategoryOptGroup[]> {
  const rows = await prisma.category
    .findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, parentId: true },
    })
    .catch(() => []);

  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const groups: CategoryOptGroup[] = [];

  for (const parent of KENNISBANK_TAXONOMY) {
    const options: CategoryOption[] = [];
    for (const child of parent.children) {
      const row = bySlug.get(child.slug);
      if (row) options.push(row);
    }
    if (options.length > 0) {
      groups.push({ label: parent.name, options });
    }
  }

  // Any leftover categories not in taxonomy
  const known = new Set(
    KENNISBANK_TAXONOMY.flatMap((p) => [
      p.slug,
      ...p.children.map((c) => c.slug),
    ]),
  );
  const extras = rows.filter((r) => !known.has(r.slug) && r.parentId);
  if (extras.length) {
    groups.push({ label: "Overig", options: extras });
  }

  return groups;
}

/** Flat list of subcategory options for filter pills (all children). */
export async function loadSubcategoryFilters(): Promise<CategoryOption[]> {
  const groups = await loadCategoryOptGroups();
  return groups.flatMap((g) => g.options);
}
