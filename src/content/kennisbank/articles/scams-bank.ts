import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "bankhelpdesk-fraude",
    title: "Bankhelpdeskfraude: de nepmedewerker aan de lijn",
    excerpt:
      "Een beller waarschuwt voor fraude en vraagt je geld veilig te stellen. Leer waarom een echte bank nooit om codes, overboekingen of schermdeling vraagt.",
    categorySlug: "bankhelpdesk-fraude",
    content: scamContent({
      intro:
        "Bij bankhelpdeskfraude doet een crimineel zich voor als medewerker van je bank. De beller creëert paniek over een verdachte betaling of gehackte rekening en biedt vervolgens een oplossing waarmee juist geld of toegang wordt gestolen.",
      works: [
        "Het telefoonnummer kan door spoofing lijken op het echte nummer van je bank.",
        "De beller noemt persoonlijke gegevens en beweert dat een collega van de fraudeafdeling meekijkt.",
        "Je moet geld overboeken naar een zogenoemde veilige rekening, codes delen, software installeren of je scherm delen.",
        "De crimineel gebruikt de verkregen toegang om betalingen klaar te zetten of laat jou die zelf bevestigen.",
      ],
      flags: [
        "De bank belt onverwacht en verlangt onmiddellijke actie om verlies te voorkomen.",
        "Je moet geld naar een andere rekening verplaatsen; een veilige kluisrekening bestaat niet.",
        "De beller vraagt om pincode, bankpas, inlogcode, QR-scan of bevestigingscode.",
        "Je mag niet ophangen, niemand informeren of zelf het officiële banknummer bellen.",
        "Een koerier zou je bankpas, telefoon of contant geld komen ophalen.",
      ],
      actions: [
        "Verbreek de verbinding zonder discussie en bel je bank zelf via het nummer op je bankpas of in de officiële app.",
        "Keur geen opdracht in de bankapp goed die je niet zelf hebt gestart en lees bedrag en ontvanger volledig.",
        "Verwijder op verzoek geïnstalleerde meekijksoftware pas nadat je bank en zo nodig een deskundige je apparaat veilig hebben laten stellen.",
      ],
      reportNote:
        "Meld het telefoonnummer en verhaal bij je bank en Fraudehelpdesk. Is geld verdwenen of toegang misbruikt, doe dan zo snel mogelijk aangifte via politie.nl.",
    }),
  },
  {
    slug: "bankpasfraude",
    title: "Bankpasfraude en de valse pasophaler",
    excerpt:
      "Criminelen laten slachtoffers hun bankpas en pincode afgeven voor zogenaamd veilig vernietigen. Een bank haalt je pas nooit met zo’n verzoek op.",
    categorySlug: "bankpasfraude",
    content: scamContent({
      intro:
        "Bankpasfraude begint vaak met een telefoontje over een onveilige of verlopen pas. Een zogenaamde bankmedewerker kondigt een koerier aan, vraagt de pincode of laat de pas doorknippen terwijl de chip intact blijft.",
      works: [
        "De beller gebruikt een banknaam en soms al bekende persoonsgegevens om vertrouwen te winnen.",
        "Je krijgt opdracht je pas in een envelop te doen, een code op papier te schrijven of de pas op een specifieke manier door te knippen.",
        "Een koerier haalt de pas snel op en gebruikt de intacte chip samen met de ontfutselde pincode.",
        "Een variant vraagt je een nieuwe pas te activeren via een phishinglink en onderschept zo de gegevens.",
      ],
      flags: [
        "Een bankmedewerker vraagt je pincode uit te spreken, in te toetsen of op te schrijven.",
        "Iemand wil je bankpas, kaartlezer, telefoon of identiteitsbewijs thuis ophalen.",
        "Je moet de pas doorknippen maar de goudkleurige chip heel laten.",
        "De beller houdt je aan de lijn tot de koerier arriveert of verbiedt contact met familie.",
        "Er wordt een ophaalcode genoemd om de koerier officieel te laten lijken.",
      ],
      actions: [
        "Geef nooit bankpas of pincode mee en laat onbekenden niet binnen.",
        "Blokkeer bij twijfel de pas direct in de bankapp of via het officiële noodnummer van je bank.",
        "Noteer signalement, telefoonnummer, vervoermiddel en tijdstip zonder jezelf in gevaar te brengen.",
      ],
      reportNote:
        "Waarschuw direct je bank. Bij een aangekondigde of aanwezige pasophaler kun je de politie bellen; bij acuut gevaar bel je 112, anders gebruik je politie.nl voor melding of aangifte.",
      checkRelevant: false,
    }),
  },
  {
    slug: "phishing-sms",
    title: "Phishing-sms herkennen en veilig afhandelen",
    excerpt:
      "Sms-phishing misbruikt banknamen, pakketdiensten en overheidstaal. Zo controleer je een bericht zonder op de meegestuurde link te vertrouwen.",
    categorySlug: "phishing-sms",
    content: scamContent({
      intro:
        "Een phishing-sms, ook smishing genoemd, probeert je via een korte urgente boodschap naar een valse site te sturen. De afzender kan in je telefoon onder een bestaande berichtenreeks verschijnen, waardoor het bericht echt lijkt.",
      works: [
        "Het bericht meldt een geblokkeerde rekening, nieuwe bankpas, pakketprobleem, boete of openstaande betaling.",
        "De link leidt naar een kopie van een bank-, iDEAL-, DigiD- of PostNL-pagina.",
        "Ingevoerde inloggegevens en codes worden direct doorgestuurd naar criminelen.",
        "Soms installeert de link schadelijke software of vraagt een zogenaamde helpdesk later om meer toegang.",
      ],
      flags: [
        "De tekst vraagt vandaag nog te handelen om blokkade, kosten of beslag te voorkomen.",
        "De zichtbare link bevat extra woorden, streepjes, vreemde extensies of een verkorte URL.",
        "Je moet via de sms inloggen terwijl dezelfde melding niet in de officiële app staat.",
        "De afzender vraagt om een klein bedrag, waarna je bankgegevens op een nagebouwde iDEAL-pagina belanden.",
        "Het nummer of de afzendernaam lijkt officieel; die weergave kan worden vervalst.",
      ],
      actions: [
        "Klik niet, antwoord niet en open de officiële bank-, DigiD- of bezorgapp rechtstreeks.",
        "Stuur het bericht volgens de instructies van de nagebootste organisatie door en maak eerst een screenshot.",
        "Heb je gegevens ingevuld, neem dan direct contact op met bank of betrokken accountdienst en verbreek actieve sessies.",
      ],
      reportNote:
        "Meld de sms bij Fraudehelpdesk en de nagebootste organisatie. Meld financieel verlies of misbruik via politie.nl en deel de link via All Scams Melden.",
    }),
  },
  {
    slug: "techhelpdeskfraude",
    title: "Techhelpdeskfraude en misbruik van schermdeling",
    excerpt:
      "Een nepmedewerker van Microsoft, je provider of bank beweert een computerprobleem te zien. Geef nooit onverwacht toegang tot je scherm of apparaat.",
    categorySlug: "techhelpdeskfraude",
    content: scamContent({
      intro:
        "Techhelpdeskfraude gebruikt angst voor virussen, gehackte accounts of internetproblemen. De crimineel belt onverwacht of laat een alarmerende pop-up zien en probeert software voor beheer op afstand te laten installeren.",
      works: [
        "Een beller presenteert zich als Microsoft, Apple, een internetprovider, beveiligingsbedrijf of bank.",
        "Normale systeemmeldingen worden aangewezen als bewijs van een ernstige infectie.",
        "Met schermdeelsoftware krijgt de fraudeur zicht op je computer en soms volledige bediening.",
        "Tijdens zogenaamd herstel wordt om betaling of bankinlog gevraagd; het scherm kan worden verduisterd terwijl geld wordt overgemaakt.",
      ],
      flags: [
        "Een helpdesk belt zonder dat jij een ondersteuningsverzoek hebt gedaan.",
        "Je moet AnyDesk, TeamViewer of vergelijkbare beheersoftware installeren.",
        "De medewerker wil meekijken terwijl je inlogt bij internetbankieren of DigiD.",
        "Een browsermelding zegt dat je computer is vergrendeld en noemt één telefoonnummer.",
        "Stoppen zou volgens de beller leiden tot gegevensverlies, afsluiting of hoge kosten.",
      ],
      actions: [
        "Hang op en sluit een verdachte browsermelding zonder het genoemde nummer te bellen.",
        "Verbreek internet als iemand al op afstand meekijkt en neem vanaf een ander apparaat contact op met je bank.",
        "Laat het apparaat controleren, verwijder beheersoftware, wijzig wachtwoorden en controleer op onbekende gebruikers of transacties.",
      ],
      reportNote:
        "Meld de gebruikte nummers, websites en betaalgegevens bij Fraudehelpdesk. Doe bij toegang tot accounts of financieel verlies aangifte via politie.nl.",
    }),
  },
  {
    slug: "nepagenten",
    title: "Nepagenten aan de telefoon of voordeur",
    excerpt:
      "Oplichters doen zich voor als politieagent en vragen om geld, sieraden of bankpassen veilig te stellen. Controleer identiteit via 0900-8844.",
    categorySlug: "nepagenten",
    content: scamContent({
      intro:
        "Nepagenten misbruiken gezag en angst. Ze bellen over een inbraakrisico, gevonden namenlijst of onderzoek en sturen daarna iemand langs om waardevolle spullen zogenaamd te fotograferen of veilig te bewaren.",
      works: [
        "De beller noemt je naam en adres en zegt dat criminelen het op jouw woning hebben voorzien.",
        "Je krijgt opdracht geld, sieraden, bankpassen of pincodes klaar te leggen.",
        "Een persoon met nette kleding, legitimatie of een afgesproken code verschijnt aan de deur.",
        "De goederen verdwijnen en het opgegeven politieverhaal blijkt niet te bestaan.",
      ],
      flags: [
        "Een agent vraagt telefonisch hoeveel geld of sieraden je in huis hebt.",
        "De politie zou eigendommen, bankpas of pincode komen ophalen om die veilig te stellen.",
        "Je mag geen familie bellen of zelf contact opnemen met het algemene politienummer.",
        "Een pasje, uniform of zaaknummer wordt gebruikt als enig bewijs van identiteit.",
        "De bezoeker wil direct naar binnen en creëert haast met een dreigende inbraak.",
      ],
      actions: [
        "Open de deur niet, geef niets af en beëindig het gesprek.",
        "Bel zelf 0900-8844 om het verhaal en een eventuele agent te controleren; gebruik bij direct gevaar 112.",
        "Waarschuw kwetsbare buren of familie zonder de verdachte persoon zelf te confronteren.",
      ],
      reportNote:
        "Een actieve poging door nepagenten hoort direct bij de politie te worden gemeld. Bel bij spoed 112 en gebruik anders 0900-8844 of politie.nl; meld het patroon ook bij Fraudehelpdesk.",
      checkRelevant: false,
    }),
  },
];
