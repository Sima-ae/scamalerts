import Link from "next/link";
import { auth } from "@/lib/auth";
import { dashboardPath } from "@/lib/dashboard-path";
import { AccountMenu } from "@/components/account-menu";
import { MobileNav } from "@/components/mobile-nav";
import { HeaderFrame } from "@/components/header-frame";

const links = [
  { href: "/controleren", label: "Controleren" },
  { href: "/meldingen", label: "Alle meldingen" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/over-ons", label: "Over ons" },
];

export async function SiteHeader() {
  const session = await auth();
  const isStaff =
    session?.user?.role === "ADMIN" || session?.user?.role === "EDITOR";

  return (
    <HeaderFrame>
      <div className="section-shell flex flex-col items-center gap-3 py-3 md:flex-row md:justify-between md:gap-6 md:py-4">
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

        <div className="flex w-full items-center justify-center gap-2 md:w-auto md:justify-end">
          {session?.user ? (
            (session.user.role === "ADMIN" ||
              session.user.role === "EDITOR") && (
              <Link
                href="/admin/dashboard"
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
          <AccountMenu
            loggedIn={Boolean(session?.user)}
            isStaff={isStaff}
            dashboardHref={dashboardPath(session?.user?.role)}
          />
          <Link
            href="/melden"
            className="btn-ink whitespace-nowrap px-3 py-2 text-sm"
          >
            Scam melden
          </Link>
          <MobileNav links={links} />
        </div>
      </div>
    </HeaderFrame>
  );
}
