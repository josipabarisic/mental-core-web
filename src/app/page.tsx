import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Section, SectionTitle } from "@/components/section";
import { Foto } from "@/components/photo-slot";
import { InstagramFeed } from "@/components/instagram-feed";
import { ProgramKartice } from "@/components/program-kartice";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/kontakt";

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
      "Realni psihološki i vojni kontekst u svim smjerovima. Nema pretvaranja i nema motiviranja lažnim floskulama.",
  },
  {
    naslov: "Struktura i psihologija",
    tekst:
      "Otvorena komunikacija, jasne uloge, odgovornost i povjerenje pod pritiskom.",
  },
  {
    naslov: "Produktivni rezultat",
    tekst:
      "Vođena refleksija i alati koje s teambuildinga odmah, već prvog radnog dana, možete koristiti u poslu.",
  },
];

const KORACI = [
  {
    broj: "01",
    naslov: "Analiza tima",
    tekst:
      "Gledamo stvarnu poziciju ljudi u timu, ne samo funkciju na papiru. Taj uvid služi i vama, za poslagivanje uloga, ne samo nama za program.",
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
    a: "Ovisi o programu. Analiza tima radi se za 3 do 15 osoba, Mental Core MINI za do 20 osoba, a STANDARD i MAXI za do 40 osoba. Više timova možemo obuhvatiti u dva ili više različitih termina.",
  },
  {
    q: "Jesu li cijene s PDV-om?",
    a: "Da. Sve cijene na stranici uključuju PDV. Hranu, piće, najam prostora i prijevoz moguće je dodati u ponudu uz dodatnu naknadu.",
  },
  {
    q: "Je li program fizički zahtjevan?",
    a: "Ovisi o paketu, a intenzitet biramo zajedno s vama. Isti program drži i ljude koji cijeli dan sjede, i one koji jedva čekaju izaći van. Nijedna aktivnost ne traži posebnu pripremu ni kondiciju. Nitko se ne prisiljava i nitko se ne izlaže pred grupom.",
  },
  {
    q: "Što ako u timu postoji otvoren konflikt?",
    a: "To nam recite unaprijed. Otvoren konflikt ne znači da program nije moguć, ali utječe na pristup. Predložit ćemo format i način provedbe prema potrebama tima i našoj procjeni.",
  },
  {
    q: "Koliko traje od prvog razgovora do programa?",
    a: "Uobičajeno tri do četiri tjedna. Analiza tima se provodi prije programa i za nju je potrebno oko tjedan dana.",
  },
  {
    q: "Je li sve što se kaže na programu povjerljivo?",
    a: "Da. Dolazimo iz posla u kojem se poslovne tajne čuvaju, a ne prepričavaju. Ono što nam povjerite, ostaje kod nas. To možemo garantirati. Izvješće za upravu sadrži obrasce i preporuke, nikada pojedinačne izjave ni imena. Fotografije, video i snimanje idu samo uz vaše odobrenje.",
  },
];

