"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!open) return;
    const header = document.querySelector("header");
    if (!header) return;
    const place = () => setTop(header.getBoundingClientRect().bottom);
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  return (
    <div className="relative xl:hidden">
      <button
        type="button"
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border border-line bg-white p-2 text-ink transition hover:border-ink/30"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div
          className="fixed inset-x-0 z-50 border-b border-line bg-[color-mix(in_oklab,white_94%,var(--background))] shadow-[0_16px_40px_-24px_rgba(15,28,46,0.35)] backdrop-blur-xl"
          style={{ top }}
        >
          <nav className="section-shell flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-center text-base text-ink transition hover:bg-white hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
