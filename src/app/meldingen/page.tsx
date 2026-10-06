import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { trustLabelNL } from "@/lib/trust-score";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scam-meldingen",
  description:
    "Bekijk goedgekeurde scam-meldingen op All Scams. Filter op categorie en ontdek actuele trucs in Nederland.",
};

export default async function MeldingenPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const sp = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const reports = await prisma.scamReport.findMany({
    where: {
      status: "APPROVED",
      ...(sp.categorie ? { category: { slug: sp.categorie } } : {}),
    },
    include: { domain: true, category: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return (
    <div className="section-shell py-14 md:py-16">
      <h1 className="font-display text-4xl text-ink md:text-5xl">
        Scam-meldingen
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Gemodereerde ervaringen van gebruikers. Gebruik filters of controleer
        een specifiek domein via Controleren.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/meldingen"
          className={`rounded-md px-3 py-1.5 text-sm ${
            !sp.categorie
              ? "bg-ink text-white"
              : "border border-line bg-white text-ink"
          }`}
        >
          Alles
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/meldingen?categorie=${c.slug}`}
            className={`rounded-md px-3 py-1.5 text-sm ${
              sp.categorie === c.slug
                ? "bg-ink text-white"
                : "border border-line bg-white text-ink"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 divide-y divide-line">
        {reports.map((report) => (
          <article key={report.id} className="py-6">
            <p className="text-xs text-muted">
              {report.publishedAt
                ? formatDateNL(report.publishedAt)
                : formatDateNL(report.createdAt)}
              {report.category ? ` · ${report.category.name}` : ""}
              {report.channel ? ` · ${report.channel}` : ""}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-ink">
              {report.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              {report.description}
            </p>
            {report.domain && (
              <Link
                href={`/controleren/${report.domain.domain}`}
                className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
              >
                {report.domain.domain} ·{" "}
                {trustLabelNL(report.domain.trustLabel)} (
                {report.domain.trustScore}/100)
              </Link>
            )}
          </article>
        ))}
        {reports.length === 0 && (
          <p className="py-10 text-muted">Geen meldingen in deze filter.</p>
        )}
      </div>
    </div>
  );
}
