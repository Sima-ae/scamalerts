"use client";

import {
  useDeferredValue,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { SiteSearchField } from "@/components/ui/site-search-field";

export type MeldingenSearchItem = {
  id: string;
  title: string;
  description: string;
  meta: string;
  domain: string | null;
  domainLabel: string | null;
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

function ReportRow({ item }: { item: MeldingenSearchItem }) {
  return (
    <article className="interactive-row rounded-lg px-2 py-6 md:px-4">
      <p className="text-xs text-muted">{item.meta}</p>
      <h2 className="mt-1 text-xl font-semibold text-ink">{item.title}</h2>
      <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-muted">
        {item.description}
      </p>
      {item.domain && item.domainLabel && (
        <div className="mt-3 flex justify-center">
          <Link
            href={`/controleren/${item.domain}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            {item.domainLabel}
          </Link>
        </div>
      )}
    </article>
  );
}

export function MeldingenSearch({
  reports,
  children,
}: {
  reports: MeldingenSearchItem[];
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const searching = query.trim().length > 0;

  const results = useMemo(() => {
    const q = deferredQuery.trim();
    if (!q) return [];
    return reports.filter((report) => matches(report.haystack, q));
  }, [reports, deferredQuery]);

  return (
    <>
      <div className="mx-auto mb-10 w-full max-w-xl md:max-w-2xl">
        <SiteSearchField
          id="meldingen-search"
          label="Zoek in meldingen"
          placeholder="Zoek in meldingen…"
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
        />
        {searching && (
          <p className="mt-3 text-center text-sm text-muted">
            {results.length === 0
              ? "Geen meldingen gevonden"
              : `${results.length} ${results.length === 1 ? "melding" : "meldingen"} gevonden`}
          </p>
        )}
      </div>

      {searching ? (
        <div className="mx-auto max-w-3xl divide-y divide-line text-center">
          {results.map((item) => (
            <ReportRow key={item.id} item={item} />
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
}
