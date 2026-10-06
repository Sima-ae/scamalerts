import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await requireUser();
  const reports = await prisma.scamReport.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { domain: true },
  });

  return (
    <div className="section-shell py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Dashboard
          </p>
          <h1 className="font-display mt-2 text-4xl text-ink">
            Hallo{session.user.name ? `, ${session.user.name}` : ""}
          </h1>
          <p className="mt-2 text-muted">{session.user.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/melden" className="btn-primary text-sm">
            Nieuwe melding
          </Link>
          <Link
            href="/zakelijk/claimen"
            className="rounded-md border border-line bg-white px-4 py-2 text-sm text-ink"
          >
            Zakelijk
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="rounded-md border border-line bg-white px-4 py-2 text-sm text-ink">
              Uitloggen
            </button>
          </form>
        </div>
      </div>

      <h2 className="font-display mt-12 text-2xl text-ink">Jouw meldingen</h2>
      <div className="mt-4 divide-y divide-line">
        {reports.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="font-medium text-ink">{r.title}</p>
              <p className="text-xs text-muted">
                {formatDateNL(r.createdAt)}
                {r.domain ? ` · ${r.domain.domain}` : ""}
              </p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {r.status}
            </span>
          </div>
        ))}
        {reports.length === 0 && (
          <p className="py-6 text-muted">Je hebt nog geen meldingen geplaatst.</p>
        )}
      </div>
    </div>
  );
}
