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
    <div className="section-shell py-12 text-center md:py-16 md:text-left">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Dashboard
          </p>
          <h1 className="font-display mt-2 text-4xl text-ink">
            Hallo{session.user.name ? `, ${session.user.name}` : ""}
          </h1>
          <p className="mt-2 text-muted">{session.user.email}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center md:justify-end">
          <Link href="/melden" className="btn-primary w-full text-sm sm:w-auto">
            Nieuwe melding
          </Link>
          <Link
            href="/zakelijk/claimen"
            className="w-full rounded-md border border-line bg-white px-4 py-2 text-sm text-ink sm:w-auto"
          >
            Zakelijk
          </Link>
          <form
            className="w-full sm:w-auto"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="w-full rounded-md border border-line bg-white px-4 py-2 text-sm text-ink sm:w-auto">
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
            className="flex flex-col items-center gap-2 py-4 text-center sm:flex-row sm:justify-between sm:text-left"
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
