import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "marktplaats-oplichting",
    title: "Marktplaats-oplichting bij kopen en vooruitbetalen",
    excerpt:
      "Een populaire aanbieding en betrouwbare foto’s zeggen weinig als levering uitblijft. Controleer verkoper, betaling en product voordat je geld overmaakt.",
    categorySlug: "marktplaats-oplichting",
    content: scamContent({
      intro:
        "Bij Marktplaats-oplichting betaalt een koper voor een product dat niet wordt geleverd, namaak blijkt of niet van de verkoper is. Criminelen kopiëren foto’s en teksten, bouwen profielhistorie op en verplaatsen gesprekken graag buiten Marktplaats.",
      works: [
        "Een gewild product wordt aantrekkelijk geprijsd, vaak met een geloofwaardige reden voor snelle verkoop.",
        "De verkoper stuurt gestolen foto’s, een vals identiteitsbewijs of verzendbewijs om vertrouwen te winnen.",
        "Betaling gaat vooraf via overschrijving, Tikkie of een link buiten het platform.",
        "Na betaling volgt een vals track-en-tracenummer, extra verzoek of volledige stilte.",
      ],
      flags: [
        "De prijs wijkt sterk af van vergelijkbare aanbiedingen en er is haast door veel andere geïnteresseerden.",
        "Ophalen, videobellen of een actuele foto met afgesproken detail is niet mogelijk.",
        "De rekeninghouder, profielnaam en naam op bewijsstukken komen niet overeen.",
        "De verkoper stuurt je naar WhatsApp en weigert ingebouwde betaal- of verzendopties.",
        "Foto’s zijn via zoeken op afbeelding terug te vinden bij andere verkopers of buitenlandse sites.",
      ],
      actions: [
        "Controleer profiel, ervaringen, rekeninggegevens en foto’s, maar behandel elk afzonderlijk kenmerk als slechts één signaal.",
        "Haal kostbare producten bij voorkeur op een veilige plaats op en controleer werking en serienummer vóór betaling.",
        "Houd communicatie en waar passend betaling binnen Marktplaats en lees exact welke bescherming van toepassing is.",
      ],
      reportNote:
        "Rapporteer advertentie en account bij Marktplaats en meld rekeningnummer en communicatie bij Fraudehelpdesk. Neem na betaling contact op met je bank en doe aangifte via politie.nl.",
    }),
  },
  {
    slug: "verkoopfraude",
    title: "Verkoopfraude: valse kopers, bezorglinks en betaaltrucs",
    excerpt:
      "Ook verkopers worden opgelicht met één-centcontroles, nepkoeriers en vervalste betaalbewijzen. Controleer betaling alleen in je eigen bankomgeving.",
    categorySlug: "verkoopfraude",
    content: scamContent({
      intro:
        "Bij verkoopfraude richt de crimineel zich op degene die een product aanbiedt. De zogenaamde koper wil snel betalen of een koerier regelen, maar stuurt een link waarmee bankgegevens worden gestolen of kosten worden geïnd.",
      works: [
        "De koper reageert vrijwel direct, stelt weinig vragen en wil de vraagprijs zonder onderhandelen betalen.",
        "Voor verificatie moet je één cent betalen via een nagemaakte bank- of iDEAL-pagina.",
        "Een valse PostNL-, DHL- of Marktplaats-link vraagt om verzekerings-, bezorg- of vrijgavekosten.",
        "Een bewerkt betaalbewijs moet je overtuigen het product mee te geven voordat geld is bijgeschreven.",
      ],
      flags: [
        "De koper vraagt jouw bank te bewijzen via een link; een IBAN doorgeven is daarvoor niet hetzelfde als inloggen.",
        "Je moet betalen om een ontvangen betaling vrij te geven of om een koerier te laten komen.",
        "Een buitenlandse koerier, tussenpersoon of ongebruikelijk ruim bod maakt de transactie ingewikkeld.",
        "De koper weigert de platformchat en dringt aan op e-mail of WhatsApp.",
        "Een screenshot toont betaling, maar het bedrag staat niet in je eigen bankapp.",
      ],
      actions: [
        "Controleer ontvangst uitsluitend door zelf je bankapp te openen en vertrouw nooit op een screenshot of e-mailbevestiging.",
        "Klik niet op verificatie- of bezorglinks van de koper en betaal geen kosten om geld te mogen ontvangen.",
        "Geef of verzend het product pas als de afgesproken betaling definitief zichtbaar is en de verzendmethode klopt.",
      ],
      reportNote:
        "Meld koper, chat en link bij Marktplaats of het gebruikte platform en bij Fraudehelpdesk. Meld gestolen geld of goederen via politie.nl.",
    }),
  },
];
