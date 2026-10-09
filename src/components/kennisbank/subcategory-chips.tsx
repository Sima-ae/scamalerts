import Link from "next/link";

export function SubcategoryChips({
  items,
  activeSlug,
}: {
  items: { slug: string; name: string }[];
  activeSlug?: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
      {items.map((item) => {
        const active = activeSlug === item.slug;
        return (
          <Link
            key={item.slug}
            href={`/kennisbank?onderwerp=${item.slug}`}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              active
                ? "bg-ink text-white"
                : "border border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
