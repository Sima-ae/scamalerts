import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { trustLabelNL } from "@/lib/trust-score";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";
import { AnimatedItem } from "@/components/ui/animated-section";

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
  }).catch(() => []);

  const reports = await prisma.scamReport.findMany({
    where: {
      status: "APPROVED",
      ...(sp.categorie ? { category: { slug: sp.categorie } } : {}),
    },
    include: { domain: true, category: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  }).catch(() => []);

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
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 md:max-w-none md:justify-start">
        <Link
          href="/meldingen"
          className={`rounded-md px-3 py-1.5 text-sm transition ${
            !sp.categorie
              ? "bg-ink text-white"
              : "border border-line bg-white text-ink hover:border-ink/30"
          }`}
        >
          Alles
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/meldingen?categorie=${c.slug}`}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              sp.categorie === c.slug
                ? "bg-ink text-white"
                : "border border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-line md:mx-0 md:max-w-none">
        {reports.map((report, i) => (
          <AnimatedItem key={report.id} delay={Math.min(i, 5) * 0.04}>
            <article className="interactive-row rounded-lg px-2 py-6 md:px-4">
              <p className="text-center text-xs text-muted md:text-left">
                {report.publishedAt
                  ? formatDateNL(report.publishedAt)
                  : formatDateNL(report.createdAt)}
                {report.category ? ` · ${report.category.name}` : ""}
                {report.channel ? ` · ${report.channel}` : ""}
              </p>
              <h2 className="mt-1 text-center text-xl font-semibold text-ink md:text-left">
                {report.title}
              </h2>
              <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-relaxed text-muted md:mx-0 md:text-left">
                {report.description}
              </p>
              {report.domain && (
                <div className="mt-3 flex justify-center md:justify-start">
                  <Link
                    href={`/controleren/${report.domain.domain}`}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    {report.domain.domain} ·{" "}
                    {trustLabelNL(report.domain.trustLabel)} (
                    {report.domain.trustScore}/100)
                  </Link>
                </div>
              )}
            </article>
          </AnimatedItem>
        ))}
        {reports.length === 0 && (
          <p className="py-10 text-center text-muted md:text-left">
            Geen meldingen in deze filter.
          </p>
        )}
      </div>
    </PageShell>
  );
}
