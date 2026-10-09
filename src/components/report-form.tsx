"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileImage, Trash2, Upload } from "lucide-react";
import {
  EVIDENCE_MAX_BYTES,
  EVIDENCE_MAX_FILES,
} from "@/lib/evidence-limits";

type CategoryGroup = {
  label: string;
  options: { id: string; name: string; slug: string }[];
};

type SelectedFile = {
  id: string;
  file: File;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ReportForm({
  categories,
  initialDomain = "",
}: {
  categories: CategoryGroup[];
  initialDomain?: string;
}) {
  const router = useRouter();
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<SelectedFile[]>([]);

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    setError(null);
    const next = [...files];
    for (const file of Array.from(list)) {
      if (next.length >= EVIDENCE_MAX_FILES) {
        setError(`Je kunt maximaal ${EVIDENCE_MAX_FILES} bestanden toevoegen.`);
        break;
      }
      if (file.size > EVIDENCE_MAX_BYTES) {
        setError(`“${file.name}” is groter dan 5 MB.`);
        continue;
      }
      const allowed =
        file.type.startsWith("image/") || file.type === "application/pdf";
      if (!allowed) {
        setError(`“${file.name}” is geen toegestaan bestandstype.`);
        continue;
      }
      const duplicate = next.some(
        (item) =>
          item.file.name === file.name &&
          item.file.size === file.size &&
          item.file.lastModified === file.lastModified,
      );
      if (!duplicate) {
        next.push({ id: `${file.name}-${file.size}-${file.lastModified}-${next.length}`, file });
      }
    }
    setFiles(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    form.delete("evidence");
    for (const item of files) {
      form.append("evidence", item.file, item.file.name);
    }

    const res = await fetch("/api/reports", {
      method: "POST",
      body: form,
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
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-2xl space-y-5 text-center">
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
            {categories.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
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

      <div className="text-left">
        <label htmlFor={inputId} className="block text-center text-sm font-medium text-ink md:text-left">
          Screenshots of bestanden (optioneel)
        </label>
        <p className="mt-1 text-center text-xs text-muted md:text-left">
          Voeg tot {EVIDENCE_MAX_FILES} afbeeldingen of PDF’s toe (max. 5 MB per
          bestand). Geen wachtwoorden of volledige ID-documenten.
        </p>
        <label
          htmlFor={inputId}
          className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-white/70 px-4 py-8 text-center transition hover:border-accent/40 hover:bg-white"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addFiles(e.dataTransfer.files);
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Upload className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-ink">
            Kies bestanden of sleep ze hierheen
          </span>
          <span className="text-xs text-muted">
            JPG, PNG, WebP, GIF of PDF
          </span>
          <input
            id={inputId}
            ref={fileInputRef}
            type="file"
            name="evidence"
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
            multiple
            className="sr-only"
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2.5 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 text-ink">
                  <FileImage className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="truncate font-medium">{item.file.name}</span>
                  <span className="shrink-0 text-xs text-muted">
                    {formatBytes(item.file.size)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(item.id)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-danger transition hover:bg-danger/5"
                  aria-label={`Verwijder ${item.file.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Weg
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
        {loading ? "Versturen…" : "Melding versturen"}
      </button>
      <p className="text-xs text-muted">
        Meldingen worden gemodereerd voordat ze openbaar zijn. Deel geen
        wachtwoorden of volledige betaalgegevens.
      </p>
    </form>
  );
}
