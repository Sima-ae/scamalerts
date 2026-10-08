export function SignalStatus({
  positive,
  unavailable,
}: {
  positive: boolean | null;
  unavailable?: boolean;
}) {
  if (unavailable) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-line px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
        <span className="h-1.5 w-1.5 rounded-sm bg-muted/40" aria-hidden />
        Niet gecontroleerd
      </span>
    );
  }
  if (positive === true) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-[color-mix(in_oklab,var(--trust)_12%,white)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-trust">
        <span className="h-1.5 w-1.5 rounded-sm bg-trust" aria-hidden />
        Positief
      </span>
    );
  }
  if (positive === false) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-[color-mix(in_oklab,var(--danger)_10%,white)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-danger">
        <span className="h-1.5 w-1.5 rounded-sm bg-danger" aria-hidden />
        Negatief
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
      <span className="h-1.5 w-1.5 rounded-sm bg-muted/60" aria-hidden />
      Neutraal
    </span>
  );
}