export default function Pocetna() {
  return (
    <>
      {/* Hero */}
      <section className="on-dark bg-brand">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-5 sm:pt-20 sm:pb-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <Eyebrow tone="dark">Programi za poslovne subjekte</Eyebrow>
            <h1 className="font-display mt-5 text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl lg:text-6xl">
              Uspjeh je rezultat uspješnog funkcioniranja tima.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white">
              Vrijeme je da vaš tim postane više od grupe ljudi koji rade
              zajedno. Gradimo timove koji vjeruju jedni drugima, surađuju i
              zajedno stvaraju rezultate. Jer tim je jak onoliko koliko su jake
              njegove veze.
            </p>
            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white">
              Što nam povjerite, ostaje kod nas. To možemo garantirati.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/upitnik"
                className="inline-flex items-center justify-center gap-2 bg-surface px-6 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
              >
                Provjerite gdje vaš tim stoji
                <ArrowRight size={16} />
              </Link>
              <a
                href="#ponuda"
                className="inline-flex items-center justify-center px-2 py-3.5 text-sm font-medium text-white underline underline-offset-4 hover:text-white"
              >
                Pogledajte ponudu
              </a>
            </div>
          </div>

          <Foto
            foto="flipchart"
            priority
            pozicija="28% center"
            className="w-full"
          />
        </div>

        {/* Traka povjerenja */}
        <div className="border-t border-white/15">
          <div className="mx-auto grid max-w-6xl px-5 sm:grid-cols-3 lg:px-8">
            {[
              "Psihologinja i vojni instruktori",
              "Analiza tima prije programa",
              "Poslovne tajne ostaju kod nas",
            ].map((item) => (
              <p
                key={item}
                className="border-white/12 py-4 text-sm font-medium text-white not-last:border-b sm:border-b-0! sm:py-6 sm:not-last:border-r sm:not-last:pr-6 sm:[&:not(:first-child)]:pl-6"
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
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Kod nas razonoda nije ručak i piće. Dolazi iz zadataka koji
              ostaju u sjećanju, i koji u isto vrijeme pokažu kako tim radi.
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

      {/* Jak tim */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow tone="dark">Tim</Eyebrow>
            <SectionTitle tone="dark" className="mt-5">
              Jak tim ne nastaje slučajno. Gradi se.
            </SectionTitle>
            <div className="mt-7 space-y-4 text-lg leading-relaxed text-white">
              <p>
                Tim nije samo skup pojedinaca. Tim čine odnosi, povjerenje,
                komunikacija i sposobnost da ljudi djeluju zajedno, čak i onda
                kada se ne slažu. Uspješni rezultati nisu posljedica samo
                individualnog talenta. Oni su rezultat dobrog funkcioniranja
                cijelog tima.
              </p>
              <p>
                Snaga tima mjeri se kvalitetom odnosa među njegovim članovima.
                Kada postoje povjerenje, otvorena komunikacija i spremnost na
                suradnju, tim ne samo da bolje funkcionira. On napreduje.
              </p>
              <p className="font-medium text-white">
                Zato teambuilding nije samo druženje izvan ureda.
              </p>
              <p>
                To je prilika da se članovi tima bolje upoznaju i povežu, nauče
                slušati jedni druge, prepoznaju svoje različitosti i zajedno
                pronađu način da ih pretvore u snagu.
              </p>
              <p>
                <span className="font-medium text-white">
                  A konflikti? I oni su dio svakog tima.
                </span>{" "}
                Ne moraju biti problem. Mogu biti prilika za učenje, razvoj i
                napredak.
              </p>
            </div>
          </div>
          <Foto
            foto="povjerenje"
            pozicija="center 42%"
            className="w-full"
          />
        </div>
      </Section>

      {/* Tri stupa */}
      <Section tone="alt">
        <Eyebrow>Diferencijacija</Eyebrow>
        <SectionTitle className="mt-5 max-w-2xl">
          Zašto ovo nije klasičan teambuilding?
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

      {/* Ponuda */}
      <Section tone="alt" id="ponuda">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Ponuda</Eyebrow>
            <SectionTitle className="mt-5">Programi za vaš tim</SectionTitle>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Sadržaj, lokaciju i način provedbe dogovaramo prema potrebama
              vašeg tima i našoj procjeni. Sve cijene uključuju PDV. Kliknite
              na program za opis i cjenik.
            </p>
          </div>
          <Link
            href="/upitnik"
            className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-accent-clay-dark underline underline-offset-4 sm:self-auto"
          >
            Niste sigurni? Ispunite upitnik
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-12">
          <ProgramKartice />
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
            <p className="mt-6 text-lg leading-relaxed text-white">
              Zamjena jednog stručnog zaposlenika košta tvrtku između 50 i 200
              posto njegove godišnje plaće. Ako program zadrži jednu osobu,
              platio se sam.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white">
              Zato ne prodajemo dojam, nego mjerimo.
            </p>
          </div>
          <div className="space-y-px">
            {POKAZATELJI.map((p) => (
              <div key={p.naslov} className="border-t border-white/15 py-6">
                <h3 className="text-lg font-bold text-white">{p.naslov}</h3>
                <p className="mt-2 leading-relaxed text-white">{p.tekst}</p>
              </div>
            ))}
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
                  Psihologinja i coach. Bivša časnica OSRH. Poznaje vodstvo i
                  hijerarhiju iznutra. Pomaže timovima i liderima izgraditi
                  psihološku otpornost i otvorenu komunikaciju pod pritiskom.
                </p>
              </div>
              <div className="border-l-2 border-accent-clay pl-5">
                <h3 className="font-bold text-brand-deep">Dinko</h3>
                <p className="mt-1.5 leading-relaxed text-ink-muted">
                  Ekonomist. Bivši dočasnik i vojni instruktor u OSRH. Prenosi
                  operativnu strukturu u poslovne timove i osmišljava vježbe u
                  kojima svatko ima svoju ulogu.
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
          <Foto
            foto="portretZajedno"
            pozicija="center 25%"
            className="w-full"
          />
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-20">
          <div>
            <Eyebrow>Instagram</Eyebrow>
            <SectionTitle className="mt-5">Zadnje objave</SectionTitle>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              Helena i Dinko na @{INSTAGRAM_HANDLE}. Pregled se ažurira s
              Instagramom.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-clay-dark underline underline-offset-4"
            >
              Otvori Instagram
              <ArrowRight size={15} />
            </a>
          </div>
          <InstagramFeed />
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
          <p className="mt-6 text-lg leading-relaxed text-white">
            Petnaest minuta razgovora, bez obveze. Ako procijenimo da vam ne
            možemo pomoći, reći ćemo vam.
          </p>
          <Link
            href="/kontakt"
            className="mt-9 inline-flex items-center gap-2 bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark"
          >
            Zatražite razgovor
            <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
