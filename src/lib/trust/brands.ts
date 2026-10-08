/**
 * Frequently impersonated brands and authorities (NL focus) with the domains
 * they officially operate. Tokens are the brand words looked for in
 * lookalike domains; `keywordOnly` tokens are common words or very short and
 * only count when combined with a phishing keyword (e.g. ing-inloggen.nl).
 */

export type BrandToken = { t: string; keywordOnly?: boolean };

export type Brand = {
  name: string;
  sector: "overheid" | "bank" | "betalen" | "bezorging" | "webwinkel" | "tech" | "telecom" | "zorg" | "energie" | "hosting" | "crypto" | "reizen";
  domains: string[];
  tokens: BrandToken[];
};

const t = (word: string, keywordOnly = false): BrandToken => ({ t: word, keywordOnly });

export const BRANDS: Brand[] = [
  { name: "Belastingdienst", sector: "overheid", domains: ["belastingdienst.nl"], tokens: [t("belastingdienst"), t("belasting", true)] },
  { name: "DigiD", sector: "overheid", domains: ["digid.nl"], tokens: [t("digid")] },
  { name: "MijnOverheid", sector: "overheid", domains: ["mijnoverheid.nl"], tokens: [t("mijnoverheid")] },
  { name: "Rijksoverheid", sector: "overheid", domains: ["rijksoverheid.nl", "overheid.nl", "government.nl"], tokens: [t("rijksoverheid")] },
  { name: "KVK", sector: "overheid", domains: ["kvk.nl"], tokens: [t("kvk", true), t("kamervankoophandel")] },
  { name: "RDW", sector: "overheid", domains: ["rdw.nl"], tokens: [t("rdw", true)] },
  { name: "UWV", sector: "overheid", domains: ["uwv.nl"], tokens: [t("uwv", true)] },
  { name: "SVB", sector: "overheid", domains: ["svb.nl"], tokens: [t("svb", true)] },
  { name: "DUO", sector: "overheid", domains: ["duo.nl"], tokens: [t("duo", true)] },
  { name: "CJIB", sector: "overheid", domains: ["cjib.nl"], tokens: [t("cjib")] },
  { name: "Politie", sector: "overheid", domains: ["politie.nl"], tokens: [t("politie", true)] },

  { name: "ING", sector: "bank", domains: ["ing.nl", "ing.com", "ing.be", "ing.de"], tokens: [t("ing", true), t("ingbank")] },
  { name: "ABN AMRO", sector: "bank", domains: ["abnamro.nl", "abnamro.com"], tokens: [t("abnamro"), t("abn", true)] },
  { name: "Rabobank", sector: "bank", domains: ["rabobank.nl", "rabobank.com"], tokens: [t("rabobank"), t("rabo")] },
  { name: "SNS", sector: "bank", domains: ["snsbank.nl", "sns.nl"], tokens: [t("snsbank"), t("sns", true)] },
  { name: "ASN Bank", sector: "bank", domains: ["asnbank.nl"], tokens: [t("asnbank")] },
  { name: "RegioBank", sector: "bank", domains: ["regiobank.nl"], tokens: [t("regiobank")] },
  { name: "Triodos Bank", sector: "bank", domains: ["triodos.nl", "triodos.com"], tokens: [t("triodos")] },
  { name: "Knab", sector: "bank", domains: ["knab.nl"], tokens: [t("knab")] },
  { name: "bunq", sector: "bank", domains: ["bunq.com"], tokens: [t("bunq")] },
  { name: "Revolut", sector: "bank", domains: ["revolut.com"], tokens: [t("revolut")] },
  { name: "ICS", sector: "bank", domains: ["icscards.nl"], tokens: [t("icscards")] },

  { name: "Tikkie", sector: "betalen", domains: ["tikkie.me"], tokens: [t("tikkie")] },
  { name: "iDEAL", sector: "betalen", domains: ["ideal.nl"], tokens: [t("ideal", true)] },
  { name: "PayPal", sector: "betalen", domains: ["paypal.com", "paypal.me"], tokens: [t("paypal")] },
  { name: "Klarna", sector: "betalen", domains: ["klarna.com"], tokens: [t("klarna")] },

  { name: "PostNL", sector: "bezorging", domains: ["postnl.nl", "postnl.com"], tokens: [t("postnl")] },
  { name: "DHL", sector: "bezorging", domains: ["dhl.com", "dhl.nl", "dhl.de", "dhlparcel.nl"], tokens: [t("dhl", true), t("dhlparcel")] },
  { name: "DPD", sector: "bezorging", domains: ["dpd.com", "dpd.nl"], tokens: [t("dpd", true)] },
  { name: "GLS", sector: "bezorging", domains: ["gls-group.com", "gls-group.eu", "gls-info.nl"], tokens: [t("gls", true)] },

  { name: "bol", sector: "webwinkel", domains: ["bol.com"], tokens: [t("bol", true), t("bolcom")] },
  { name: "Marktplaats", sector: "webwinkel", domains: ["marktplaats.nl"], tokens: [t("marktplaats")] },
  { name: "Coolblue", sector: "webwinkel", domains: ["coolblue.nl", "coolblue.be"], tokens: [t("coolblue")] },
  { name: "Albert Heijn", sector: "webwinkel", domains: ["ah.nl", "albertheijn.nl"], tokens: [t("albertheijn")] },
  { name: "Zalando", sector: "webwinkel", domains: ["zalando.nl", "zalando.com", "zalando.de", "zalando.be"], tokens: [t("zalando")] },
  { name: "Amazon", sector: "webwinkel", domains: ["amazon.com", "amazon.nl", "amazon.de", "amazon.co.uk", "amazon.fr", "amazon.com.be"], tokens: [t("amazon"), t("amzn", true)] },
  { name: "Vinted", sector: "webwinkel", domains: ["vinted.nl", "vinted.com", "vinted.be", "vinted.de"], tokens: [t("vinted")] },
  { name: "Thuisbezorgd", sector: "webwinkel", domains: ["thuisbezorgd.nl"], tokens: [t("thuisbezorgd")] },
  { name: "Booking.com", sector: "reizen", domains: ["booking.com"], tokens: [t("booking", true)] },

  { name: "Apple", sector: "tech", domains: ["apple.com", "icloud.com"], tokens: [t("apple"), t("icloud"), t("appleid")] },
  { name: "Microsoft", sector: "tech", domains: ["microsoft.com", "live.com", "outlook.com", "office.com", "microsoftonline.com", "microsoft365.com"], tokens: [t("microsoft"), t("office365"), t("microsoft365"), t("outlook", true)] },
  { name: "Google", sector: "tech", domains: ["google.com", "google.nl", "gmail.com", "youtube.com"], tokens: [t("google"), t("gmail")] },
  { name: "Meta", sector: "tech", domains: ["facebook.com", "instagram.com", "whatsapp.com", "meta.com", "fb.com"], tokens: [t("facebook"), t("instagram"), t("whatsapp")] },
  { name: "Netflix", sector: "tech", domains: ["netflix.com"], tokens: [t("netflix")] },
  { name: "Spotify", sector: "tech", domains: ["spotify.com"], tokens: [t("spotify")] },
  { name: "LinkedIn", sector: "tech", domains: ["linkedin.com"], tokens: [t("linkedin")] },
  { name: "Steam", sector: "tech", domains: ["steampowered.com", "steamcommunity.com"], tokens: [t("steampowered"), t("steamcommunity"), t("steam", true)] },

  { name: "KPN", sector: "telecom", domains: ["kpn.com"], tokens: [t("kpn", true)] },
  { name: "Odido", sector: "telecom", domains: ["odido.nl"], tokens: [t("odido")] },
  { name: "Ziggo", sector: "telecom", domains: ["ziggo.nl"], tokens: [t("ziggo")] },
  { name: "Vodafone", sector: "telecom", domains: ["vodafone.nl", "vodafone.com"], tokens: [t("vodafone")] },

  { name: "Zilveren Kruis", sector: "zorg", domains: ["zilverenkruis.nl"], tokens: [t("zilverenkruis")] },
  { name: "VGZ", sector: "zorg", domains: ["vgz.nl"], tokens: [t("vgz", true)] },
  { name: "Menzis", sector: "zorg", domains: ["menzis.nl"], tokens: [t("menzis")] },

  { name: "Eneco", sector: "energie", domains: ["eneco.nl"], tokens: [t("eneco")] },
  { name: "Vattenfall", sector: "energie", domains: ["vattenfall.nl", "vattenfall.com"], tokens: [t("vattenfall")] },
  { name: "Essent", sector: "energie", domains: ["essent.nl"], tokens: [t("essent", true)] },

  { name: "Coinbase", sector: "crypto", domains: ["coinbase.com"], tokens: [t("coinbase")] },
  { name: "Binance", sector: "crypto", domains: ["binance.com"], tokens: [t("binance")] },
  { name: "Bitvavo", sector: "crypto", domains: ["bitvavo.com"], tokens: [t("bitvavo")] },

  { name: "Yourhosting", sector: "hosting", domains: ["yourhosting.nl"], tokens: [t("yourhosting")] },
  { name: "TransIP", sector: "hosting", domains: ["transip.nl", "transip.eu"], tokens: [t("transip")] },
  { name: "Hostnet", sector: "hosting", domains: ["hostnet.nl"], tokens: [t("hostnet")] },
  { name: "Versio", sector: "hosting", domains: ["versio.nl"], tokens: [t("versio", true)] },
  { name: "Antagonist", sector: "hosting", domains: ["antagonist.nl"], tokens: [t("antagonist", true)] },
  { name: "Mijndomein", sector: "hosting", domains: ["mijndomein.nl"], tokens: [t("mijndomein")] },
  { name: "GoDaddy", sector: "hosting", domains: ["godaddy.com"], tokens: [t("godaddy")] },
];

