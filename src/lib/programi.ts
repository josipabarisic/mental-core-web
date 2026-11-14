import type { FotoKljuc } from "@/components/photo-slot";

export type Stavka = { opis: string; iznos: number };

export type Cjenik = { naslov?: string; stavke: Stavka[] };

export type Program = {
  slug: string;
  naziv: string;
  podnaslov: string;
  sazetak: string;
  detalji: string[];
  cijenaOd?: number;
  opis: string[];
  ukljuceno?: string[];
  ukljucenoNaslov?: string;
  napomena?: string;
  cjenik?: Cjenik[];
  /** Dodatne usluge, napomena o hrani i prijevozu, izbor lokacije. */
  dodatneUsluge?: boolean;
  /** Program bez vlastite stranice, kartica vodi na kontakt. */
  bezStranice?: boolean;
  /** Jedna istaknuta kartica, da izbor ne bude šest jednakih opcija. */
  preporuceno?: boolean;
  foto?: FotoKljuc;
};

export const DODATNE_USLUGE: Stavka[] = [
  { opis: "Analiza tima", iznos: 500 },
  { opis: "Coaching lidera, po individualnoj sesiji", iznos: 200 },
  { opis: "Paket analiza tima i coaching lidera", iznos: 700 },
];

export const NAPOMENA_LOGISTIKA =
  "Hranu, piće, najam prostora i organizirani prijevoz moguće je uključiti u ponudu uz dodatnu naknadu za usluge.";

export const NAPOMENA_LOKACIJA =
  "Lokaciju teambuildinga može odabrati Mental Core ili je birate vi. Sjedište nam je u okolici Zagreba, najzgodnija nam je Zagrebačka županija, a otvoreni smo za rad diljem Hrvatske.";

const UKLJUCUJE_TERENSKI =
  "Uključuje razgovor s voditeljem, razgovor s članovima tima i zadatke na terenu. Nakon zadataka sjednemo na zajednički osvrt. Uz to ostaje vrijeme za opuštanje i zabavu.";

const DODATNO_ANALIZA_COACHING =
  "Uz dodatnu naknadu moguće je uključiti analizu tima i coaching lidera. Coaching uz teambuilding ide brže od klasičnog, jer Helena ulazi u razgovor već poznajući tim, ne samo lidera.";

