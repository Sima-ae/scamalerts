"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { CheckingStatus } from "@/components/checking-status";

export function DomainSearch({
  initial = "",
  large = false,
  variant = "light",
}: {
  initial?: string;
  large?: boolean;
  variant?: "light" | "hero";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(initial);
  const [pending, setPending] = useState(false);
  const [pendingQuery, setPendingQuery] = useState("");
  const hero = variant === "hero";

  useEffect(() => {
    setPending(false);
    setPendingQuery("");
  }, [pathname]);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q || pending) return;
    setPending(true);
    setPendingQuery(q);
    router.push(`/controleren/${encodeURIComponent(q)}`);
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        aria-busy={pending}
        className={`flex w-full flex-col overflow-hidden rounded-xl border sm:flex-row ${
          hero
            ? "border-white/25 bg-white/12 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)] backdrop-blur-md"
            : "border-line bg-white shadow-[0_12px_40px_-28px_rgba(15,28,46,0.35)]"
        } ${large ? "max-w-2xl" : "max-w-xl"} ${
          pending ? "pointer-events-none opacity-90" : ""
        }`}
      >
        <div className="flex flex-1 items-center gap-3 px-4">
          {pending ? (
            <Loader2
              className={`h-5 w-5 shrink-0 animate-spin ${
                hero ? "text-white/80" : "text-accent"
              }`}
              aria-hidden
            />
          ) : (
            <Search
              className={`h-5 w-5 shrink-0 ${hero ? "text-white/80" : "text-accent"}`}
            />
          )}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Website, domein of URL…"
            disabled={pending}
            className={`w-full min-w-0 bg-transparent focus:outline-none disabled:cursor-wait ${
              hero
                ? "text-white placeholder:text-white/55"
                : "text-ink placeholder:text-muted"
            } ${large ? "py-3.5 text-base md:py-4 md:text-lg" : "py-3 text-sm"}`}
            aria-label="Domein controleren"
            autoComplete="off"
            inputMode="url"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className={`shrink-0 px-5 py-3.5 font-semibold transition disabled:cursor-wait sm:py-0 md:px-8 ${
            hero
              ? "bg-accent text-white hover:bg-[color-mix(in_oklab,var(--accent)_88%,black)] disabled:opacity-90"
              : "bg-ink text-white hover:bg-[color-mix(in_oklab,var(--ink)_88%,white)] disabled:opacity-90"
          }`}
        >
          {pending ? (
            <CheckingStatus compact />
          ) : (
            "Controleren"
          )}
        </button>
      </form>

      {pending && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color-mix(in_oklab,var(--ink)_45%,transparent)] px-4 backdrop-blur-[2px]"
          role="alertdialog"
          aria-label="Aan het controleren"
        >
          <div className="w-full max-w-md rounded-2xl border border-line bg-white px-6 py-10 shadow-[0_24px_60px_-30px_rgba(15,28,46,0.55)]">
            <CheckingStatus domain={pendingQuery} />
          </div>
        </div>
      )}
    </>
  );
}
