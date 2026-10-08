import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/media-frame";
import { AnimatedItem } from "@/components/ui/animated-section";
import type { SectionMedia } from "@/lib/media";

export function SplitFeature({
  eyebrow,
  title,
  text,
  media,
  href,
  cta,
  reverse = false,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  media: SectionMedia;
  href: string;
  cta: string;
  reverse?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <AnimatedItem className={reverse ? "lg:order-2" : ""}>
        <div className="photo-card relative mx-auto aspect-4/3 w-full max-w-xl overflow-hidden rounded-2xl lg:max-w-none">
          <MediaFrame
            media={media}
            overlay="soft"
            pan={false}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </AnimatedItem>
      <AnimatedItem
        delay={0.1}
        className={`mx-auto max-w-xl text-center lg:mx-0 lg:text-left ${reverse ? "lg:order-1" : ""}`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h2 className="font-display mt-2 text-3xl text-ink md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {text}
        </p>
        {children}
        <div className="mt-8 flex justify-center lg:justify-start">
          <Link href={href} className="btn-ink group w-full gap-2 text-sm sm:w-auto">
            {cta}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </AnimatedItem>
    </div>
  );
}
