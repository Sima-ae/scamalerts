import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GuideCard({
  href,
  title,
  excerpt,
  categoryName,
  parentName,
}: {
  href: string;
  title: string;
  excerpt?: string | null;
  categoryName?: string | null;
  parentName?: string | null;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full w-full flex-col rounded-xl border border-line bg-white/80 p-6 text-center transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_20px_40px_-30px_rgba(15,28,46,0.45)] md:text-left"
    >
      {(categoryName || parentName) && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {parentName && categoryName
            ? `${parentName} · ${categoryName}`
            : categoryName || parentName}
        </p>
      )}
      <h3 className="font-display mt-2 text-xl text-ink transition group-hover:text-accent md:text-2xl">
        {title}
      </h3>
      {excerpt && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {excerpt}
        </p>
      )}
      <span className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2.5 md:justify-start">
        Lees meer
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
