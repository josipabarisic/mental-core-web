export const VELICINE_TIMA = [
  "3 do 5 osoba",
  "6 do 10 osoba",
  "11 do 20 osoba",
  "Više od 20 osoba",
] as const;

export type PitanjeUpitnika = {
  id: string;
  kategorija: string;
  pitanje: string;
  opcije: readonly string[];
};

export const PITANJA_UPITNIKA: readonly PitanjeUpitnika[] = [
  {
    id: "pritisak",
    kategorija: "Rad pod pritiskom i kriznim situacijama",
    pitanje:
      "Kada se pojave nepredviđeni problemi, probiju rokovi ili nastupi umor, kako tim najčešće reagira?",
    opcije: [
      "Javlja se panika, traži se krivac i produktivnost drastično pada.",
      "Odradimo posao do kraja, ali uz visoku razinu stresa i narušene međuljudske odnose.",
      "Tim se zbližava, preusmjeravamo resurse i fokusiramo se isključivo na rješenje.",
    ],
  },
  {
    id: "odgovornost",
    kategorija: "Psihološka sigurnost i preuzimanje odgovornosti",
    pitanje: "Kada netko u timu napravi pogrešku, koja je standardna reakcija?",
    opcije: [
      "Skrivanje pogreške iz straha od osude, kritike ili sankcija.",
      "Prebacivanje odgovornosti na druge kolege, odjele ili vanjske faktore.",
      "Otvoreno priznavanje pogreške bez straha, uz zajednički rad na brzom rješenju.",
    ],
  },
  {
    id: "konflikt",
    kategorija: "Rješavanje konflikata i neslaganja",
    pitanje: "Kako se vaš tim nosi s internim neslaganjima i sukobima mišljenja?",
    opcije: [
      "Guranje pod tepih: izbjegavamo neslaganja kako bismo održali privid mira.",
      "Rasprave često postanu osobne i ostavljaju trajne zamjerke među članovima.",
      "Konstruktivno: otvoreno raspravljamo i koristimo različita mišljenja za bolja rješenja.",
    ],
  },
  {
    id: "uloge",
    kategorija: "Jasnoća uloga i vodstvo",
    pitanje: "Koliko su jasno definirani radni ciljevi i uloge unutar vašeg tima?",
    opcije: [
      "Često se ne zna tko je za što odgovoran, što dovodi do duplog rada ili propusta.",
      "Uloge su formalno definirane, ali se u svakodnevnoj praksi pravila često zaobilaze.",
      "Svatko točno zna svoju ulogu, preuzima odgovornost i postoji jasna struktura vođenja.",
    ],
  },
  {
    id: "lideri",
    kategorija: "Neformalni lideri i timska dinamika",
    pitanje:
      "Postoje li u vašem timu pojedinci koji se izrazito ističu po svom utjecaju na druge?",
    opcije: [
      "Da, postoje pojedinci koji često negativno utječu na atmosferu i povlače ostatak tima.",
      "Ne pretjerano, većina članova je pasivna i samo čeka direktne upute nadređenih.",
      "Da, imamo snažne pojedince koji pozitivno motiviraju, preuzimaju inicijativu i vode ostale.",
    ],
  },
  {
    id: "iskustvo",
    kategorija: "Dosadašnja iskustva",
    pitanje:
      "Što vam je najviše smetalo na dosadašnjim korporativnim edukacijama ili teambuildinzima?",
    opcije: [
      "Previše usiljene zabave i igara bez stvarnog rješavanja dubljih problema u timu.",
      "Nedostatak konkretnih alata koji se već idući dan mogu primijeniti na radnom mjestu.",
      "Nismo do sada imali organizirane edukacije ili strukturirane teambuilding programe.",
    ],
  },
];
