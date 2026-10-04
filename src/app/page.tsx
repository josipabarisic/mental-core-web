import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Section, SectionTitle } from "@/components/section";
import { PhotoSlot } from "@/components/photo-slot";

const SIMPTOMI = [
  "Tim dobro radi dok je mirno, a pod rokom se raspada.",
  "Konflikti se ne rješavaju, nego zaobilaze.",
  "Ljudi odlaze, a razloge saznate tek na izlaznom razgovoru.",
  "Ne možete upravi pokazati što ste dobili za prošlogodišnji budžet.",
];

const STUPOVI = [
  {
    naslov: "Autentično iskustvo",
    tekst:
      "Stvarni vojni i psihološki kontekst. Bez glume i bez folklora oko logorske vatre.",
  },
  {
    naslov: "Struktura i psihologija",
    tekst:
      "Otvorena komunikacija, jasne uloge, odgovornost i povjerenje pod pritiskom.",
  },
  {
    naslov: "Primjenjivo odmah",
    tekst:
      "Vođena refleksija i alati koji se u ponedjeljak koriste na sastanku, ne ostaju na terenu.",
  },
];

const KORACI = [
  {
    broj: "01",
    naslov: "Analiza tima",
    tekst:
      "Prije programa mjerimo komunikaciju, povjerenje i usklađenost s ciljevima. Znamo s čime počinjemo.",
  },
  {
    broj: "02",
    naslov: "Program",
    tekst:
      "Iskustvo, pa vođena refleksija. Ono što se dogodi na terenu razložimo i prevedemo u posao.",
  },
  {
    broj: "03",
    naslov: "Izvješće i preporuke",
    tekst:
      "Pisano izvješće s uočenim obrascima i preporukama za daljnji rad. Dokument koji možete pokazati upravi.",
  },
];

const PAKETI = [
  {
    oznaka: "Paket 1",
    naslov: "Analiza tima i radionice",
    detalji: ["U vašem prostoru", "Za vrijeme radnog vremena", "Cijela godina"],
    tekst: "Rješavanje konkretnih internih izazova, bez izlaska iz ureda.",
  },
  {
    oznaka: "Paket 2",
    naslov: "Kratki intenzivni trening",
    detalji: ["Izvan ureda", "2 do 5 sati", "Uz coaching lidera"],
    tekst: "Analiza tima i teambuilding u poludnevnom formatu.",
  },
  {
    oznaka: "Paket 3",
    naslov: "Jednodnevni trening",
    detalji: ["Izvan ureda", "Jedan dan", "Uz coaching lidera"],
    tekst: "Cjelodnevni program s dubljom refleksijom i više prostora za rad na ulogama.",
  },
  {
    oznaka: "Paket 4",
    naslov: "Dvodnevni program",
    detalji: ["Izvan ureda", "Dva dana", "Opcija: obitelj i prijatelji"],
    tekst: "Najdublji format. Za timove koji ulaze u veću promjenu ili spajanje.",
  },
  {
    oznaka: "Po mjeri",
    naslov: "Personalizirani paket",
    detalji: ["Prema dogovoru", "S upravom ili voditeljem odjela"],
    tekst: "Program složen oko konkretnog problema koji već znate imenovati.",
  },
];

const POKAZATELJI = [
  {
    naslov: "Upitnik prije i poslije",
    tekst:
      "Pomaci u komunikaciji, razini povjerenja i usklađenosti s ciljevima, mjereni na istom uzorku.",
  },
  {
    naslov: "Poslovni pokazatelji",
    tekst:
      "Fluktuacija, apsentizam i angažiranost. Podaci koje ionako već pratite.",
  },
  {
    naslov: "Operativni pokazatelji",
    tekst:
      "Brzina odlučivanja i završetka projekata u 90 dana nakon programa.",
  },
];

const PITANJA = [
  {
    q: "Koliko ljudi može sudjelovati?",
    a: "Radimo s timovima od 6 do 30 ljudi. Za veće organizacije program dijelimo po odjelima, jer iznad 30 sudionika refleksija gubi dubinu.",
  },
  {
    q: "Je li program fizički zahtjevan?",
    a: "Ovisi o paketu, a intenzitet biramo zajedno s vama. Nijedna aktivnost ne traži posebnu pripremu ni kondiciju. Nitko se ne prisiljava i nitko se ne izlaže pred grupom.",
  },
  {
    q: "Što ako u timu postoji otvoren konflikt?",
    a: "To nam recite unaprijed. Otvoren konflikt ne znači da program nije moguć, ali mijenja pristup. U tom slučaju obično počinjemo Paketom 1, u vašem prostoru, prije nego što izlazimo van.",
  },
  {
    q: "Radite li i zimi?",
    a: "Da. Paket 1 se održava u vašem prostoru i dostupan je cijelu godinu. Za zimske mjesece imamo i dvoranske simulacije odlučivanja pod pritiskom.",
  },
  {
    q: "Koliko traje od prvog razgovora do programa?",
    a: "Uobičajeno tri do četiri tjedna. Analiza tima se provodi prije programa i za nju je potrebno oko tjedan dana.",
  },
  {
    q: "Je li sve što se kaže na programu povjerljivo?",
    a: "Da. Izvješće koje dobiva uprava sadrži obrasce i preporuke, nikada pojedinačne izjave ni imena. To pravilo objašnjavamo sudionicima na početku, jer bez njega nema iskrenog razgovora.",
  },
];

