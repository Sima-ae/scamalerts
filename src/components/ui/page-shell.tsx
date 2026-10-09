import type { ReactNode } from "react";
import { MediaFrame } from "@/components/ui/media-frame";
import type { SectionMedia } from "@/lib/media";

export type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  media?: SectionMedia;
  children?: ReactNode;
};

export function PageShell({
  children,
  className = "",
  narrow = false,
  hero,
}: {
  children?: ReactNode;
  className?: string;
  narrow?: boolean;
  hero?: PageHeroProps;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {hero && <PageBanner {...hero} />}
      {children && (
        <div className="relative overflow-hidden">
          <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
          <div
            className={`section-shell relative z-10 py-12 md:py-16 lg:py-20 ${
              narrow ? "prose-page mx-auto" : ""
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

/** Full-bleed ink banner with optional photo/video. */
export function PageBanner({
  eyebrow,
  title,
  description,
  media,
  children,
}: PageHeroProps) {
  return (
    <section className="page-banner relative w-full">
      {media && <MediaFrame media={media} overlay="ink" priority />}
      <div className="section-shell relative z-10 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center md:max-w-4xl">
          {eyebrow && (
            <p className="animate-rise text-xs font-semibold uppercase tracking-[0.2em] text-[#f3a37a]">
              {eyebrow}
            </p>
          )}
          <h1 className="animate-rise font-display mt-3 text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.03] tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="animate-rise-delay mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {description}
            </p>
          )}
          {children && (
            <div className="animate-rise-late mt-8 flex w-full justify-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
