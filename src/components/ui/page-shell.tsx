import type { ReactNode } from "react";

export function PageShell({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
      <div
        className={`section-shell relative z-10 py-12 md:py-16 lg:py-20 ${
          narrow ? "prose-page mx-auto" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center md:max-w-4xl">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display mt-3 text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
