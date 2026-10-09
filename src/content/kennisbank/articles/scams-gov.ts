import type { KennisbankArticle } from "../types";
import { scamContent } from "./_helpers";

export const articles: KennisbankArticle[] = [
  {
    slug: "digid-nabootsing",
    title: "Valse DigiD-berichten en inlogpagina’s herkennen",
    excerpt:
      "DigiD-phishing probeert je gebruikersnaam, wachtwoord en sms-code te stelen. Log alleen in via de officiële DigiD-app of een zelf geopend overheidsadres.",
    categorySlug: "digid-nabootsing",
    content: scamContent({
      intro:
        "Bij DigiD-nabootsing ontvang je een bericht over een verlopen account, nieuw bericht, teruggave of verplichte controle. De link opent een pagina die op DigiD lijkt, maar de ingevoerde gegevens bij criminelen aflevert.",
      works: [
        "Een sms, e-mail of QR-code wekt urgentie rond MijnOverheid, zorg, toeslagen of belasting.",
        "De valse pagina kopieert logo’s, kleuren en inlogvelden en kan daarna ook om een sms-code vragen.",
        "Met de gegevens proberen criminelen toegang te krijgen tot overheidsdiensten of verzamelen zij informatie voor identiteitsfraude.",
        "Soms volgt een telefoontje van een zogenaamde helpdesk om een extra code of bankhandeling af te dwingen.",
      ],
      flags: [
        "Het bericht bevat een directe inloglink en dreigt dat DigiD vandaag verloopt of wordt geblokkeerd.",
        "Het hoofddomein is niet digid.nl of het officiële domein van de overheidsdienst.",
        "Je moet een DigiD-code, herstelcode of QR-scan aan iemand doorgeven.",
        "Na DigiD-inlog volgt onverwacht een iDEAL-betaling of verzoek om volledige bankgegevens.",
        "De afzender zegt dat controle alleen via de meegestuurde link mogelijk is.",
      ],
      actions: [
        "Open zelf de DigiD-app of typ digid.nl en controleer daar meldingen en recente activiteit.",
        "Wijzig bij ingevulde gegevens direct je DigiD-wachtwoord en neem contact op met de officiële DigiD-helpdesk.",
        "Controleer bij mogelijk misbruik ook MijnOverheid en betrokken diensten en leg vast welke gegevens je hebt gedeeld.",
      ],
      reportNote:
        "Meld DigiD-phishing via de officiële DigiD-kanalen en bij Fraudehelpdesk. Doe bij accountmisbruik of identiteitsfraude aangifte via politie.nl.",
    }),
  },
  {
    slug: "belastingdienst-phishing",
    title: "Belastingdienst-phishing: schuld en teruggave als lokmiddel",
    excerpt:
      "Valse berichten beloven een teruggave of dreigen met incasso en beslag. Controleer belastingzaken altijd via Mijn Belastingdienst.",
    categorySlug: "belastingdienst-phishing",
    content: scamContent({
      intro:
        "Belastingdienst-phishing gebruikt zowel angst als voordeel: je zou direct een schuld moeten betalen of juist geld terugkrijgen. De link of QR-code leidt naar een valse betaal- of DigiD-pagina.",
      works: [
        "Je ontvangt een sms, e-mail, brief of telefoontje over een openstaande aanslag, toeslag of teruggave.",
        "Een korte deadline en dreiging met deurwaarder, beslag of extra kosten zetten je onder druk.",
        "De betaalpagina bootst iDEAL of DigiD na en verzamelt inlog- en bankgegevens.",
        "Een variant vraagt om betaling naar een particulier rekeningnummer of via Tikkie.",
      ],
      flags: [
        "Een onverwacht bericht vraagt via een directe link om belasting te betalen of teruggaaf te claimen.",
        "Het bedrag moet naar een onbekende IBAN, persoonlijke Tikkie, cadeaukaart of cryptowallet.",
        "Het webadres bevat belastingdienst als onderdeel, maar eindigt niet op het officiële hoofddomein.",
        "Er ontbreekt een controleerbaar kenmerk of dezelfde informatie staat niet in Mijn Belastingdienst.",
        "De afzender vraagt om DigiD-codes, bankcodes of installatie van software.",
      ],
      actions: [
        "Log zelfstandig in op Mijn Belastingdienst of Mijn Toeslagen en controleer of de aanslag of teruggave daar staat.",
        "Bel de BelastingTelefoon via het nummer op belastingdienst.nl als informatie niet overeenkomt.",
        "Betaal alleen met de gegevens uit een authentieke aanslag die je via het officiële portaal hebt gecontroleerd.",
      ],
      reportNote:
        "Stuur verdachte berichten volgens de meldinstructies van de Belastingdienst door en meld ze bij Fraudehelpdesk. Doe bij verlies of misbruik aangifte via politie.nl.",
    }),
  },
  {
    slug: "nepboetes",
    title: "Nepboetes namens CJIB of MijnOverheid",
    excerpt:
      "Een valse verkeersboete of aanmaning speelt in op angst voor verhoging en beslag. Controleer beschikkingen rechtstreeks bij CJIB en MijnOverheid.",
    categorySlug: "nepboetes",
    content: scamContent({
      intro:
        "Bij nepboetes doen fraudeurs alsof je een verkeersboete, parkeerboete of overheidsvordering moet betalen. Een geloofwaardig bedrag en korte termijn moeten voorkomen dat je eerst controleert.",
      works: [
        "Een sms, e-mail, brief of QR-code verwijst naar CJIB, MijnOverheid, gemeente of politie.",
        "De boodschap dreigt met verhoging, deurwaarder, rijbewijsproblemen of beslag.",
        "Een valse pagina toont een dossiernummer en laat je via een nagebootste iDEAL-route betalen.",
        "De ontvanger van het geld is in werkelijkheid een crimineel of geldezel.",
      ],
      flags: [
        "Je ontvangt alleen een sms of e-mail met betaallink voor een boete die je niet herkent.",
        "Betaling moet vandaag, naar een afwijkende rekening of via een QR-code zonder verdere controle.",
        "Kenteken, datum, locatie of beschikkingsnummer ontbreekt of klopt niet.",
        "De pagina vraagt naast betaling ook om DigiD-inlog, kaartgegevens of verificatiecodes.",
        "Dezelfde beschikking is niet zichtbaar in een zelf geopend officieel portaal.",
      ],
      actions: [
        "Ga zelf naar cjib.nl of MijnOverheid en zoek de beschikking op zonder de link uit het bericht te gebruiken.",
        "Vergelijk kenmerk, bedrag, rekeninghouder en betaalinstructies met de officiële brief of het portaal.",
        "Neem bij twijfel rechtstreeks contact op met CJIB of de genoemde gemeente via officieel gevonden gegevens.",
      ],
      reportNote:
        "Meld de nabootsing bij CJIB, gemeente of betrokken overheidsdienst en bij Fraudehelpdesk. Meld financieel verlies via politie.nl.",
    }),
  },
  {
    slug: "nep-pakketdiensten",
    title: "Nepberichten van PostNL en andere pakketdiensten",
    excerpt:
      "Een klein bedrag voor bezorging of douane kan leiden naar een valse betaalpagina. Controleer zendingen alleen in de officiële bezorgapp.",
    categorySlug: "nep-pakketdiensten",
    content: scamContent({
      intro:
        "Pakketphishing lift mee op het grote aantal online bestellingen. Een bericht namens PostNL, DHL of een andere bezorger meldt dat adresgegevens ontbreken of een klein bedrag nodig is om levering vrij te geven.",
      works: [
        "De sms of e-mail wordt breed verstuurd; de kans is groot dat de ontvanger toevallig een pakket verwacht.",
        "De link opent een herkenbare bezorgpagina en vraagt om adresgegevens en een kleine betaling.",
        "Daarna verschijnt een nagemaakte iDEAL- of kaartpagina die bankgegevens en codes onderschept.",
        "De verzamelde persoonsgegevens kunnen later worden gebruikt voor gerichte bankhelpdesk- of identiteitsfraude.",
      ],
      flags: [
        "Een onverwachte toeslag moet binnen enkele uren worden betaald om retourzending te voorkomen.",
        "Track-en-tracecode, afzender of bestelling ontbreekt en is niet terug te vinden in de officiële app.",
        "De URL lijkt op de merknaam maar gebruikt extra woorden, streepjes of een andere domeinextensie.",
        "Een bedrag van enkele centen of euro’s dient als lokmiddel om betaalgegevens te verkrijgen.",
        "De pagina vraagt om bankinlog, pincode of kaartgegevens die niet passen bij de bezorgactie.",
      ],
      actions: [
        "Open de officiële PostNL- of andere bezorgapp en voer de track-en-tracecode daar zelf in.",
        "Controleer bij de webshop welke vervoerder is gebruikt en of werkelijk kosten openstaan.",
        "Heb je kaart- of bankgegevens ingevuld, blokkeer de kaart of toegang direct via je bank.",
      ],
      reportNote:
        "Meld het bericht bij de nagebootste pakketdienst, Fraudehelpdesk en je telecomprovider indien die een meldkanaal biedt. Doe bij schade aangifte via politie.nl.",
    }),
  },
];
