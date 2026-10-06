import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { analyzeDomain, trustLabelNL } from "@/lib/trust-score";
import { formatDateNL, normalizeDomain } from "@/lib/utils";
import { DomainSearch } from "@/components/domain-search";

export const dynamic = "force-dynamic";

export default async function DomainResultPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: raw } = await params;
  const domain = normalizeDomain(decodeURIComponent(raw));
  if (!domain || domain.length < 3) notFound();

  const analysis = await analyzeDomain(domain);

  const profile = await prisma.domainProfile.upsert({
    where: { domain },
    update: {
      trustScore: analysis.score,
      trustLabel: analysis.label,
      signals: analysis.signals,
      viewCount: { increment: 1 },
    },
    create: {
      domain,
      trustScore: analysis.score,
      trustLabel: analysis.label,
      signals: analysis.signals,
      viewCount: 1,
    },
  });

  const reports = await prisma.scamReport.findMany({
    where: { domainId: profile.id, status: "APPROVED" },
    orderBy: { publishedAt: "desc" },
    take: 10,
  });

  const scoreColor =
    analysis.score >= 61
      ? "text-teal-300"
      : analysis.score >= 41
        ? "text-amber-300"
        : "text-rose-400";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <DomainSearch initial={domain} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="score-ring flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Trust Score
          </p>
          <p className={`mt-3 text-6xl font-semibold ${scoreColor}`}>
            {analysis.score}
          </p>
          <p className="mt-2 text-center text-sm text-slate-300">
            {trustLabelNL(analysis.label)}
          </p>
          <p className="mt-6 text-center text-xs text-slate-500">
            Laatst bijgewerkt {formatDateNL(profile.lastUpdated)}
          </p>
        </div>

        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-white md:text-4xl">
            {domain}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Analyse voor all-scams.com. Dit is geen juridisch oordeel — wel een
            transparante risico-indicatie om sneller verdachte signalen te
            herkennen.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/melden?domain=${encodeURIComponent(domain)}`}
              className="rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-400"
            >
              Scam melden over dit domein
            </Link>
            <Link
              href="/zakelijk/claimen"
              className="rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              Bedrijf claimen
            </Link>
          </div>

          <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl text-white">
            Signalen
          </h2>
          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {analysis.signals.map((signal) => (
              <li
                key={signal.key}
                className="flex items-start justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-medium text-white">{signal.label}</p>
                  <p className="mt-1 text-sm text-slate-400">{signal.detail}</p>
                </div>
                <span
                  className={`shrink-0 text-xs uppercase tracking-wide ${
                    signal.positive === true
                      ? "text-teal-300"
                      : signal.positive === false
                        ? "text-rose-400"
                        : "text-slate-500"
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

          <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl text-white">
            Gerelateerde meldingen
          </h2>
          {reports.length === 0 ? (
            <p className="mt-4 text-slate-400">
              Nog geen goedgekeurde meldingen voor dit domein.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {reports.map((r) => (
                <li key={r.id} className="border-l-2 border-teal-400/40 pl-4">
                  <p className="text-white">{r.title}</p>
                  <p className="mt-1 text-sm text-slate-400 line-clamp-2">
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
