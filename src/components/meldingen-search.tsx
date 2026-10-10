"use client";

import { useMemo, useState, type ReactNode } from "react";
import { SiteSearchField } from "@/components/ui/site-search-field";
import { MeldingCard } from "@/components/melding-card";

export type MeldingenSearchItem = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  categoryName: string | null;
  identifier: string | null;
  trustLabel: string | null;
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

function ReportCard({ item }: { item: MeldingenSearchItem }) {
  return (
    <MeldingCard
      dateLabel={item.dateLabel}
      categoryName={item.categoryName}
      title={item.title}
      description={item.description}
      identifier={item.identifier}
      trustLabel={item.trustLabel}
    />
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
  const searching = query.trim().length > 0;

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return reports.filter((report) => matches(report.haystack, q));
  }, [reports, query]);

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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((item) => (
            <ReportCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
}
