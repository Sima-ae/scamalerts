"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

export function DomainSearch({
  initial = "",
  large = false,
}: {
  initial?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initial);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/controleren/${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur ${
        large ? "max-w-2xl" : "max-w-xl"
      }`}
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <Search className="h-5 w-5 text-teal-300" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Voer een website, domein of URL in…"
          className={`w-full bg-transparent text-white placeholder:text-slate-400 focus:outline-none ${
            large ? "py-4 text-base md:text-lg" : "py-3 text-sm"
          }`}
          aria-label="Domein controleren"
        />
      </div>
      <button
        type="submit"
        className="bg-teal-400 px-5 font-semibold text-[#062018] transition hover:bg-teal-300 md:px-8"
      >
        Controleren
      </button>
    </form>
  );
}
