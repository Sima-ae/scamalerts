import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#050d16] text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-white">
            Scam Alerts
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Het Nederlandse platform om websites, telefoonnummers en
            betaalverzoeken te controleren — en scams te melden vóór anderen
            schade oplopen.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-teal-300/80">
            Hulp & melding
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/melden" className="hover:text-teal-300">
                Scam melden
              </Link>
            </li>
            <li>
              <Link href="/kennisbank" className="hover:text-teal-300">
                Kennisbank
              </Link>
            </li>
            <li>
              <a
                href="https://www.fraudehelpdesk.nl"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-300"
              >
                Fraudehelpdesk
              </a>
            </li>
            <li>
              <a
                href="https://www.politie.nl/aangifte-of-melding-doen"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-300"
              >
                Aangifte politie
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-teal-300/80">
            Juridisch
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-teal-300">
                Privacy (AVG)
              </Link>
            </li>
            <li>
              <Link href="/voorwaarden" className="hover:text-teal-300">
                Voorwaarden
              </Link>
            </li>
            <li>
              <Link href="/contentrichtlijnen" className="hover:text-teal-300">
                Contentrichtlijnen
              </Link>
            </li>
            <li>
              <Link href="/takedown" className="hover:text-teal-300">
                Takedown
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Scam Alerts · all-scams.com
      </div>
    </footer>
  );
}
