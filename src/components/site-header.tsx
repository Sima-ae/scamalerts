import Link from "next/link";
import { UserRound } from "lucide-react";
import { auth } from "@/lib/auth";
import { MobileNav } from "@/components/mobile-nav";
import { HeaderFrame } from "@/components/header-frame";

const links = [
  { href: "/controleren", label: "Controleren" },
  { href: "/meldingen", label: "Meldingen" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/over-ons", label: "Over ons" },
];

export async function SiteHeader() {
  const session = await auth();
  const accountHref = session?.user ? "/dashboard" : "/registreren";
  const accountLabel = session?.user ? "Dashboard" : "Account";

  return (
    <HeaderFrame>
      <div className="section-shell flex items-center justify-between gap-3 py-3.5 md:gap-6 md:py-4">
        <Link href="/" className="min-w-0 shrink-0">
          <img
            src="/all-scams-name.png"
            alt="All Scams"
            className="brand-logo"
          />
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-ink/80 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 transition hover:bg-white/70 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {session?.user ? (
            (session.user.role === "ADMIN" ||
              session.user.role === "EDITOR") && (
              <Link
                href="/admin"
                className="hidden rounded-md px-3 py-2 text-sm text-ink/80 hover:bg-white sm:inline"
              >
                Admin
              </Link>
            )
          ) : (
            <Link
              href="/inloggen"
              className="hidden rounded-md px-3 py-2 text-sm text-ink/80 hover:bg-white sm:inline"
            >
              Inloggen
            </Link>
          )}
          <Link
            href={accountHref}
            aria-label={accountLabel}
            title={accountLabel}
            className="inline-flex items-center justify-center rounded-md border border-line bg-white p-2 text-ink transition hover:border-ink/30 hover:bg-white"
          >
            <UserRound className="h-5 w-5" aria-hidden />
          </Link>
          <Link href="/melden" className="btn-ink px-3 py-2 text-sm">
            Scam melden
          </Link>
          <MobileNav links={links} />
        </div>
      </div>
    </HeaderFrame>
  );
}
