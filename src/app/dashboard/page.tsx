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
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-teal-300/80">
            Gebruikersdashboard
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-white">
            Hallo{session.user.name ? `, ${session.user.name}` : ""}
          </h1>
          <p className="mt-2 text-slate-400">{session.user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/melden"
            className="rounded-md bg-teal-400 px-4 py-2 text-sm font-medium text-[#062018]"
          >
            Nieuwe melding
          </Link>
          <Link
            href="/zakelijk/claimen"
            className="rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200"
          >
            Zakelijk
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200">
              Uitloggen
            </button>
          </form>
        </div>
      </div>

      <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl text-white">
        Jouw meldingen
      </h2>
      <div className="mt-4 divide-y divide-white/10">
        {reports.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-white">{r.title}</p>
              <p className="text-xs text-slate-500">
                {formatDateNL(r.createdAt)}
                {r.domain ? ` · ${r.domain.domain}` : ""}
              </p>
            </div>
            <span className="text-xs uppercase tracking-wide text-slate-400">
              {r.status}
            </span>
          </div>
        ))}
        {reports.length === 0 && (
          <p className="py-6 text-slate-400">Je hebt nog geen meldingen geplaatst.</p>
        )}
      </div>
    </div>
  );
}
