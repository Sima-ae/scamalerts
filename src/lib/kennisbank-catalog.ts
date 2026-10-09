import { KENNISBANK_ARTICLES } from "@/content/kennisbank/articles";
import {
  findTaxonomyBySlug,
  type TaxonomyChild,
  type TaxonomyParent,
} from "@/content/kennisbank/taxonomy";

export type CatalogGuide = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categorySlug: string;
  categoryName: string | null;
  parentSlug: string | null;
  parentName: string | null;
};

function locate(categorySlug: string): {
  categoryName: string | null;
  parentSlug: string | null;
  parentName: string | null;
} {
  const found = findTaxonomyBySlug(categorySlug);
  if (!found) {
    return { categoryName: null, parentSlug: null, parentName: null };
  }
  if (found.kind === "parent") {
    return {
      categoryName: found.parent.name,
      parentSlug: null,
      parentName: null,
    };
  }
  return {
    categoryName: found.child?.name ?? null,
    parentSlug: found.parent.slug,
    parentName: found.parent.name,
  };
}

const guides: CatalogGuide[] = KENNISBANK_ARTICLES.map((article) => {
  const place = locate(article.categorySlug);
  return {
    id: article.slug,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    categorySlug: article.categorySlug,
    ...place,
  };
});

const bySlug = new Map(guides.map((guide) => [guide.slug, guide]));

export function listCatalogGuides(): CatalogGuide[] {
  return guides;
}

export function getCatalogGuide(slug: string): CatalogGuide | undefined {
  return bySlug.get(slug);
}

export function countGuidesForSlug(slug: string): number {
  const found = findTaxonomyBySlug(slug);
  if (!found) return 0;
  if (found.kind === "child") {
    return guides.filter((guide) => guide.categorySlug === slug).length;
  }
  const childSlugs = new Set(found.parent.children.map((child) => child.slug));
  return guides.filter(
    (guide) =>
      guide.categorySlug === found.parent.slug ||
      childSlugs.has(guide.categorySlug),
  ).length;
}

export function guidesForTaxonomy(filter: {
  kind: "parent" | "child";
  parent: TaxonomyParent;
  child?: TaxonomyChild;
}): CatalogGuide[] {
  if (filter.kind === "child" && filter.child) {
    return guides.filter((guide) => guide.categorySlug === filter.child!.slug);
  }
  const childSlugs = new Set(filter.parent.children.map((child) => child.slug));
  return guides.filter(
    (guide) =>
      guide.categorySlug === filter.parent.slug ||
      childSlugs.has(guide.categorySlug),
  );
}

export function relatedGuides(guide: CatalogGuide, take = 3): CatalogGuide[] {
  const sameCategory = guides.filter(
    (item) => item.slug !== guide.slug && item.categorySlug === guide.categorySlug,
  );
  if (sameCategory.length >= take) return sameCategory.slice(0, take);
  const sameParent = guides.filter(
    (item) =>
      item.slug !== guide.slug &&
      item.parentSlug &&
      item.parentSlug === guide.parentSlug &&
      !sameCategory.some((picked) => picked.slug === item.slug),
  );
  return [...sameCategory, ...sameParent].slice(0, take);
}
