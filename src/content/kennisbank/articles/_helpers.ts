type ScamArticleInput = {
  intro: string;
  works: string[];
  flags: string[];
  actions: string[];
  reportNote?: string;
  checkRelevant?: boolean;
};

type TrustArticleInput = {
  intro: string;
  explanation: string[];
  cautions: string[];
  actions: string[];
};

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function steps(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function scamContent({
  intro,
  works,
  flags,
  actions,
  reportNote,
  checkRelevant = true,
}: ScamArticleInput): string {
  const checkText = checkRelevant
    ? "Controleer een verdachte domeinnaam of link eerst via [All Scams Controleren](/controleren). Typ het adres bij voorkeur zelf over; open de verdachte link niet om hem te kopiëren."
    : "Controleer namen, telefoonnummers, rekeninggegevens en andere kenmerken via betrouwbare, zelf opgezochte kanalen voordat je handelt.";

  return `${intro}

Fraudeurs combineren vaak een geloofwaardig verhaal met tijdsdruk. Een nette website, bekend logo, Nederlands telefoonnummer of echte naam is geen bewijs dat de afzender betrouwbaar is. Stop daarom zodra iemand je onder druk zet en controleer de situatie buiten het gesprek om.

## Hoe het werkt

${bullets(works)}

De benadering kan beginnen via e-mail, sms, telefoon, sociale media, een advertentie of een zoekresultaat. Soms kennen criminelen al je naam, adres of een echte bestelling door gelekte gegevens. Dat maakt het verhaal overtuigender, maar verandert niets aan de veilige regel: gebruik nooit de link, het nummer of de contactpersoon die de afzender zelf als enige controle aanbiedt.

## Rode vlaggen

${bullets(flags)}
- Je moet snel beslissen, betalen of geheimhouding beloven.
- De afzender stuurt je buiten een vertrouwd platform of officieel kanaal.
- Er wordt gevraagd om een pincode, inlogcode, DigiD-code, verificatiecode, schermdeling of kopie van je identiteitsbewijs.
- Een betaling moet naar een onbekende rekening, persoonlijke Tikkie, cryptowallet, cadeaukaart of ongebruikelijke betaalpagina.
- Kritische vragen worden ontweken en zelfstandig controleren wordt ontmoedigd.

Eén signaal bewijst niet altijd fraude. Meerdere signalen samen, vooral druk plus een verzoek om geld of toegang, zijn wel reden om direct te stoppen. Vertrouw niet alleen op spelling: professionele fraudeberichten kunnen foutloos zijn.

## Wat je moet doen

${steps(actions)}
${actions.length + 1}. Neem bij twijfel zelf contact op met de organisatie via het nummer of webadres dat je onafhankelijk hebt opgezocht.
${actions.length + 2}. Heb je betaald of bankgegevens gedeeld? Bel onmiddellijk je bank via het officiële nummer. Vraag of een betaling nog kan worden tegengehouden en laat zo nodig je pas, rekening of toegang beveiligen.
${actions.length + 3}. Wijzig betrokken wachtwoorden vanaf een schoon apparaat. Begin bij je e-mailaccount, gebruik overal een uniek wachtwoord en schakel waar mogelijk tweestapsverificatie in.
${actions.length + 4}. Bewaar bewijs: screenshots, chatgeschiedenis, e-mailheaders, telefoonnummers, rekeningnummers, advertenties, URL’s en betaalbewijzen. Verwijder niets voordat je melding of aangifte is afgerond.

${checkText} Een controle is een hulpmiddel en geen garantie; beoordeel altijd ook het verhaal, de betaalwijze en het gedrag van de afzender.

## Waar melden

Meld de poging bij de [Fraudehelpdesk](https://www.fraudehelpdesk.nl/) en bij het platform of de organisatie die wordt nagebootst. ${reportNote ?? "Bij financieel verlies, identiteitsmisbruik, bedreiging of een overgenomen account kun je via [politie.nl](https://www.politie.nl/aangifte-of-melding-doen) bekijken hoe je aangifte doet."}

Deel verdachte websites, berichten en rekeninggegevens ook via [All Scams Melden](/melden). Een melding helpt patronen zichtbaar te maken, maar plaats geen wachtwoorden, volledige identiteitsdocumenten of andere onnodige gevoelige gegevens. Is er direct gevaar of word je bedreigd, neem dan meteen contact op met de politie.`;
}

export function trustContent({
  intro,
  explanation,
  cautions,
  actions,
}: TrustArticleInput): string {
  return `${intro}

De All Scams Trust Score is een technische risico-inschatting voor een domein op het moment van de controle. De uitkomst is geen juridisch oordeel, keurmerk of garantie. Een hoge score bewijst niet dat een verkoper eerlijk is en een lage score bewijst niet zelfstandig dat iemand strafbaar handelt.

## Hoe het werkt

${bullets(explanation)}

De berekening start bij **50**. Positieve en negatieve signalen worden als delta’s opgeteld en de uitkomst wordt begrensd op **1 tot en met 99**. Daarna gelden harde plafonds voor zwaarwegende risico’s: een treffer op een blocklist maximaal 8, sterke nabootsing maximaal 20, middelsterke nabootsing maximaal 55, vier of meer gemodereerde meldingen maximaal 20, twee of meer meldingen maximaal 35, een niet-geregistreerd domein maximaal 30 en een domein van maximaal 30 dagen oud maximaal 60.

Bronnen die niet beschikbaar, niet bereikbaar of niet ingeschakeld zijn, tellen niet mee als positief of negatief signaal. Een ontbrekende uitslag wordt dus niet stilzwijgend als veilig behandeld. Resultaten worden maximaal zes uur gecachet; een latere controle kan veranderen doordat brongegevens of de website zijn gewijzigd.

## Rode vlaggen

${bullets(cautions)}
- Eén gunstig technisch kenmerk wordt als bewijs van betrouwbaarheid gepresenteerd.
- De domeinnaam lijkt vertrouwd, maar het registreerbare hoofddomein wijkt af.
- De website vraagt snel om geld, DigiD-gegevens, bankcodes of identiteitsdocumenten.
- De afzender verzet zich tegen controle via een onafhankelijk kanaal.

Techniek geeft context, geen volledige zekerheid. Kijk ook naar de identiteit van de aanbieder, betaalmethode, voorwaarden, contactgegevens en het verhaal waarmee je naar de site bent gestuurd.

## Wat je moet doen

${steps(actions)}
${actions.length + 1}. Lees de afzonderlijke signalen naast de totaalscore; een hard plafond of bronwaarschuwing kan belangrijker zijn dan het getal alleen.
${actions.length + 2}. Open de website niet vanuit een onverwachte sms, QR-code of e-mail. Zoek de officiële organisatie zelf op en vergelijk het exacte hoofddomein.
${actions.length + 3}. Deel geen wachtwoorden, verificatiecodes, pincode of volledige kopie van je identiteitsbewijs. Stop bij tijdsdruk of een ongebruikelijke betaalroute.
${actions.length + 4}. Controleer opnieuw als de uitslag ouder is of als de website intussen is veranderd. De cache duurt nooit langer dan zes uur.

## Waar melden

Zie je een verdachte website, dan kun je die met context delen via [All Scams Melden](/melden). Meld phishing en fraude ook bij de [Fraudehelpdesk](https://www.fraudehelpdesk.nl/) en bij de organisatie die wordt nagebootst. Bij schade of identiteitsmisbruik vind je op [politie.nl](https://www.politie.nl/aangifte-of-melding-doen) informatie over aangifte.

Wil je een domein beoordelen? Voer het exacte webadres in bij [All Scams Controleren](/controleren) en combineer de score altijd met je eigen controle.`;
}
