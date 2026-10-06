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
      className={`flex w-full overflow-hidden rounded-xl border ${
        hero
          ? "border-white/25 bg-white/10 backdrop-blur-sm"
          : "border-line bg-white shadow-sm"
      } ${large ? "max-w-2xl" : "max-w-xl"}`}
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <Search
          className={`h-5 w-5 ${hero ? "text-white/80" : "text-accent"}`}
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Website, domein of URL…"
          className={`w-full bg-transparent focus:outline-none ${
            hero
              ? "text-white placeholder:text-white/55"
              : "text-ink placeholder:text-muted"
          } ${large ? "py-4 text-base md:text-lg" : "py-3 text-sm"}`}
          aria-label="Domein controleren"
        />
      </div>
      <button
        type="submit"
        className={`px-5 font-semibold transition md:px-8 ${
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
