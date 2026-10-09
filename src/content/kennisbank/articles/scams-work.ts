import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "valse-vacatures",
    title: "Valse vacatures en nep-recruiters herkennen",
    excerpt:
      "Een hoog loon, directe start en contact via WhatsApp kunnen leiden tot betaal- of identiteitsfraude. Een normale sollicitatie vereist geen vooruitbetaling.",
    categorySlug: "valse-vacatures",
    content: scamContent({
      intro:
        "Valse vacatures beloven eenvoudig thuiswerk, flexibel inkomen of een snelle internationale carrière. Het echte doel is geld vragen, persoonsgegevens verzamelen, je rekening als geldezel gebruiken of je onbewust pakketten laten doorsturen.",
      works: [
        "Een recruiter benadert je onverwacht via sms, WhatsApp, sociale media of een gekopieerde vacaturesite.",
        "Na een kort chatgesprek ben je aangenomen zonder degelijk gesprek of controle van ervaring.",
        "Je moet betalen voor training, software, materiaal of een account, of taken uitvoeren waarbij je eerst geld stort.",
        "Een andere variant vraagt vroeg om identiteitsdocumenten, bankgegevens of het ontvangen en doorsturen van geld en goederen.",
      ],
      flags: [
        "Het loon is uitzonderlijk hoog voor simpele taken en de functieomschrijving blijft vaag.",
        "Communicatie loopt alleen via privé-adressen of chat en het bedrijfsdomein klopt niet.",
        "Je moet vóór indiensttreding betalen, crypto kopen of je eigen rekening beschikbaar stellen.",
        "Een kopie van identiteitsbewijs, DigiD-inlog of bankpas wordt gevraagd zonder legitiem proces.",
        "De werkgever is niet te bereiken via onafhankelijk gevonden gegevens en medewerkers kennen de recruiter niet.",
      ],
      actions: [
        "Zoek de vacature op de officiële bedrijfswebsite en bel de organisatie via een zelf gevonden nummer.",
        "Controleer handelsnaam, domein en recruiter, en vraag om schriftelijke functievoorwaarden voordat je gevoelige gegevens deelt.",
        "Gebruik nooit je bankrekening om geld voor een werkgever door te sturen en ontvang geen onbekende pakketten voor doorzending.",
      ],
      reportNote:
        "Meld de vacature bij het platform, het nagebootste bedrijf en Fraudehelpdesk. Meld identiteitsmisbruik, geldezelschap of financieel verlies via politie.nl.",
    }),
  },
  {
    slug: "verhuurfraude",
    title: "Verhuurfraude bij woningen en kamers",
    excerpt:
      "Fraudeurs kopiëren woningadvertenties en vragen borg vóór bezichtiging. Controleer eigenaar, adres en contract voordat je betaalt.",
    categorySlug: "verhuurfraude",
    content: scamContent({
      intro:
        "Bij verhuurfraude wordt een woning, kamer of vakantieverblijf aangeboden door iemand die niet bevoegd is die te verhuren. Woningnood en tijdsdruk worden gebruikt om borg, eerste huur of administratiekosten vooraf te innen.",
      works: [
        "Foto’s en teksten van een echte advertentie worden gekopieerd naar een ander platform.",
        "De zogenaamde verhuurder verblijft in het buitenland of kan om een andere reden niet persoonlijk bezichtigen.",
        "Je moet betalen om de sleutel, bezichtiging of reservering veilig te stellen.",
        "Na betaling komt geen sleutel, blijkt het adres niet beschikbaar of zijn meerdere slachtoffers voor dezelfde woning.",
      ],
      flags: [
        "De huur is opvallend laag voor locatie en kwaliteit en je moet onmiddellijk beslissen.",
        "Bezichtiging, videobelgesprek of ontmoeting met eigenaar of beheerder wordt geweigerd.",
        "Borg en huur moeten vóór bezichtiging naar een buitenlandse of afwijkende rekening.",
        "Het contract bevat andere namen of adressen dan advertentie, identiteitsbewijs en rekeninghouder.",
        "De verhuurder vraagt een kopie van je volledige identiteitsdocument voordat legitimiteit is vastgesteld.",
      ],
      actions: [
        "Bezoek de woning en controleer identiteit en verhuurbevoegdheid voordat je tekent of betaalt.",
        "Zoek adres en foto’s online, raadpleeg waar passend openbare eigendomsinformatie en spreek huidige bewoners of beheerder.",
        "Lees het contract, betaal traceerbaar aan de juiste partij en scherm een noodzakelijke kopie van je identiteitsbewijs af.",
      ],
      reportNote:
        "Meld de advertentie bij het verhuurplatform, Fraudehelpdesk en eventueel de echte eigenaar of makelaar. Doe bij betaling of identiteitsmisbruik aangifte via politie.nl.",
    }),
  },
  {
    slug: "klusfraude",
    title: "Klusfraude en malafide spoeddiensten",
    excerpt:
      "Malafide slotenmakers, ontstoppers en klusbedrijven lokken met lage prijzen en presenteren daarna een woekerfactuur. Spreek prijs en werkzaamheden vooraf schriftelijk af.",
    categorySlug: "klusfraude",
    content: scamContent({
      intro:
        "Klusfraude komt vaak voor wanneer iemand met spoed hulp zoekt voor een slot, lekkage, verstopping, dak of elektriciteit. Een tussenwebsite lijkt lokaal, maar stuurt een onbekende uitvoerder die na beperkt werk een extreem hoge rekening presenteert.",
      works: [
        "Een advertentie bovenaan zoekresultaten gebruikt plaatsnamen en doet alsof het bedrijf dichtbij gevestigd is.",
        "Aan de telefoon wordt een laag starttarief genoemd zonder totaalprijs, materiaal of toeslagen.",
        "Op locatie worden onnodige werkzaamheden uitgevoerd of formulieren onder druk ter ondertekening aangeboden.",
        "Betaling wordt direct geëist via pin, contant of overschrijving, soms met intimidatie.",
      ],
      flags: [
        "Bedrijfsnaam, fysiek adres, KvK-nummer en prijsinformatie zijn niet duidelijk te vinden.",
        "De telefonist weigert een prijsindicatie of noemt alleen voorrijkosten.",
        "De monteur start zonder schriftelijke opdracht en legt achteraf hoge materiaal- en avondtoeslagen op.",
        "Je krijgt geen gespecificeerde factuur of bedrijfsnaam en rekeninghouder verschillen.",
        "Er wordt gedreigd als je de rekening betwist of eerst advies wilt vragen.",
      ],
      actions: [
        "Vraag vooraf schriftelijk om totaalinschatting, uurtarief, voorrijkosten, materiaal, toeslagen en annuleringsvoorwaarden.",
        "Kies indien mogelijk een bedrijf via brancheorganisatie, verhuurder, verzekeraar of aanbeveling die je zelf controleert.",
        "Stop werkzaamheden bij onverwachte prijswijzigingen, teken niet onder druk en bel bij bedreiging de politie.",
      ],
      reportNote:
        "Meld misleiding bij Fraudehelpdesk en waar passend ConsuWijzer. Bewaar offerte en factuur; meld bedreiging of oplichting via politie.nl.",
    }),
  },
  {
    slug: "thuisbatterij-fraude",
    title: "Thuisbatterij-fraude en misleidende energiedeals",
    excerpt:
      "Ongevraagde verkopers gebruiken subsidies, netproblemen en besparingsclaims om dure contracten te sluiten. Controleer bedrijf, rendement en bedenktijd.",
    categorySlug: "thuisbatterij-fraude",
    content: scamContent({
      intro:
        "Bij thuisbatterij-fraude of misleidende verkoop wordt een batterij, isolatie- of energieproduct opgedrongen met onbewezen besparingen en niet-bestaande subsidieclaims. Soms wordt alleen een aanbetaling geïnd; soms ontstaat een duur krediet of ongunstig contract.",
      works: [
        "Een telefonische verkoper zegt namens gemeente, netbeheerder of een collectief te bellen.",
        "Een gratis energiescan verandert in een verkooppresentatie met haast en een exclusieve korting.",
        "Besparing, terugverdientijd en geschiktheid worden rooskleurig voorgesteld zonder verbruiksanalyse.",
        "Je tekent digitaal op een tablet of via sms en ontdekt later financiering, voorwaarden of hoge annuleringskosten.",
      ],
      flags: [
        "Er wordt een algemene of gegarandeerde subsidie beloofd zonder officiële regeling en voorwaarden.",
        "De verkoper claimt samenwerking met overheid of netbeheerder die je niet zelfstandig kunt bevestigen.",
        "Je moet vandaag tekenen omdat prijs, subsidiepot of installatieslot anders vervalt.",
        "Capaciteit, omvormer, garantie, installatie-eisen en totale kredietkosten blijven onduidelijk.",
        "Een grote aanbetaling gaat naar een jonge of moeilijk bereikbare onderneming.",
      ],
      actions: [
        "Vraag een schriftelijke offerte met productspecificaties, installatie, garantie, totaalprijs en financieringskosten en neem bedenktijd.",
        "Controleer subsidie uitsluitend op officiële overheidswebsites en verifieer certificering, KvK-gegevens en referenties.",
        "Laat meerdere onafhankelijke offertes maken op basis van je werkelijke verbruik, zonnepanelen en technische situatie.",
      ],
      reportNote:
        "Meld misleidende verkoop bij Fraudehelpdesk en ConsuWijzer en informeer een werkelijk nagebootste gemeente of netbeheerder. Doe bij oplichting aangifte via politie.nl.",
    }),
  },
];
