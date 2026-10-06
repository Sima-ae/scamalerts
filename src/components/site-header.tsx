import Link from "next/link";
import { auth } from "@/lib/auth";
import { BRAND_NAME } from "@/lib/brand";
import { MobileNav } from "@/components/mobile-nav";

const links = [
  { href: "/controleren", label: "Controleren" },
  { href: "/meldingen", label: "Meldingen" },
  { href: "/melden", label: "Melden" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/over-ons", label: "Over ons" },
];

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-[color-mix(in_oklab,var(--background)_88%,white)] backdrop-blur-md">
      <div className="section-shell flex items-center justify-between gap-4 py-3.5">
        <Link href="/" className="min-w-0">
          <span className="font-display text-2xl tracking-tight text-ink md:text-[1.75rem]">
            {BRAND_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-ink/80 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-accent"
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
                  className="hidden rounded-md px-3 py-2 text-sm text-ink/80 hover:bg-white sm:inline"
                >
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="btn-ink px-3 py-2 text-sm">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/inloggen"
                className="hidden rounded-md px-3 py-2 text-sm text-ink/80 hover:bg-white sm:inline"
              >
                Inloggen
              </Link>
              <Link href="/registreren" className="btn-ink px-3 py-2 text-sm">
                Account
              </Link>
            </>
          )}
          <MobileNav links={links} />
        </div>
      </div>
    </header>
  );
}
