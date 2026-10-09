import Link from "next/link";

export function CategoryCard({
  href,
  name,
  description,
  subcategoryCount,
  articleCount,
}: {
  href: string;
  name: string;
  description: string;
  subcategoryCount: number;
  articleCount: number;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full w-full flex-col rounded-xl border border-line bg-white/75 p-6 text-center transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white md:text-left"
    >
      <h2 className="font-display text-2xl text-ink transition group-hover:text-accent">
        {name}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
        {subcategoryCount}{" "}
        {subcategoryCount === 1 ? "onderwerp" : "onderwerpen"}
        {" · "}
        {articleCount} {articleCount === 1 ? "gids" : "gidsen"}
      </p>
    </Link>
  );
}
