import { ScoreRing } from "@/components/trust/score-ring";
import { SignalStatus } from "@/components/trust/signal-status";

const ROWS: { label: string; detail: string; positive: boolean | null }[] = [
  { label: "Domeinleeftijd", detail: "Geregistreerd 9 dagen geleden", positive: false },
  { label: "Merknabootsing", detail: "Lijkt op een bekende webshop", positive: false },
  { label: "TLS-certificaat", detail: "Geldig, net uitgegeven", positive: null },
  { label: "DNS-resolutie", detail: "Lost op naar 1 adres", positive: true },
];

/** Illustrative example result for the hero; not live data. */
export function ResultPreview() {
  return (
    <div className="float-soft w-full max-w-100 rounded-2xl border border-white/20 bg-white/95 p-6 text-left shadow-[0_40px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Voorbeeldresultaat
        </p>
        <span className="rounded-md bg-surface px-2 py-1 text-[11px] font-semibold text-muted">
          Illustratie
        </span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <ScoreRing score={24} label="Mogelijk onveilig" tone="bad" size="sm" />
        <div className="min-w-0">
          <p className="font-display truncate text-xl text-ink">
            super-deals-outlet.shop
          </p>
          <p className="mt-1 text-sm font-semibold text-danger">Mogelijk onveilig</p>
        </div>
      </div>
      <ul className="mt-4 divide-y divide-line border-t border-line">
        {ROWS.map((row, i) => (
          <li
            key={row.label}
            className="preview-row flex items-center justify-between gap-3 py-2.5"
            style={{ animationDelay: `${0.5 + i * 0.18}s` }}
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{row.label}</p>
              <p className="truncate text-xs text-muted">{row.detail}</p>
            </div>
            <SignalStatus positive={row.positive} />
          </li>
        ))}
      </ul>
    </div>
  );
}
