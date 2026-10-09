"use client";

import {
  useDeferredValue,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { GuideCard } from "@/components/kennisbank/guide-card";
import { SiteSearchField } from "@/components/ui/site-search-field";

export type KennisbankSearchItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  categoryName: string | null;
  parentName: string | null;
  haystack: string;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matches(haystack: string, query: string) {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (terms.length === 0) return false;
  return terms.every((term) => haystack.includes(term));
}

export function KennisbankSearch({
  articles,
  children,
}: {
  articles: KennisbankSearchItem[];
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const searching = query.trim().length > 0;

  const results = useMemo(() => {
    const q = deferredQuery.trim();
    if (!q) return [];
    return articles.filter((article) => matches(article.haystack, q));
  }, [articles, deferredQuery]);

  return (
    <>
      <div className="mx-auto mb-12 w-full max-w-xl md:max-w-2xl">
        <SiteSearchField
          id="kennisbank-search"
          label="Zoek in de kennisbank"
          placeholder="Zoek in de kennisbank…"
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
        />
        {searching && (
          <p className="mt-3 text-center text-sm text-muted">
            {results.length === 0
              ? "Geen gidsen gevonden"
              : `${results.length} ${results.length === 1 ? "gids" : "gidsen"} gevonden`}
          </p>
        )}
      </div>

      {searching ? (
        <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((article) => (
            <GuideCard
              key={article.slug}
              href={`/kennisbank/${article.slug}`}
              title={article.title}
              excerpt={article.excerpt}
              categoryName={article.categoryName}
              parentName={article.parentName}
            />
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
}
