import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

type Extra = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  intro: string;
  works: string[];
  flags: string[];
  actions: string[];
  reportNote?: string;
};

const extras: Extra[] = [
  {
    slug: "nepwebshop-dropshipping",
    title: "Dropshipping en namaakshops herkennen",
    excerpt:
      "Een webshop kan echt lijken en toch namaak of niets leveren. Zo check je levertijd, herkomst en of de winkel zelf bestaat.",
    categorySlug: "nepwebshops",
    intro:
      "Niet elke slechte webshop is een eenmalige phishingpagina. Sommige shops blijven maanden online, gebruiken dropshipping en sturen namaak, een ander product of een pakket dat nooit aankomt. De betaling is dan wel echt — en lastig terug te draaien.",
    works: [
      "De shop adverteert op social media met bekende merken tegen een prijs die groothandels nauwelijks halen.",
      "Productfoto’s komen van een andere winkel of een fabrikant; de beschrijving is vertaald en vaag over herkomst.",
      "Na betaling volgt een trackingcode die dagen op ‘onderweg’ blijft of een pakket uit een ander land met een waardeloos artikel.",
      "Retourneren is duur, het retouradres bestaat niet of de klantenservice antwoordt alleen met standaardteksten.",
    ],
    flags: [
      "Geen KvK-nummer, of een nummer dat bij een ander bedrijf of een privépersoon hoort.",
      "Contact loopt alleen via een formulier of een gratis mailbox, niet via een bedrijfsdomein.",
      "Levertijd is ‘5–25 werkdagen’ zonder duidelijke verkoper in Nederland of de EU.",
      "Keurmerken zijn plaatjes zonder link naar een controleerbaar register.",
      "Betaalontvanger in je bankapp wijkt af van de shopnaam.",
    ],
    actions: [
      "Zoek de exacte productfoto omgekeerd en vergelijk prijs en verkoper.",
      "Controleer KvK, adres en domeinleeftijd voordat je betaalt.",
      "Bewaar orderbevestiging en de naam van de betaalontvanger.",
    ],
  },
  {
    slug: "nepwebshop-keurmerk-kvk",
    title: "KvK, btw en keurmerken van een webshop controleren",
    excerpt:
      "Een logo of KvK-nummer op een site is geen bewijs. Zo controleer je of handelsnaam, adres en betaalontvanger bij elkaar horen.",
    categorySlug: "nepwebshops",
    intro:
      "Fraudeurs kopiëren keurmerken, algemene voorwaarden en een KvK-nummer van een bestaand bedrijf. De site oogt dan formeel, terwijl de betaling naar iemand anders gaat. Controleer daarom of naam, adres, domein en ontvanger hetzelfde verhaal vertellen.",
    works: [
      "De footer toont een KvK- of btw-nummer dat bij een ander bedrijf hoort, of een verzonnen nummer.",
      "Het fysieke adres is een virtueel kantoor, een woonadres of een plek die niet bij de webshop past.",
      "Algemene voorwaarden zijn gekopieerd en noemen een andere handelsnaam.",
      "Reviews op de eigen site zijn niet terug te vinden bij onafhankelijke bronnen.",
    ],
    flags: [
      "KvK-naam en webshopnaam komen niet overeen.",
      "Het rekeningnummer staat op naam van een particulier.",
      "Het telefoonnummer is alleen bereikbaar via WhatsApp.",
      "Het retouradres ligt in een ander land dan de ‘Nederlandse klantenservice’ suggereert.",
      "Keurmerklogo’s linken niet naar een geldige registratie.",
    ],
    actions: [
      "Zoek het KvK-nummer zelf op in het Handelsregister en vergelijk adres en handelsnaam.",
      "Bel het telefoonnummer dat bij het KvK-bedrijf hoort, niet het nummer op de verdachte site.",
      "Betaal niet als de ontvanger in je bankomgeving een andere naam toont.",
    ],
  },
  {
    slug: "valse-tickets-social",
    title: "Tickets via Instagram, Facebook en Marktplaats",
    excerpt:
      "Uitverkochte concerten lokken neptickets op social media. Koop alleen via officiële doorverkoop en draag het ticket in het systeem over.",
    categorySlug: "valse-tickets",
    intro:
      "Bij uitverkochte shows duiken binnen minuten ‘tickets over’ op in stories, groepen en advertenties. Een screenshot van een barcode of een Chat-verhaal over een ziek familielid is geen bewijs dat het ticket echt en overdraagbaar is.",
    works: [
      "Een profiel biedt meerdere kaarten aan voor verschillende uitverkochte events.",
      "Je krijgt een foto van een ticket of een pdf, soms met een wazig identiteitsbewijs erbij.",
      "Betaling moet direct via Tikkie of overschrijving, buiten het ticketplatform om.",
      "Bij de deur blijkt de barcode al gescand of het ticket staat nog op andermans account.",
    ],
    flags: [
      "Het profiel is nieuw, heeft weinig volgers of verkoopt kaarten voor veel steden.",
      "Officiële overdracht via Ticketmaster, Eventim of de organisator wordt geweigerd.",
      "De prijs is ver onder de officiële prijs of juist paniekerig ‘laatste kans’.",
      "De verkoper wil niet videobellen terwijl het ticket in het account zichtbaar is.",
      "Er wordt gevraagd om niet te melden dat je buiten het platform koopt.",
    ],
    actions: [
      "Koop of neem alleen tickets over binnen het officiële account van de uitgever.",
      "Controleer op de site van de organisator of doorverkoop is toegestaan en hoe naamswijziging werkt.",
      "Deel nooit een foto van je eigen barcode of QR-code.",
    ],
  },
  {
    slug: "valse-tickets-festivals",
    title: "Festival- en sportfraude vlak voor het event",
    excerpt:
      "Lastminutekaarten en ‘staff-passen’ zijn een klassieke truc. Zo voorkom je dat je bij de poort zonder geldig ticket staat.",
    categorySlug: "valse-tickets",
    intro:
      "Hoe dichter bij de datum, hoe meer druk. Fraudeurs verkopen dezelfde festivalbandje-foto of QR-code aan tientallen mensen, of bieden ‘artist-tickets’ aan die niet bestaan. Zonder officiële overdracht heb je bij de poort geen poot om op te staan.",
    works: [
      "Een verkoper zegt dat de kaart op naam staat en ‘gewoon meeneemt’ of later een pdf stuurt.",
      "Je betaalt een aanbetaling om de kaart vast te houden tot je elkaar bij de ingang ziet.",
      "Op de dag zelf is de verkoper onbereikbaar of blijkt de code al gebruikt.",
      "Soms volgt een tweede betaling voor ‘activatie’ of een polsbandje.",
    ],
    flags: [
      "Geen ordernummer dat je zelf in het ticketsysteem kunt zien.",
      "Ontmoeting alleen bij de poort, zonder vooraf overdracht.",
      "Meerdere kopers worden in één groepsapp gezet met dezelfde screenshot.",
      "Betaling naar een buitenlandse rekening of cadeaukaart.",
      "De verkoper kent zaal, vak of ingang niet.",
    ],
    actions: [
      "Laat het ticket vóór betaling op jouw naam in het officiële systeem zetten.",
      "Spreek geen contante overdracht bij de poort af als het platform overdracht ondersteunt.",
      "Meld het profiel meteen als de verkoper druk zet om buiten het systeem te betalen.",
    ],
  },
  {
    slug: "booking-airbnb-verhuur",
    title: "Phishing bij Airbnb, Booking en vakantieverhuur",
    excerpt:
      "Een bericht over je verblijf kan echte data bevatten en toch om een betaling buiten het platform vragen. Betaal nooit via een losse link.",
    categorySlug: "booking-phishing",
    intro:
      "Criminelen kapen chats of sturen een mail die lijkt op Airbnb, Booking.com of een vakantiepark. Ze kennen je naam, data en soms het adres. Het verzoek is altijd hetzelfde: bevestig je betaling nu, anders vervalt de reservering.",
    works: [
      "Een gast of verhuurder wordt benaderd in of náást het platformbericht.",
      "De link opent een nagemaakte betaalpagina met het logo van het platform of de bank.",
      "Soms vraagt een ‘host’ om borg via overschrijving omdat het platform ‘niet werkt’.",
      "Na het invullen van kaart- of bankgegevens volgt een afschrijving of een tweede verificatieverzoek.",
    ],
    flags: [
      "Het verzoek komt per e-mail of sms terwijl het platform een eigen inbox heeft.",
      "Het domein lijkt op het echte, maar wijkt af in spelling of extensie.",
      "Je moet buiten de reservering om betalen om ‘de boeking te redden’.",
      "De verhuurder wil het gesprek voortzetten op WhatsApp.",
      "Er is tijdsdruk van enkele minuten.",
    ],
    actions: [
      "Open de reservering alleen via de app of door het officiële adres zelf in te typen.",
      "Betaal borg en huur alleen via de betaalmethode van het platform.",
      "Meld het bericht in de app via ‘dit bericht melden’ en bij je bank als je gegevens hebt ingevuld.",
    ],
  },
  {
    slug: "booking-betaallink",
    title: "Valse betaallinks na een hotel- of vluchtboeking",
    excerpt:
      "Een herinnering om je boeking te bevestigen kan een nagemaakte betaalpagina zijn. Controleer het domein vóór je een code invult.",
    categorySlug: "booking-phishing",
    intro:
      "Na een echte boeking verwachten mensen een bevestiging. Fraudeurs timen daar een mail of sms op: ‘betaling mislukt’, ‘kaart verlopen’ of ‘extra verificatie nodig’. De link lijkt op de airline, het hotel of de bank, maar het hoofddomein klopt niet.",
    works: [
      "Je ontvangt een bericht met boekingsnummer, datums of een echt logo.",
      "De link vraagt om kaartgegevens, iDEAL of een bankcode.",
      "Een eenmalige code uit je bank-app wordt direct misbruikt.",
      "Soms belt kort daarna iemand die zich voordoet als fraudehelpdesk van de bank.",
    ],
    flags: [
      "Het webadres is een lange reeks of een ander hoofddomein dan de organisatie.",
      "Het bericht vraagt om een code ‘nooit delen’ alsnog in te vullen op een site.",
      "Spelling van het afzenderadres wijkt af (booklng, airbn-b, klm-check).",
      "Je kunt de actie niet terugvinden als je zelf inlogt.",
      "Er wordt geheimhouding gevraagd tegenover de echte klantenservice.",
    ],
    actions: [
      "Log zelf in op de organisatie en kijk of daar een openstaande actie staat.",
      "Deel nooit een TAN-, signeer- of verificatiecode.",
      "Bel je bank via het nummer op je pas als je toch iets hebt ingevuld.",
    ],
  },
  {
    slug: "quishing-parkeren",
    title: "QR-fraude bij parkeren, laadpalen en terrassen",
    excerpt:
      "Een sticker over de echte QR-code leidt naar een nepbetaalpagina. Betaal parkeren via de officiële app of het bord van de gemeente.",
    categorySlug: "quishing",
    intro:
      "Quishing is phishing via een QR-code. Op parkeerautomaten, laadpalen en menukaarten plakken fraudeurs een sticker over de echte code. Je telefoon opent dan een site die op een betaalpagina lijkt en vraagt om kaart- of bankgegevens.",
    works: [
      "Een sticker zit scheef over de originele code of op een plek waar normaal geen code hoort.",
      "De site vraagt meteen om een hoog bedrag of om in te loggen bij je bank.",
      "Na betaling krijg je geen echt parkeerticket of laadsessie.",
      "Soms wordt alleen je kaartnummer opgeslagen voor later misbruik.",
    ],
    flags: [
      "De URL na het scannen lijkt niet op de gemeente, exploitant of bekende parkeer-app.",
      "De pagina vraagt om pincode, DigiD of een ‘beveiligingscode’ voor een klein bedrag.",
      "De sticker is nieuw, bubbelig of bedekt een andere code.",
      "Je kunt niet met een bekende app betalen, alleen via die ene code.",
      "Het betaalverzoek staat op naam van een particulier.",
    ],
    actions: [
      "Gebruik de officiële parkeer- of laad-app en voer zonenummer of paalnummer zelf in.",
      "Controleer het domein vóór je betaalt en stop bij een onbekende pagina.",
      "Meld de sticker bij de exploitant of gemeente en verwijder hem niet als bewijs nog nodig is — maak eerst foto’s.",
    ],
  },
  {
    slug: "quishing-factuur",
    title: "QR-codes in facturen, brieven en pakketkaartjes",
    excerpt:
      "Een QR-code in een onverwachte factuur of op een pakketkaart kan naar een nepsite leiden. Typ het officiële adres zelf.",
    categorySlug: "quishing",
    intro:
      "Een brief of mail met een QR-code voelt moderner dan een link, maar de code is alleen een verstopte URL. Fraudeurs gebruiken facturen, ‘douane’ of een bezorgkaart om je naar een betaalpagina te sturen die niet van het bedrijf is.",
    works: [
      "Je ontvangt een factuur of kaart met het verzoek de code te scannen om te betalen of een levering vrij te geven.",
      "De pagina lijkt op een bank, pakketdienst of overheidsportaal.",
      "Er wordt gevraagd om een klein bedrag plus je inloggegevens.",
      "Kort daarna volgen extra ‘bevestigingen’ of een telefoontje.",
    ],
    flags: [
      "Je verwacht geen factuur of pakket.",
      "Het bedrag, kenmerk of afzender klopt niet met een echte order.",
      "De code opent een site met een vreemd domein.",
      "De brief heeft geen kenmerk dat je in een officiële portal terugvindt.",
      "Er staat tijdsdruk of een dreiging van incasso.",
    ],
    actions: [
      "Scan niet om te betalen. Zoek het bedrijf zelf op en log in op je eigen account.",
      "Vergelijk factuurnummer en bedrag met je eigen administratie.",
      "Meld de brief of mail bij de nagebootste organisatie.",
    ],
  },
  {
    slug: "bankhelpdesk-terugbellen",
    title: "De terugbeltruc van een neppbankmedewerker",
    excerpt:
      "Een beller kent je naam en zegt dat je rekening wordt leeggehaald. Hang op en bel zelf het nummer op je bankpas.",
    categorySlug: "bankhelpdesk-fraude",
    intro:
      "Bankhelpdeskfraude begint bijna altijd met een telefoontje, sms of melding in een nagemaakte app: er is een verdachte betaling. De beller klinkt kalm, gebruikt banktermen en vraagt je om ‘mee te werken’ zodat het geld veilig wordt gezet.",
    works: [
      "Je wordt gebeld door iemand die zich voordoet als fraudeafdeling.",
      "Er staat een valse melding in een sms of push die naar een nepnummer verwijst.",
      "Je moet een betaling goedkeuren, een code voorlezen of software installeren.",
      "Het geld gaat naar een ‘veilige rekening’ die van de fraudeur is.",
    ],
    flags: [
      "De beller vraagt om een code die je bank nooit zal vragen.",
      "Je mag niemand anders bellen ‘omdat de lijn anders wordt verbroken’.",
      "Er is een tweede beller die zich voordoet als politie.",
      "Je moet AnyDesk, TeamViewer of een ‘beveiligingsapp’ installeren.",
      "Het telefoonnummer staat niet op je pas of op de site die je zelf opent.",
    ],
    actions: [
      "Hang op. Bel het nummer dat op je bankpas staat, ook als de beller zegt dat hij dat nummer is.",
      "Keur geen betaling goed en lees geen codes voor.",
      "Meld het gesprek bij je bank, ook als je niets hebt gedeeld.",
    ],
  },
  {
    slug: "bankhelpdesk-nieuwe-pas",
    title: "Valse hulp bij een nieuwe pinpas of limiet",
    excerpt:
      "Niemand van de bank komt je pas ophalen of vraagt je pincode om een ‘nieuwe pas te activeren’.",
    categorySlug: "bankhelpdesk-fraude",
    intro:
      "Een variant van bankhelpdeskfraude draait niet alleen om codes, maar om je pas. De beller zegt dat je pas onveilig is, een nieuwe onderweg is, of dat je limiet tijdelijk omlaag moet. Daarna volgt een koerier of het verzoek de pas door te knippen en op te sturen.",
    works: [
      "Je hoort dat je pas is geskimd of dat er een nieuwe pas wordt gebracht.",
      "Je moet de huidige pas en pincode aan een koerier geven of in een envelop doen.",
      "Intussen worden betalingen gedaan of de limiet verhoogd met jouw codes.",
      "De ‘nieuwe pas’ komt nooit, of is een excuus om contact te houden.",
    ],
    flags: [
      "Een koerier komt onaangekondigd naar je pas vragen.",
      "Je moet de pincode noemen, opschrijven of intoetsen terwijl iemand meekijkt.",
      "De beller weet recente transacties uit een gelekte sms of eerder gesprek.",
      "Je wordt afgeraden naar het bankkantoor te gaan.",
      "Het verhaal wisselt als je kritische vragen stelt.",
    ],
    actions: [
      "Geef nooit je pas of pincode af, ook niet aan iemand die een bankbadge toont.",
      "Blokkeer je pas via de officiële app of het nummer op de pas als je twijfelt.",
      "Doe aangifte als de pas al weg is of er betalingen zijn gedaan.",
    ],
  },
  {
    slug: "bankpas-ophalen",
    title: "Bankpasfraude aan de deur",
    excerpt:
      "Criminelen halen bankpassen op met een smoes over fraude of een ‘veilige envelop’. De bank stuurt daar niemand voor.",
    categorySlug: "bankpasfraude",
    intro:
      "Bij bankpasfraude willen criminelen de fysieke pas én de pincode. Dat gebeurt aan de deur, via een ‘servicepunt’ of doordat je de pas moet opsturen. Met pas en code kunnen ze direct pinnen of de limiet gebruiken voordat jij de bank spreekt.",
    works: [
      "Na een belletje komt iemand langs om de pas ‘veilig te stellen’.",
      "Je moet de pas doorknippen op een manier die hem toch bruikbaar laat, of hem in een envelop doen.",
      "De pincode wordt gevraagd ‘ter controle’ of afgekeken.",
      "Binnen korte tijd volgen pinbetalingen of geldopnames.",
    ],
    flags: [
      "Bezoek zonder afspraak die je zelf bij de bank hebt gemaakt.",
      "Druk om de pas meteen af te geven.",
      "Vragen over je pincode, geboortedatum of limiet.",
      "Een legitimatie die je niet zelf kunt verifiëren.",
      "Het verzoek om de bank niet zelf te bellen.",
    ],
    actions: [
      "Doe de deur niet open voor een onaangekondigde ‘bankmedewerker’.",
      "Bel direct het nummer op je pas als iemand naar je pas vraagt.",
      "Laat de pas blokkeren zodra je hem uit handen hebt gegeven.",
    ],
  },
  {
    slug: "bankpas-pincode",
    title: "Pincode en bankpas: wat nooit mag",
    excerpt:
      "Een pincode is alleen voor jou. Geen bank, politie of helpdesk mag hem vragen, ook niet om fraude te stoppen.",
    categorySlug: "bankpasfraude",
    intro:
      "De pincode hoort nergens gedeeld te worden: niet telefonisch, niet in een chat, niet op een website en niet op papier voor een koerier. Fraudeurs framen het als een test, een controle of een manier om je geld te beschermen.",
    works: [
      "Een beller vraagt de code om een ‘beveiligingsprofiel’ te controleren.",
      "Een site vraagt pasnummer, vervaldatum, cvc én pincode.",
      "Iemand kijkt mee terwijl je de code intoetst bij een automaat of thuis.",
      "De code wordt gebruikt samen met een gekopieerde of opgehaalde pas.",
    ],
    flags: [
      "Elke vraag naar je pincode, ongeacht het verhaal.",
      "Een site die om meer vraagt dan een normale iDEAL-betaling.",
      "Iemand die ‘even helpt’ met je bankapp of pinautomaat.",
      "Druk en geheimhouding.",
      "Een belofte dat het geld daarna wordt teruggestort.",
    ],
    actions: [
      "Stop het gesprek zodra een pincode wordt gevraagd.",
      "Wijzig niets via een link uit het gesprek; open zelf je bankapp.",
      "Meld het bij de bank, ook als je de code alleen bijna hebt gegeven.",
    ],
  },
  {
    slug: "phishing-sms-ideal",
    title: "Phishingsms over iDEAL, incasso en betaalherinneringen",
    excerpt:
      "Een sms over een mislukte iDEAL-betaling of openstaande incasso linkt vaak naar een nepsite. Log nooit in via die link.",
    categorySlug: "phishing-sms",
    intro:
      "Sms-phishing misbruikt herkenbare momenten: een betaling die ‘mislukt’ is, een pakket, een boete of een incasso. Het bericht is kort, de link is dat niet. Achter de link zit een kopie van een bank- of betaalpagina.",
    works: [
      "Je krijgt een sms van een kort nummer of een naam die op een bank of incassobureau lijkt.",
      "De link gebruikt een verkorte URL of een domein dat niet van de bank is.",
      "Je vult inloggegevens of een betaalcode in.",
      "Er volgt een tweede sms met een code die de fraudeur live probeert te gebruiken.",
    ],
    flags: [
      "Je herkent de betaling niet.",
      "Het afzenderadres is een gewoon mobiel nummer.",
      "De link bevat spelfouten in de merknaam of een vreemde extensie.",
      "De pagina vraagt om meer dan een normale betaling.",
      "Het bericht dreigt met incasso binnen een uur.",
    ],
    actions: [
      "Open je bankapp zelf en controleer afschrijvingen daar.",
      "Tik niet op de link en stuur de sms niet door als klikbare link naar anderen.",
      "Meld het nummer bij je bank en bij Fraudehelpdesk.",
    ],
  },
  {
    slug: "phishing-sms-bankapp",
    title: "Nep-sms om je bankapp te updaten",
    excerpt:
      "Banken vragen je niet per sms om een update te installeren via een link. Updates komen via de officiële appstore.",
    categorySlug: "phishing-sms",
    intro:
      "Een veelgebruikte smoes is dat je bankapp onveilig is of dat een update verplicht is vóór middernacht. De link installeert geen echte update, maar opent een phishingpagina of een schadelijk bestand.",
    works: [
      "De sms noemt je bank en een deadline.",
      "De link leidt naar een site buiten de App Store of Play Store.",
      "Je moet inloggen om de ‘update’ te starten.",
      "Daarna worden gegevens of een sessie misbruikt.",
    ],
    flags: [
      "Update buiten de officiële store.",
      "De pagina lijkt op de bank maar het domein klopt niet.",
      "Vraag om codes uit de echte app.",
      "Spelling of logo wijkt af.",
      "Je hebt zelf geen storing gezien in de echte app.",
    ],
    actions: [
      "Update apps alleen via de store op je telefoon.",
      "Controleer het domein als je twijfelt en sluit de pagina.",
      "Verwijder een per ongeluk geïnstalleerd bestand en bel de bank als je hebt ingelogd.",
    ],
  },
  {
    slug: "techhelpdesk-popup",
    title: "Nep-virusmeldingen en pop-ups",
    excerpt:
      "Een schreeuwende melding dat je computer is geïnfecteerd is zelf de truc. Bel het nummer op het scherm niet.",
    categorySlug: "techhelpdeskfraude",
    intro:
      "Techhelpdeskfraude begint vaak met een pop-up, een vastgelopen browser of een telefoontje over een Microsoft- of virusprobleem. Het doel is schermdeling, waarna criminelen betalingen klaarzetten of bestanden gijzelen met angst.",
    works: [
      "Een pagina zegt dat je moet bellen om een virus te verwijderen.",
      "De beller vraagt om software voor schermdeling te installeren.",
      "Op jouw scherm wordt een ‘scan’ getoond en daarna een factuur of bankbetaling.",
      "Soms worden bestanden versleuteld of wordt toegang gehouden tot je e-mail.",
    ],
    flags: [
      "Een website die je telefoon laat rinkelen of je scherm blokkeert.",
      "Een nummer dat niet van een bedrijf is dat jij hebt gebeld.",
      "Verzoek om AnyDesk, TeamViewer of vergelijkbare software.",
      "Een medewerker die je bankomgeving nodig heeft om ‘te controleren’.",
      "Contante of cadeaukaartbetaling voor technische hulp.",
    ],
    actions: [
      "Sluit de pagina met taakbeheer of door de browser geforceerd te stoppen. Bel het nummer niet.",
      "Installeer geen hulpprogramma op verzoek van een ongevraagde beller.",
      "Laat iemand mee kijken die je vertrouwt als je al software hebt geïnstalleerd, en wijzig wachtwoorden vanaf een ander apparaat.",
    ],
  },
  {
    slug: "techhelpdesk-schermdeling",
    title: "Schermdeling en hulp op afstand",
    excerpt:
      "Wie jouw scherm kan overnemen, kan ook betalingen zien en klaarzetten. Deel je scherm nooit met een ongevraagde helpdesk.",
    categorySlug: "techhelpdeskfraude",
    intro:
      "Schermdeling is handig bij echte IT-hulp van een bedrijf dat jij zelf hebt ingeschakeld. Fraudeurs gebruiken dezelfde tools om mee te kijken terwijl jij inlogt, en om overboekingen te starten die jij vervolgens ‘per ongeluk’ goedkeurt.",
    works: [
      "Je installeert een programma en leest een code voor.",
      "De ander ziet je bureaublad, mailbox of bankomgeving.",
      "Er wordt een betaling voorbereid of een wallet gekoppeld.",
      "Je krijgt het advies de computer aan te laten en niemand te bellen.",
    ],
    flags: [
      "Ongevraagd contact dat schermdeling eist.",
      "De hulpverlener stuurt je naar je bank terwijl hij meekijkt.",
      "Je moet een code die op je scherm staat doorgeven.",
      "Geheimhouding tegenover familie of bank.",
      "Een factuur die tijdens de sessie snel stijgt.",
    ],
    actions: [
      "Verbreek de verbinding en verwijder het programma.",
      "Wijzig wachtwoorden van e-mail en bank vanaf een schoon apparaat.",
      "Controleer je rekeningen en meld de sessie bij de bank.",
    ],
  },
  {
    slug: "nepagent-politie-bel",
    title: "Neppolitie aan de telefoon",
    excerpt:
      "De politie belt je niet om geld over te maken, je pas op te halen of een zaak geheim te houden.",
    categorySlug: "nepagenten",
    intro:
      "Nepagenten doen zich voor als politie, marechaussee of een fraude-unit. Ze combineren angst (je naam zou bij een onderzoek horen) met een opdracht: maak geld over, geef je pas af of haal contant geld op ‘als bewijs’.",
    works: [
      "Een beller noemt een zaaknummer en zegt dat je rekening wordt misbruikt.",
      "Je mag niemand spreken omdat het onderzoek anders gevaar loopt.",
      "Een ‘collega’ of bankmedewerker belt daarna om het verhaal te bevestigen.",
      "Geld wordt afgegeven, overgemaakt of in een kluis gelegd die niet van de politie is.",
    ],
    flags: [
      "Geheimhouding, ook tegenover je eigen bank.",
      "Verzoek om contant geld, goud of crypto.",
      "Een koerier voor je pas of envelop.",
      "Dreiging met arrestatie als je niet meewerkt.",
      "Een telefoonnummer dat niet het bekende politienummer is.",
    ],
    actions: [
      "Hang op en bel 0900-8844 of ga naar een politiebureau.",
      "Bel je bank via het nummer op je pas.",
      "Geef geen geld, pas of codes af.",
    ],
  },
  {
    slug: "nepagent-kluis",
    title: "De kluistruc en ‘veilig geld wegzetten’",
    excerpt:
      "Geld ‘veiligstellen’ in een kluis of op een andere rekening is een klassieke babbeltruc. Je bank vraagt dat nooit.",
    categorySlug: "nepagenten",
    intro:
      "Bij de kluistruc wordt je wijsgemaakt dat je geld in gevaar is. De oplossing van de beller is dat je het opneemt en afgeeft, of overmaakt naar een rekening die hij ‘veilig’ noemt. Dat geld is daarna weg.",
    works: [
      "Een beller bouwt urgentie: criminelen zouden vandaag nog pinnen.",
      "Je moet naar een automaat, een bedrag opnemen en dat afgeven of deponeren.",
      "Soms wordt een echte bankkluis genoemd, maar de afspraak is met de fraudeur.",
      "Familie wordt buiten het verhaal gehouden tot de betaling rond is.",
    ],
    flags: [
      "Elke opdracht om zelf geld te verplaatsen naar een onbekende plek.",
      "Verbod om de bank of familie te bellen.",
      "Een verhaal dat alleen klopt zolang je in het gesprek blijft.",
      "Contant geld, cadeaukaarten of crypto als ‘bewijs’.",
      "Een tweede persoon die het verhaal bevestigt vanuit hetzelfde script.",
    ],
    actions: [
      "Stop en bel iemand die je vertrouwt, plus je bank.",
      "Maak geen geld over en neem niets op op instructie van een beller.",
      "Meld de poging, ook als je op tijd bent gestopt.",
    ],
  },
  {
    slug: "digid-nepmail",
    title: "Valse DigiD-mails en sms’jes",
    excerpt:
      "DigiD stuurt je niet naar een link om ‘je account te redden’. Open digid.nl alleen door het adres zelf te typen.",
    categorySlug: "digid-nabootsing",
    intro:
      "DigiD-nabootsing mikt op je inlog bij de overheid. Met een overgenomen DigiD kunnen fraudeurs toeslagen, gegevens of andere diensten proberen te misbruiken. De aanval begint met een bericht dat je account verloopt of is geblokkeerd.",
    works: [
      "Een mail of sms zegt dat je DigiD bijna verloopt of is gemeld als verdacht.",
      "De link opent een kopie van het inlogscherm.",
      "Je vult gebruikersnaam, wachtwoord en een sms-code in.",
      "De fraudeur probeert die sessie meteen te gebruiken.",
    ],
    flags: [
      "Een link in het bericht in plaats van ‘ga zelf naar digid.nl’.",
      "Het domein is niet digid.nl.",
      "Druk van enkele uren.",
      "Vraag om een code door te sturen naar een beller.",
      "Taal of opmaak wijkt af van eerdere echte berichten.",
    ],
    actions: [
      "Typ zelf digid.nl en controleer daar of er een melding is.",
      "Deel nooit een DigiD-code met iemand aan de telefoon.",
      "Wijzig je wachtwoord als je op een verkeerde pagina hebt ingelogd en meld het bij DigiD.",
    ],
  },
  {
    slug: "digid-code-doorgeven",
    title: "Waarom je een DigiD-code nooit doorgeeft",
    excerpt:
      "Een sms-code van DigiD is alleen voor de pagina die jij zelf hebt geopend. Een beller die de code ‘nodig heeft’, is niet van DigiD.",
    categorySlug: "digid-nabootsing",
    intro:
      "De controlecode of sms-code bewijst dat jij op dat moment inlogt. Wie die code krijgt terwijl jij niet zelf op digid.nl zit, kan in jouw naam verder. Fraudeurs bellen daarom net nadat ze een phishingpagina hebben laten zien, of doen alsof ze een storing oplossen.",
    works: [
      "Je wordt gebeld terwijl je een code op je telefoon ziet.",
      "De beller zegt dat hij de code nodig heeft om een hack te stoppen.",
      "Of een website vraagt de code terwijl het domein niet digid.nl is.",
      "Daarna worden gegevens of aanvragen gewijzigd.",
    ],
    flags: [
      "Iemand vraagt de code hardop of in een chat.",
      "Het verhaal gaat over blokkade, toeslagen of een boete.",
      "Je hebt de inlog niet zelf gestart.",
      "De beller wil dat je op een link klikt tijdens het gesprek.",
      "Geheimhouding tegenover de Belastingdienst of gemeente.",
    ],
    actions: [
      "Gebruik de code alleen op de site die je zelf hebt geopend en gecontroleerd.",
      "Hang op als iemand de code wil horen.",
      "Zet extra beveiliging aan in DigiD en controleer je berichtenbox.",
    ],
  },
  {
    slug: "belastingdienst-teruggave",
    title: "Nepberichten over belastingteruggave",
    excerpt:
      "Een onverwachte teruggave met een betaallink is geen bericht van de Belastingdienst. Controleer in je eigen portaal.",
    categorySlug: "belastingdienst-phishing",
    intro:
      "Berichten over geld terug lokken sneller een klik dan een boete. Fraudeurs sturen een mail of sms namens de Belastingdienst met een bedrag en een link. De echte status van een teruggave zie je alleen nadat je zelf inlogt.",
    works: [
      "Het bericht noemt een concreet bedrag en een deadline.",
      "De link vraagt om DigiD, bankgegevens of een rekeningnummer ‘voor uitbetaling’.",
      "Soms moet je eerst een klein bedrag betalen om de teruggave vrij te geven.",
      "Je gegevens worden later voor andere fraude gebruikt.",
    ],
    flags: [
      "Uitbetaling via een link in mail of sms.",
      "Een domein dat niet belastingdienst.nl is.",
      "Vraag om kaartgegevens voor een teruggave.",
      "Het bedrag staat niet in Mijn Belastingdienst als je zelf inlogt.",
      "Bijlagen met macro’s of een QR-code naar een onbekende site.",
    ],
    actions: [
      "Log zelf in via belastingdienst.nl.",
      "Betaal niets om geld te ontvangen.",
      "Meld de phishing bij de Belastingdienst en Fraudehelpdesk.",
    ],
  },
  {
    slug: "belastingdienst-beslag",
    title: "Dreiging met beslag, schuld of invordering",
    excerpt:
      "Echte invordering loopt via officiële kanalen, niet via een betaallink in een sms. Bel zelf als je twijfelt over een schuld.",
    categorySlug: "belastingdienst-phishing",
    intro:
      "Angst voor beslag of een deurwaarder wordt misbruikt om je dezelfde dag te laten betalen. Het bericht ziet er formeel uit, met kenmerk en logo, maar de betaalroute is een nagemaakte pagina of een rekening van een particulier.",
    works: [
      "Je krijgt een mail, sms of brief over een openstaande schuld.",
      "Er staat een korte betaaltermijn en een link of QR-code.",
      "Als je belt naar het nummer in het bericht, bevestigt een medewerker het verhaal.",
      "De betaling verdwijnt en de ‘schuld’ blijft bestaan of was nooit echt.",
    ],
    flags: [
      "Betalen alleen via de link, niet via je eigen portaal.",
      "Het rekeningnummer staat niet op naam van de Belastingdienst.",
      "Het telefoonnummer in de brief wijkt af van het nummer op de officiële site.",
      "Druk om vandaag te betalen zonder dat je een schuld herkent.",
      "Verzoek om DigiD-codes aan de telefoon.",
    ],
    actions: [
      "Controleer schulden alleen na zelf inloggen.",
      "Bel het nummer dat je op belastingdienst.nl vindt, niet het nummer in het bericht.",
      "Bewaar het bericht als bewijs en meld het.",
    ],
  },
  {
    slug: "nepboete-cjib",
    title: "Valse CJIB- en verkeersboetes",
    excerpt:
      "Een echte boete kun je terugvinden via de officiële route. Een sms met betaallink namens CJIB is vrijwel altijd fraude.",
    categorySlug: "nepboetes",
    intro:
      "Nepboetes spelen in op een herkenbare angst: te hard gereden, niet betaald parkeren, een openstaande zaak. Het bericht linkt naar een pagina die op CJIB of MijnOverheid lijkt en vraagt om directe betaling.",
    works: [
      "Sms of mail met een bedrag en een korte betaaltermijn.",
      "De link opent een formulier voor iDEAL of kaartgegevens.",
      "Het kenmerk is verzonnen of hoort bij iemand anders.",
      "Na betaling volgt soms een tweede ‘administratiekosten’-verzoek.",
    ],
    flags: [
      "Betalen via een link in een sms.",
      "Het domein is niet cjib.nl of een officiële overheidsdomein.",
      "Geen beschikking die je zelf kunt opzoeken.",
      "Het bedrag of de datum klopt niet met iets wat je hebt meegemaakt.",
      "QR-code op een brief die je niet verwachtte.",
    ],
    actions: [
      "Zoek zelf de officiële site en log in om openstaande zaken te zien.",
      "Betaal niet via de link.",
      "Meld het bericht bij CJIB en Fraudehelpdesk.",
    ],
  },
  {
    slug: "nepboete-parkeer",
    title: "Parkeerboetes en naheffingen via een link",
    excerpt:
      "Gemeenten en exploitanten innen niet via een willekeurige sms-link. Controleer het kenmerk in het kanaal dat jij zelf opzoekt.",
    categorySlug: "nepboetes",
    intro:
      "Naast CJIB duiken nepheffingen op van parkeergarages, milieuzones en ‘gemeentelijke incasso’. De pagina’s zijn snel nagemaakt. Het doel is je betaalgegevens, niet het innen van een echte boete.",
    works: [
      "Je ontvangt een bericht kort nadat je in een stad bent geweest, of willekeurig.",
      "Een foto van een kenteken kan echt of gestolen zijn.",
      "De betaalpagina vraagt kaartgegevens in plaats van een gewone overboeking met bekend kenmerk.",
      "Het geld gaat niet naar de gemeente.",
    ],
    flags: [
      "Alleen een link, geen brief die je kunt vergelijken.",
      "Onbekend domein.",
      "Druk van 24 uur.",
      "Vraag om in te loggen bij je bank op die site.",
      "Het kenteken of de locatie klopt niet.",
    ],
    actions: [
      "Zoek de gemeente of exploitant zelf op en gebruik hun betaalpagina.",
      "Vergelijk het zaaknummer.",
      "Meld de sms als het kenmerk nergens terugkomt.",
    ],
  },
  {
    slug: "pakket-postnl-sms",
    title: "Nep-sms van PostNL, DHL en DPD",
    excerpt:
      "Een klein bedrag voor een bezorging is een veelgebruikte phishingtruc. Plan je pakket alleen in de officiële app.",
    categorySlug: "nep-pakketdiensten",
    intro:
      "Pakket-sms’jes werken omdat bijna iedereen wel eens een levering verwacht. Het bericht zegt dat het adres ontbreekt of dat er invoerrechten openstaan. De link kost ogenschijnlijk €1 tot €3, maar vraagt vooral je betaal- of inloggegevens.",
    works: [
      "Sms met een trackingsnummer en een link.",
      "De pagina lijkt op de vervoerder en vraagt een kleine betaling.",
      "Je vult kaart- of bankgegevens in.",
      "Er volgen meer afschrijvingen of een phishingoproep.",
    ],
    flags: [
      "Je hebt geen pakket verwacht, of de afzender klopt niet.",
      "Het domein is niet dat van de vervoerder.",
      "Een verkorte of internationale link.",
      "Spelfouten in de merknaam.",
      "De tracking werkt niet in de officiële app.",
    ],
    actions: [
      "Open de app van de vervoerder of typ het adres zelf.",
      "Betaal geen ‘vrijgavekosten’ via een sms-link.",
      "Meld de sms bij de vervoerder.",
    ],
  },
  {
    slug: "pakket-douane",
    title: "Valse douanekosten en invoerrechten",
    excerpt:
      "Echte invoerkosten horen bij een zending die je kunt terugvinden. Een losse betaallink namens de douane is een rode vlag.",
    categorySlug: "nep-pakketdiensten",
    intro:
      "Bij internationale pakketten bestaan echte invoerkosten. Fraudeurs kopiëren die situatie: een bericht namens douane, PostNL of een vervoerder vraagt om directe betaling, anders gaat het pakket retour of wordt het vernietigd.",
    works: [
      "Het bericht noemt een zending, soms met een echte naam uit een datalek.",
      "De link of QR-code opent een betaalpagina.",
      "Het bedrag is klein genoeg om niet lang na te denken.",
      "Navraag bij de officiële tracking levert niets op.",
    ],
    flags: [
      "Geen zending in je eigen account bij de vervoerder.",
      "Betalen aan een particulier of via een vreemd domein.",
      "Dreiging dat het pakket vandaag wordt vernietigd.",
      "Bijlage of QR-code in een onverwachte mail.",
      "Het afzenderadres gebruikt een gratis mailbox.",
    ],
    actions: [
      "Controleer tracking alleen via de site die je zelf bezoekt.",
      "Betaal invoerkosten alleen vanuit die officiële flow.",
      "Meld het bericht als er geen zending bestaat.",
    ],
  },
  {
    slug: "tikkie-bekende",
    title: "Een Tikkie dat van een bekende lijkt te komen",
    excerpt:
      "Een betaalverzoek in een chat kan echt ogen en toch naar een fraudeur gaan. Bel de persoon via het oude nummer voordat je betaalt.",
    categorySlug: "tikkie-fraude",
    intro:
      "Tikkie-fraude misbruikt vertrouwen in een naam. Het verzoek komt in een bestaande chat, van een nieuw nummer dat zich voordoet als die persoon, of via een link die op een betaalverzoek lijkt maar je bankgegevens wil.",
    works: [
      "Je krijgt een betaalverzoek voor een klein, geloofwaardig bedrag.",
      "De tekst verwijst naar een etentje, cadeau of ‘even voorschieten’.",
      "De link opent geen normaal verzoek maar een pagina die om inloggen vraagt.",
      "Of het geld gaat naar een rekening die niet van je kennis is.",
    ],
    flags: [
      "Een nieuw nummer dat vraagt het oude te negeren.",
      "Druk en een verhaal waarom bellen nu niet kan.",
      "De naam in de betaalomgeving wijkt af.",
      "De link lijkt niet op het domein van de betaaldienst.",
      "Kort daarna volgt een tweede, hoger verzoek.",
    ],
    actions: [
      "Bel of app de persoon via het nummer dat je al had, niet via het nieuwe.",
      "Betaal niet als de ontvanger in je bankapp niet klopt.",
      "Meld een vals verzoek in de app van de betaaldienst.",
    ],
  },
  {
    slug: "tikkie-betaalpagina",
    title: "Nep-iDEAL- en Tikkiepagina’s",
    excerpt:
      "Een echte iDEAL-betaling laat je in je eigen bankapp tekenen. Een site die om gebruikersnaam én pincode vraagt is geen iDEAL.",
    categorySlug: "tikkie-fraude",
    intro:
      "Sommige ‘Tikkies’ zijn helemaal geen betaalverzoek maar een nagemaakte pagina. Het doel is je banklogin. De pagina toont logo’s van banken en vraagt meer gegevens dan een normale betaling.",
    works: [
      "Je klikt op een link uit sms, mail of chat.",
      "Je kiest je bank en krijgt een formulier op diezelfde site.",
      "Er wordt gevraagd om gebruikersnaam, wachtwoord en een code.",
      "De fraudeur gebruikt de sessie om geld over te maken.",
    ],
    flags: [
      "Je verlaat je bankapp niet, maar vult alles in op een website.",
      "Pincode of wachtwoord wordt gevraagd.",
      "Het domein is onbekend.",
      "De pagina heeft spelfouten of een mengeling van merken.",
      "Een code moet je terugsturen naar de afzender.",
    ],
    actions: [
      "Stop als een website om je pincode vraagt.",
      "Controleer afschrijvingen in de echte app.",
      "Bel de bank als je gegevens hebt ingevuld.",
    ],
  },
  {
    slug: "whatsapp-nieuw-nummer",
    title: "Hulp, ik heb een nieuw nummer: familie-fraude",
    excerpt:
      "Een appje van een kind, ouder of vriend met een nieuw nummer is een klassieke truc. Bel het oude nummer voordat je geld stuurt.",
    categorySlug: "familie-en-vrienden-in-noodfraude",
    intro:
      "Familie- en vriendenfraude (ook wel hulpvraagfraude) begint met een kort bericht: telefoon kapot, nieuw nummer, kun je even helpen. Daarna volgt een betaalverzoek. De stijl lijkt soms verrassend veel op die van je bekende, omdat het eerste bericht expres vaag is.",
    works: [
      "Een onbekend nummer stelt zich voor als familie of vriend.",
      "Er is een reden waarom bellen of videobellen niet kan.",
      "Het gevraagde bedrag begint klein of is juist urgent (boete, ziekenhuis, slotenmaker).",
      "Na betaling volgt een tweede verzoek of is het nummer weg.",
    ],
    flags: [
      "Het oude nummer reageert niet in het verhaal, of je wordt gevraagd dat nummer niet te gebruiken.",
      "Geen spraakbericht of videogesprek.",
      "Spelfouten of een toon die nét anders is.",
      "Geheimhouding: ‘zeg nog niks tegen papa’.",
      "Betaling naar een naam die je niet kent.",
    ],
    actions: [
      "Bel het nummer dat je al in je contacten hebt.",
      "Spreek een controlezin af met familie voor dit soort berichten.",
      "Betaal niet tot je de persoon echt hebt gesproken.",
    ],
  },
  {
    slug: "kind-in-nood",
    title: "Kind, ouder of partner in nood",
    excerpt:
      "Verhalen over een ongeval, vastzitten in het buitenland of een openstaande boete zijn gemaakt om je snel te laten betalen.",
    categorySlug: "familie-en-vrienden-in-noodfraude",
    intro:
      "De noodvariant is emotioneler: iemand zou in het ziekenhuis liggen, vastzitten in het buitenland of een boete moeten betalen vóór de politie ingrijpt. Juist dan is zelf bellen naar het bekende nummer de stap die fraudeurs proberen te blokkeren.",
    works: [
      "Het bericht schetst een noodgeval en een kort tijdsvenster.",
      "Een ‘advocaat’, ‘arts’ of ‘politieagent’ neemt het gesprek over.",
      "Geld moet naar een rekening op een andere naam.",
      "Je wordt gevraagd het niet te verifiëren om de persoon niet in gevaar te brengen.",
    ],
    flags: [
      "Een tussenpersoon die je niet kent.",
      "Geen videobewijs terwijl dat wel zou kunnen.",
      "Het verhaal verandert als je doorvraagt.",
      "Betaling in crypto, cadeaukaarten of via een geldezel.",
      "Het bekende nummer van je familielid is ‘zoek’.",
    ],
    actions: [
      "Bel het oude nummer en een tweede familielid.",
      "Neem geen instructies aan van een onbekende tussenpersoon.",
      "Meld het nummer als het verhaal niet klopt.",
    ],
  },
  {
    slug: "whatsapp-code-stelen",
    title: "WhatsApp-code onderscheppen",
    excerpt:
      "Een verificatiecode van WhatsApp is de sleutel van je account. Stuur die code nooit door, ook niet naar een ‘bekende’.",
    categorySlug: "accountovername",
    intro:
      "Accountovername van WhatsApp begint vaak met de vraag om een zescijferige code door te sturen. Met die code zetten criminelen jouw account op hun telefoon en appen ze je contacten om geld te vragen.",
    works: [
      "Iemand vraagt de code ‘om te bevestigen dat je echt bent’ of omdat een bericht vastloopt.",
      "Jij ontvangt een echte code van WhatsApp en stuurt die door.",
      "Je wordt uitgelogd en het account appt je contacten.",
      "Vrienden maken geld over voordat jij weer toegang hebt.",
    ],
    flags: [
      "Elke vraag om een WhatsApp-code.",
      "Een bericht vanaf een nieuw nummer dat om de code vraagt.",
      "Druk en een technisch klinkend excuus.",
      "Kort daarna kun je zelf niet meer inloggen.",
      "Contacten melden een vreemd betaalverzoek van jou.",
    ],
    actions: [
      "Stuur de code naar niemand.",
      "Zet tweestapsverificatie aan in WhatsApp.",
      "Waarschuw contacten via een ander kanaal als je account weg is en volg het herstel in de app.",
    ],
  },
  {
    slug: "instagram-facebook-overname",
    title: "Overgenomen Instagram- en Facebook-accounts",
    excerpt:
      "Vreemde linkjes in je dm’s na een ‘verificatie’ betekenen vaak dat je account is gekaapt. Herstel via de officiële route.",
    categorySlug: "accountovername",
    intro:
      "Bij Instagram en Facebook lokken fraudeurs met nep-support, een ‘copyrightclaim’ of een kennis die een link stuurt. Na de klik of het invullen van een code plaatsen ze spam, vragen ze vrienden om geld of adverteren ze met nepshops.",
    works: [
      "Een bericht zegt dat je pagina wordt verwijderd tenzij je een link opent.",
      "Je logt in op een neppagina of geeft een code door.",
      "Het account plaatst verhalen of dm’s die jij niet hebt gemaakt.",
      "Vrienden worden gevraagd te investeren of een kaart te kopen.",
    ],
    flags: [
      "Support via een dm of een gmail-adres.",
      "Een link buiten de officiële app-instellingen.",
      "Vraag om een inlogcode.",
      "Je e-mailadres of telefoonnummer van het account wordt gewijzigd.",
      "Vrienden krijgen ineens verkoopberichten.",
    ],
    actions: [
      "Herstel het account via de officiële hulppagina’s, niet via een dm.",
      "Controleer e-mail, telefoonnummer en ingelogde sessies.",
      "Waarschuw vrienden dat het account niet betrouwbaar was.",
    ],
  },
  {
    slug: "marktplaats-vooruitbetalen",
    title: "Vooruitbetalen op Marktplaats",
    excerpt:
      "Wie betaalt voordat het product er is, draagt het risico. Gebruik een betaalmethode met kopersbescherming of haal het zelf op.",
    categorySlug: "marktplaats-oplichting",
    intro:
      "Aankopen op Marktplaats gaat vaak goed, maar fraudeurs rekenen op haast en een scherpe prijs. Ze kopiëren een advertentie, vragen directe betaling en leveren niets. Een echte verkoper kan meestal ophalen, gelijk oversteken of een beschermde betaalmethode gebruiken.",
    works: [
      "De prijs ligt ruim onder vergelijkbare advertenties.",
      "Verzenden kan alleen na vooruitbetaling naar een particulier.",
      "Na betaling is het account weg of komt er een excuus over extra kosten.",
      "Foto’s staan ook bij andere advertenties of op een webshop.",
    ],
    flags: [
      "Geen ophalen mogelijk en geen betaling via een beschermde optie.",
      "Druk: ‘iemand anders wil hem ook’.",
      "Het rekeningnummer wisselt.",
      "De chat wil meteen naar WhatsApp.",
      "Het profiel is nieuw en heeft geen afgeronde transacties.",
    ],
    actions: [
      "Haal het product op of betaal op een manier waarbij je niet alles vooraf kwijt bent.",
      "Zoek de foto’s omgekeerd.",
      "Meld de advertentie bij het platform als de verkoper druk zet.",
    ],
  },
  {
    slug: "marktplaats-kopie-advertentie",
    title: "Gekopieerde Marktplaats-advertenties",
    excerpt:
      "Fraudeurs kopiëren foto’s en tekst van een echte zoekertje. Als dezelfde foto’s op meerdere plekken staan, stop en verifieer de verkoper.",
    categorySlug: "marktplaats-oplichting",
    intro:
      "Een gekopieerde advertentie is moeilijk te herkennen als je alleen de tekst leest. De foto’s, de prijs en het verhaal kloppen omdat ze van een echte aanbieder komen. Het verschil zit in het account, het rekeningnummer en de onwil om te laten ophalen.",
    works: [
      "Foto’s en tekst worden overgenomen van een betrouwbare advertentie.",
      "De prijs wordt iets lager gezet om snel een betaler te vinden.",
      "Contact verloopt buiten het platform.",
      "Meerdere slachtoffers betalen dezelfde ‘verkoper’.",
    ],
    flags: [
      "Dezelfde foto’s bij een andere prijs of plaats.",
      "Een verkoper die in korte tijd veel verschillende dure spullen aanbiedt.",
      "Weigering van videobellen met het product in beeld.",
      "Betaling op naam van iemand die niet in de advertentie staat.",
      "Taalfouten die niet bij de verder nette advertentietekst passen.",
    ],
    actions: [
      "Zoek een opvallende zin of foto online.",
      "Vraag een foto met een briefje van vandaag en je naam.",
      "Betaal pas als partij, product en rekening bij elkaar horen.",
    ],
  },
  {
    slug: "verkoper-betaallink",
    title: "Verkoopfraude: de koper stuurt een betaallink",
    excerpt:
      "Een koper die jou laat ‘ontvangen’ via een link, wil vaak je betaalgegevens. Geld ontvangen doe je niet via een inlogpagina.",
    categorySlug: "verkoopfraude",
    intro:
      "Bij verkoopfraude is het slachtoffer de verkoper. De ‘koper’ stuurt een link om de betaling te ontvangen, een verzendlabel te betalen of een rekening te verifiëren. Achter de link zit phishing of een verhaal waarbij jij eerst geld overmaakt.",
    works: [
      "Iemand wil je product kopen en zegt dat het geld klaarstaat.",
      "Je moet op een link klikken om de betaling vrij te geven.",
      "De pagina vraagt om bankgegevens of een ‘te veel betaald’ bedrag terug te storten.",
      "Het echte geld is nooit aangekomen of de eerste betaling wordt teruggedraaid.",
    ],
    flags: [
      "Een koper die per se buiten het platform betaalt.",
      "Een link om geld te ontvangen.",
      "Verzoek om een deel terug te storten.",
      "Druk omdat een koerier al onderweg is.",
      "De naam van de betaler wijkt af en dat wordt weggeredeneerd.",
    ],
    actions: [
      "Verstuur het product pas als het geld onherroepelijk op jouw rekening staat.",
      "Klik niet op links van kopers om ‘te ontvangen’.",
      "Betaal nooit iets terug naar een andere rekening dan de oorspronkelijke.",
    ],
  },
  {
    slug: "verkoper-verzendservice",
    title: "Nep-koerier en verzendlabel voor verkopers",
    excerpt:
      "Een koper die een eigen koerier of duur label oplegt, probeert vaak extra kosten bij jou te innen. Blijf bij normale verzending.",
    categorySlug: "verkoopfraude",
    intro:
      "Een bekende variant: de koper betaalt ogenschijnlijk te veel, inclusief een verzekerde koerier, en jij moet het verschil of het label voorgeschoten. De koerier bestaat niet of de link is phishing. Jij raakt product en geld kwijt.",
    works: [
      "De koper stuurt een bewijs van betaling dat je niet in je eigen bankapp ziet.",
      "Een mail namens een vervoerder vraagt jou het label te activeren met een betaling.",
      "Een koerier zou het product vandaag ophalen.",
      "Na jouw betaling verdwijnt de koper.",
    ],
    flags: [
      "Betalingsbewijs als screenshot in plaats van bijschrijving.",
      "Een vervoerder die jij niet hebt gekozen.",
      "Jij moet betalen om geld te ontvangen.",
      "Het ophaalmoment is dezelfde dag.",
      "Contact alleen via e-mail, niet via het platform.",
    ],
    actions: [
      "Verzend alleen nadat het afgesproken bedrag echt is bijgeschreven.",
      "Kies zelf een normale verzendmethode.",
      "Meld het account als de koper een link stuurt.",
    ],
  },
  {
    slug: "crypto-nepbroker",
    title: "Nepbrokers en beleggingsapps",
    excerpt:
      "Een app die je winst laat zien maar geen opname toestaat, is geen broker. Ga na of het bedrijf een vergunning heeft.",
    categorySlug: "crypto-beleggingsfraude",
    intro:
      "Crypto-beleggingsfraude belooft rendement via een app of website die er professioneel uitziet. Storten lukt altijd. Opnemen lukt pas na extra ‘belasting’, ‘verificatie’ of een hogere inleg — en daarna nog steeds niet.",
    works: [
      "Een adviseur of advertentie lokt je naar een platform.",
      "Kleine winst wordt zichtbaar om vertrouwen te winnen.",
      "Bij opname volgt een nieuwe kostenpost.",
      "De coach verdwijnt zodra je stopt met storten.",
    ],
    flags: [
      "Gegarandeerd rendement.",
      "Geen vergunning die je zelf bij de toezichthouder kunt vinden.",
      "Druk om meer in te leggen om te mogen opnemen.",
      "Contact alleen via WhatsApp of Telegram.",
      "Het domein is jong en lijkt op een bekende broker.",
    ],
    actions: [
      "Zoek het bedrijf en de vergunning zelf op, los van de app.",
      "Stort niet bij als opnemen niet lukt.",
      "Bewaar chats en transacties en meld de site.",
    ],
  },
  {
    slug: "crypto-opname-geblokkeerd",
    title: "Opname geblokkeerd tot je extra betaalt",
    excerpt:
      "Belasting of een fee vooraf betalen om je eigen inleg vrij te krijgen is een tweede ronde van dezelfde fraude.",
    categorySlug: "crypto-beleggingsfraude",
    intro:
      "Als een platform je opname blokkeert en om extra geld vraagt, is dat geen normale compliance. Fraudeurs stapelen kosten tot de slachtoffers stoppen. Extra betalen maakt het verlies groter.",
    works: [
      "Je ziet een saldo dat je niet kunt opnemen.",
      "Een medewerker noemt belasting, AML-check of een foutieve wallet.",
      "Elke betaling opent een nieuwe eis.",
      "Het dashboard verdwijnt of je account wordt gesloten.",
    ],
    flags: [
      "Je moet betalen om je eigen geld te krijgen.",
      "De uitleg verandert per dag.",
      "Alleen crypto of een overschrijving naar een persoon.",
      "Geen officieel schrijven van een toezichthouder die je zelf kunt verifiëren.",
      "Dreiging dat het saldo anders vervalt.",
    ],
    actions: [
      "Betaal geen extra ‘vrijgavekosten’.",
      "Documenteer saldo, chats en transactiehashes.",
      "Meld het platform bij Fraudehelpdesk en de politie.",
    ],
  },
  {
    slug: "chatgroep-whatsapp-tips",
    title: "WhatsApp-groepen met beleggingstips",
    excerpt:
      "Een groep vol screenshots van winst en een coach die je privé benadert is een verkoopmachine, geen adviesclub.",
    categorySlug: "chatgroepfraude",
    intro:
      "Chatgroepfraude zet je in een groep met ‘andere beleggers’. Veel van die accounts zijn nep of medeplichtig. De coach bouwt FOMO en stuurt je daarna naar een platform dat hij zelf beheert.",
    works: [
      "Je wordt toegevoegd of krijgt een uitnodiging van een onbekende.",
      "De groep toont dagelijks winstscreenshots.",
      "Kritische vragen worden verwijderd.",
      "Privégesprekken pushen een specifiek platform of munt.",
    ],
    flags: [
      "Je kent niemand in de groep echt.",
      "Iedereen is het eens met de coach.",
      "Rendementen zijn elke dag positief.",
      "Je moet snel storten omdat de ‘ronde’ sluit.",
      "De coach heeft geen controleerbare vergunning.",
    ],
    actions: [
      "Verlaat groepen die je niet zelf hebt gezocht.",
      "Deel geen wallet of kopie van je identiteitsbewijs.",
      "Meld de groep bij het chatplatform.",
    ],
  },
  {
    slug: "chatgroep-telegram",
    title: "Telegram-signalen en copytrading",
    excerpt:
      "Signalengroepen en copytrading-bots beloven mee te liften op een expert. Vaak is de expert de tegenpartij.",
    categorySlug: "chatgroepfraude",
    intro:
      "Op Telegram circuleren groepen die trades ‘kopiëren’. Je koppelt een account of stort op een platform van de beheerder. De signalen zijn achteraf gekozen of de winst bestaat alleen in de app.",
    works: [
      "Een kanaal toont oude succesvolle trades.",
      "Je moet een account openen via hun link.",
      "Copytrading of een bot vraagt toegang tot je wallet.",
      "Opnemen of loskoppelen lukt niet zonder extra storting.",
    ],
    flags: [
      "Alleen winst, nooit een verliespost.",
      "Een verwijzingslink die de groep geld oplevert.",
      "Druk en besloten ‘VIP’-kanalen.",
      "Vraag om je seed phrase of remote access.",
      "Geen bedrijf dat je onafhankelijk kunt controleren.",
    ],
    actions: [
      "Geef nooit je seed phrase of private key.",
      "Open geen account via een link uit een ongevraagde groep.",
      "Meld het kanaal en bewaar de uitnodiging als bewijs.",
    ],
  },
  {
    slug: "pump-dump-hype",
    title: "Pump-and-dump: hype rond een kleine munt",
    excerpt:
      "Een munt die ‘nu moet’ omdat een groep hem oppompt, stort daarna in. De vroege verkopers zijn vaak de bedenkers.",
    categorySlug: "pump-and-dump",
    intro:
      "Bij een pump-and-dump wordt een illiquide munt aangeprezen tot de prijs stijgt. Wie vroeg inkocht verkoopt aan nieuwkomers. Daarna zakt de prijs en blijft de rest met verlies zitten.",
    works: [
      "Een groep kondigt een exact koopmoment aan.",
      "Sociale media vullen zich met dezelfde slogans.",
      "De prijs stijgt kort en hevig.",
      "Grote verkopen volgen en de chat wordt stil of gemodereerd.",
    ],
    flags: [
      "Geheim tijdstip en verbod om buiten de groep te praten.",
      "Een munt met weinig historie en een anonieme uitgever.",
      "Beloftes van vermenigvuldiging binnen uren.",
      "Influencers die niet duidelijk maken dat ze betaald worden.",
      "Je moet via een specifiek platform kopen.",
    ],
    actions: [
      "Wantrouw elke oproep om tegelijk te kopen.",
      "Koop niets omdat een groep aftelt.",
      "Meld gecoördineerde oplichting als er ook een nepplatform aan vastzit.",
    ],
  },
  {
    slug: "pump-dump-influencers",
    title: "Betaalde influencers en ‘geheime’ munten",
    excerpt:
      "Een beroemdheid of nepaccount dat een munt aanbeveelt, is geen analyse. Kijk wie er verkoopt als jij koopt.",
    categorySlug: "pump-and-dump",
    intro:
      "Fraudeurs misbruiken bekende gezichten, soms met deepfakes, om een munt of platform aan te prijzen. De video oogt echt, de munt is dat niet. Tegen de tijd dat je koopt, zijn de organisatoren aan het verkopen.",
    works: [
      "Een video of live noemt een munt en een tijdsvenster.",
      "De commentaren zijn eensluidend positief.",
      "De link gaat naar een specifieke exchange of wallet.",
      "De video verdwijnt zodra de prijs zakt.",
    ],
    flags: [
      "Het account is nieuw of de video wijkt af van eerdere content.",
      "Geen risico-uitleg, alleen urgentiem.",
      "Een munt waarvan de meeste tokens bij één partij liggen.",
      "Deepfake-signalen of een stem die nét anders is.",
      "Je kunt de aanbeveling niet terugvinden op het echte, geverifieerde account.",
    ],
    actions: [
      "Controleer het echte account van de persoon buiten de video om.",
      "Investeer niet op basis van een aftellink.",
      "Meld de video bij het platform.",
    ],
  },
  {
    slug: "recovery-crypto",
    title: "Nep-recovery na cryptofraude",
    excerpt:
      "Wie belooft gestolen crypto terug te halen tegen vooruitbetaling, is meestal de volgende fraudeur — soms dezelfde.",
    categorySlug: "recovery-scams",
    intro:
      "Na een verlies duikt ‘hulp’ op: een bureau, advocaat of hacker die je geld kan terughalen. Ze kennen details van de eerdere fraude, omdat ze meelazen of dezelfde lijst slachtoffers gebruiken. De vooruitbetaling is het verdienmodel.",
    works: [
      "Je wordt benaderd kort nadat je verlies hebt gemeld of in een groep hebt gedeeld.",
      "Het bureau toont nepkeurmerken en succesverhalen.",
      "Je moet kosten, belasting of een wallet-fee vooraf betalen.",
      "Er komt geen geld terug, wel een nieuwe factuur.",
    ],
    flags: [
      "Gegarandeerd terughalen.",
      "Vooruitbetaling in crypto.",
      "Druk om vandaag te tekenen.",
      "Geen advocatenkantoor dat je in een register vindt.",
      "Ze vragen om remote access tot je computer.",
    ],
    actions: [
      "Betaal niemand die ongevraagd herstel belooft.",
      "Meld de oorspronkelijke fraude bij politie en Fraudehelpdesk.",
      "Bewaar de nieuwe benadering als onderdeel van dezelfde zaak.",
    ],
  },
  {
    slug: "recovery-advocaat",
    title: "Valse advocaten en chargeback-bureaus",
    excerpt:
      "Een kantoor dat alleen via WhatsApp werkt en meteen een voorschot wil, is geen normale juridische hulp.",
    categorySlug: "recovery-scams",
    intro:
      "Sommige recovery-scams verkleden zich als advocatenkantoor of chargeback-specialist. Ze citeren wetten en noemen banken, maar staan niet in het advocatenregister en vragen geld vóór ze iets doen.",
    works: [
      "Een site of profiel biedt juridische bijstand na oplichting.",
      "Je moet een intake-fee of dossierkosten betalen.",
      "Documenten zien er formeel uit maar kloppen niet met een bestaand kantoor.",
      "Na betaling wordt het contact trager en volgen nieuwe kosten.",
    ],
    flags: [
      "Geen inschrijving die je zelf kunt controleren.",
      "Contact alleen via chat.",
      "Voorschot naar een buitenlandse rekening of crypto.",
      "Belofte van een vast percentage dat ‘zeker’ terugkomt.",
      "Ze ontmoedigen aangifte.",
    ],
    actions: [
      "Zoek de advocaat of het kantoor in het officiële register.",
      "Betaal geen voorschot aan een partij die jou ongevraagd benadert.",
      "Doe zelf aangifte en lever bewijs aan je bank.",
    ],
  },
  {
    slug: "vacature-thuiswerk",
    title: "Nep-thuiswerk en taakfraude",
    excerpt:
      "Werk waarbij je eerst moet storten om taken te krijgen, is geen baan. Een werkgever betaalt jou, niet andersom.",
    categorySlug: "valse-vacatures",
    intro:
      "Thuiswerkfraude laat je kleine taken doen in een app, met een saldo dat groeit. Om uit te laten betalen moet je eerst zelf storten, of een ‘set’ afronden met eigen geld. Het saldo is een getal op hun server.",
    works: [
      "Een recruiter appt je over eenvoudig werk met hoog loon.",
      "Je krijgt taken en ziet commissie.",
      "Uitbetaling lukt alleen na een extra storting of als je een fout herstelt met eigen geld.",
      "Het account wordt geblokkeerd zodra je weigert.",
    ],
    flags: [
      "Aangenomen zonder gesprek.",
      "Werken in een willekeurige app of Telegram-bot.",
      "Jij moet betalen om loon te ontvangen.",
      "Het bedrijfsdomein bestaat niet of is dagen oud.",
      "Collega’s in een groep juichen elke storting toe.",
    ],
    actions: [
      "Betaal nooit om te mogen werken of uitbetaald te krijgen.",
      "Zoek het bedrijf en bel een zelf gevonden nummer.",
      "Meld de vacature bij het platform waar je bent benaderd.",
    ],
  },
  {
    slug: "vacature-geldezel",
    title: "Geldezel worden via een vacature",
    excerpt:
      "Een baan waarbij je geld op je rekening ontvangt en doorstort, maakt je strafbaar. Dat is geen administratief baantje.",
    categorySlug: "valse-vacatures",
    intro:
      "Sommige ‘finance’ of ‘logistiek’ vacatures vragen je om betalingen te ontvangen en door te zetten, of pakketten door te sturen. Je rekening of adres wordt dan gebruikt om fraudegeld wit te wassen. ‘Ik wist het niet’ beschermt je niet automatisch.",
    works: [
      "De baan vraagt weinig ervaring en betaalt opvallend goed.",
      "Je moet je bankrekening of ID beschikbaar stellen.",
      "Geld van onbekenden komt binnen en moet dezelfde dag weg.",
      "De opdrachtgever blijft anoniem of wisselt van verhaal.",
    ],
    flags: [
      "Doorstorten als hoofdtaak.",
      "Gebruik van je privé-rekening voor derden.",
      "Pakketten ontvangen voor iemand die je nooit hebt ontmoet.",
      "Verbod om de bank te vertellen waar het geld vandaan komt.",
      "Betaling van jouw ‘loon’ uit hetzelfde doorstroomgeld.",
    ],
    actions: [
      "Ga niet akkoord en stort niets door.",
      "Bel je bank als er al vreemd geld is binnengekomen.",
      "Meld het bij de politie als je rekening is misbruikt.",
    ],
  },
  {
    slug: "verhuur-kamer-borg",
    title: "Verhuurfraude: kamer of woning met borg vooraf",
    excerpt:
      "Betaal geen borg of eerste huur voordat je binnen bent geweest en weet wie de verhuurder is. Te goedkope kamers in krappe steden zijn een klassieke lokker.",
    categorySlug: "verhuurfraude",
    intro:
      "Verhuurfraude speelt in op woningnood. Een kamer of appartement staat online met goede foto’s en een lage huur. De verhuurder zit in het buitenland, de sleutel volgt na betaling, en daarna is iedereen onbereikbaar. De foto’s zijn vaak van een echte woning die niet te huur is.",
    works: [
      "De advertentie staat op een bekende site, Facebook of Marktplaats.",
      "Bezichtiging kan niet, wel een ‘gereserveerde’ sleutel na overschrijving.",
      "Borg, administratiekosten en eerste maand moeten vooraf naar een particulier.",
      "Meerdere mensen betalen voor hetzelfde adres.",
    ],
    flags: [
      "Huur ver onder de markt en enorme haast.",
      "Geen bezichtiging of alleen een rijkelijk bewerkte video.",
      "De naam op het contract, de advertentie en de rekening komen niet overeen.",
      "Betaling naar het buitenland of een pas geopende rekening.",
      "Vraag om een kopie van je volledige ID vóór elke verificatie.",
    ],
    actions: [
      "Ga naar het adres en spreek bewoner, eigenaar of beheerder voordat je betaalt.",
      "Zoek de foto’s: staan ze bij een andere verhuurder of een verkoopadvertentie?",
      "Betaal geen borg om ‘de woning vast te houden’ zonder sleutel en contract met de juiste partij.",
    ],
    reportNote:
      "Meld de advertentie bij het verhuurplatform en Fraudehelpdesk. Bij betaling of misbruik van je identiteitsbewijs kun je via politie.nl bekijken hoe je aangifte doet.",
  },
  {
    slug: "verhuur-vakantiehuis",
    title: "Vakantiewoning en korte verhuur die niet bestaat",
    excerpt:
      "Een vakantiehuis buiten het bekende platform, met betaling per overschrijving, is een veelvoorkomende verhuurfraude. Betaal via het platform of niet.",
    categorySlug: "verhuurfraude",
    intro:
      "Naast woonruimte wordt verhuurfraude gebruikt voor vakantiehuizen, B&B’s en ‘last minute’ appartementen. De listing is gekopieerd van een echt verblijf. De verhuurder wil van het platform af omdat dat ‘te veel commissie’ rekent — en daarmee verdwijnt ook jouw bescherming.",
    works: [
      "Je vindt een woning op sociale media of een site die op een bekend platform lijkt.",
      "De host stuurt je naar e-mail of WhatsApp voor een lagere prijs.",
      "Je betaalt de hele periode vooraf.",
      "Bij aankomst bestaat de boeking niet of staat er iemand anders.",
    ],
    flags: [
      "Korting als je buiten het platform betaalt.",
      "Een domein dat één letter afwijkt van een bekend verhuurplatform.",
      "Geen mogelijkheid om de verhuurder te identificeren.",
      "De woning staat ook te koop of is van een andere verhuurder.",
      "Betaling naar een privépersoon in een ander land dan het huis.",
    ],
    actions: [
      "Boek en betaal binnen het platform waar de woning echt wordt aangeboden.",
      "Zoek het adres en de foto’s los van de chat.",
      "Trap niet in een lagere prijs die alle bescherming schrapt.",
    ],
  },
  {
    slug: "verhuur-sleutel-contract",
    title: "Sleutel, contract en verhuurder controleren",
    excerpt:
      "Een nette huurovereenkomst kan gekopieerd zijn. Controleer of de ondertekenaar de woning mag verhuren voordat je tekent.",
    categorySlug: "verhuurfraude",
    intro:
      "Sommige verhuurfraudeurs sturen een professioneel contract en zelfs een nep-ID. Dat voelt geruststellend, maar papier is geen bewijs van eigendom of verhuurbevoegdheid. De veiligste volgorde is: eerst zien, dan identificeren, dan pas betalen.",
    works: [
      "Je ontvangt een contract dat om persoonlijke gegevens en een aanbetaling vraagt.",
      "Een scan van een identiteitsbewijs moet vertrouwen wekken.",
      "De sleuteloverdracht wordt uitgesteld tot na betaling.",
      "Achteraf blijkt de ondertekenaar de woning niet te verhuren.",
    ],
    flags: [
      "Namen in contract, advertentie en betaalverzoek wijken af.",
      "Geen bezichtiging met de persoon die tekent.",
      "Druk om vandaag te tekenen omdat er andere kandidaten zijn.",
      "Het ID-bewijs oogt bewerkt of hoort bij een andere naam dan het rekeningnummer.",
      "Je moet het volledige document ongemaskeerd terugsturen.",
    ],
    actions: [
      "Bezoek de woning en controleer wie de sleutel heeft.",
      "Vergelijk gegevens en betaal alleen aan de partij die aantoonbaar mag verhuren.",
      "Maskeer BSN en documentnummer als een kopie echt nodig is, en alleen nadat de verhuurder klopt.",
    ],
  },
  {
    slug: "klus-slotenmaker",
    title: "Malafide slotenmakers",
    excerpt:
      "Een slotenmaker die via een advertentie bovenaan Google komt, kan een woekerprijs rekenen. Vraag vooraf een totaalprijs en zoek het bedrijf zelf.",
    categorySlug: "klusfraude",
    intro:
      "Wie buitengesloten staat, zoekt snel. Malafide slotenmakers kopen advertenties met lokale plaatsnamen, noemen een laag starttarief en rekenen ter plaatse honderden euro’s extra. De factuur komt vaak van een andere bedrijfsnaam dan de advertentie.",
    works: [
      "De advertentie belooft een lokale monteur binnen dertig minuten.",
      "Aan de telefoon blijft de totaalprijs vaag.",
      "Op locatie wordt het slot ‘vervangen’ terwijl openen genoeg was.",
      "Betaling wordt direct en contant of per pin geëist.",
    ],
    flags: [
      "Geen vaste prijs vooraf op schrift.",
      "Het bedrijfsadres is niet lokaal of bestaat niet.",
      "De monteur heeft geen herkenbare bus of bedrijfsnaam.",
      "De factuur noemt een ander bedrijf dan de site.",
      "Intimidatie als je de rekening betwist.",
    ],
    actions: [
      "Zoek een slotenmaker via een bron die je zelf vertrouwt en vraag een totaalprijs inclusief voorrijden.",
      "Laat niets vervangen zonder prijsopgave.",
      "Betaal niet contant onder druk; noteer kenteken en namen.",
    ],
  },
  {
    slug: "klus-lekkage",
    title: "Spoedklussen bij lekkage en verstopping",
    excerpt:
      "Bij lekkage of een verstopping wordt tijdsdruk misbruikt. Spreek werkzaamheden en prijs af vóór de monteur begint.",
    categorySlug: "klusfraude",
    intro:
      "Naast sloten gebeurt klusfraude bij ontstopping, lekkage en elektra. Een tussenwebsite stuurt een onbekende uitvoerder. Achteraf blijkt het starttarief alleen de aanrijtijd te zijn en volgt een rekening die niet in verhouding staat tot het werk.",
    works: [
      "Je belt een nummer uit een advertentie die lokaal oogt.",
      "De monteur begint meteen, zonder offerte.",
      "Er worden extra werkzaamheden ‘ontdekt’.",
      "De factuur is contant en veel hoger dan aangekondigd.",
    ],
    flags: [
      "Geen schriftelijke prijs afgesproken.",
      "Het bedrijf is niet vindbaar op het genoemde adres.",
      "Werkzaamheden die je niet hebt gevraagd.",
      "Druk om meteen te tekenen of te pinnen.",
      "Geen specificatie van uren en materiaal.",
    ],
    actions: [
      "Vraag vooraf een richtprijs en laat die bevestigen per bericht.",
      "Stop het werk als de prijs tijdens de klus explodeert.",
      "Bewaar foto’s en de factuur en meld misleiding bij Fraudehelpdesk.",
    ],
  },
  {
    slug: "thuisbatterij-subsidie",
    title: "Thuisbatterij en isolatie met valse subsidie",
    excerpt:
      "Een beller die een gegarandeerde subsidie en enorme besparing belooft, verkoopt vaak een duur contract. Controleer de regeling bij de officiële instantie.",
    categorySlug: "thuisbatterij-fraude",
    intro:
      "Telefonische verkoop van thuisbatterijen, isolatie of zonnepanelen gebruikt klimaatsubsidies als lokmiddel. De beloofde tegemoetkoming bestaat niet of niet voor dit product, en het contract is duur of gekoppeld aan een lening.",
    works: [
      "Een beller zegt dat je bent ‘geselecteerd’ voor een buurtactie.",
      "De subsidie zou alleen deze week gelden.",
      "Een verkoper komt langs en laat je digitaal tekenen.",
      "Achteraf blijken rente, annuleringskosten of een andere productomschrijving.",
    ],
    flags: [
      "Gegarandeerde subsidie die je niet op een overheidswebsite vindt.",
      "Tijdsdruk en een eenmalige prijs.",
      "Tekenen op een tablet zonder bedenktijd.",
      "Het bedrijf is niet helder over wie levert en wie financiert.",
      "Besparingscijfers zonder onderbouwing van jouw situatie.",
    ],
    actions: [
      "Zoek de subsidieregeling zelf op bij de officiële instantie.",
      "Teken niet tijdens het eerste bezoek.",
      "Gebruik bedenktijd en laat een krediet toetsen voordat je akkoord gaat.",
    ],
  },
  {
    slug: "thuisbatterij-deur",
    title: "Verkopers aan de deur en telefonische energiecontracten",
    excerpt:
      "Ongevraagde verkopers van energieproducten horen je niet onder druk te zetten. Vraag alles op papier en vergelijk zelf.",
    categorySlug: "thuisbatterij-fraude",
    intro:
      "Aan de deur of telefoon worden batterijen, ketels en contracten verkocht met een verhaal over netcongestie of een bijna aflopende regeling. Het doel is een handtekening voordat je kunt vergelijken.",
    works: [
      "De verkoper zegt samen te werken met de netbeheerder of gemeente.",
      "Je krijgt een voordeel dat vandaag verloopt.",
      "De offerte is summier en de kleine lettertjes staan elders.",
      "Annuleren blijkt duur of onmogelijk.",
    ],
    flags: [
      "Geen tijd om de offerte te laten liggen.",
      "Samenwerking met een overheidsinstantie die je niet kunt bevestigen.",
      "Vage bedrijfsgegevens.",
      "Een lening die als ‘gespreide betaling zonder kosten’ wordt verkocht.",
      "Druk op oudere bewoners of mensen die het aanbod niet hebben gevraagd.",
    ],
    actions: [
      "Stuur de verkoper weg als je geen tijd wilt nemen om te vergelijken.",
      "Controleer het bedrijf en de netbeheerder apart.",
      "Meld misleidende verkoop bij de toezichthouder en Fraudehelpdesk.",
    ],
  },
  {
    slug: "dating-geldvragen",
    title: "Datingfraude en romance scams",
    excerpt:
      "Iemand die snel verklaart verliefd te zijn en daarna geld nodig heeft voor een noodgeval, is bezig met een romance scam.",
    categorySlug: "datingfraude",
    intro:
      "Datingfraude bouwt wekenlang vertrouwen op via een datingapp of sociale media. De persoon kan niet videobellen, zit in het buitenland of heeft een noodgeval. Daarna volgen verzoeken om geld, cadeaukaarten of hulp bij een ‘investering’.",
    works: [
      "Het profiel is aantrekkelijk en de gesprekken worden snel persoonlijk.",
      "Videobellen lukt steeds niet door een technisch excuus.",
      "Er komt een verhaal over ziekte, een vastzittend pakket of een vliegticket.",
      "Elke betaling lost het probleem net niet op.",
    ],
    flags: [
      "Geen live video, of een video die niet op de persoon lijkt te reageren.",
      "Verklaringen van liefde terwijl je elkaar nooit hebt ontmoet.",
      "Geld naar een derde persoon of in crypto.",
      "Het verhaal verhuist van datingapp naar een privéchat.",
      "Vrienden of familie worden als ‘jaloers’ weggezet.",
    ],
    actions: [
      "Stuur geen geld naar iemand die je alleen online kent.",
      "Zoek de foto’s omgekeerd.",
      "Bespreek het met iemand die je vertrouwt als je al emotioneel betrokken bent.",
    ],
  },
  {
    slug: "dating-crypto",
    title: "Van datinggesprek naar beleggingsfraude",
    excerpt:
      "Een date die je leert beleggen en je naar een specifiek platform stuurt, mengt romance scam met investeringsfraude.",
    categorySlug: "datingfraude",
    intro:
      "Een groeiende variant begint als romantiek en eindigt als beleggingsfraude. De persoon deelt ‘winst’ en helpt je een account openen. Het platform is van de fraudeur. Opnemen kan pas nadat je meer inlegt.",
    works: [
      "Na vertrouwen volgt een tip over crypto of forex.",
      "Je opent een account via hun link.",
      "Eerste bedragen lijken te groeien.",
      "Opname wordt geblokkeerd en de date dringt aan om bij te storten.",
    ],
    flags: [
      "De date praat vooral over rendement.",
      "Alleen dat ene platform is ‘veilig’.",
      "Je mag er met niemand over praten.",
      "Geen videobewijs van een echt persoon achter de winst.",
      "Extra kosten om op te nemen.",
    ],
    actions: [
      "Open geen beleggingsaccount via iemand van een datingapp.",
      "Stop met storten als opnemen niet lukt.",
      "Meld zowel het profiel als het platform.",
    ],
  },
  {
    slug: "sextortion-webcam",
    title: "Sextortion na een webcamgesprek",
    excerpt:
      "Een onbekende die na een chat met beelden dreigt, wil geld. Betaal niet en blokkeer. Betalen stopt de dreiging meestal niet.",
    categorySlug: "sextortion",
    intro:
      "Sextortion begint vaak met een flirt op sociale media of een datingapp. Na een webcamgesprek of het delen van beelden volgt een dreigement: betalen, anders gaan de beelden naar je contacten. Soms zijn de beelden gestolen of door AI gemaakt en heeft er nooit een echt gesprek plaatsgevonden.",
    works: [
      "Het gesprek wordt snel seksueel en dringt aan op beelden.",
      "Daarna volgt een lijst met je volgers of een screenshot van een contact.",
      "Er wordt een bedrag in crypto of cadeaukaarten geëist.",
      "Na betaling komt een hoger bedrag.",
    ],
    flags: [
      "Een profiel dat binnen minuten naar naaktbeelden stuurt.",
      "Dreiging én een betaalverzoek in één bericht.",
      "Crypto, cadeaukaarten of een buitenlandse rekening.",
      "De beelden kunnen niet van jou zijn, of juist net wel.",
      "Tijdsdruk van een uur.",
    ],
    actions: [
      "Betaal niet en blokkeer het account.",
      "Bewaar bewijs en meld het bij het platform en de politie.",
      "Vertel het iemand die je vertrouwt; schaamte is precies het wapen van de afperser.",
    ],
  },
  {
    slug: "sextortion-ai",
    title: "Afpersing met AI-beelden",
    excerpt:
      "Een foto van je gezicht kan worden misbruikt voor een nepbeeld. Betaal niet en meld de dreiging, ook als het beeld niet echt is.",
    categorySlug: "sextortion",
    intro:
      "Fraudeurs hebben niet altijd echte beelden nodig. Met een profielfoto maken ze een expliciet nepbeeld en dreigen dat te verspreiden. Het voelt echt omdat je gezicht herkenbaar is. Het verdienmodel blijft hetzelfde: snel betalen onder druk.",
    works: [
      "Je ontvangt een bericht met een beeld en een lijst contacten.",
      "Het beeld is nieuw voor je of duidelijk gemanipuleerd.",
      "Er volgt een betaallink of walletadres.",
      "Bij negeren komen vaak meerdere berichten, daarna stilte.",
    ],
    flags: [
      "Een afzender die je niet kent.",
      "Crypto of cadeaukaarten.",
      "Een deadline van enkele uren.",
      "Geen bewijs dat het beeld al is verstuurd.",
      "Taal die naar veel mensen tegelijk lijkt gestuurd.",
    ],
    actions: [
      "Betaal niet.",
      "Meld het account en bewaar de berichten.",
      "Zet extra privacy op je profiel en waarschuw zo nodig mensen in je omgeving zonder de beelden te verspreiden.",
    ],
  },
  {
    slug: "afpersmail-webcam",
    title: "Afpersmail: ‘ik heb je webcam gefilmd’",
    excerpt:
      "Een mail die een oud wachtwoord noemt en met een webcamopname dreigt, is massale afpersing. Betaal niet en wijzig het gelekte wachtwoord.",
    categorySlug: "afpersmail",
    intro:
      "Afpersmails worden in grote aantallen verstuurd. Ze noemen soms een echt, oud wachtwoord uit een datalek om geloofwaardig te zijn. De webcamopname bestaat niet. Het doel is dat je in paniek crypto betaalt.",
    works: [
      "De mail zegt dat malware je camera en microfoon heeft gebruikt.",
      "Een oud wachtwoord wordt genoemd als ‘bewijs’.",
      "Je moet binnen een termijn naar een wallet betalen.",
      "Er volgt zelden een echte publicatie; wel soms een herinnering.",
    ],
    flags: [
      "Een algemeen verhaal zonder specifieke beelden.",
      "Betaling in crypto.",
      "Het wachtwoord is oud of hoort bij een gelekt account.",
      "De mail zit in de spam of komt van een vreemd adres.",
      "Geen bewijs dat er contacten zijn benaderd.",
    ],
    actions: [
      "Betaal niet en klik niet op links.",
      "Wijzig het genoemde wachtwoord overal waar je het nog gebruikt.",
      "Meld de mail als phishing; aangifte kan via politie.nl als je dat wilt vastleggen.",
    ],
  },
  {
    slug: "afpersmail-wachtwoord",
    title: "Een gelekt wachtwoord in een dreigmail",
    excerpt:
      "Een wachtwoord in een dreigmail komt meestal uit een oud datalek, niet uit je webcam. Vervang het wachtwoord en zet tweestapsverificatie aan.",
    categorySlug: "afpersmail",
    intro:
      "Omdat het wachtwoord klopt, denken mensen dat de rest van de mail ook klopt. Dat is precies de truc. Datalekken bevatten miljoenen oude wachtwoorden. De afzender heeft geen video, alleen een lijst.",
    works: [
      "De mail toont een wachtwoord in platte tekst.",
      "Daarna volgt een dreigement en een walletadres.",
      "Soms wordt een bedrag genoemd dat ‘al onderweg is’ als afleiding.",
      "Wie betaalt, komt op een lijst voor een tweede vraag.",
    ],
    flags: [
      "Geen unieke opname, alleen een wachtwoord.",
      "Hetzelfde verhaal circuleert bij veel mensen.",
      "Crypto als enige betaalwijze.",
      "Een afzender die je niet kunt koppelen aan een echt onderzoek.",
      "Taal die is vertaald en algemeen blijft.",
    ],
    actions: [
      "Vervang het wachtwoord en gebruik overal unieke wachtwoorden.",
      "Zet tweestapsverificatie aan op e-mail en belangrijke accounts.",
      "Betaal de afperser niet.",
    ],
  },
];

export const articles: KennisbankArticle[] = extras.map((item) => ({
  slug: item.slug,
  title: item.title,
  excerpt: item.excerpt,
  categorySlug: item.categorySlug,
  content: scamContent({
    intro: item.intro,
    works: item.works,
    flags: item.flags,
    actions: item.actions,
    reportNote: item.reportNote,
  }),
}));
