import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "nepwebshops",
    title: "Nepwebshops herkennen voordat je betaalt",
    excerpt:
      "Een professionele webwinkel kan toch vals zijn. Leer domeinen, bedrijfsgegevens, reviews en betaalmethoden controleren voordat je afrekent.",
    categorySlug: "nepwebshops",
    content: scamContent({
      intro:
        "Een nepwebshop is gebouwd om betalingen of persoonsgegevens te verzamelen zonder normaal te leveren. Sommige shops verdwijnen snel; andere sturen namaak, een waardeloos product of niets en maken retourneren onmogelijk.",
      works: [
        "De winkel lokt bezoekers met advertenties, schaarste en opvallend lage prijzen voor populaire producten.",
        "Logo’s, keurmerken, productfoto’s en voorwaarden worden gekopieerd van bestaande webshops.",
        "Bij het afrekenen volgt een betaalroute die weinig kopersbescherming biedt, soms buiten de webshop om via een persoonlijke Tikkie.",
        "Na betaling blijft levering uit, werkt het opgegeven adres niet of vraagt de verkoper telkens extra kosten.",
      ],
      flags: [
        "De domeinnaam is vreemd opgebouwd, pas kort actief of lijkt met één letter verschil op een bekende winkel.",
        "KvK-nummer, btw-nummer, retouradres en telefoonnummer ontbreken of horen bij verschillende ondernemingen.",
        "Alle producten zijn permanent sterk afgeprijsd en voorraadtellers of aftelklokken beginnen telkens opnieuw.",
        "Reviews staan alleen op de eigen site, klinken hetzelfde of gaan over een ander assortiment.",
        "Betalen kan alleen via overschrijving, crypto of een Tikkie op naam van een particulier; ook een iDEAL-logo alleen bewijst niets.",
      ],
      actions: [
        "Zoek de handelsnaam, het adres, telefoonnummer en rekeningnummer los van de webshop op en vergelijk ze met het Handelsregister en onafhankelijke ervaringen.",
        "Controleer de volledige domeinnaam, retourvoorwaarden, levertijd en wie de betaalontvanger is voordat je een iDEAL-betaling bevestigt.",
        "Kies bij twijfel een verkoper met aantoonbare contactgegevens en een betaalmethode met passende kopersbescherming.",
      ],
      reportNote:
        "Meld de webshop ook bij het gebruikte advertentieplatform, keurmerk en de betaaldienst. Bij verlies kun je via politie.nl bekijken hoe je aangifte doet.",
    }),
  },
  {
    slug: "valse-tickets",
    title: "Valse tickets voor concerten, festivals en sport",
    excerpt:
      "Oplichters verkopen niet-bestaande, gekopieerde of al gebruikte toegangsbewijzen. Zo controleer je een ticketdeal en beperk je risico.",
    categorySlug: "valse-tickets",
    content: scamContent({
      intro:
        "Bij ticketfraude betaal je voor een toegangsbewijs dat niet bestaat, meerdere keren is verkocht of bij de ingang ongeldig blijkt. Vooral uitverkochte evenementen en lastminuteverkoop geven fraudeurs ruimte om haast uit te buiten.",
      works: [
        "Een verkoper biedt via sociale media, een chatgroep of advertentieplatform gewilde tickets aan en zegt onverwacht verhinderd te zijn.",
        "Een foto, orderbevestiging of identiteitsbewijs moet vertrouwen wekken, maar kan gestolen of bewerkt zijn.",
        "Na betaling ontvang je niets, een vervalste pdf of een echte barcode die ook aan anderen is verkocht.",
        "Soms volgt een tweede verzoek voor naamswijziging, verzekering of vrijgave van het ticket.",
      ],
      flags: [
        "De prijs is opvallend laag of de verkoper heeft voor veel uitverkochte evenementen kaarten beschikbaar.",
        "Overdracht via het officiële ticketsysteem of een erkend doorverkoopkanaal wordt geweigerd.",
        "Je moet direct betalen via overschrijving, persoonlijke Tikkie, cadeaukaart of crypto.",
        "De naam van de rekeninghouder wijkt af en vragen over vak, rij, ordernummer of aankoopbewijs blijven onbeantwoord.",
        "Een screenshot van een ticket wordt als voldoende bewijs aangeboden; een zichtbare barcode kan bovendien worden misbruikt.",
      ],
      actions: [
        "Controleer op de website van organisator of ticketuitgever welke officiële doorverkoop- en overdrachtsmogelijkheden bestaan.",
        "Laat een ticket uitsluitend binnen het officiële systeem aan jouw account overdragen en controleer daar evenement, datum en plaats.",
        "Betaal niet onder druk en publiceer zelf nooit een ticket met zichtbare barcode of QR-code.",
      ],
      reportNote:
        "Meld het profiel en de advertentie bij het verkoopplatform en informeer de ticketuitgever. Doe bij financieel verlies aangifte via politie.nl.",
    }),
  },
  {
    slug: "booking-phishing",
    title: "Booking-phishing rond een echte reservering",
    excerpt:
      "Een bericht over een hotelboeking kan echte gegevens bevatten en toch phishing zijn. Controleer betaalverzoeken altijd buiten de chatlink om.",
    categorySlug: "booking-phishing",
    content: scamContent({
      intro:
        "Bij booking-phishing gebruiken criminelen gegevens van een echte hotel- of vakantieboeking om een geloofwaardig betaalverzoek te sturen. Het bericht beweert vaak dat je reservering vervalt als je niet snel je kaart of betaling verifieert.",
      works: [
        "Criminelen krijgen boekingsinformatie via een gehackt accommodatieaccount, gelekte mailbox of nagebootst reserveringsplatform.",
        "Je ontvangt een bericht met je naam, reisdata en accommodatie, soms zelfs binnen een bestaand chatgesprek.",
        "De link opent een nagemaakte betaalpagina die kaartgegevens, bankinlog of een bevestigingscode verzamelt.",
        "Na invoer kan een ongewenste betaling volgen of worden de gegevens voor verdere fraude gebruikt.",
      ],
      flags: [
        "De accommodatie vraagt onverwacht om herbevestiging terwijl de reservering in je account als bevestigd staat.",
        "De link gaat naar een ander hoofddomein dan dat van het boekingsplatform of de accommodatie.",
        "Er dreigt annulering binnen enkele uren en contact buiten de meegestuurde link wordt ontmoedigd.",
        "Je moet kaartgegevens opnieuw invoeren, een bankcode delen of een klein verificatiebedrag betalen.",
        "Het bericht bevat correcte boekingsdetails; juist dat kan wijzen op misbruik van een account en is geen garantie.",
      ],
      actions: [
        "Open de reserveringsapp of typ zelf het officiële webadres en controleer daar de betaalstatus.",
        "Bel de accommodatie via een nummer uit je oorspronkelijke bevestiging of van de officiële website, niet via het verdachte bericht.",
        "Blokkeer bij ingevoerde kaartgegevens direct je kaart en bespreek verdachte transacties met je bank of kaartuitgever.",
      ],
      reportNote:
        "Meld het bericht bij het boekingsplatform en de accommodatie zodat zij het account kunnen beveiligen. Meld schade bij Fraudehelpdesk en doe zo nodig aangifte via politie.nl.",
    }),
  },
  {
    slug: "quishing",
    title: "Quishing: fraude via valse QR-codes",
    excerpt:
      "Een QR-code verbergt de bestemming totdat je scant. Ontdek hoe valse codes op brieven, parkeerautomaten en posters naar phishing leiden.",
    categorySlug: "quishing",
    content: scamContent({
      intro:
        "Quishing is phishing via een QR-code. De code kan digitaal zijn verstuurd of als sticker over een echte code zijn geplakt. Na het scannen kom je op een betaal- of inlogpagina die gegevens steelt of een ongewenste betaling laat bevestigen.",
      works: [
        "De QR-code wordt aangeboden voor parkeren, een pakket, menu, boete, enquête, betaling of accountcontrole.",
        "Omdat de URL niet direct zichtbaar is, lijkt scannen veiliger dan op een onbekende link klikken.",
        "De landingspagina bootst bijvoorbeeld iDEAL, DigiD, PostNL, een bank of gemeente na.",
        "De gebruiker vult gegevens in of keurt in de bankapp een andere betaling goed dan verwacht.",
      ],
      flags: [
        "Een sticker zit scheef, bedekt een andere code of wijkt af van de officiële vormgeving.",
        "Na het scannen verschijnt een verkorte, lange of verkeerd gespelde domeinnaam.",
        "Een simpele handeling vereist ineens DigiD-inlog, bankgegevens, pincode of installatie van een app.",
        "De pagina toont urgentie, een onverwachte toeslag of een zeer klein controlebedrag.",
        "Een brief of e-mail biedt alleen de QR-code en geen zelfstandig te controleren webadres.",
      ],
      actions: [
        "Bekijk vóór openen de URL die je camera toont en controleer vooral het registreerbare hoofddomein.",
        "Gebruik voor parkeren, bezorgen of overheidshandeling de officiële app of typ het bekende adres zelf.",
        "Meld een verdachte fysieke sticker bij de beheerder en verwijder hem niet als daardoor bewijs verloren gaat.",
      ],
      reportNote:
        "Meld digitale quishing bij de nagebootste organisatie en fysieke codes bij de locatiebeheerder of gemeente. Bij schade kun je aangifte doen via politie.nl.",
    }),
  },
];
