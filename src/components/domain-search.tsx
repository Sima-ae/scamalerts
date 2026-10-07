"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

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
  const [value, setValue] = useState(initial);
  const hero = variant === "hero";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/controleren/${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full flex-col overflow-hidden rounded-xl border sm:flex-row ${
        hero
          ? "border-white/25 bg-white/12 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)] backdrop-blur-md"
          : "border-line bg-white shadow-[0_12px_40px_-28px_rgba(15,28,46,0.35)]"
      } ${large ? "max-w-2xl" : "max-w-xl"}`}
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <Search
          className={`h-5 w-5 shrink-0 ${hero ? "text-white/80" : "text-accent"}`}
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Website, domein of URL…"
          className={`w-full min-w-0 bg-transparent focus:outline-none ${
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
        className={`shrink-0 px-5 py-3.5 font-semibold transition sm:py-0 md:px-8 ${
          hero
            ? "bg-accent text-white hover:bg-[color-mix(in_oklab,var(--accent)_88%,black)]"
            : "bg-ink text-white hover:bg-[color-mix(in_oklab,var(--ink)_88%,white)]"
        }`}
      >
        Controleren
      </button>
    </form>
  );
}