export const PROGRAMI: Program[] = [
  {
    slug: "fun",
    naziv: "Mental Core FUN",
    podnaslov: "Teambuilding za dan po vašoj mjeri",
    sazetak:
      "Igre koje potiču komunikaciju i promišljanje. Vježbe su produktivne i zabavne, izvan uobičajenog radnog konteksta.",
    detalji: [
      "Igre za komunikaciju i promišljanje",
      "Zajednički osvrt",
      "Ulaz u rad na timu",
    ],
    opis: [
      "U Mental Core FUN-u su igre koje potiču dobru komunikaciju i promišljanje. Vježbe su produktivne, a zabavne.",
      "Ljudi ponekad pričaju različitim jezicima. Postoje igre koje pomažu da se to prevlada. Rad je izvan uobičajenog konteksta, daleko od stola i uobičajenih uloga.",
      "Na kraju dana napravimo kratak zajednički osvrt. FUN je ulaz, prije sljedeće razine rada na timu.",
      "Odaberite datum, a mi preuzimamo organizaciju prema vašim željama i broju sudionika. Cijenu formiramo prema odabranim prijedlozima i broju sudionika.",
    ],
    ukljuceno: [
      "Igre koje potiču komunikaciju i promišljanje",
      "Vježbe izvan uobičajenog radnog konteksta",
      "Zajednički osvrt",
      "Organizacija dana prema dogovorenim prijedlozima",
    ],
  },
  {
    slug: "analiza-tima",
    naziv: "Analiza tima i radionice",
    podnaslov: "Za timove od 3 do 15 osoba",
    sazetak:
      "Uvid u to kako vaš tim stvarno funkcionira, uz radionicu prilagođenu vašim potrebama.",
    detalji: ["3 do 15 osoba", "Lokacija po dogovoru", "Termin po dogovoru"],
    cijenaOd: 500,
    opis: [
      "Analiza tima od 3 do 15 osoba. Moguće je obuhvatiti i više timova, u dva ili više različitih termina. Pod nazivom tim podrazumijeva se svaka organizacijska jedinica unutar vašeg poslovanja, a može uključivati i cijeli radni kolektiv ako se radi o manjem poslovnom subjektu.",
      "Analizom tima dobivamo uvid u stvarne uloge unutar jedinice, neovisno o funkciji na koju je netko postavljen. Voditelj se ponekad u poslu profilira kao najbolji izvršitelj, a vodstvo preuzme netko iz tima. Taj uvid može poslužiti HR-u ili direktoru za poslagivanje funkcija. Prepoznajemo pojedince koji se ističu, u pozitivnom ili negativnom smjeru, i koji su skloni povesti ostatak članova. Provjeravamo i jasnoću radnih ciljeva unutar jedinice, koje definiraju voditelji ili poslovođe.",
      "Na temelju analize i razgovora s nadređenima predlažemo radionicu. Lokaciju, termin i način provedbe dogovaramo prema potrebama tima i našoj procjeni.",
    ],
    napomena: "Cijena ovisi o broju sudionika.",
    foto: "biljeske",
    cjenik: [
      {
        naslov: "Analiza tima",
        stavke: [
          { opis: "3 do 5 osoba", iznos: 500 },
          { opis: "6 do 10 osoba", iznos: 800 },
          { opis: "11 do 15 osoba", iznos: 1000 },
        ],
      },
      {
        naslov: "Analiza tima i radionica",
        stavke: [
          { opis: "3 do 5 osoba", iznos: 750 },
          { opis: "6 do 10 osoba", iznos: 1100 },
          { opis: "11 do 15 osoba", iznos: 1250 },
        ],
      },
    ],
  },
  {
    slug: "mini",
    naziv: "Mental Core MINI",
    podnaslov: "Poludnevni teambuilding, 5 sati",
    sazetak: "Poludnevni teambuilding s izazovima na terenu.",
    detalji: ["5 sati", "Do 20 osoba", "Dodatak: coaching lidera"],
    cijenaOd: 1200,
    opis: [
      "Poludnevni teambuilding s izazovima na terenu, unutar ili izvan vašeg poslovnog kompleksa.",
      "Coaching lidera možete dodati. Ide brže od klasičnog, jer Helena ulazi u razgovor već poznajući tim, ne samo lidera.",
    ],
    foto: "dvoranskaVjezba",
    ukljuceno: [
      "Zadaci na terenu, unutar ili izvan poslovnog kompleksa",
      "Zajednički osvrt na kraju dana",
      "Razgovor s voditeljem i članovima tima",
      "Vrijeme da se dan zatvori zajedno",
    ],
    cjenik: [
      {
        stavke: [
          { opis: "Do 10 osoba", iznos: 1200 },
          { opis: "Do 10 osoba, uz coaching lidera", iznos: 1800 },
          { opis: "Do 20 osoba", iznos: 1800 },
          { opis: "Do 20 osoba, uz coaching lidera", iznos: 2300 },
        ],
      },
    ],
  },
  {
    slug: "standard",
    preporuceno: true,
    naziv: "Mental Core STANDARD",
    podnaslov: "Jednodnevni teambuilding, 8 do 10 sati",
    sazetak:
      "Cijeli dan zadataka na terenu, uz zajednički osvrt i vrijeme za druženje.",
    detalji: ["8 do 10 sati", "Do 40 osoba", "Dodatak: analiza i coaching"],
    cijenaOd: 1800,
    opis: [
      "Jednodnevni teambuilding u trajanju od 8 do 10 sati.",
      UKLJUCUJE_TERENSKI,
      DODATNO_ANALIZA_COACHING,
    ],
    foto: "teren",
    ukljuceno: [
      "Zadaci na terenu",
      "Teambuilding u trajanju od 8 do 10 sati",
      "Zajednički osvrt nakon zadataka",
      "Vrijeme za druženje i opuštanje",
      "Priprema i razgovor s voditeljem",
      "Razgovori s članovima tima",
    ],
    cjenik: [
      {
        stavke: [
          { opis: "Do 10 osoba", iznos: 1800 },
          { opis: "Do 15 osoba", iznos: 2500 },
          { opis: "Do 20 osoba", iznos: 3000 },
          { opis: "Do 30 osoba", iznos: 3500 },
          { opis: "Do 40 osoba", iznos: 4500 },
        ],
      },
    ],
    dodatneUsluge: true,
  },
  {
    slug: "maxi",
    naziv: "Mental Core MAXI",
    podnaslov: "Dvodnevni program za timove koji žele veću promjenu i više zabave",
    sazetak:
      "Dva dana rada na terenu i druženja. Program u koji se mogu uključiti i osobe izvan vaše organizacijske cjeline.",
    detalji: ["Dva dana", "Do 40 osoba", "Opcija: dodatne osobe"],
    cijenaOd: 3500,
    foto: "koordinacija",
    opis: [
      "Dvodnevni program za timove koji žele veću promjenu i više zabave.",
      UKLJUCUJE_TERENSKI,
      "U ovu ponudu moguće je uključiti i dodatne osobe izvan organizacijske cjeline.",
      DODATNO_ANALIZA_COACHING,
    ],
    cjenik: [
      {
        stavke: [
          { opis: "Do 10 osoba", iznos: 3500 },
          { opis: "Do 15 osoba", iznos: 4500 },
          { opis: "Do 20 osoba", iznos: 5000 },
          { opis: "Do 30 osoba", iznos: 5500 },
          { opis: "Do 40 osoba", iznos: 6000 },
        ],
      },
    ],
    dodatneUsluge: true,
  },
  {
    slug: "premium",
    naziv: "Mental Core PREMIUM",
    podnaslov: "Personalizirani paket složen po vašoj želji",
    sazetak:
      "Program složen oko vašeg tima i konkretnog izazova. Trajanje, lokaciju i sadržaj dogovaramo zajedno.",
    detalji: ["Po dogovoru", "Po vašoj želji"],
    opis: [
      "Personalizirani paket složen po vašoj želji. Trajanje, broj sudionika, lokaciju i sadržaj programa dogovaramo zajedno s vama, prema onome što vaš tim treba.",
      "Odabirete usluge koje vaš tim treba: zadatke na terenu, zajednički osvrt, lokaciju, hranu i piće, prijevoz, pripremu s voditeljem i vrijeme za opuštanje i druženje. Analizu tima i coaching lidera možete dodati.",
      "Cijenu paketa formiramo nakon što odaberete usluge i dogovorimo broj sudionika.",
    ],
    ukljuceno: [
      "Zadaci na terenu",
      "Zajednički osvrt",
      "Vrijeme za opuštanje i druženje",
      "Odabir lokacije, hrane i pića",
      "Razgovor i priprema s voditeljem",
      "Dizajn programa prema potrebama vašeg tima",
      "Organizirani prijevoz za sudionike",
      "Dodatak: analiza tima",
      "Dodatak: coaching lidera",
    ],
    ukljucenoNaslov: "Usluge u ponudi",
    dodatneUsluge: true,
    foto: "planiranje",
  }
];

export function eur(iznos: number) {
  return `${String(iznos).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}

export function oznakaPrograma(p: Program) {
  if (p.cijenaOd) return `${p.naziv} (${p.detalji[0]}, od ${eur(p.cijenaOd)})`;
  return `${p.naziv} (${p.detalji[0].toLowerCase()})`;
}

export function programPoSlugu(slug: string) {
  return PROGRAMI.find((p) => p.slug === slug && !p.bezStranice);
}
