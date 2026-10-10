"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Overzicht" },
  { href: "/admin/meldingen", label: "Meldingen" },
  { href: "/admin/artikelen", label: "Kennisbank" },
  { href: "/admin/artikelen/nieuw", label: "Nieuw artikel" },
];

export function AdminNav({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <div className="border-b border-line/80">
      <div className="section-shell flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {role === "ADMIN" ? "Super admin" : "Redactie"}
          </p>
          <p className="font-display text-2xl text-ink">Beheer</p>
        </div>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => {
            const active =
              link.href === "/admin/artikelen"
                ? pathname === link.href ||
                  (pathname.startsWith("/admin/artikelen/") &&
                    !pathname.startsWith("/admin/artikelen/nieuw"))
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-ink text-white"
                    : "border border-line bg-white text-ink hover:border-ink/30"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
