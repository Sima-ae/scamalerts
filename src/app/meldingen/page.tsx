import Link from "next/link";
import type { TrustLabel } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { reportRiskView } from "@/lib/report-risk";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import { AnimatedItem } from "@/components/ui/animated-section";
import { MeldingCard } from "@/components/melding-card";
import {
  MeldingenSearch,
  type MeldingenSearchItem,
} from "@/components/meldingen-search";
import {
  KENNISBANK_TAXONOMY,
  findTaxonomyBySlug,
} from "@/content/kennisbank/taxonomy";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scam-meldingen",
  description:
    "Bekijk goedgekeurde scam-meldingen op All Scams. Filter op categorie en ontdek actuele trucs in Nederland.",
};

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSearchItem(report: {
  id: string;
  title: string;
  description: string;
  channel: string | null;
  identifierValue: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  category: { name: string } | null;
  risk: "HIGH" | "LOW" | "NONE" | null;
  domain: {
    domain: string;
    trustLabel: TrustLabel;
    trustScore: number;
  } | null;
}): MeldingenSearchItem {
  const categoryName = report.category?.name ?? null;
  const domainName = report.domain?.domain ?? null;
  const dateLabel = report.publishedAt
    ? formatDateNL(report.publishedAt)
    : formatDateNL(report.createdAt);
  const risk = reportRiskView(report.risk, report.domain?.trustLabel);

  return {
    id: report.id,
    title: report.title,
    description: report.description,
    dateLabel,
    categoryName,
    identifier: domainName ?? report.identifierValue,
    trustLabel: risk?.label ?? null,
    riskColor: risk?.color ?? null,
    haystack: normalizeSearchText(
      [
        report.title,
        report.description,
        categoryName ?? "",
        report.channel ?? "",
        domainName ?? "",
        report.identifierValue ?? "",
      ].join(" "),
    ),
  };
}

export default async function MeldingenPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const sp = await searchParams;
  const filter = sp.categorie ? findTaxonomyBySlug(sp.categorie) : null;
  const topicFilters = KENNISBANK_TAXONOMY.filter(
    (topic) => topic.slug !== "trust-score",
  );

  const categoryFilter = sp.categorie
    ? filter?.kind === "parent"
      ? {
          OR: [
            { category: { slug: filter.parent.slug } },
            { category: { parent: { slug: filter.parent.slug } } },
          ],
        }
      : { category: { slug: sp.categorie } }
    : {};

  const [reports, allReports] = await Promise.all([
    prisma.scamReport
      .findMany({
        where: {
          status: "APPROVED",
          ...categoryFilter,
        },
        include: { domain: true, category: true },
        orderBy: { publishedAt: "desc" },
        take: 50,
      })
      .catch(() => []),
    prisma.scamReport
      .findMany({
        where: { status: "APPROVED" },
        include: { domain: true, category: true },
        orderBy: { publishedAt: "desc" },
      })
      .catch(() => []),
  ]);

  const searchReports = allReports.map(toSearchItem);

  return (
    <PageShell
      hero={{
        eyebrow: "Community",
        title: "Scam-meldingen",
        description:
          "Gemodereerde ervaringen van gebruikers. Gebruik filters of controleer een specifiek domein via Controleren.",
        media: MEDIA.community,
      }}
    >
      <MeldingenSearch reports={searchReports}>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-1.5">
          <Link
            href="/meldingen"
            className={`rounded-full px-2.5 py-1 text-xs transition ${
              !filter
                ? "bg-ink text-white"
                : "border border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            Alles
          </Link>
          {topicFilters.map((topic) => (
            <Link
              key={topic.slug}
              href={`/meldingen?categorie=${topic.slug}`}
              className={`rounded-full px-2.5 py-1 text-xs transition ${
                filter?.parent.slug === topic.slug
                  ? "bg-ink text-white"
                  : "border border-line bg-white text-ink hover:border-ink/30"
              }`}
            >
              {topic.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report, i) => (
            <AnimatedItem key={report.id} delay={Math.min(i, 5) * 0.04}>
              <MeldingCard
                dateLabel={formatDateNL(report.publishedAt ?? report.createdAt)}
                categoryName={report.category?.name}
                title={report.title}
                description={report.description}
                identifier={report.domain?.domain ?? report.identifierValue}
                trustLabel={reportRiskView(report.risk, report.domain?.trustLabel)?.label}
                riskColor={reportRiskView(report.risk, report.domain?.trustLabel)?.color}
              />
            </AnimatedItem>
          ))}
          {reports.length === 0 && (
            <p className="col-span-full py-10 text-center text-muted">
              Binnenkort gaat de vernieuwde versie voor alle meldingen en scams
              melden online.
            </p>
          )}
        </div>
      </MeldingenSearch>
    </PageShell>
  );
}