const OFFICIAL = new Map<string, Brand>();
for (const b of BRANDS) for (const d of b.domains) OFFICIAL.set(d, b);

export function officialBrandFor(registrable: string): Brand | null {
  return OFFICIAL.get(registrable) ?? null;
}

/** Words that phishing domains add around a brand name. */
export const PHISHING_KEYWORDS = new Set([
  "login", "log", "inloggen", "inlog", "signin", "sign", "secure", "security", "beveiliging",
  "beveiligd", "veilig", "verify", "verificatie", "verifieren", "validatie", "validate",
  "account", "accounts", "mijn", "my", "support", "help", "helpdesk", "service", "services",
  "klantenservice", "klant", "customer", "update", "bevestig", "bevestigen", "confirm",
  "betaling", "betalen", "betaal", "payment", "refund", "terugbetaling", "teruggave",
  "restitutie", "toeslag", "toeslagen", "aanslag", "boete", "online", "portal", "portaal",
  "auth", "sso", "id", "identiteit", "wallet", "unlock", "deblokkeren", "blokkade", "actie",
  "bonus", "gift", "cadeau", "winnen", "gratis", "free", "pakket", "pakketje", "parcel",
  "track", "tracking", "levering", "bezorging", "delivery", "verzending", "douane",
  "official", "officieel", "nl", "be", "com", "check", "controle", "alert", "melding",
  "notificatie", "bank", "banking", "internetbankieren", "bankieren", "pas", "pasje", "card",
  "kaart", "reset", "wachtwoord", "password", "recover", "herstel", "verlopen", "expired",
  "app", "web", "info", "vernieuwen", "nieuw", "new", "claim", "retour", "factuur", "invoice",
]);

/** Single-character substitutions that read as the same letter. */
export const ASCII_LOOKALIKES: [string, string][] = [
  ["0", "o"], ["1", "l"], ["1", "i"], ["3", "e"], ["4", "a"], ["5", "s"], ["7", "t"],
  ["rn", "m"], ["vv", "w"], ["cl", "d"], ["l", "i"], ["i", "l"], ["nn", "m"],
];

/** Unicode confusables (Cyrillic/Greek/Latin-extended) mapped to ASCII. */
export const UNICODE_CONFUSABLES: Record<string, string> = {
  "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "у": "y", "х": "x", "і": "i", "ј": "j",
  "ԁ": "d", "һ": "h", "ӏ": "l", "ѕ": "s", "ԛ": "q", "ԝ": "w", "в": "b", "к": "k", "м": "m",
  "н": "h", "т": "t", "п": "n", "ɡ": "g", "ɩ": "i", "ı": "i", "ο": "o", "α": "a", "ε": "e",
  "ρ": "p", "τ": "t", "υ": "u", "ν": "v", "κ": "k", "ι": "i", "χ": "x", "ω": "w", "ł": "l",
  "ø": "o", "đ": "d", "ħ": "h", "ŀ": "l", "ß": "ss",
};
