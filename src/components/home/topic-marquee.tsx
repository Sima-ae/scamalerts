import Link from "next/link";
import { tickerItems } from "@/content/kennisbank/taxonomy";

const ITEMS = tickerItems();

export function TopicMarquee() {
  return (
    <div
      className="marquee relative w-full overflow-hidden border-y border-line bg-white/70 py-4 backdrop-blur-sm md:py-5"
      aria-label="Scam-vormen en Trust Score-onderwerpen"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {ITEMS.map((item) => (
              <li
                key={`${copy}-${item.slug}`}
                className="flex items-center whitespace-nowrap px-5 text-sm font-semibold text-ink/75 md:px-7 md:text-base"
              >
                <span
                  className="mr-5 h-1.5 w-1.5 rounded-sm bg-accent md:mr-7"
                  aria-hidden
                />
                <Link
                  href={`/kennisbank?onderwerp=${item.slug}`}
                  className="transition hover:text-accent"
                  tabIndex={copy === 1 ? -1 : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
