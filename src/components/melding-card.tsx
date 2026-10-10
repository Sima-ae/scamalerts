export function MeldingCard({
  dateLabel,
  categoryName,
  title,
  description,
  identifier,
  trustLabel,
}: {
  dateLabel: string;
  categoryName?: string | null;
  title: string;
  description: string;
  identifier?: string | null;
  trustLabel?: string | null;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-white/80 p-5 text-center transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_20px_40px_-30px_rgba(15,28,46,0.45)] md:text-left">
      <p className="text-xs text-muted">
        {dateLabel}
        {categoryName ? ` · ${categoryName}` : ""}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 border-t border-line pt-3 text-sm md:justify-between">
        <span className="font-semibold text-ink">{identifier || "—"}</span>
        {trustLabel && <span className="text-accent">{trustLabel}</span>}
      </div>
    </article>
  );
}
