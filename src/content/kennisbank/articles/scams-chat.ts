import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "tikkie-fraude",
    title: "Tikkie-fraude en valse iDEAL-betaallinks",
    excerpt:
      "Niet elk betaalverzoek met een Tikkie-logo is echt. Controleer de afzender, URL, ontvanger en opdracht voordat je in je bankapp bevestigt.",
    categorySlug: "tikkie-fraude",
    content: scamContent({
      intro:
        "Bij Tikkie-fraude lijkt een betaalverzoek afkomstig van Tikkie, maar leidt de link naar een nagemaakte pagina of hoort de betaling bij een ander verhaal. Ook een echte Tikkie kan door een oplichter worden gebruikt; de techniek alleen maakt de ontvanger niet betrouwbaar.",
      works: [
        "Een koper, verkoper, bekende of zogenaamde organisatie stuurt een betaalverzoek via chat.",
        "Een valse link verzamelt bankgegevens of laat je inloggen op een nagemaakte iDEAL-pagina.",
        "Een echt betaalverzoek kan een ander bedrag of andere ontvanger bevatten dan afgesproken.",
        "Na een kleine controlebetaling volgt soms bankhelpdeskfraude met de buitgemaakte gegevens.",
      ],
      flags: [
        "De link gebruikt een verkeerd gespelde merknaam, verkorte URL of onbekend hoofddomein.",
        "Je moet één cent betalen om je rekening, identiteit of betrouwbaarheid te controleren.",
        "De naam of omschrijving in je bankapp wijkt af van de afspraak.",
        "Iemand wil uitsluitend via de toegestuurde link handelen en weigert een normale platformbetaling.",
        "Het verzoek gaat gepaard met haast, dreiging of een onverwacht nieuw telefoonnummer.",
      ],
      actions: [
        "Controleer vóór bevestigen bedrag, rekeninghouder en omschrijving in je eigen bankapp.",
        "Vraag bij een bekende via een ander kanaal of het verzoek werkelijk van die persoon komt.",
        "Gebruik bij handelsplatforms de ingebouwde betaal- en verzendmogelijkheden en verlaat de platformchat niet onnodig.",
      ],
      reportNote:
        "Meld een valse link bij Tikkie, je bank, het chatplatform en Fraudehelpdesk. Neem bij betaling direct contact op met de bank en doe zo nodig aangifte via politie.nl.",
    }),
  },
  {
    slug: "familie-en-vrienden-in-noodfraude",
    title: "Familie en vrienden in noodfraude via WhatsApp",
    excerpt:
      "Niet alleen ‘Hoi mam’ of ‘Hoi pap’: ook een vriend, collega of ander contact kan via een nieuw of overgenomen nummer dringend geld vragen.",
    categorySlug: "familie-en-vrienden-in-noodfraude",
    content: scamContent({
      intro:
        "Bij familie en vrienden in noodfraude doet een crimineel zich voor als je kind, ouder, broer, zus, vriend, vriendin, collega of ander vertrouwd contact. Het klassieke ‘Hoi mam’ of ‘Hoi pap’ komt voor, maar ook berichten uit een echt overgenomen account.",
      works: [
        "De fraudeur meldt een nieuw nummer, kapotte telefoon of tijdelijk probleem met internetbankieren.",
        "Daarna volgt een dringend verzoek om een rekening, borg, ticket of andere nooduitgave voor te schieten.",
        "Informatie van sociale media en een passende schrijfstijl maken zowel familie- als vriendenverhalen geloofwaardig.",
        "Bij accountovername verschijnt het verzoek vanuit het bekende profiel en worden meerdere contacten tegelijk benaderd.",
      ],
      flags: [
        "Een familielid of vriend vraagt onverwacht geld vanaf een nieuw nummer of in afwijkende taal.",
        "Bellen, videobellen of een controlevraag beantwoorden zou niet mogelijk zijn.",
        "Je moet meerdere betalingen doen, geheimhouding bewaren of geld naar een onbekende rekening sturen.",
        "Het verhaal verandert zodra je details vraagt over de noodsituatie.",
        "Een bekend account vraagt plots om een verificatiecode; daarmee kan jouw account worden overgenomen.",
      ],
      actions: [
        "Bel de persoon op het nummer dat al in je adresboek stond of neem contact op met iemand die fysiek bij hem of haar kan zijn.",
        "Stel een persoonlijke controlevraag waarvan het antwoord niet op sociale media staat, maar vertrouw bij twijfel vooral op rechtstreeks contact.",
        "Waarschuw gezamenlijke contacten als een account is overgenomen en betaal niet voordat de identiteit onafhankelijk vaststaat.",
      ],
      reportNote:
        "Meld het account bij WhatsApp of het gebruikte platform en waarschuw familie en vrienden. Neem na betaling direct contact op met je bank en doe aangifte via politie.nl.",
      checkRelevant: false,
    }),
  },
  {
    slug: "accountovername",
    title: "Overname van WhatsApp en sociale-media-accounts",
    excerpt:
      "Met een verificatiecode, phishingpagina of gestolen sessie nemen criminelen accounts over. Herstel toegang snel en waarschuw je contacten.",
    categorySlug: "accountovername",
    content: scamContent({
      intro:
        "Bij accountovername krijgt een ander toegang tot je WhatsApp, e-mail, Facebook, Instagram of ander profiel. Vanuit jouw vertrouwde identiteit kan die persoon geld vragen, gegevens verzamelen en wachtwoorden van gekoppelde diensten herstellen.",
      works: [
        "Een crimineel vraagt om een sms-code die zogenaamd per ongeluk naar jou is gestuurd.",
        "Een phishingpagina steelt je wachtwoord en soms ook een tijdelijke tweestapscode.",
        "Een bestaande sessie of mailbox wordt gebruikt om herstelberichten te onderscheppen.",
        "Na overname worden contacten benaderd met noodverhalen, investeringslinks of verzoeken om nieuwe codes.",
      ],
      flags: [
        "Je ontvangt onverwachte inlog- of herstelmeldingen en codes die je niet zelf hebt aangevraagd.",
        "Je wordt uitgelogd, profielgegevens veranderen of onbekende apparaten verschijnen in actieve sessies.",
        "Een bekende vraagt je een verificatiecode door te sturen of op een stemlink te klikken.",
        "Contacten melden vreemde geldvragen of berichten vanuit jouw account.",
        "Je e-mail bevat onbekende doorstuurregels, verwijderde beveiligingsmeldingen of gewijzigd hersteladres.",
      ],
      actions: [
        "Gebruik de officiële herstelprocedure, log alle onbekende sessies uit en wijzig eerst het wachtwoord van je e-mailaccount.",
        "Schakel tweestapsverificatie in met een sterke unieke code en controleer herstelmail, telefoonnummer en gekoppelde apps.",
        "Waarschuw contacten via een ander kanaal dat zij niets moeten betalen, geen links moeten openen en geen codes moeten delen.",
      ],
      reportNote:
        "Meld het account bij het platform en leg herstel- en misbruikmeldingen vast. Bij afpersing, identiteitsmisbruik of financiële schade kun je aangifte doen via politie.nl.",
    }),
  },
];
