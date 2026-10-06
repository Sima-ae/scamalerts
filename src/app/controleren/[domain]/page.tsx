import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  analyzeDomain,
  groupSignals,
  trustLabelNL,
} from "@/lib/trust-score";
import { formatDateNL, normalizeDomain } from "@/lib/utils";
import { DomainSearch } from "@/components/domain-search";
import { BRAND_NAME } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function DomainResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ domain: string }>;
  searchParams: Promise<{ refresh?: string }>;
}) {
  const { domain: raw } = await params;
  const sp = await searchParams;
  const domain = normalizeDomain(decodeURIComponent(raw));
  if (!domain || domain.length < 3) notFound();

  const refresh = sp.refresh === "1";
  let dbUnavailable = false;

  const analysis = await analyzeDomain(domain, {
    refresh,
    persist: true,
  }).catch(async () => {
    dbUnavailable = true;
    return analyzeDomain(domain, { refresh: true, persist: false });
  });

  let lastUpdated = new Date(analysis.collectedAt);
  let reports: {
    id: string;
    title: string;
    description: string;
    publishedAt: Date | null;
    createdAt: Date;
    categoryName: string | null;
  }[] = [];

  try {
    const profile = await prisma.domainProfile.findUnique({
      where: { domain },
    });
    if (profile) {
      lastUpdated = profile.lastUpdated;
      await prisma.domainProfile.update({
        where: { id: profile.id },
        data: { viewCount: { increment: 1 } },
      });
      const rows = await prisma.scamReport.findMany({
        where: { domainId: profile.id, status: "APPROVED" },
        orderBy: { publishedAt: "desc" },
        take: 10,
        select: {
          id: true,
          title: true,
          description: true,
          publishedAt: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      });
      reports = rows.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        publishedAt: r.publishedAt,
        createdAt: r.createdAt,
        categoryName: r.category?.name ?? null,
      }));
    }
  } catch {
    dbUnavailable = true;
  }

  const scoreColor =
    analysis.score >= 61
      ? "text-trust"
      : analysis.score >= 41
        ? "text-amber-700"
        : "text-danger";

  const groups = groupSignals(analysis.signals);

  return (
    <div className="section-shell py-12 md:py-16">
      <DomainSearch initial={domain} />

      {dbUnavailable && (
        <p className="mt-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Live database tijdelijk niet bereikbaar. Je ziet de technische
          analyse; meldingen worden mogelijk niet opgeslagen.
        </p>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center justify-center border border-line bg-white px-8 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Trust Score
          </p>
          <p className={`mt-3 text-6xl font-semibold ${scoreColor}`}>
            {analysis.score}
          </p>
          <p className="mt-2 text-center text-sm text-ink">
            {trustLabelNL(analysis.label)}
          </p>
          <p className="mt-6 text-center text-xs text-muted">
            {analysis.cached ? "Uit cache · " : "Live scan · "}
            {formatDateNL(lastUpdated)}
          </p>
          <Link
            href={`/controleren/${encodeURIComponent(domain)}?refresh=1`}
            className="mt-4 text-xs font-semibold text-accent hover:underline"
          >
            Opnieuw scannen
          </Link>
        </div>

        <div>
          <h1 className="font-display text-3xl text-ink md:text-4xl">
            {domain}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Analyse via {BRAND_NAME} op basis van DNS, TLS, RDAP-leeftijd,
            HTTPS-gedrag en goedgekeurde meldingen. Dit is geen juridisch
            vonnis — wel een transparante risico-indicatie.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/melden?domain=${encodeURIComponent(domain)}`}
              className="btn-primary text-sm"
            >
              Scam melden over dit domein
            </Link>
            <Link
              href="/zakelijk/claimen"
              className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-surface"
            >
              Bedrijf claimen
            </Link>
          </div>

          {groups.map((group) => (
            <section key={group.group} className="mt-12">
              <h2 className="font-display text-2xl text-ink">{group.title}</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {group.items.map((signal) => (
                  <li
                    key={signal.key}
                    className="flex items-start justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="font-medium text-ink">{signal.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {signal.detail}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-semibold uppercase tracking-wide ${
                        signal.positive === true
                          ? "text-trust"
                          : signal.positive === false
                            ? "text-danger"
                            : "text-muted"
                      }`}
                    >
                      {signal.positive === true
                        ? "Positief"
                        : signal.positive === false
                          ? "Negatief"
                          : "Neutraal"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <h2 className="font-display mt-12 text-2xl text-ink">
            Gerelateerde meldingen
          </h2>
          {reports.length === 0 ? (
            <p className="mt-4 text-muted">
              {dbUnavailable
                ? "Meldingen kunnen nu niet worden geladen."
                : "Nog geen goedgekeurde meldingen voor dit domein."}
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {reports.map((r) => (
                <li key={r.id} className="border-l-2 border-accent pl-4">
                  <p className="text-xs text-muted">
                    {formatDateNL(r.publishedAt ?? r.createdAt)}
                    {r.categoryName ? ` · ${r.categoryName}` : ""}
                  </p>
                  <p className="mt-1 font-medium text-ink">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {r.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
