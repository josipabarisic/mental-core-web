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
  "Hranu, piće, najam prostora i organizirani prijevoz moguće je uključiti u ponudu uz dodatnu naknadu.";

export const NAPOMENA_LOKACIJA =
  "Lokaciju teambuildinga može odabrati Mental Core ili je birate vi.";

const UKLJUCENO_TERENSKI = [
  "Priprema i razgovor s voditeljem organizacijske jedinice",
  "Razgovori sa svim članovima organizacijske jedinice",
  "Dizajn programa prema potrebama tima",
  "Posebne terenske i timske vježbe za članove i voditelje",
  "Analiza i raščlamba provedenih vježbi",
  "Feedback sudionicima o odrađenim vježbama",
  "Vrijeme za druženje i opuštanje svih sudionika",
  "Stručno pisano izvješće o svim aktivnostima tijekom teambuildinga",
];

export const PROGRAMI: Program[] = [
  {
    slug: "analiza-tima",
    naziv: "Analiza tima i radionice",
    podnaslov: "Za timove od 3 do 15 osoba",
    sazetak:
      "Uvid u to kako vaš tim stvarno funkcionira, uz radionicu u vašem prostoru i radnom vremenu.",
    detalji: ["3 do 15 osoba", "U vašem prostoru", "Cijele godine"],
    cijenaOd: 500,
    opis: [
      "Analiza tima od 3 do 15 osoba. Moguće je obuhvatiti i više timova, u dva ili više različitih termina. Pod nazivom tim podrazumijeva se svaka organizacijska jedinica unutar vašeg poslovanja, a može uključivati i cijeli radni kolektiv ako se radi o manjem poslovnom subjektu.",
      "Analizom tima dobivamo uvid u pozicioniranje osoba unutar radne jedinice. Prepoznajemo pojedince koji se ističu, u pozitivnom ili negativnom smjeru, i koji su skloni povesti ostatak članova. Provjeravamo i jasnoću radnih ciljeva unutar jedinice, koje definiraju voditelji ili poslovođe.",
      "Na temelju analize i razgovora s nadređenima predlažemo radionicu, koja se organizira u vašem poslovnom prostoru, unutar radnog vremena. U dogovoru s nadređenima radionica se može održati i izvan radnog mjesta i radnog vremena.",
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
      "Može uključivati i coaching lidera na terenu. Coaching lidera je strukturiran proces razvoja lidera kroz razgovor, refleksiju i praktičan rad. Cilj mu je jačanje liderskih kompetencija, samosvijesti, komunikacije i sposobnosti vođenja ljudi.",
    ],
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
      "Jednodnevni trening u trajanju od 8 do 10 sati. Uz rad na terenu uključeno je i vrijeme za opuštanje i zabavu svih sudionika teambuildinga.",
      "Uz dodatnu naknadu moguće je uključiti analizu tima i coaching lidera.",
    ],
    ukljuceno: UKLJUCENO_TERENSKI,
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
    opis: [
      "Dvodnevni program za timove koji žele veću promjenu i više zabave. Uz rad na terenu uključeno je i vrijeme za opuštanje i zabavu svih sudionika teambuildinga.",
      "U ovu ponudu moguće je uključiti i dodatne osobe izvan organizacijske cjeline.",
      "Uz dodatnu naknadu moguće je uključiti analizu tima i coaching lidera.",
    ],
    ukljuceno: UKLJUCENO_TERENSKI,
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
      "Cijenu šaljemo u ponudi, nakon prvog razgovora.",
    ],
    foto: "planiranje",
  },
  {
    slug: "fun",
    naziv: "Mental Core FUN",
    podnaslov: "Opis programa uskoro",
    sazetak: "Detalje ovog programa upravo pripremamo. Pitajte nas, rado ćemo ih ispričati.",
    detalji: ["Uskoro"],
    opis: [],
    bezStranice: true,
  },
];

export function eur(iznos: number) {
  return `${String(iznos).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}

export function programPoSlugu(slug: string) {
  return PROGRAMI.find((p) => p.slug === slug && !p.bezStranice);
}
