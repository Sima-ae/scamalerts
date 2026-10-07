const ITEMS = [
  "Nepwebshops",
  "Tikkie-fraude",
  "Bankhelpdesk-fraude",
  "Marktplaats-oplichting",
  "Phishing-sms",
  "Nep-pakketdiensten",
  "Crypto-beleggingsfraude",
  "Datingfraude",
  "Valse vacatures",
  "DigiD-nabootsing",
  "Vriend-in-noodfraude",
  "Recovery-scams",
];

export function TopicMarquee() {
  return (
    <div
      className="marquee relative w-full overflow-hidden border-y border-line bg-white/70 py-4 backdrop-blur-sm md:py-5"
      aria-label="Scam-vormen die we volgen"
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
                key={item}
                className="flex items-center whitespace-nowrap px-5 text-sm font-semibold text-ink/75 md:px-7 md:text-base"
              >
                <span className="mr-5 h-1.5 w-1.5 rounded-sm bg-accent md:mr-7" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
