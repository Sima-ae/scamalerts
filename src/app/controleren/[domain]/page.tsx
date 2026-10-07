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
import type { TrustSignal } from "@/lib/trust/types";

export const dynamic = "force-dynamic";

function riskHighlights(signals: TrustSignal[]) {
  return signals.filter((s) => s.positive === false);
}

function noticeHighlights(signals: TrustSignal[]) {
  return signals.filter((s) => s.positive === null && s.key === "spoof");
}

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
  const risks = riskHighlights(analysis.signals);
  const notices = noticeHighlights(analysis.signals);
  const spoof = analysis.signals.find((s) => s.key === "spoof");
  const spoofTarget =
    spoof?.raw && typeof spoof.raw.target === "string"
      ? spoof.raw.target
      : null;

  return (
    <div className="relative overflow-hidden">
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="section-shell relative z-10 py-12 md:py-16">
      <div className="mx-auto max-w-2xl md:mx-0 md:max-w-xl">
        <DomainSearch initial={domain} />
      </div>

      {dbUnavailable && (
        <p className="mx-auto mt-6 max-w-2xl rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900 md:mx-0 md:text-left">
          Database/opslag tijdelijk niet beschikbaar. Je ziet wel de technische
          analyse; scores en meldingen worden mogelijk niet bewaard.
        </p>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="mx-auto h-fit w-full max-w-sm border border-line bg-white/90 px-8 py-10 text-center backdrop-blur-sm lg:mx-0 lg:sticky lg:top-24 lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Trust Score
          </p>
          <p className={`mt-3 text-6xl font-semibold ${scoreColor}`}>
            {analysis.score}
          </p>
          <p className="mt-2 text-sm font-medium text-ink">
            {trustLabelNL(analysis.label)}
          </p>
          <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Signalen</dt>
              <dd className="font-medium text-ink">{analysis.signals.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Risico’s</dt>
              <dd className="font-medium text-ink">{risks.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Bron</dt>
              <dd className="font-medium text-ink">
                {analysis.cached ? "Cache" : "Live"}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-xs text-muted">
            Bijgewerkt {formatDateNL(lastUpdated)}
          </p>
          <Link
            href={`/controleren/${encodeURIComponent(domain)}?refresh=1`}
            className="mt-3 inline-block text-xs font-semibold text-accent hover:underline"
          >
            Opnieuw scannen
          </Link>
        </aside>

        <div className="min-w-0 text-center lg:text-left">
          <h1 className="font-display break-all text-3xl text-ink md:text-4xl lg:text-5xl">
            {domain}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted lg:mx-0">
            Analyse via {BRAND_NAME}: DNS, TLS, RDAP-leeftijd, HTTPS-gedrag,
            typosquat/lookalike-detectie en community-meldingen. Informatief —
            geen juridisch oordeel.
          </p>

          {risks.length > 0 && (
            <div className="mt-8 border border-danger/25 bg-[color-mix(in_oklab,var(--danger)_6%,white)] px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-danger">
                Belangrijkste risico’s
              </p>
              <ul className="mt-3 space-y-2.5">
                {risks.map((r) => (
                  <li key={r.key} className="text-sm leading-relaxed text-ink">
                    <span className="font-semibold">{r.label}:</span> {r.detail}
                  </li>
                ))}
              </ul>
              {spoofTarget && spoof?.positive === false && (
                <p className="mt-4 text-sm text-ink">
                  Vergelijk met het waarschijnlijke origineel:{" "}
                  <Link
                    href={`/controleren/${encodeURIComponent(spoofTarget)}`}
                    className="font-semibold text-accent hover:underline"
                  >
                    {spoofTarget}
                  </Link>
                </p>
              )}
            </div>
          )}

          {notices.length > 0 && (
            <div className="mt-6 border border-amber-300/60 bg-amber-50 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                Context
              </p>
              <ul className="mt-3 space-y-2.5">
                {notices.map((n) => (
                  <li key={n.key} className="text-sm leading-relaxed text-ink">
                    <span className="font-semibold">{n.label}:</span> {n.detail}
                  </li>
                ))}
              </ul>
              {spoofTarget && (
                <p className="mt-4 text-sm text-ink">
                  Primair merkdomein:{" "}
                  <Link
                    href={`/controleren/${encodeURIComponent(spoofTarget)}`}
                    className="font-semibold text-accent hover:underline"
                  >
                    {spoofTarget}
                  </Link>
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href={`/melden?domain=${encodeURIComponent(domain)}`}
              className="btn-primary text-sm"
            >
              Scam melden over dit domein
            </Link>
            <Link
              href="/zakelijk/claimen"
              className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface"
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
                    className={`flex items-start justify-between gap-4 py-4 ${
                      signal.positive === false ? "bg-[color-mix(in_oklab,var(--danger)_4%,transparent)]" : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium text-ink">{signal.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {signal.detail}
                      </p>
                      {signal.key === "spoof" && spoofTarget && (
                        <Link
                          href={`/controleren/${encodeURIComponent(spoofTarget)}`}
                          className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
                        >
                          Bekijk score van {spoofTarget} →
                        </Link>
                      )}
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
    </div>
  );
}
