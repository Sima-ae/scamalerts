import Link from "next/link";
import { BRAND_NAME, copyrightLine } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-white/80">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl text-white">{BRAND_NAME}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
            Check websites, telefoonnummers en betaalverzoeken. Deel
            scam-ervaringen zodat anderen sneller doorhebben wat er speelt — met
            context, zonder paniekzaaierij.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Platform
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/controleren" className="hover:text-white">
                Website controleren
              </Link>
            </li>
            <li>
              <Link href="/melden" className="hover:text-white">
                Scam melden
              </Link>
            </li>
            <li>
              <Link href="/meldingen" className="hover:text-white">
                Alle meldingen
              </Link>
            </li>
            <li>
              <Link href="/kennisbank" className="hover:text-white">
                Kennisbank
              </Link>
            </li>
            <li>
              <Link href="/zakelijk" className="hover:text-white">
                Voor bedrijven
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Juridisch & hulp
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy (AVG)
              </Link>
            </li>
            <li>
              <Link href="/voorwaarden" className="hover:text-white">
                Voorwaarden
              </Link>
            </li>
            <li>
              <Link href="/contentrichtlijnen" className="hover:text-white">
                Contentrichtlijnen
              </Link>
            </li>
            <li>
              <Link href="/takedown" className="hover:text-white">
                Takedown
              </Link>
            </li>
            <li>
              <a
                href="https://www.fraudehelpdesk.nl"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Fraudehelpdesk
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        {copyrightLine()}
      </div>
    </footer>
  );
}
