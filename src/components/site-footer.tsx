import Link from "next/link";
import { copyrightLine } from "@/lib/brand";

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
      <div className="section-shell relative z-10 grid gap-12 py-16 md:grid-cols-4 md:gap-10 md:py-20">
        <div className="text-center md:col-span-2 md:text-left">
          <Link href="/" className="inline-block">
            <img
              src="/all-scams-name-light.png"
              alt="All Scams"
              className="brand-logo-footer mx-auto md:mx-0"
            />
          </Link>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/65 md:mx-0">
            Check websites, telefoonnummers en betaalverzoeken. Deel
            scam-ervaringen zodat anderen sneller doorhebben wat er speelt — met
            context, zonder paniekzaaierij.
          </p>
        </div>
        <div className="text-center md:text-left">
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
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Juridisch en hulp
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy (AVG)
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
      </div>
      <div className="relative z-10 border-t border-white/10 py-5 text-center text-xs text-white/45">
        {copyrightLine()}
      </div>
    </footer>
  );
}
