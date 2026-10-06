import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { trustLabelNL } from "@/lib/trust-score";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scam-meldingen",
};

export default async function MeldingenPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const sp = await searchParams;
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  const reports = await prisma.scamReport.findMany({
    where: {
      status: "APPROVED",
      ...(sp.categorie
        ? { category: { slug: sp.categorie } }
        : {}),
    },
    include: { domain: true, category: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
        Scam-meldingen
      </h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        Goedgekeurde meldingen uit Nederland en daarbuiten. Filter op categorie
        of zoek een specifiek domein via Controleren.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/meldingen"
          className={`rounded-full px-3 py-1 text-sm ${
            !sp.categorie
              ? "bg-teal-400 text-[#062018]"
              : "border border-white/15 text-slate-300"
          }`}
        >
          Alles
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/meldingen?categorie=${c.slug}`}
            className={`rounded-full px-3 py-1 text-sm ${
              sp.categorie === c.slug
                ? "bg-teal-400 text-[#062018]"
                : "border border-white/15 text-slate-300"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 divide-y divide-white/10">
        {reports.map((report) => (
          <article key={report.id} className="py-6">
            <p className="text-xs text-slate-500">
              {report.publishedAt
                ? formatDateNL(report.publishedAt)
                : formatDateNL(report.createdAt)}
              {report.category ? ` · ${report.category.name}` : ""}
              {report.channel ? ` · ${report.channel}` : ""}
            </p>
            <h2 className="mt-1 text-xl text-white">{report.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
              {report.description}
            </p>
            {report.domain && (
              <Link
                href={`/controleren/${report.domain.domain}`}
                className="mt-3 inline-block text-sm text-teal-300 hover:underline"
              >
                {report.domain.domain} · {trustLabelNL(report.domain.trustLabel)} (
                {report.domain.trustScore}/100)
              </Link>
            )}
          </article>
        ))}
        {reports.length === 0 && (
          <p className="py-10 text-slate-400">Geen meldingen in deze filter.</p>
        )}
      </div>
    </div>
  );
}
