import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { formatDateNL } from "@/lib/utils";
import { signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

const statusLabel: Record<string, string> = {
  PENDING: "Wacht op moderatie",
  APPROVED: "Gepubliceerd",
  REJECTED: "Afgewezen",
  HIDDEN: "Verborgen",
};

export default async function UserDashboardPage() {
  const session = await requireUser();
  const reports = await prisma.scamReport
    .findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { domain: true, category: true },
    })
    .catch(() => []);

  const pending = reports.filter((report) => report.status === "PENDING").length;
  const approved = reports.filter((report) => report.status === "APPROVED").length;

  return (
    <div className="section-shell py-12 md:py-16">
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Dashboard
          </p>
          <h1 className="font-display mt-2 text-4xl text-ink">
            Hallo{session.user.name ? `, ${session.user.name}` : ""}
          </h1>
          <p className="mt-2 text-muted">{session.user.email}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Link href="/melden" className="btn-primary w-full text-sm sm:w-auto">
            Nieuwe melding
          </Link>
          <Link href="/profiel" className="rounded-md border border-line bg-white px-4 py-2 text-sm text-ink sm:inline-flex">
            Mijn profiel
          </Link>
          <form
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

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Jouw meldingen", value: reports.length },
          { label: "Wacht op moderatie", value: pending },
          { label: "Gepubliceerd", value: approved },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-white/80 p-5 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{stat.label}</p>
            <p className="font-display mt-2 text-4xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display mt-12 text-center text-2xl text-ink md:text-left">Jouw meldingen</h2>
      <div className="mt-4 divide-y divide-line">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col items-center gap-2 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-medium text-ink">{report.title}</p>
              <p className="text-xs text-muted">
                {formatDateNL(report.createdAt)}
                {report.category ? ` · ${report.category.name}` : ""}
                {report.domain ? ` · ${report.domain.domain}` : ""}
              </p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {statusLabel[report.status] ?? report.status}
            </span>
          </div>
        ))}
        {reports.length === 0 && (
          <p className="py-8 text-center text-muted">Je hebt nog geen meldingen geplaatst.</p>
        )}
      </div>
    </div>
  );
}
