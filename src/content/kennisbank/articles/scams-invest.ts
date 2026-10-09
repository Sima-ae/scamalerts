import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "crypto-beleggingsfraude",
    title: "Crypto- en beleggingsfraude herkennen",
    excerpt:
      "Gegarandeerd rendement, een persoonlijke coach en een winstgevend dashboard kunnen volledig verzonnen zijn. Controleer aanbieder en opnamevoorwaarden.",
    categorySlug: "crypto-beleggingsfraude",
    content: scamContent({
      intro:
        "Bij crypto- en beleggingsfraude word je naar een vals handelsplatform of malafide aanbieder geleid. Het dashboard toont winst, maar de cijfers zijn manipuleerbaar en opnemen lukt pas na steeds nieuwe betalingen.",
      works: [
        "Een advertentie, datingcontact of onverwachte beller introduceert een exclusieve investering.",
        "Een accountmanager helpt bij de eerste kleine storting en laat snel fictieve winst zien.",
        "Met schermdeling of hulp bij een cryptowallet krijgt de fraudeur meer controle en dringt aan op grotere bedragen.",
        "Bij opname verschijnen belastingen, verificatiekosten of liquiditeitsproblemen; betaald geld komt niet terug.",
      ],
      flags: [
        "Rendement wordt gegarandeerd of als hoog en vrijwel risicoloos gepresenteerd.",
        "De aanbieder zet druk, belt voortdurend en raadt lenen of extra storten aan.",
        "Vergunning, juridische entiteit, vestigingsadres en voorwaarden zijn niet onafhankelijk te verifiëren.",
        "Je moet crypto sturen naar een wallet die je niet zelf beheert of herstelwoorden delen.",
        "Opname vereist eerst een extra betaling aan dezelfde partij.",
      ],
      actions: [
        "Controleer de aanbieder en eventuele waarschuwingen bij bevoegde toezichthouders en verifieer de juridische naam.",
        "Geef niemand schermtoegang, wallet-herstelwoorden of opdracht om namens jou bank- of cryptohandelingen te doen.",
        "Stop bij opnameproblemen alle nieuwe betalingen en bewaar walletadressen, transacties, chats en dashboards.",
      ],
      reportNote:
        "Meld de aanbieder bij Fraudehelpdesk en relevante financiële toezichthouder. Neem contact op met bank of cryptodienst en doe bij verlies aangifte via politie.nl.",
    }),
  },
  {
    slug: "chatgroepfraude",
    title: "Beleggingsfraude in WhatsApp- en Telegramgroepen",
    excerpt:
      "Nepdeskundigen, enthousiaste groepsleden en exclusieve tips creëren kunstmatige zekerheid. Veel groepsleden kunnen door dezelfde fraudeur worden bestuurd.",
    categorySlug: "chatgroepfraude",
    content: scamContent({
      intro:
        "Chatgroepfraude gebruikt een groep rond beleggen, crypto of handel om sociale bewijskracht na te bootsen. Een docent deelt analyses, assistenten begeleiden betalingen en zogenaamde leden plaatsen winstbewijzen.",
      works: [
        "Je wordt ongevraagd toegevoegd of via een advertentie uitgenodigd voor gratis tips.",
        "Beheerders bouwen wekenlang vertrouwen op met uitleg en ogenschijnlijk succesvolle voorspellingen.",
        "Groepsleden prijzen een specifiek platform, aandeel of cryptomunt en tonen mogelijk vervalste winst.",
        "Daarna volgt druk om geld te storten, een app te installeren of mee te doen aan een exclusieve ronde.",
      ],
      flags: [
        "De groep is eenrichtingsverkeer: kritische vragen verdwijnen en beheerders bepalen welke successen zichtbaar zijn.",
        "De expert gebruikt een bekende naam of foto, maar communiceert via een niet-verifieerbaar account.",
        "Alle reacties zijn uitzonderlijk positief en verliezen of risico’s worden niet besproken.",
        "Betaling loopt via onbekende platformen, persoonlijke rekeningen of cryptowallets.",
        "Je krijgt korting, bonus of voorkennis als je onmiddellijk meer stort.",
      ],
      actions: [
        "Verlaat de groep en blokkeer beheerders zodra geld, codes, schermdeling of installatie buiten officiële winkels wordt gevraagd.",
        "Controleer identiteit en vergunning buiten de groep en neem zelf contact op via officiële gegevens.",
        "Waarschuw niet impulsief in de groep als dat bewijs of je veiligheid schaadt; maak eerst screenshots en exporteer relevante chats.",
      ],
      reportNote:
        "Rapporteer de groep en accounts bij WhatsApp, Telegram of het gebruikte platform en meld ze bij Fraudehelpdesk. Doe bij schade aangifte via politie.nl.",
    }),
  },
  {
    slug: "pump-and-dump",
    title: "Pump-and-dump bij crypto en kleine aandelen",
    excerpt:
      "Een gecoördineerde hype drijft de koers op waarna organisatoren verkopen. Herken kunstmatige schaarste, FOMO en misleidende winstclaims.",
    categorySlug: "pump-and-dump",
    content: scamContent({
      intro:
        "Bij een pump-and-dump wordt de prijs van een weinig verhandelde cryptomunt of effect kunstmatig opgedreven. Organisatoren hebben eerder goedkoop gekocht, lokken anderen met hype en verkopen zodra de koers stijgt.",
      works: [
        "Een besloten groep kondigt een koopmoment, geheime munt of zogenaamd gelekte samenwerking aan.",
        "Veel accounts plaatsen tegelijk positieve berichten, koersdoelen en screenshots van winst.",
        "Nieuwe kopers jagen de prijs omhoog terwijl organisatoren hun bezit verkopen.",
        "De koers stort in en late deelnemers blijven achter met moeilijk verkoopbare posities.",
      ],
      flags: [
        "Er wordt snelle, extreme winst beloofd zonder inhoudelijke analyse van waarde en liquiditeit.",
        "Je moet op een exact tijdstip kopen en mag de naam pas vlak tevoren weten.",
        "Promotors verzwijgen hun eigen positie of ontvangen vergoeding voor reclame.",
        "Handelsvolume en online aandacht stijgen plots zonder controleerbaar nieuws.",
        "Verkopen blijkt moeilijk door lage liquiditeit, handelsbeperkingen of hoge kosten.",
      ],
      actions: [
        "Koop niet op basis van FOMO, groepsdruk of een bericht van een influencer zonder belangenverklaring.",
        "Onderzoek liquiditeit, tokenverdeling, uitgevende partij en onafhankelijke informatie voordat je financieel risico neemt.",
        "Leg misleidende promoties, tijdstippen, walletadressen en transacties vast als je mogelijk bent benadeeld.",
      ],
      reportNote:
        "Meld misleidende accounts bij het platform en vermoedelijke marktmanipulatie bij de relevante toezichthouder. Meld fraude bij Fraudehelpdesk en doe zo nodig aangifte via politie.nl.",
    }),
  },
  {
    slug: "recovery-scams",
    title: "Recovery-scams na eerdere fraude",
    excerpt:
      "Wie geld verloor, kan opnieuw worden benaderd door een nepjurist, hacker of overheidsdienst. Vooraf betalen om geld terug te krijgen is een groot alarmsignaal.",
    categorySlug: "recovery-scams",
    content: scamContent({
      intro:
        "Een recovery-scam richt zich op eerdere slachtoffers. De dader beweert verloren geld te hebben gevonden of te kunnen terughalen, maar vraagt eerst administratiekosten, belasting, borg of toegang tot je accounts.",
      works: [
        "Slachtoffergegevens worden door dezelfde fraudeurs hergebruikt of tussen criminele groepen gedeeld.",
        "Een zogenaamde advocaat, toezichthouder, rechercheur, hacker of blockchainexpert neemt onverwacht contact op.",
        "Vervalste dossiers, transacties en officiële logo’s moeten aantonen dat geld klaarstaat.",
        "Elke betaling leidt tot een nieuwe voorwaarde; werkelijk herstel blijft uit.",
      ],
      flags: [
        "Een onbekende partij weet opvallend veel over je eerdere verlies en belooft een hoog herstelpercentage.",
        "Je moet vooraf betalen in crypto, cadeaukaarten of naar een buitenlandse of persoonlijke rekening.",
        "De partij beweert namens politie, rechtbank, bank of toezichthouder geld vrij te geven.",
        "Je moet wallet-herstelwoorden, bankcodes, DigiD-gegevens of schermtoegang verstrekken.",
        "Er wordt gegarandeerd resultaat beloofd en je krijgt weinig tijd om te beslissen.",
      ],
      actions: [
        "Stop contact en betaal niets extra, ook niet als al tijd of geld in het traject is gestoken.",
        "Controleer jurist, bedrijf of instantie rechtstreeks via een officieel register en zelf gevonden contactgegevens.",
        "Voeg de nieuwe benadering toe aan het bestaande bewijsdossier en waarschuw je bank of cryptodienst voor vervolgmisbruik.",
      ],
      reportNote:
        "Meld zowel de oorspronkelijke fraude als de recovery-poging bij Fraudehelpdesk en politie.nl. Informeer ook de echte organisatie waarvan naam of logo wordt misbruikt.",
    }),
  },
];
