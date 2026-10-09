import type { KennisbankArticle } from "../types";
import { trustContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "score-uitleg",
    title: "Hoe de All Scams Trust Score werkt",
    excerpt:
      "De score begint bij 50, verwerkt positieve en negatieve signalen en past harde risicoplafonds toe. Lees wat het getal wel en niet betekent.",
    categorySlug: "score-uitleg",
    content: trustContent({
      intro:
        "De Trust Score vat meerdere technische en door mensen beoordeelde signalen samen in één getal. Het doel is snel zichtbaar maken waarom extra voorzichtigheid nodig kan zijn, zonder een domein automatisch veilig of frauduleus te verklaren.",
      explanation: [
        "Elke controle begint bij 50; gewogen positieve en negatieve delta’s verhogen of verlagen die tussenstand.",
        "De uitkomst wordt begrensd op 1 tot en met 99, zodat geen absolute zekerheid van 0 of 100 wordt gesuggereerd.",
        "Harde plafonds overschrijven een hogere tussenstand bij zwaar risico: blocklist maximaal 8, sterke nabootsing maximaal 20 en middelsterke nabootsing maximaal 55.",
        "Ook gelden plafonds van maximaal 20 bij vier of meer meldingen, 35 bij twee of meer meldingen, 30 bij een niet-geregistreerd domein en 60 bij een leeftijd van maximaal 30 dagen.",
        "De detailweergave laat zien welke signalen beschikbaar waren en welke bijdrage of begrenzing zij veroorzaakten.",
      ],
      cautions: [
        "Een score wordt zonder de onderliggende signalen als definitief veiligheidsoordeel gelezen.",
        "Een zwaar plafond wordt genegeerd omdat andere onderdelen er professioneel uitzien.",
        "Een recente score wordt gebruikt voor een andere subdomain, URL of inmiddels gewijzigde website.",
      ],
      actions: [
        "Controleer of je exact het bedoelde domein hebt ingevoerd en niet alleen een merknaam of zichtbare linktekst.",
        "Bekijk welke delta’s en plafonds zijn toegepast en welke bronnen geen resultaat leverden.",
        "Combineer de uitkomst met controle van aanbieder, betaalwijze, contactgegevens en aanleiding van het bezoek.",
      ],
    }),
  },
  {
    slug: "dns-en-email",
    title: "DNS en e-mailbeveiliging in de Trust Score",
    excerpt:
      "DNS laat zien of een domein technisch bestaat en waar diensten zijn ingericht. MX, SPF en DMARC geven context over e-mail, geen garantie.",
    categorySlug: "dns-en-email",
    content: trustContent({
      intro:
        "DNS vertaalt een domeinnaam naar technische bestemmingen en publiceert instellingen voor onder meer e-mail. All Scams gebruikt publieke DNS-antwoorden om bereikbaarheid en basisinrichting te beoordelen.",
      explanation: [
        "Reguliere DNS-resolutie wordt geraadpleegd via Cloudflare 1.1.1.1 en Google 8.8.8.8.",
        "Adresrecords laten zien of het domein naar een server verwijst; MX-records tonen of ontvangst van e-mail is ingericht.",
        "SPF beschrijft welke verzenders namens een domein mogen mailen en DMARC geeft ontvangers beleid voor authenticatiefouten.",
        "Ontbrekende e-mailrecords kunnen relevant zijn als een site intensief e-mail beweert te gebruiken, maar zijn niet zelfstandig bewijs van fraude.",
        "DNS kan snel veranderen en sommige legitieme domeinen gebruiken externe providers of bewust geen e-mail.",
      ],
      cautions: [
        "Een domein ontvangt betalingen of gegevens terwijl DNS onstabiel, afwezig of pas recent ingericht lijkt.",
        "E-mail beweert van een organisatie te komen, maar authenticatie en zichtbaar afzenderdomein sluiten niet aan.",
        "Een technisch correct SPF- of DMARC-record wordt voorgesteld als bewijs dat de afzender eerlijk is.",
      ],
      actions: [
        "Vergelijk het domein in het afzenderadres met het domein van de officiële organisatie.",
        "Controleer of antwoorden van verschillende publieke resolvers logisch overeenkomen.",
        "Behandel DNS- en e-mailinstellingen als context en controleer daarnaast inhoud, identiteit en betaalverzoek.",
      ],
    }),
  },
  {
    slug: "tls-certificaat",
    title: "Wat een TLS-certificaat wel en niet bewijst",
    excerpt:
      "TLS versleutelt de verbinding en een handshake controleert de certificaatketen. Encryptie is geen bewijs dat de website betrouwbaar is.",
    categorySlug: "tls-certificaat",
    content: trustContent({
      intro:
        "Een TLS-certificaat maakt een versleutelde HTTPS-verbinding mogelijk. All Scams voert een TLS-handshake uit en beoordeelt onder meer geldigheid en certificaatketen, maar koppelt encryptie nooit gelijk aan betrouwbaarheid.",
      explanation: [
        "De handshake controleert of de server een certificaat aanbiedt voor de bezochte hostnaam.",
        "De geldigheidsperiode en keten naar een vertrouwde certificaatautoriteit geven aan of de technische authenticatie slaagt.",
        "Een geldig certificaat voorkomt dat een willekeurige tussenpartij de verbinding eenvoudig meeleest, maar controleert niet of de verkoper levert.",
        "Ook phishing- en nepwebshops kunnen snel gratis geldige certificaten krijgen.",
        "Een fout kan ontstaan door verkeerde serverconfiguratie, verlopen certificaat, ontbrekende tussenketen of onderschepping.",
      ],
      cautions: [
        "Het slotje of HTTPS wordt als keurmerk of bewijs van een eerlijke onderneming gepresenteerd.",
        "De certificaathostnaam past niet bij het geopende domein of de browser toont een waarschuwing.",
        "Een site vraagt gevoelige gegevens terwijl de TLS-handshake faalt of terugvalt naar een onveilige route.",
      ],
      actions: [
        "Ga niet voorbij aan certificaatwaarschuwingen bij betalingen, DigiD, bankzaken of persoonsgegevens.",
        "Controleer de exacte domeinnaam naast de versleuteling; een veilig slotje op een verkeerd domein blijft gevaarlijk.",
        "Onderzoek bij een fout of je klok, netwerk of URL klopt en probeer niet blind meerdere varianten.",
      ],
    }),
  },
  {
    slug: "domeinleeftijd",
    title: "Domeinleeftijd als risicosignaal",
    excerpt:
      "Een zeer jong domein krijgt extra aandacht, maar ouderdom alleen bewijst niets. All Scams gebruikt RDAP en WHOIS waar beschikbaar.",
    categorySlug: "domeinleeftijd",
    content: trustContent({
      intro:
        "Domeinleeftijd helpt beoordelen of een websitehistorie past bij het verhaal. Een winkel die zegt al jaren te bestaan maar vorige week is geregistreerd, verdient extra controle.",
      explanation: [
        "Registratiedatums worden waar mogelijk opgehaald via RDAP en WHOIS-gegevens.",
        "Een domein van maximaal 30 dagen oud kan in de methode nooit hoger scoren dan 60.",
        "Jonge domeinen zijn niet automatisch kwaadwillend: een nieuwe onderneming, campagne of migratie kan legitiem zijn.",
        "Oude domeinen zijn niet automatisch veilig, omdat ze kunnen verlopen, worden verkocht of gehackt.",
        "Niet elke registry publiceert dezelfde velden en privacybescherming kan houdergegevens afschermen.",
      ],
      cautions: [
        "De website claimt een lange bedrijfsgeschiedenis die strijdig is met de registratiedatum.",
        "Een pas geregistreerd domein combineert hoge korting, tijdsdruk en vooruitbetaling.",
        "Een oude domeinnaam wordt als enige bewijs van betrouwbaarheid gebruikt terwijl inhoud of eigenaar recent veranderde.",
      ],
      actions: [
        "Vergelijk registratiedatum met bedrijfsclaims, eerste onafhankelijke vermeldingen en handelsgegevens.",
        "Controleer jonge domeinen extra op nabootsing, betaalontvanger, contactadres en retourvoorwaarden.",
        "Bekijk ouderdom samen met actuele DNS-, HTTP-, TLS-, meldings- en blocklistsignalen.",
      ],
    }),
  },
  {
    slug: "https-en-redirects",
    title: "HTTPS, bereikbaarheid en redirects controleren",
    excerpt:
      "Een URL kan je via meerdere stappen naar een ander domein sturen. All Scams volgt HTTP(S)-gedrag om de echte bestemming zichtbaar te maken.",
    categorySlug: "https-en-redirects",
    content: trustContent({
      intro:
        "Websites gebruiken HTTP en HTTPS om pagina’s aan te bieden en bezoekers soms door te sturen. Redirects zijn normaal, maar kunnen ook een betrouwbare beginlink gebruiken om de uiteindelijke bestemming te verbergen.",
      explanation: [
        "All Scams vraagt HTTP(S)-informatie op en bekijkt of de host bereikbaar is en welke omleidingen volgen.",
        "Een overstap van http naar https is gebruikelijk; een overstap naar een onverwacht ander hoofddomein vraagt uitleg.",
        "Campagne-, betaal- en inlogdiensten kunnen legitiem externe domeinen gebruiken, maar moeten controleerbaar bij de organisatie horen.",
        "Bereikbaarheid kan tijdelijk verschillen door storing, regioblokkade, botbescherming of configuratiefout.",
        "Een HTTPS-eindpunt versleutelt verkeer maar zegt niet dat de bestemming eerlijk is.",
      ],
      cautions: [
        "Een merklink eindigt na redirects op een verkeerd gespeld of onbekend hoofddomein.",
        "De keten wisselt onnodig tussen veel domeinen of leidt alleen bepaalde apparaten door.",
        "Gevoelige invoer verschijnt na een onverklaarde omleiding naar een externe pagina.",
      ],
      actions: [
        "Bekijk de uiteindelijke adresbalk voordat je inlogt of betaalt en controleer het hoofddomein.",
        "Open bij twijfel zelf de officiële app of website in plaats van de redirectketen te volgen.",
        "Behandel een niet-bereikbare controle als onbekend, niet als bewijs dat een site veilig of frauduleus is.",
      ],
    }),
  },
  {
    slug: "nabootsing",
    title: "Merk- en overheidsnabootsing in domeinnamen",
    excerpt:
      "Typosquats en lookalikes misbruiken vertrouwde namen. All Scams vergelijkt domeinen met een register van ongeveer 67 merken en diensten.",
    categorySlug: "nabootsing",
    content: trustContent({
      intro:
        "Nabootsing ontstaat wanneer een domein visueel of taalkundig op een bekende bank, webshop, pakketdienst of overheid lijkt. All Scams vergelijkt namen met een beheerd merkregister van ongeveer 67 merken en diensten.",
      explanation: [
        "De analyse kijkt naar typefouten, extra woorden, streepjes, verwisselde tekens en merktermen op een vreemd hoofddomein.",
        "Sterke nabootsing veroorzaakt een hard scoreplafond van maximaal 20.",
        "Middelsterke nabootsing veroorzaakt een hard scoreplafond van maximaal 55.",
        "Een merknaam in een subdomein is niet doorslaggevend: bij bank.voorbeeld.nl is voorbeeld.nl het registreerbare hoofddomein.",
        "Detectie is ondersteunend; geautoriseerde partners, fanpagina’s en beschrijvende vermeldingen kunnen nadere interpretatie vragen.",
      ],
      cautions: [
        "Een bekend merk staat vóór het echte hoofddomein, bijvoorbeeld in een subdomein of pad.",
        "Letters zijn weggelaten, verdubbeld of vervangen door cijfers en gelijkende tekens.",
        "Woorden als veilig, verificatie, login, betaling of klantenservice worden aan een merknaam toegevoegd.",
      ],
      actions: [
        "Lees de domeinnaam van rechts naar links vanaf de extensie om het echte hoofddomein te bepalen.",
        "Vergelijk hem letter voor letter met een adres dat je via de officiële app of eigen zoekactie vindt.",
        "Meld gemiste of onterechte nabootsingssignalen met context zodat het merkregister kan worden onderhouden.",
      ],
    }),
  },
  {
    slug: "community-meldingen",
    title: "Communitymeldingen en hun invloed op de score",
    excerpt:
      "Gemodereerde meldingen geven praktijkcontext. Twee of meer meldingen begrenzen de score op 35 en vier of meer op 20.",
    categorySlug: "community-meldingen",
    content: trustContent({
      intro:
        "Technische controles zien niet of een verkoper na betaling verdwijnt. Daarom gebruikt All Scams gemodereerde communitymeldingen als apart signaal, met aandacht voor kwaliteit en samenhang.",
      explanation: [
        "Meldingen worden gemodereerd voordat ze als relevant scoresignaal meetellen.",
        "Twee of meer meegetelde meldingen geven een hard plafond van maximaal 35.",
        "Vier of meer meegetelde meldingen geven een hard plafond van maximaal 20.",
        "Een melding bevat idealiter datum, werkwijze, kanaal en controleerbare kenmerken zonder onnodige persoonsgegevens.",
        "Aantal meldingen is geen slachtofferstatistiek en bewijst niet zelfstandig een strafbaar feit.",
      ],
      cautions: [
        "Meerdere meldingen beschrijven hetzelfde patroon, betaalmiddel of contactkanaal.",
        "Een website ziet technisch normaal uit maar recente ervaringen noemen niet-levering of identiteitsmisbruik.",
        "Anonieme beschuldigingen zonder concrete context worden als definitief oordeel verspreid.",
      ],
      actions: [
        "Lees de inhoud, actualiteit en overeenkomst tussen meldingen in plaats van alleen het aantal.",
        "Deel bij een eigen melding feiten en bewijskenmerken, maar geen wachtwoorden of volledige identiteitsdocumenten.",
        "Meld een feitelijke fout of mogelijk misbruik van het meldsysteem zodat moderatie kan herbeoordelen.",
      ],
    }),
  },
  {
    slug: "phishing-malwarelijsten",
    title: "Phishing- en malwarelijsten als zwaar signaal",
    excerpt:
      "All Scams vergelijkt signalen van beveiligde DNS en dreigingslijsten. Een blocklisttreffer begrenst de score op maximaal 8.",
    categorySlug: "phishing-malwarelijsten",
    content: trustContent({
      intro:
        "Dreigingslijsten verzamelen domeinen en URL’s die in verband zijn gebracht met phishing, malware of andere schadelijke activiteit. Een concrete treffer weegt zwaar, maar bronnen verschillen in dekking en snelheid.",
      explanation: [
        "Cloudflare Security DNS 1.1.1.2 wordt vergeleken met reguliere DNS-resolutie.",
        "Quad9 9.9.9.9 wordt vergeleken met de ongefilterde resolver 9.9.9.10.",
        "OpenPhish wordt als phishingbron geraadpleegd.",
        "Google Safe Browsing via GOOGLE_SAFE_BROWSING en URLhaus zijn optionele bronnen wanneer zij zijn ingeschakeld.",
        "Een blocklisttreffer legt een hard scoreplafond van maximaal 8 op; een niet-beschikbare bron telt niet als treffer of vrijwaring.",
      ],
      cautions: [
        "Een bron blokkeert het domein terwijl een ongefilterde DNS-resolver het wel oplost.",
        "Een exacte URL staat op een dreigingslijst, ook als de hoofdpagina onschuldig lijkt.",
        "Een net gelanceerde aanval staat nog niet op lijsten en wordt daardoor ten onrechte als veilig beschouwd.",
      ],
      actions: [
        "Open een domein met een blocklisttreffer niet en voer er geen gegevens of betaling in.",
        "Controleer welke bron en welke exacte host of URL de treffer veroorzaakte.",
        "Neem bij vermoedelijke foutpositieven contact op met de betreffende bron en wacht op herbeoordeling.",
      ],
    }),
  },
  {
    slug: "tranco-populariteit",
    title: "Wat Tranco-populariteit over een domein zegt",
    excerpt:
      "Tranco bundelt ranglijsten van veelbezochte domeinen. Populariteit kan context geven, maar is geen keurmerk en afwezigheid is geen bewijs van fraude.",
    categorySlug: "tranco-populariteit",
    content: trustContent({
      intro:
        "All Scams gebruikt Tranco als populariteitssignaal. De lijst helpt onderscheid maken tussen breed bezochte, gevestigde domeinen en domeinen zonder zichtbare positie, maar beoordeelt geen handelspraktijk.",
      explanation: [
        "Tranco combineert bronnen tot een ranglijst die minder afhankelijk is van één meetmethode.",
        "Een positie kan ondersteunende context geven voor een domein dat beweert een groot bekend platform te zijn.",
        "Veel legitieme lokale organisaties, nieuwe bedrijven en gespecialiseerde diensten staan niet in de lijst.",
        "Ook populaire platforms kunnen gehackte pagina’s, misleidende advertenties of frauduleuze gebruikers bevatten.",
        "Populariteit wordt daarom als één delta gebruikt en kan harde risicoplafonds niet opheffen.",
      ],
      cautions: [
        "Een onbekend domein beweert marktleider te zijn maar heeft geen andere controleerbare bekendheid.",
        "Een hoge rangschikking wordt gebruikt om de betrouwbaarheid van een specifieke verkoper of pagina te bewijzen.",
        "Een subdomein of gebruikerspagina leunt op de reputatie van het grote platform terwijl de inhoud door derden wordt geplaatst.",
      ],
      actions: [
        "Gebruik populariteit alleen samen met domeinleeftijd, nabootsing, meldingen en dreigingsbronnen.",
        "Controleer bij platformcontent wie de feitelijke verkoper of afzender is.",
        "Trek uit afwezigheid in Tranco geen conclusie zonder naar schaal, doelgroep en bestaansduur te kijken.",
      ],
    }),
  },
  {
    slug: "domeinregistratie",
    title: "Domeinregistratie via RDAP en WHOIS",
    excerpt:
      "Registratiegegevens tonen onder meer status, registrar en belangrijke datums waar registers die publiceren. Een ongeregistreerd domein scoort maximaal 30.",
    categorySlug: "domeinregistratie",
    content: trustContent({
      intro:
        "RDAP en WHOIS ontsluiten registratiegegevens van domeinnamen. All Scams gebruikt beschikbare antwoorden om te bepalen of een domein geregistreerd lijkt en welke datums en statussen daarbij horen.",
      explanation: [
        "RDAP is een gestructureerde opvolger van veel WHOIS-toepassingen; beschikbaarheid verschilt per extensie en registry.",
        "Velden kunnen registrar, creatiedatum, vervaldatum, nameservers en domeinstatussen bevatten.",
        "Privacydiensten en gegevensbescherming betekenen dat houdernaam en adres vaak niet openbaar zijn.",
        "Een als ongeregistreerd vastgesteld domein krijgt een hard scoreplafond van maximaal 30.",
        "Een time-out of ontbrekende RDAP-bron is niet hetzelfde als vastgesteld ongeregistreerd en telt niet negatief mee.",
      ],
      cautions: [
        "Een link gebruikt een domein dat niet geregistreerd lijkt of dat anders is gespeld dan zichtbaar.",
        "Registratiedatum, registrar of status past niet bij de claims van de website.",
        "Verborgen houdergegevens worden als automatisch bewijs van fraude gezien, terwijl privacybescherming normaal kan zijn.",
      ],
      actions: [
        "Controleer dat de registratie-uitkomst bij exact hetzelfde hoofddomein hoort.",
        "Vergelijk registratiegegevens met KvK- en contactinformatie zonder te verwachten dat alle eigenaargegevens openbaar zijn.",
        "Probeer bij bronuitval later opnieuw en behandel de huidige registratie-uitkomst als onbekend.",
      ],
    }),
  },
  {
    slug: "domeinextensie",
    title: "Domeinextensie als beperkt risicosignaal",
    excerpt:
      "Een extensie zoals .nl, .com of een nieuw alternatief zegt weinig op zichzelf. Context en combinatie met andere signalen zijn bepalend.",
    categorySlug: "domeinextensie",
    content: trustContent({
      intro:
        "De domeinextensie, ook topleveldomein of TLD genoemd, is het laatste deel van een domeinnaam. Sommige extensies komen relatief vaak voor in kortlevende campagnes, maar elke extensie kan legitiem of misbruikt zijn.",
      explanation: [
        "All Scams kan de extensie als beperkte delta meenemen wanneer historische risicopatronen daar aanleiding toe geven.",
        "Een .nl-domein bewijst geen Nederlandse eigenaar, KvK-inschrijving of fysieke aanwezigheid.",
        "Een minder bekende extensie bewijst geen fraude; start-ups, campagnes en internationale diensten maken er normaal gebruik van.",
        "Aanvallers kiezen soms een extensie die samen met het woord ervoor visueel op een bekend adres lijkt.",
        "Zwaardere signalen zoals blocklists, nabootsing en meldingen wegen belangrijker en kunnen harde plafonds opleggen.",
      ],
      cautions: [
        "De afzender benadrukt alleen de Nederlandse of professionele uitstraling van de extensie.",
        "Het volledige domein vormt een misleidende merknaam wanneer punt en extensie vluchtig worden gelezen.",
        "Een goedkope, kortlopende domeinregistratie combineert met haast, vooruitbetaling en ontbrekende bedrijfsgegevens.",
      ],
      actions: [
        "Lees altijd de hele domeinnaam en niet alleen de extensie of woorden links daarvan.",
        "Controleer handelsgegevens en fysieke aanwezigheid onafhankelijk van de gekozen TLD.",
        "Gebruik extensie alleen als klein onderdeel van een bredere risicoafweging.",
      ],
    }),
  },
  {
    slug: "domeinnaam-opbouw",
    title: "Verdachte patronen in de opbouw van domeinnamen",
    excerpt:
      "Lengte, veel streepjes en lokwoorden kunnen een domein verdacht maken. Zulke kenmerken zijn ondersteunend en moeten in context worden gelezen.",
    categorySlug: "domeinnaam-opbouw",
    content: trustContent({
      intro:
        "Fraudedomeinen proberen vaak tegelijk herkenbaar en beschikbaar te zijn. Daardoor ontstaan lange combinaties van merknaam, handeling, locatie en woorden als veilig of login.",
      explanation: [
        "De methode kan letten op uitzonderlijke lengte, aantallen streepjes, cijfercombinaties en risicowoorden.",
        "Subdomeinen worden apart gelezen van het registreerbare hoofddomein om misleiding vóór de echte eigenaar te herkennen.",
        "Een lange naam kan legitiem beschrijvend zijn en een korte naam kan nog steeds schadelijk zijn.",
        "URL-paden na de domeinnaam kunnen vertrouwde woorden tonen maar veranderen de eigenaar van het domein niet.",
        "Structuursignalen zijn delta’s en geen zelfstandig juridisch of feitelijk fraudeoordeel.",
      ],
      cautions: [
        "Merk, bank, DigiD of PostNL staat alleen in een subdomein of pad van een onbekend hoofddomein.",
        "Veel woorden als controle, veilig, klant, betaling en verificatie worden gecombineerd.",
        "Tekens, cijfers of streepjes maken een typefout moeilijk zichtbaar op een mobiel scherm.",
      ],
      actions: [
        "Bepaal eerst het hoofddomein en negeer voor die stap paden, parameters en zichtbare linktekst.",
        "Vergelijk verdachte namen letter voor letter met het officieel zelf opgezochte adres.",
        "Laat een professioneel ogende padnaam of subdomain nooit zwaarder wegen dan de werkelijke domeineigenaar.",
      ],
    }),
  },
  {
    slug: "idn-tekens",
    title: "Internationale tekens en IDN-lookalikes",
    excerpt:
      "Unicodeletters kunnen sterk lijken op gewone Latijnse tekens. IDN maakt meertalige domeinen mogelijk, maar kan ook visuele nabootsing verhullen.",
    categorySlug: "idn-tekens",
    content: trustContent({
      intro:
        "Internationalized Domain Names maken domeinen met niet-ASCII-tekens mogelijk. Dat is een legitieme internetfunctie, maar sommige letters uit verschillende schriften lijken bijna identiek en kunnen een merkadres nabootsen.",
      explanation: [
        "Browsers kunnen een internationale naam tonen of de technische punycodevorm die met xn-- begint.",
        "Visueel gelijkende letters kunnen uit Cyrillisch, Grieks of een ander schrift komen en toch naar een ander domein verwijzen.",
        "De analyse bekijkt zulke IDN- en lookalikekenmerken als onderdeel van nabootsing en domeinopbouw.",
        "Niet elke IDN is verdacht: meertalige organisaties en lokale gemeenschappen gebruiken ze legitiem.",
        "Context, merkovereenkomst, registratie en het doel van de pagina bepalen samen het risico.",
      ],
      cautions: [
        "Een domein lijkt exact op een merknaam, maar kopiëren toont xn-- of onverwachte tekens.",
        "Meerdere schriften worden zonder logische taalreden in één naam gecombineerd.",
        "De link komt uit een onverwacht bericht en vraagt direct om bank-, DigiD- of accountinlog.",
      ],
      actions: [
        "Typ het bekende officiële adres zelf of gebruik een eerder opgeslagen bladwijzer.",
        "Inspecteer bij twijfel de volledige URL en punycodeweergave zonder de pagina verder te gebruiken.",
        "Meld overtuigende lookalikes bij de nagebootste organisatie, browserbeveiliging en All Scams.",
      ],
    }),
  },
  {
    slug: "bronnen-en-methode",
    title: "Bronnen, methode en ontbrekende resultaten",
    excerpt:
      "Lees welke openbare en optionele bronnen All Scams raadpleegt, hoe uitval wordt behandeld en waarom de score maximaal zes uur wordt gecachet.",
    categorySlug: "bronnen-en-methode",
    content: trustContent({
      intro:
        "Een reproduceerbare score vereist transparantie over bronnen en beperkingen. All Scams combineert eigen technische controles, publieke diensten, externe lijsten en gemodereerde meldingen.",
      explanation: [
        "DNS gebruikt Cloudflare 1.1.1.1 en Google 8.8.8.8; beveiligingsvergelijkingen gebruiken Cloudflare Security DNS 1.1.1.2 en Quad9 9.9.9.9 tegenover 9.9.9.10.",
        "Dreigingsinformatie omvat OpenPhish en optioneel GOOGLE_SAFE_BROWSING en URLhaus.",
        "Andere signalen komen uit Tranco, TLS-handshakes, RDAP en WHOIS, HTTP(S), een merkregister van ongeveer 67 merken en gemodereerde communitymeldingen.",
        "Geraadpleegd betekent dat een bron antwoord gaf; niet bereikbaar betekent dat geen bruikbaar antwoord kwam; niet ingeschakeld geldt voor een optionele bron die niet actief was.",
        "Niet-beschikbare bronnen tellen niet positief of negatief mee en resultaten worden maximaal zes uur gecachet.",
      ],
      cautions: [
        "Een ontbrekende bron wordt geïnterpreteerd als een schone of veilige uitslag.",
        "Verschillende controlemomenten worden vergeleken zonder rekening te houden met cache, DNS-wijzigingen of bijgewerkte lijsten.",
        "Een totaalscore wordt los van bronstatus, hard plafond en afzonderlijke bevindingen gedeeld.",
      ],
      actions: [
        "Controleer per signaal of de bron werkelijk is geraadpleegd en een inhoudelijke uitslag gaf.",
        "Herhaal een controle na bronuitval of een relevante wijziging, maar verwacht binnen zes uur mogelijk een gecachet resultaat.",
        "Gebruik de score als startpunt voor nader onderzoek en niet als juridisch oordeel of vervanging van professioneel advies.",
      ],
    }),
  },
];
