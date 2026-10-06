import Link from "next/link";
import { auth } from "@/lib/auth";

const links = [
  { href: "/controleren", label: "Controleren" },
  { href: "/meldingen", label: "Meldingen" },
  { href: "/melden", label: "Meld een scam" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/over-ons", label: "Over ons" },
];

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#07131f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-white md:text-3xl">
            Scam Alerts
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-teal-300/80">
            all-scams.com
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-200 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-teal-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              {(session.user.role === "ADMIN" ||
                session.user.role === "EDITOR") && (
                <Link
                  href="/admin"
                  className="rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="rounded-md bg-teal-400 px-3 py-2 text-sm font-medium text-[#062018] transition hover:bg-teal-300"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/inloggen"
                className="rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
              >
                Inloggen
              </Link>
              <Link
                href="/registreren"
                className="rounded-md bg-teal-400 px-3 py-2 text-sm font-medium text-[#062018] transition hover:bg-teal-300"
              >
                Account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
