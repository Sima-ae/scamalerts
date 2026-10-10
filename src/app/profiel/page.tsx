import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { dashboardPath } from "@/lib/dashboard-path";
import { signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

const roleLabel: Record<string, string> = {
  USER: "Gebruiker",
  BUSINESS: "Zakelijk",
  EDITOR: "Redacteur",
  ADMIN: "Beheerder",
};

export default async function ProfilePage() {
  const session = await requireUser();
  const { name, email, role } = session.user;

  return (
    <div className="section-shell py-12 text-center md:py-16 md:text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Account
      </p>
      <h1 className="font-display mt-2 text-4xl text-ink">Mijn profiel</h1>
      <p className="mt-2 text-muted">
        Dit is het account waarmee je meldingen plaatst en het dashboard gebruikt.
      </p>

      <dl className="mx-auto mt-8 max-w-xl divide-y divide-line rounded-2xl border border-line bg-white/70 text-left md:mx-0">
        <div className="px-5 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Naam
          </dt>
          <dd className="mt-1 text-ink">{name || "Nog geen naam"}</dd>
        </div>
        <div className="px-5 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            E-mail
          </dt>
          <dd className="mt-1 text-ink">{email}</dd>
        </div>
        <div className="px-5 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Rol
          </dt>
          <dd className="mt-1 text-ink">{roleLabel[role] ?? role}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap md:justify-start">
        <Link href={dashboardPath(role)} className="btn-primary w-full sm:w-auto">
          Ga naar Dashboard
        </Link>
        {(role === "ADMIN" || role === "EDITOR") && (
          <Link
            href="/admin/dashboard"
            className="inline-flex w-full items-center justify-center rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 sm:w-auto"
          >
            Admin
          </Link>
        )}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="w-full rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink sm:w-auto">
            Uitloggen
          </button>
        </form>
      </div>
    </div>
  );
}
