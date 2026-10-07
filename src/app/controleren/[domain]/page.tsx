import Link from "next/link";
import { notFound } from "next/navigation";
import {
  RefreshCw,
  ShieldAlert,
  Info,
  ArrowUpRight,
  FileWarning,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  analyzeDomain,
  groupSignals,
  trustLabelNL,
} from "@/lib/trust-score";
import { formatDateNL, normalizeDomain } from "@/lib/utils";
import { DomainSearch } from "@/components/domain-search";
import { ScoreRing } from "@/components/trust/score-ring";
import { SignalStatus } from "@/components/trust/signal-status";
import { BRAND_NAME } from "@/lib/brand";
import type { TrustSignal } from "@/lib/trust/types";

export const dynamic = "force-dynamic";

function riskHighlights(signals: TrustSignal[]) {
  return signals.filter((s) => s.positive === false);
}

function noticeHighlights(signals: TrustSignal[]) {
  return signals.filter((s) => s.positive === null && s.key === "spoof");
}

function scoreTone(score: number): "good" | "warn" | "bad" | "neutral" {
  if (score >= 70) return "good";
  if (score >= 55) return "neutral";
  if (score >= 41) return "warn";
  return "bad";
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

  let analysis: Awaited<ReturnType<typeof analyzeDomain>>;
  try {
    analysis = await analyzeDomain(domain, { refresh, persist: true });
  } catch {
    dbUnavailable = true;
    analysis = await analyzeDomain(domain, { refresh: true, persist: false });
  }

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

  const groups = groupSignals(analysis.signals);
  const risks = riskHighlights(analysis.signals);
  const notices = noticeHighlights(analysis.signals);
  const spoof = analysis.signals.find((s) => s.key === "spoof");
  const spoofTarget =
    spoof?.raw && typeof spoof.raw.target === "string"
      ? spoof.raw.target
      : null;
  const tone = scoreTone(analysis.score);
  const positiveCount = analysis.signals.filter((s) => s.positive === true).length;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />

      {/* Compact search strip */}
      <div className="relative z-10 border-b border-line/80 bg-white/50 backdrop-blur-sm">
        <div className="section-shell py-5 md:py-6">
          <div className="mx-auto max-w-2xl md:mx-0">
            <DomainSearch initial={domain} />
          </div>
        </div>
      </div>

      <div className="section-shell relative z-10 py-10 md:py-14 lg:py-16">
        {dbUnavailable && (
          <p className="mb-8 rounded-lg border border-amber-300/80 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900 md:text-left">
            Database/opslag tijdelijk niet beschikbaar. Je ziet wel de technische
            analyse; scores en meldingen worden mogelijk niet bewaard.
          </p>
        )}

        {/* Result summary — primary composition */}
        <section className="result-hero animate-rise overflow-hidden rounded-2xl border border-line/90 bg-white/80 shadow-[0_24px_60px_-40px_rgba(15,28,46,0.45)] backdrop-blur-md">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[200px_1fr] lg:items-center lg:gap-12 lg:p-10 xl:grid-cols-[220px_1fr_auto]">
            <ScoreRing
              score={analysis.score}
              label={trustLabelNL(analysis.label)}
              tone={tone}
            />

            <div className="min-w-0 text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Trust Score · {BRAND_NAME}
              </p>
              <h1 className="font-display mt-2 break-all text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {domain}
              </h1>
              <p className="mt-2 text-sm font-semibold text-ink md:text-base">
                {trustLabelNL(analysis.label)}
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base lg:mx-0">
                DNS, TLS, RDAP-leeftijd, HTTPS-gedrag, nabootsing en
                community-meldingen. Informatief — geen juridisch oordeel.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <MetaChip label="Signalen" value={String(analysis.signals.length)} />
                <MetaChip label="Positief" value={String(positiveCount)} />
                <MetaChip label="Risico’s" value={String(risks.length)} />
                <MetaChip
                  label="Bijgewerkt"
                  value={formatDateNL(lastUpdated)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 lg:items-stretch lg:justify-center">
              <Link
                href={`/melden?domain=${encodeURIComponent(domain)}`}
                className="btn-primary w-full min-w-50 text-sm"
              >
                Scam melden
              </Link>
              <Link
                href="/zakelijk/claimen"
                className="inline-flex w-full min-w-50 items-center justify-center rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/25 hover:bg-surface"
              >
                Bedrijf claimen
              </Link>
              <Link
                href={`/controleren/${encodeURIComponent(domain)}?refresh=1`}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-accent transition hover:underline"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Opnieuw scannen
              </Link>
            </div>
          </div>
        </section>

        {/* Alerts */}
        {(risks.length > 0 || notices.length > 0) && (
          <div className="animate-rise-delay mt-8 grid gap-4 lg:grid-cols-2">
            {risks.length > 0 && (
              <div className="rounded-xl border border-danger/20 bg-[color-mix(in_oklab,var(--danger)_5%,white)] p-5 md:p-6">
                <div className="flex items-center justify-center gap-2 text-danger lg:justify-start">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Belangrijkste risico’s
                  </p>
                </div>
                <ul className="mt-4 space-y-3">
                  {risks.map((r) => (
                    <li
                      key={r.key}
                      className="border-t border-danger/10 pt-3 text-sm leading-relaxed text-ink first:border-0 first:pt-0"
                    >
                      <span className="font-semibold">{r.label}</span>
                      <span className="mt-0.5 block text-muted">{r.detail}</span>
                    </li>
                  ))}
                </ul>
                {spoofTarget && spoof?.positive === false && (
                  <p className="mt-4 text-center text-sm text-ink lg:text-left">
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
              <div className="rounded-xl border border-amber-300/50 bg-amber-50/90 p-5 md:p-6">
                <div className="flex items-center justify-center gap-2 text-amber-800 lg:justify-start">
                  <Info className="h-4 w-4 shrink-0" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Context
                  </p>
                </div>
                <ul className="mt-4 space-y-3">
                  {notices.map((n) => (
                    <li
                      key={n.key}
                      className="border-t border-amber-200/80 pt-3 text-sm leading-relaxed text-ink first:border-0 first:pt-0"
                    >
                      <span className="font-semibold">{n.label}</span>
                      <span className="mt-0.5 block text-muted">{n.detail}</span>
                    </li>
                  ))}
                </ul>
                {spoofTarget && (
                  <p className="mt-4 text-center text-sm text-ink lg:text-left">
                    Primair merkdomein:{" "}
                    <Link
                      href={`/controleren/${encodeURIComponent(spoofTarget)}`}
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      {spoofTarget}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Signal groups */}
        <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
          {groups.map((group) => (
            <section key={group.group} className="animate-rise-late">
              <div className="mb-4 flex flex-col items-center gap-1 text-center md:mb-5 md:flex-row md:items-end md:justify-between md:text-left">
                <h2 className="font-display text-2xl text-ink md:text-3xl">
                  {group.title}
                </h2>
                <p className="text-xs text-muted">
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "signaal" : "signalen"}
                </p>
              </div>
              <ul className="overflow-hidden rounded-xl border border-line bg-white/70 divide-y divide-line">
                {group.items.map((signal) => (
                  <li
                    key={signal.key}
                    className={`flex flex-col gap-3 px-4 py-4 transition sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-5 sm:py-5 ${
                      signal.positive === false
                        ? "bg-[color-mix(in_oklab,var(--danger)_4%,transparent)]"
                        : "hover:bg-surface/80"
                    }`}
                  >
                    <div className="min-w-0 text-center sm:text-left">
                      <p className="font-semibold text-ink">{signal.label}</p>
                      <p className="mx-auto mt-1 max-w-2xl text-sm leading-relaxed text-muted sm:mx-0">
                        {signal.detail}
                      </p>
                      {signal.key === "spoof" && spoofTarget && (
                        <Link
                          href={`/controleren/${encodeURIComponent(spoofTarget)}`}
                          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                        >
                          Bekijk score van {spoofTarget}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                    <div className="flex shrink-0 justify-center sm:justify-end sm:pt-0.5">
                      <SignalStatus positive={signal.positive} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Related reports */}
        <section className="mt-14 border-t border-line pt-12 md:mt-16 md:pt-14">
          <div className="mb-6 flex flex-col items-center gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Community
              </p>
              <h2 className="font-display mt-1 text-2xl text-ink md:text-3xl">
                Gerelateerde meldingen
              </h2>
            </div>
            <Link
              href={`/melden?domain=${encodeURIComponent(domain)}`}
              className="text-sm font-semibold text-accent hover:underline"
            >
              Zelf iets melden
            </Link>
          </div>

          {reports.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-white/50 px-6 py-12 text-center md:items-start md:text-left">
              <FileWarning className="h-6 w-6 text-muted" />
              <p className="max-w-md text-muted">
                {dbUnavailable
                  ? "Meldingen kunnen nu niet worden geladen."
                  : "Nog geen goedgekeurde meldingen voor dit domein."}
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {reports.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-line bg-white/70 px-5 py-5 transition hover:border-accent/40"
                >
                  <p className="text-xs text-muted">
                    {formatDateNL(r.publishedAt ?? r.createdAt)}
                    {r.categoryName ? ` · ${r.categoryName}` : ""}
                  </p>
                  <p className="mt-2 font-semibold text-ink">{r.title}</p>
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted">
                    {r.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface/80 px-2.5 py-1.5 text-xs">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </span>
  );
}
