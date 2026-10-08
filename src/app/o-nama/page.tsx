import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section, SectionTitle } from "@/components/section";
import { Foto } from "@/components/photo-slot";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Mental Core vode psihologinja i vojni instruktor. Sustav nastao u uvjetima gdje greška ima posljedice.",
};

const METODA = [
  {
    naslov: "Analiza prije programa",
    tekst:
      "Kratki upitnik za cijeli tim i razgovor s voditeljem. Vidimo tko stvarno vodi, tko nosi, tko šuti, bez obzira na funkciju na papiru. Ne ulazimo naslijepo i ne radimo isti program dvaput.",
  },
  {
    naslov: "Iskustvo koje stvara stvarne reakcije",
    tekst:
      "Zadaci s ograničenim vremenom, nepotpunim informacijama i podijeljenom odgovornošću. Tim se ponaša kako se ponaša i u uredu, samo brže i vidljivije.",
  },
  {
    naslov: "Vođena refleksija",
    tekst:
      "Odmah nakon zadatka razlažemo što se dogodilo. Tko je preuzeo, tko je šutio, gdje je informacija stala. Ovo je dio koji mijenja ponašanje, ne sam zadatak.",
  },
  {
    naslov: "Prijenos u posao",
    tekst:
      "Svaki uvid prevodimo u konkretno pravilo za svakodnevni rad. Ta pravila ulaze u pisano izvješće.",
  },
];

const VRIJEDNOSTI = [
  {
    naziv: "Otvorena komunikacija",
    opis: "Ono što se ne izgovori na vrijeme, kasnije košta.",
  },
  {
    naziv: "Odgovornost",
    opis: "Jasno tko nosi što, i prije nego što nastane problem.",
  },
  { naziv: "Suradnja", opis: "Rezultat tima, a ne zbroj pojedinaca." },
  {
    naziv: "Fokus na rješenjima",
    opis: "Analiza uzroka služi odluci, ne traženju krivca.",
  },
  {
    naziv: "Učenje kroz iskustvo",
    opis: "Ono što se doživi ostaje dulje od onoga što se čuje.",
  },
  {
    naziv: "Poštivanje različitosti",
    opis: "Različiti ljudi su prednost ako je komunikacija jasna.",
  },
];

