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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Versturen mislukt. Probeer opnieuw.");
      return;
    }
    router.push("/melden/bedankt");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className="text-sm font-medium text-ink">
          Titel van de melding
        </label>
        <input
          name="title"
          required
          className="input-field mt-1"
          placeholder="Korte samenvatting van wat er gebeurde"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Website / domein</label>
        <input
          name="domain"
          defaultValue={initialDomain}
          className="input-field mt-1"
          placeholder="voorbeeld.nl"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink">Categorie</label>
          <select name="categoryId" className="input-field mt-1">
            <option value="">Kies een categorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Kanaal</label>
          <select name="channel" className="input-field mt-1">
            <option value="Website">Website</option>
            <option value="E-mail">E-mail</option>
            <option value="Sms">Sms</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telefoon">Telefoon</option>
            <option value="Social media">Social media</option>
            <option value="Anders">Anders</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-ink">
          Wat is er gebeurd?
        </label>
        <textarea
          name="description"
          required
          rows={6}
          className="input-field mt-1"
          placeholder="Feiten: wat beloofden ze, hoe betaalde je, wat ging er mis?"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-ink">
            Naam (optioneel)
          </label>
          <input name="reporterName" className="input-field mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">
            E-mail (optioneel)
          </label>
          <input name="reporterEmail" type="email" className="input-field mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">
            Schade in € (optioneel)
          </label>
          <input
            name="amountLost"
            type="number"
            min="0"
            step="0.01"
            className="input-field mt-1"
          />
        </div>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Versturen…" : "Melding versturen"}
      </button>
      <p className="text-xs text-muted">
        Meldingen worden gemodereerd voordat ze openbaar zijn. Deel geen
        wachtwoorden of volledige betaalgegevens.
      </p>
    </form>
  );
}
