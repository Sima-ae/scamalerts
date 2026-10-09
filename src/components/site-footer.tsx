import Link from "next/link";
import { copyrightLine } from "@/lib/brand";
import { complianceLogos } from "@/content/privacy";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-ink text-white/80">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(600px 280px at 12% 0%, rgba(194,65,12,0.22), transparent 60%), radial-gradient(500px 240px at 88% 20%, rgba(255,255,255,0.06), transparent 55%)",
        }}
      />
      <div className="section-shell relative z-10 grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-8 xl:gap-10 lg:py-20">
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <Link href="/" className="inline-block">
            <img
              src="/all-scams-name-light.png"
              alt="All Scams"
              className="brand-logo-footer mx-auto lg:mx-0"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65 lg:max-w-none">
            Check websites, telefoonnummers en betaalverzoeken. Deel
            scam-ervaringen zodat anderen sneller doorhebben wat er speelt — met
            context, zonder paniekzaaierij.
          </p>
        </div>

        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Platform
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/controleren" className="transition hover:text-white">
                Website controleren
              </Link>
            </li>
            <li>
              <Link href="/melden" className="transition hover:text-white">
                Scam melden
              </Link>
            </li>
            <li>
              <Link href="/meldingen" className="transition hover:text-white">
                Alle meldingen
              </Link>
            </li>
            <li>
              <Link href="/kennisbank" className="transition hover:text-white">
                Kennisbank
              </Link>
            </li>
            <li>
              <Link href="/zakelijk" className="transition hover:text-white">
                Voor bedrijven
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Juridisch en hulp
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/cookiebeleid" className="transition hover:text-white">
                Cookiebeleid
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/voorwaarden" className="transition hover:text-white">
                Voorwaarden
              </Link>
            </li>
            <li>
              <Link
                href="/contentrichtlijnen"
                className="transition hover:text-white"
              >
                Contentrichtlijnen
              </Link>
            </li>
            <li>
              <Link href="/takedown" className="transition hover:text-white">
                Takedown
              </Link>
            </li>
            <li>
              <a
                href="https://www.fraudehelpdesk.nl"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Fraudehelpdesk
              </a>
            </li>
          </ul>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-4 lg:items-start">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="https://phished.io"
              target="_blank"
              rel="noreferrer"
              className="footer-partner-badge inline-flex items-center rounded-xl bg-white px-3 transition hover:bg-white/95 sm:px-4"
            >
              <img
                src="/Certified-Phished-Partner.png?v=9"
                alt="Certified Phished Partner"
                width={196}
                height={70}
                className="footer-partner-logo"
              />
            </a>
            <Link href="/privacy#avg" className="inline-flex shrink-0 items-center">
              <img
                src="/avg-badge.svg"
                alt="AVG"
                width={240}
                height={240}
                className="footer-avg-badge"
              />
            </Link>
          </div>
          <div className="grid grid-cols-4 items-center justify-items-center gap-x-2.5 gap-y-2.5">
            {complianceLogos.map((logo) => (
              <Link
                key={logo.id}
                href={`/privacy#${logo.id}`}
                className="inline-flex items-center"
              >
                <img
                  src={logo.src}
                  alt={logo.title}
                  width={logo.width}
                  height={logo.height}
                  className="footer-compliance-badge"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10">
        <div className="section-shell py-5 text-center text-xs text-white/45">
          {copyrightLine()}
        </div>
      </div>
    </footer>
  );
}