export default function ONama() {
  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <Eyebrow tone="dark">O nama</Eyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl">
            Mi smo ovo prošli.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
            Mental Core vode psihologinja i vojni instruktor. Naš sustav nije
            nastao u učionici, nego u uvjetima gdje greška ima posljedice.
          </p>
        </div>
      </section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>Zašto postojimo</Eyebrow>
            <SectionTitle className="mt-5">Zašto smo ovo pokrenuli</SectionTitle>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink">
            <p>
              Vidjeli smo isti obrazac i u vojsci i u tvrtkama. Timovi ne padaju
              zbog nedostatka sposobnosti, nego zbog nedostatka strukture.
            </p>
            <p>
              Kad nema jasnih uloga, kad se ne govori otvoreno i kad se
              odgovornost razlijeva, tim izdrži dok je mirno. Prvi ozbiljan
              pritisak pokaže istinu.
            </p>
            <p className="font-medium text-brand-deep">
              Mental Core postoji da se ta istina vidi prije nego što postane
              skupa.
            </p>
          </div>
        </div>
      </Section>

      {/* Osnivači */}
      <Section tone="alt">
        <Eyebrow>Tko vodi programe</Eyebrow>
        <SectionTitle className="mt-5 max-w-2xl">
          Dvoje ljudi, dva različita izvora istog sustava
        </SectionTitle>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <article className="border-t border-line pt-8">
            <Foto foto="helena" pozicija="center 30%" />
            <h3 className="mt-7 text-2xl font-bold text-brand-deep">Helena</h3>
            <p className="mt-1.5 text-sm font-medium text-accent-clay-dark">
              Osnivačica. Psihologinja i coach. Bivša časnica OSRH.
            </p>
            <ul className="mt-5 space-y-2 text-[0.95rem] leading-relaxed text-ink-muted">
              <li>
                Kliničko i vojno iskustvo. Poznaje hijerarhiju i vodstvo s
                različitih razina.
              </li>
              <li>NLP trenerica, edukantica gestalt psihoterapije.</li>
              <li>
                Časnica Hrvatske vojske u obavještajnom sektoru. Vodila
                treninge komunikacije za taktičku razinu.
              </li>
              <li>
                Prošla zarobljenički kamp i na njemu trenirala vlastitu
                psihološku otpornost.
              </li>
            </ul>
            <blockquote className="mt-6 border-l-2 border-accent-clay pl-5 text-lg leading-snug text-brand-deep">
              Pomažem timovima i liderima izgraditi psihološku otpornost i
              otvorenu komunikaciju pod pritiskom.
            </blockquote>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Coaching lidera uz program ide brže od klasičnog. U razgovor
              ulazi već imajući širu sliku tima, ne samo lidera.
            </p>
          </article>

          <article className="border-t border-line pt-8">
            <Foto foto="dinko" pozicija="center 30%" />
            <h3 className="mt-7 text-2xl font-bold text-brand-deep">Dinko</h3>
            <p className="mt-1.5 text-sm font-medium text-accent-clay-dark">
              Osnivač. Ekonomist. Bivši dočasnik i vojni instruktor u OSRH.
            </p>
            <ul className="mt-5 space-y-2 text-[0.95rem] leading-relaxed text-ink-muted">
              <li>
                Deset godina vojnog staža: od vojnika do instruktora središta
                za razvoj vođa, zatim dočasnik u operativnom timu specijalne
                postrojbe.
              </li>
              <li>Bivši obavještajni dočasnik Hrvatske vojske.</li>
              <li>
                Osmišljava vježbe u kojima svatko ima svoju funkciju i uči iz
                nje.
              </li>
              <li>
                Ronilac, padobranac i alpinist. Dvanaest medalja na
                natjecanjima. Obuke pod visokim stresom i krajnjom
                izdržljivošću.
              </li>
            </ul>
            <blockquote className="mt-6 border-l-2 border-accent-clay pl-5 text-lg leading-snug text-brand-deep">
              Prenosim operativnu strukturu, disciplinu i vođenje pod kriznim
              pritiskom u poslovne timove.
            </blockquote>
          </article>
        </div>
        <p className="mt-10 max-w-2xl leading-relaxed text-ink">
          Helena i Dinko su supružnici. Rade kao tim, i na programima i kod
          kuće.
        </p>
        <p className="mt-6">
          <a
            href="https://www.linkedin.com/in/helena-i-dinko-maru%C5%A1%C4%8Dak-45b915440/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent-clay-dark underline underline-offset-4"
          >
            Helena i Dinko na LinkedInu
          </a>
        </p>
      </Section>

      {/* Kako radimo */}
      <Section tone="surface">
        <div className="max-w-2xl">
          <Eyebrow>Metoda</Eyebrow>
          <SectionTitle className="mt-5">
            Realan stres, sigurno okruženje
          </SectionTitle>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Foto
            foto="dvorana"
            sizes="(min-width: 1024px) 440px, 100vw"
            className="mx-auto w-full max-w-md lg:max-w-none"
            pozicija="center center"
          />
          <div className="grid content-start gap-x-12 gap-y-10 sm:grid-cols-2">
            {METODA.map((m) => (
              <div key={m.naslov} className="border-t border-line pt-6">
                <h3 className="text-lg font-bold text-brand-deep">{m.naslov}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{m.tekst}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 max-w-3xl border-l-2 border-accent-clay pl-6 text-lg leading-relaxed text-brand-deep">
          Nitko se ne prisiljava i nitko se ne izlaže pred grupom. Vježbe drže i
          ljude koji cijeli dan sjede, i one koji hoće adrenalin. Intenzitet
          biramo zajedno s vama.
        </p>
      </Section>

      {/* Vrijednosti */}
      <Section tone="alt">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Vrijednosti</Eyebrow>
            <SectionTitle className="mt-5">Po čemu radimo</SectionTitle>
          </div>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {VRIJEDNOSTI.map((v) => (
              <div key={v.naziv}>
                <h3 className="font-bold text-brand-deep">{v.naziv}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">
                  {v.opis}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 max-w-2xl text-lg leading-relaxed font-medium text-brand-deep">
          Svaka karika lanca je važna da lanac bude postojan i učinkovit.
        </p>
      </Section>

      {/* Povjerljivost */}
      <Section tone="surface">
        <div className="max-w-3xl">
          <Eyebrow>Povjerljivost</Eyebrow>
          <SectionTitle className="mt-5">
            Što ostaje u prostoriji, ostaje u prostoriji
          </SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            Izvješće koje dobiva uprava sadrži uočene obrasce i preporuke za
            daljnji rad. Ne sadrži pojedinačne izjave, imena ni ocjene ljudi.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            Isto vrijedi za fotografije, video i snimanje. Ništa ne objavljujemo
            bez vašeg odobrenja. Ne snimamo ako to niste htjeli. Naučili smo to
            tamo gdje povjerljivost nije izbor, nego uvjet rada.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            To pravilo objašnjavamo sudionicima na početku programa, jer bez
            njega nema iskrenog razgovora, a bez iskrenog razgovora nema ni
            rezultata.
          </p>
        </div>
      </Section>

      <Section tone="dark">
        <div className="max-w-2xl">
          <SectionTitle tone="dark">
            Razgovarajmo o izazovima vašeg tima
          </SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-white">
            Petnaest minuta, bez obveze. Recite nam što se događa i predložit
            ćemo format koji ima smisla.
          </p>
          <Link
            href="/kontakt"
            className="mt-9 inline-flex items-center gap-2 bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark"
          >
            Na kontakt
            <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
