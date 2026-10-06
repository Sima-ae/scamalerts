"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; slug: string };

export function ReportForm({
  categories,
  initialDomain = "",
}: {
  categories: Category[];
  initialDomain?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        description: form.get("description"),
        domain: form.get("domain"),
        channel: form.get("channel"),
        categoryId: form.get("categoryId") || null,
        reporterName: form.get("reporterName"),
        reporterEmail: form.get("reporterEmail"),
        amountLost: form.get("amountLost") || null,
      }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Er ging iets mis. Probeer opnieuw.");
      return;
    }
    router.push("/melden/bedankt");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-5">
      <div>
        <label className="text-sm text-slate-300">Titel van de melding</label>
        <input
          name="title"
          required
          minLength={8}
          className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          placeholder="Bijv. Nepwebshop nam betaling maar leverde niet"
        />
      </div>
      <div>
        <label className="text-sm text-slate-300">Website / domein</label>
        <input
          name="domain"
          defaultValue={initialDomain}
          className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          placeholder="voorbeeld.nl"
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm text-slate-300">Categorie</label>
          <select
            name="categoryId"
            className="mt-1 w-full rounded-md border border-white/15 bg-[#0b1a29] px-3 py-2 text-white"
          >
            <option value="">Kies categorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-300">Kanaal</label>
          <select
            name="channel"
            className="mt-1 w-full rounded-md border border-white/15 bg-[#0b1a29] px-3 py-2 text-white"
          >
            <option value="Website">Website</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Sms">Sms</option>
            <option value="E-mail">E-mail</option>
            <option value="Telefoon">Telefoon</option>
            <option value="Marktplaats">Marktplaats</option>
            <option value="Social media">Social media</option>
            <option value="Anders">Anders</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-300">Wat is er gebeurd?</label>
        <textarea
          name="description"
          required
          minLength={40}
          rows={6}
          className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          placeholder="Beschrijf chronologisch wat er gebeurde, welke beloftes werden gedaan en hoe er betaald werd."
        />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="text-sm text-slate-300">Naam (optioneel)</label>
          <input
            name="reporterName"
            className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">E-mail (optioneel)</label>
          <input
            name="reporterEmail"
            type="email"
            className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Schade in € (optioneel)</label>
          <input
            name="amountLost"
            type="number"
            min="0"
            step="0.01"
            className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
          />
        </div>
      </div>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-teal-400 px-5 py-2.5 font-semibold text-[#062018] hover:bg-teal-300 disabled:opacity-60"
      >
        {loading ? "Versturen…" : "Melding indienen"}
      </button>
      <p className="text-xs text-slate-500">
        Meldingen worden eerst gemodereerd voordat ze openbaar verschijnen.
      </p>
    </form>
  );
}
