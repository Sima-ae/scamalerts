import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "datingfraude",
    title: "Datingfraude en romance scams herkennen",
    excerpt:
      "Een online relatie kan maanden worden opgebouwd voordat een noodsituatie of investering ter sprake komt. Bescherm geld, identiteit en vertrouwen.",
    categorySlug: "datingfraude",
    content: scamContent({
      intro:
        "Bij datingfraude bouwt een crimineel doelbewust een emotionele band op om geld, persoonsgegevens of toegang te krijgen. Het contact kan warm en dagelijks zijn en lang duren voordat het eerste verzoek verschijnt.",
      works: [
        "Een aantrekkelijk profiel legt snel intensief contact en verplaatst het gesprek van de datingsite naar een chatapp.",
        "Ontmoeten lukt steeds niet door werk in het buitenland, militaire dienst, ziekte of familieproblemen.",
        "Na opgebouwde intimiteit ontstaat een crisis: reisgeld, medische kosten, douane, erfenis of investering.",
        "Na elke betaling volgt een nieuwe hindernis; soms wordt het slachtoffer ook ingezet om geld voor anderen te ontvangen.",
      ],
      flags: [
        "Liefdesverklaringen en toekomstplannen volgen zeer snel zonder echte ontmoeting.",
        "Videobellen wordt vermeden, mislukt steeds of toont nauwelijks controleerbare beelden.",
        "Profielfoto’s horen bij een andere naam of zijn via zoeken op afbeelding elders te vinden.",
        "Geld moet naar een derde, buitenlandse rekening, cadeaukaart of cryptowallet.",
        "Je wordt gevraagd de relatie en betalingen geheim te houden of banktransacties voor de ander uit te voeren.",
      ],
      actions: [
        "Vertel een vertrouwd persoon over de relatie en laat die zonder emotionele betrokkenheid meekijken.",
        "Controleer foto’s, verhalen en identiteit, maar besef dat documenten, video en stemmen met gestolen materiaal of AI kunnen zijn gemaakt.",
        "Stuur geen geld, ontvang geen geld voor de ander en deel geen intieme beelden of volledige identiteitsdocumenten.",
      ],
      reportNote:
        "Meld het profiel bij de datingdienst en bij Fraudehelpdesk. Neem na betaling contact op met je bank en doe bij fraude of identiteitsmisbruik aangifte via politie.nl.",
    }),
  },
  {
    slug: "sextortion",
    title: "Sextortion: afpersing met intieme beelden",
    excerpt:
      "Bij sextortion dreigt iemand intieme beelden naar contacten te sturen. Betaal niet, bewaar bewijs en zoek direct hulp; jij bent niet schuldig.",
    categorySlug: "sextortion",
    content: scamContent({
      intro:
        "Sextortion is afpersing met echte, gestolen, gemanipuleerde of AI-gegenereerde intieme beelden. De dader dreigt publicatie naar familie, school, werkgever of volgers en eist geld of meer materiaal.",
      works: [
        "Contact begint via datingapp, sociale media, game of gehackt account en wordt snel seksueel.",
        "De dader neemt een videogesprek op, ontvangt beelden of maakt overtuigende nepbeelden.",
        "Screenshots van je contactenlijst en een korte betaaldeadline vergroten paniek.",
        "Betalen stopt de afpersing meestal niet; er volgen vaak hogere eisen.",
      ],
      flags: [
        "Een nieuw contact wil direct naar privéchat of videobellen en stuurt als eerste expliciet materiaal.",
        "De persoon vraagt je gezicht en intieme handeling tegelijk zichtbaar te maken.",
        "Na opname verandert de toon abrupt in dreiging en worden je contacten getoond.",
        "Betaling moet snel via crypto, cadeaukaart, geldtransfer of onbekende rekening.",
        "De dader belooft na betaling alles te verwijderen, maar je kunt dat niet controleren.",
      ],
      actions: [
        "Betaal niet, stuur niets meer en verbreek contact nadat je gebruikersnaam, dreiging, betaalgegevens en tijdstippen hebt vastgelegd.",
        "Zet profielen privé, verberg contactenlijsten, wijzig wachtwoorden en waarschuw een vertrouwd persoon zodat je niet alleen handelt.",
        "Gebruik meld- en verwijdermogelijkheden van het platform en zoek gespecialiseerde hulp; bij minderjarigen moet direct een volwassene en politie worden betrokken.",
      ],
      reportNote:
        "Meld het account bij het platform, Fraudehelpdesk en politie.nl. Bij direct gevaar bel je 112. Deel beelden niet verder, ook niet als bewijs; vraag politie hoe je ze veilig aanlevert.",
      checkRelevant: false,
    }),
  },
  {
    slug: "afpersmail",
    title: "Afpersmail over webcam, wachtwoord of bezoekgedrag",
    excerpt:
      "Een e-mail beweert je apparaat te hebben gehackt en toont soms een oud wachtwoord. Dat is vaak bluf met gelekte gegevens.",
    categorySlug: "afpersmail",
    content: scamContent({
      intro:
        "Een afpersmail beweert dat malware je webcam, scherm of bezoek aan websites heeft opgenomen. Als bewijs toont de afzender soms een oud wachtwoord of verzendt de mail met een vervalst afzenderadres.",
      works: [
        "Gelekte e-mailadressen en wachtwoorden worden in grote aantallen gekoppeld aan een standaard dreigtekst.",
        "Technische termen en een cryptowallet moeten de indruk wekken dat volledige toegang bestaat.",
        "De afzender dreigt beelden naar al je contacten te sturen als je niet binnen korte tijd betaalt.",
        "In veel gevallen bestaat de opname niet; betalen bevestigt alleen dat je bereikbaar en beïnvloedbaar bent.",
      ],
      flags: [
        "De mail bevat algemene claims maar geen controleerbaar recent bewijs van toegang.",
        "Een oud of hergebruikt wachtwoord wordt getoond als bewijs van een webcamopname.",
        "Betaling wordt uitsluitend in crypto verlangd met een korte deadline.",
        "Het bericht lijkt vanaf je eigen adres te komen; e-mailafzenders kunnen worden vervalst.",
        "De tekst verbiedt contact met politie, beveiliging of familie en dreigt bij onderzoek direct te publiceren.",
      ],
      actions: [
        "Betaal niet en antwoord niet; bewaar de volledige e-mail inclusief headers en walletadres.",
        "Wijzig het getoonde wachtwoord overal waar het nog wordt gebruikt en kies per account een uniek wachtwoord met tweestapsverificatie.",
        "Controleer apparaten en accounts op echte onbekende sessies, doorstuurregels en beveiligingsmeldingen zonder links uit de mail te openen.",
      ],
      reportNote:
        "Meld de afpersmail bij Fraudehelpdesk en je e-mailprovider. Bij concrete bedreiging, daadwerkelijke accounttoegang of publicatie kun je aangifte doen via politie.nl.",
    }),
  },
];
