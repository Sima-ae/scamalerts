"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { UserRound } from "lucide-react";

export function AccountMenu({
  loggedIn,
  isStaff,
  dashboardHref,
}: {
  loggedIn: boolean;
  isStaff: boolean;
  dashboardHref: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!loggedIn) {
    return (
      <Link
        href="/inloggen"
        aria-label="Inloggen"
        title="Inloggen"
        className="inline-flex items-center justify-center rounded-md border border-line bg-white p-2 text-ink transition hover:border-ink/30"
      >
        <UserRound className="h-5 w-5" aria-hidden />
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Accountmenu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center justify-center rounded-md border border-line bg-white p-2 text-ink transition hover:border-ink/30"
      >
        <UserRound className="h-5 w-5" aria-hidden />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-line bg-white py-1 text-left shadow-[0_16px_40px_-24px_rgba(15,28,46,0.45)]"
        >
          <Link
            role="menuitem"
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 text-sm text-ink transition hover:bg-background hover:text-accent"
          >
            Ga naar Dashboard
          </Link>
          <Link
            role="menuitem"
            href="/profiel"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 text-sm text-ink transition hover:bg-background hover:text-accent"
          >
            Mijn Profiel
          </Link>
          {isStaff && (
            <Link
              role="menuitem"
              href="/user/dashboard"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-ink transition hover:bg-background hover:text-accent"
            >
              Mijn meldingen
            </Link>
          )}
          <button
            type="button"
            role="menuitem"
            className="block w-full px-3 py-2.5 text-left text-sm text-ink transition hover:bg-background hover:text-accent"
            onClick={() => {
              setOpen(false);
              void signOut({ callbackUrl: "/" }).then(() => router.refresh());
            }}
          >
            Uitloggen
          </button>
        </div>
      )}
    </div>
  );
}
