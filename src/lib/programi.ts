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
  "Lokaciju teambuildinga može odabrati Mental Core ili je birate vi.";

const UKLJUCUJE_TERENSKI =
  "Uključuje razgovor s voditeljem organizacijske jedinice, razgovor sa svim članovima organizacijske jedinice, posebne vježbe na terenu za članove i voditelje organizacijske jedinice, analizu i raščlambu provedenih vježbi te feedback o odrađenim vježbama. Uz sve navedeno uključeno je vrijeme za opuštanje i zabavu svih sudionika teambuildinga. Uključuje i stručno pisano izvješće o svim provedenim aktivnostima tijekom teambuildinga.";

const DODATNO_ANALIZA_COACHING =
  "Uz dodatnu naknadu moguće je uključiti analizu tima i coaching lidera. Coaching uz teambuilding ide brže od klasičnog, jer Helena ulazi u razgovor već poznajući tim, ne samo lidera.";

export const PROGRAMI: Program[] = [
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
    podnaslov: "Kratki trening u trajanju od 5 sati",
    sazetak:
      "Poludnevni trening s razgovorima, vježbama i pisanim izvješćem. Po želji uz coaching lidera na terenu.",
    detalji: ["5 sati", "Do 20 osoba", "Opcija: coaching lidera"],
    cijenaOd: 1200,
    opis: [
      "Kratki trening u trajanju od 5 sati, unutar ili izvan vašeg poslovnog kompleksa.",
      "Može uključivati i coaching lidera na terenu. Coaching lidera je strukturiran proces razvoja lidera kroz razgovor, refleksiju i praktičan rad. Cilj mu je jačanje liderskih kompetencija, samosvijesti, komunikacije i sposobnosti vođenja ljudi. Ovdje ide brže od klasičnog coachinga, jer Helena ulazi u razgovor već poznajući tim i kako funkcionira pod pritiskom.",
    ],
    foto: "dvoranskaVjezba",
    ukljuceno: [
      "Razgovor s članovima organizacijske jedinice",
      "Razgovor s voditeljem organizacijske jedinice",
      "Vježbe unutar ili izvan poslovnog kompleksa",
      "Zatvaranje aktivnosti uz feedback",
      "Pisano izvješće za voditelja organizacijske jedinice, menadžera ili direktora",
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
    naziv: "Mental Core STANDARD",
    podnaslov: "Jednodnevni trening u trajanju od 8 do 10 sati",
    sazetak:
      "Cijeli dan terenskih i timskih vježbi, s raščlambom, feedbackom, vremenom za druženje i stručnim izvješćem.",
    detalji: ["8 do 10 sati", "Do 40 osoba", "Opcija: analiza i coaching"],
    cijenaOd: 1800,
    opis: [
      "Jednodnevni trening u trajanju od 8 do 10 sati.",
      UKLJUCUJE_TERENSKI,
      DODATNO_ANALIZA_COACHING,
    ],
    foto: "teren",
    ukljuceno: [
      "Priprema i razgovor s voditeljem",
      "Razgovori s članovima tima",
      "Dizajn programa prema potrebama tima",
      "8 do 10 sati provedbe",
      "Terenske i timske vježbe",
      "Analiza i raščlamba vježbi",
      "Feedback sudionicima",
      "Vrijeme za druženje i opuštanje",
      "Stručno pisano izvješće",
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
      "Odabirete usluge koje vaš tim treba: analizu tima, coaching lidera, lokaciju, hranu i piće, prijevoz, pripremu s voditeljem, dizajn programa, terenske i timske vježbe, feedback, analizu vježbi, pisano izvješće te vrijeme za opuštanje i druženje.",
      "Cijenu paketa formiramo nakon što odaberete usluge i dogovorimo broj sudionika.",
    ],
    ukljuceno: [
      "Analiza tima i coaching lidera prema odabranom opsegu",
      "Odabir lokacije, hrane i pića",
      "Razgovor i priprema s voditeljem",
      "Dizajn programa prema potrebama vašeg tima",
      "Terenske i timske vježbe",
      "Feedback sa sudionicima na terenu",
      "Analiza i raščlamba vježbi",
      "Pisano izvješće nakon teambuildinga",
      "Vrijeme za opuštanje i druženje",
      "Organizirani prijevoz za sudionike",
    ],
    ukljucenoNaslov: "Usluge u ponudi",
    dodatneUsluge: true,
    foto: "planiranje",
  },
  {
    slug: "fun",
    naziv: "Mental Core FUN",
    podnaslov: "Paket za dan po vašoj mjeri",
    sazetak:
      "Mi preuzimamo organizaciju vašeg teambuildinga. Vi odaberete datum, a mi pripremimo dan za zabavu i opuštanje.",
    detalji: ["Zabava i opuštanje", "Organizacija prema vašim željama"],
    opis: [
      "Odaberite datum, a mi preuzimamo organizaciju teambuildinga prema vašim željama i broju sudionika.",
      "Mental Core FUN usmjeren je na zabavu i opuštanje. Ne uključuje stručne analize ni druge stručne aktivnosti.",
      "Cijenu formiramo prema odabranim prijedlozima i broju sudionika.",
    ],
    ukljuceno: [
      "Organizacija dana prema dogovorenim prijedlozima",
      "Zabava i opuštanje",
      "Planiranje prema broju sudionika",
    ],
  },
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