export default function Pocetna() {
  return (
    <>
      {/* Hero */}
      <section className="on-dark bg-brand">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <Eyebrow tone="dark">Programi za tvrtke</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.08] font-bold tracking-[-0.02em] text-surface sm:text-5xl lg:text-6xl">
              Uspjeh je rezultat uspješnog funkcioniranja tima.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-line">
              Ne gradimo timove za idealne uvjete. Gradimo ih za stvarne
              poslovne izazove: pritisak, umor i nepredvidivost.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 bg-surface px-6 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
              >
                Provjerite gdje vaš tim stvarno stoji
                <ArrowRight size={16} />
              </Link>
              <a
                href="#paketi"
                className="inline-flex items-center justify-center px-2 py-3.5 text-sm font-medium text-line underline underline-offset-4 hover:text-surface"
              >
                Pogledajte pakete
              </a>
            </div>
          </div>

          <PhotoSlot
            label="Dokumentarna fotografija Helene i Dinka, poslovno i terensko izdanje. Bez stocka."
            className="min-h-64 lg:min-h-96"
          />
        </div>

        {/* Traka povjerenja */}
        <div className="border-t border-white/15">
          <div className="mx-auto grid max-w-6xl px-5 sm:grid-cols-3 lg:px-8">
            {[
              "Psihologinja i vojni instruktori",
              "Analiza tima prije programa",
              "Pisano izvješće nakon programa",
            ].map((item) => (
              <p
                key={item}
                className="border-white/12 py-4 text-sm font-medium text-line not-last:border-b sm:border-b-0! sm:py-6 sm:not-last:border-r sm:not-last:pr-6 sm:[&:not(:first-child)]:pl-6"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Problem</Eyebrow>
            <SectionTitle className="mt-5">
              Je li vaš teambuilding samo još jedan izlet u prirodu?
            </SectionTitle>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink">
              Ljudi se dobro provedu. Vrate se u ured i sve ostane isto. Iste
              šutnje na sastancima, iste nejasne uloge, isti ljudi koji nose sve
              na sebi.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Problem nije u zabavi. Problem je što zabava ne mijenja strukturu
              tima.
            </p>
            <ul className="mt-9 space-y-3.5">
              {SIMPTOMI.map((s) => (
                <li key={s} className="flex gap-3 text-[0.95rem] text-ink-muted">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-accent-clay"
                    strokeWidth={2.5}
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Tri stupa */}
      <Section tone="alt">
        <Eyebrow>Diferencijacija</Eyebrow>
        <SectionTitle className="mt-5 max-w-2xl">
          Zašto ovo nije klasičan teambuilding
        </SectionTitle>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {STUPOVI.map((s) => (
            <div key={s.naslov} className="border-t border-line pt-7 md:pr-6">
              <h3 className="text-xl font-bold text-brand-deep">{s.naslov}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{s.tekst}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kako izgleda suradnja */}
      <Section tone="surface">
        <div className="max-w-2xl">
          <Eyebrow>Proces</Eyebrow>
          <SectionTitle className="mt-5">Tri koraka, ne jedan dan</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Teambuilding je sredina procesa, ne cijeli proces. Ono što ga čini
            vrijednim je što se događa prije i poslije.
          </p>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {KORACI.map((k) => (
            <div key={k.broj}>
              <span className="text-sm font-bold tracking-[0.1em] text-accent-clay">
                {k.broj}
              </span>
              <h3 className="mt-3 border-t border-line pt-4 text-xl font-bold text-brand-deep">
                {k.naslov}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{k.tekst}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Paketi */}
      <Section tone="alt" id="paketi">
        <div className="max-w-2xl">
          <Eyebrow>Ponuda</Eyebrow>
          <SectionTitle className="mt-5">Pet načina da počnemo</SectionTitle>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PAKETI.map((p) => (
            <div
              key={p.oznaka}
              className="flex flex-col border border-line bg-surface p-7"
            >
              <span className="eyebrow text-accent-clay">{p.oznaka}</span>
              <h3 className="mt-3 text-xl font-bold text-brand-deep">
                {p.naslov}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-muted">
                {p.tekst}
              </p>
              <ul className="mt-6 space-y-1.5 border-t border-line pt-5 text-sm text-ink-muted">
                {p.detalji.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col justify-center border border-dashed border-line p-7">
            <p className="leading-relaxed text-ink">
              Niste sigurni koji paket? Recite nam gdje tim zapinje i predložit
              ćemo.
            </p>
            <Link
              href="/kontakt"
              className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-accent-clay-dark underline underline-offset-4"
            >
              Opišite situaciju
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </Section>

      {/* Mjerenje */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow tone="dark">Povrat investicije</Eyebrow>
            <SectionTitle tone="dark" className="mt-5">
              Kako znate da je vrijedilo
            </SectionTitle>
            <p className="mt-6 text-lg leading-relaxed text-line">
              Zamjena jednog stručnog zaposlenika košta tvrtku između 50 i 200
              posto njegove godišnje plaće. Ako program zadrži jednu osobu,
              platio se sam.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-line">
              Zato ne prodajemo dojam, nego mjerimo.
            </p>
          </div>
          <div className="space-y-px">
            {POKAZATELJI.map((p) => (
              <div key={p.naslov} className="border-t border-white/15 py-6">
                <h3 className="text-lg font-bold text-surface">{p.naslov}</h3>
                <p className="mt-2 leading-relaxed text-line">{p.tekst}</p>
              </div>
            ))}
            <div className="border-t border-white/15 pt-8">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-surface px-6 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
              >
                Preuzmite vodič za budžet i mjerenje učinka
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Osnivači */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Autoritet</Eyebrow>
            <SectionTitle className="mt-5">
              Metode razvijene ondje gdje greška ima posljedice
            </SectionTitle>
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-accent-clay pl-5">
                <h3 className="font-bold text-brand-deep">Helena</h3>
                <p className="mt-1.5 leading-relaxed text-ink-muted">
                  Psihologinja, NLP trenerica, buduća gestalt psihoterapeutkinja.
                  Kao časnica Hrvatske vojske u obavještajnom sektoru kreirala i
                  vodila treninge komunikacijskih vještina.
                </p>
              </div>
              <div className="border-l-2 border-accent-clay pl-5">
                <h3 className="font-bold text-brand-deep">Dinko</h3>
                <p className="mt-1.5 leading-relaxed text-ink-muted">
                  Bivši obavještajni dočasnik Hrvatske vojske i instruktor
                  središta za razvoj vođa.
                </p>
              </div>
            </div>
            <p className="mt-8 text-xl leading-snug font-medium text-balance text-brand-deep">
              Držimo prostor i vodimo vas i kada postane teško.
            </p>
            <Link
              href="/o-nama"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-clay-dark underline underline-offset-4"
            >
              Više o nama
              <ArrowRight size={15} />
            </Link>
          </div>
          <PhotoSlot
            tone="light"
            label="Portreti Helene i Dinka. Isti kadar, ista obrada, bez postavljenih osmijeha."
            className="min-h-72"
          />
        </div>
      </Section>

      {/* Za koga nije */}
      <Section tone="alt">
        <div className="max-w-3xl">
          <Eyebrow>Granice</Eyebrow>
          <SectionTitle className="mt-5">Kad nismo pravi izbor</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            Ako tražite opuštanje, zabavni park i dan bez obveza, postoje bolje
            agencije od nas. Naš program traži izlazak iz zone komfora i otvorenu
            komunikaciju. To nekim timovima u početku ne odgovara. Recite nam to
            unaprijed i iskreno ćemo vam reći ima li smisla.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Česta pitanja</Eyebrow>
            <SectionTitle className="mt-5">
              Ono što HR obično pita prvo
            </SectionTitle>
          </div>
          <Accordion multiple={false} className="w-full">
            {PITANJA.map((p, i) => (
              <AccordionItem
                key={p.q}
                value={`p-${i}`}
                className="border-b border-line"
              >
                <AccordionTrigger className="py-5 text-base font-semibold text-brand-deep hover:no-underline">
                  {p.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-ink-muted">
                  {p.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Završni CTA */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <SectionTitle tone="dark">Recite nam gdje tim zapinje</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-line">
            Petnaest minuta razgovora, bez obveze. Ako procijenimo da vam ne
            možemo pomoći, reći ćemo vam.
          </p>
          <Link
            href="/kontakt"
            className="mt-9 inline-flex items-center gap-2 bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark"
          >
            Zatražite program prilagođen vašoj organizaciji
            <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
