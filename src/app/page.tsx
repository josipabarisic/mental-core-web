import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FaqSchema } from "@/components/structured-data";
import { OG_IMAGE } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, NoviIzgledOkvir, Section, SectionTitle, Tiho } from "@/components/section";
import { Otkrij, Vrtuljak } from "@/components/pokret";
import { Foto } from "@/components/photo-slot";
import { InstagramFeed } from "@/components/instagram-feed";
import { ProgramKartice } from "@/components/program-kartice";
import { OtvoriRazgovor, RazgovorObrazac } from "@/components/razgovor";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/kontakt";

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
    naslov: "Zajednički osvrt",
    tekst:
      "Ono što se dogodi na terenu razložimo zajedno i prevedemo u ono što tim radi u uredu.",
  },
];

const DAN = [
  {
    kada: "Jutro",
    naslov: "Dolazak",
    tekst: "Stižemo na teren, kratko se predstavimo i dogovorimo kako dan ide.",
  },
  {
    kada: "Prijepodne",
    naslov: "Prvi zadatak",
    tekst:
      "Lagani zadatak za zagrijavanje. Svatko se uključi na svoj način i ekipa se brzo opusti.",
  },
  {
    kada: "Podne",
    naslov: "Ručak",
    tekst: "Pauza bez programa. Ljudi pričaju o onome što se upravo dogodilo.",
  },
  {
    kada: "Popodne",
    naslov: "Glavni izazov",
    tekst:
      "Duži zadatak na terenu. Tim mora donijeti odluku i izvesti je do kraja.",
  },
  {
    kada: "Kraj dana",
    naslov: "Završni krug",
    tekst:
      "Sjednemo zajedno. Što se vidjelo na terenu, i što od toga ostaje u uredu.",
  },
];

const UVOD_FOTO = [
  ["orijentacija", "center 60%"],
  ["povjerenje", "center 55%"],
  ["teren", "center 50%"],
] as const;

const meko = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const podigni = `transition-[translate,box-shadow,scale] duration-500 ${meko} active:scale-[0.985] md:hover:-translate-y-1.5 md:hover:shadow-[0_28px_50px_-30px_rgba(45,56,57,0.55)]`;
const veza =
  "group/veza inline-flex items-center gap-1 text-[0.95rem] font-semibold";
const strelica = `transition-transform duration-300 ${meko} group-hover/veza:translate-x-1`;
const gumb =
  "gumb inline-flex min-h-12 items-center justify-center gap-2 bg-accent-clay px-7 text-center text-sm font-bold leading-tight text-white hover:bg-accent-clay-dark";

export const metadata: Metadata = {
  title: {
    absolute: "Teambuilding i razvoj timova | Mental Core",
  },
  description:
    "Teambuilding koji se pamti, i koji se vidi u uredu. Dan na terenu s psihologinjom i vojnim instruktorima.",
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "./",
    siteName: "Mental Core",
    title: "Teambuilding i razvoj timova | Mental Core",
    description:
      "Teambuilding koji se pamti, i koji se vidi u uredu. Dan na terenu s psihologinjom i vojnim instruktorima.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teambuilding i razvoj timova | Mental Core",
    description:
      "Dan na terenu koji tim pamti, i koji se vidi kad se vrate u ured.",
    images: [OG_IMAGE.url],
  },
};

const PITANJA = [
  {
    q: "Po čemu se Mental Core razlikuje od klasičnog teambuildinga?",
    a: "Kod nas ima zabave, ali ne samo zabave. Dan čine zadaci na terenu i zajednički osvrt, tako da se nešto od dana vidi i kad se vratite u ured.",
  },
  {
    q: "Za koga su namijenjeni Mental Core programi?",
    a: "Za timove i lidere koji se suočavaju s izazovima u komunikaciji, odgovornosti ili donošenju odluka pod pritiskom. Programi su prilagođeni timovima od 3 do 40+ osoba. Sjedište nam je u okolici Zagreba, najzgodnija nam je Zagrebačka županija, a otvoreni smo za rad diljem Hrvatske.",
  },
  {
    q: "Kako mjerite učinak?",
    a: "Usporedimo upitnik prije i poslije: komunikaciju, povjerenje i usklađenost s ciljevima. Uz to gledamo ono što tvrtka ionako prati, fluktuaciju, apsentizam i angažiranost, te brzinu odlučivanja u 90 dana nakon programa. Zamjena jednog stručnog zaposlenika košta tvrtku između 50 i 200 posto njegove godišnje plaće. Ako program zadrži jednu osobu, platio se sam.",
  },
  {
    q: "Što ostane nakon dana?",
    a: "Zajednički osvrt: što se vidjelo na terenu i što tim nosi u ured. Ako voditelj treba zapis, taj osvrt ide i na papir, s obrascima i preporukama, bez pojedinačnih izjava i imena.",
  },
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
    a: "Da. Dolazimo iz posla u kojem se poslovne tajne čuvaju, a ne prepričavaju. Ono što nam povjerite, ostaje kod nas. To možemo garantirati. Zapis za voditelja, ako ga traži, sadrži obrasce i preporuke, nikada pojedinačne izjave ni imena. Fotografije, video i snimanje idu samo uz vaše odobrenje.",
  },
];

export default function Pocetna() {
  return (
    <NoviIzgledOkvir>
    <>
      <FaqSchema stavke={PITANJA} />
      {/* Uvod */}
      <section id="uvod" className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 text-center md:pt-24 lg:px-8">
          <p className="uvod eyebrow text-accent-clay">
            Teambuilding i razvoj timova
          </p>
          <h1
            style={{ animationDelay: "80ms" }}
            className="uvod font-display mx-auto mt-4 max-w-5xl text-balance text-[clamp(2.4rem,1rem+5vw,4.8rem)] leading-[1.06] font-bold text-brand"
          >
            <span className="block">Teambuilding koji se pamti.</span>{" "}
            <span className="mt-1 inline-block bg-accent-clay/12 px-[0.18em] text-accent-clay">
              I koji se vidi u uredu.
            </span>
          </h1>
          <p
            style={{ animationDelay: "160ms" }}
            className="uvod mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl"
          >
            Dan na terenu s psihologinjom i vojnim instruktorom. Zadaci koji
            izvuku ljude iz uloga i zajednički osvrt na kraju.
          </p>
          <div
            style={{ animationDelay: "240ms" }}
            className="uvod mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8"
          >
            <OtvoriRazgovor className={`${gumb} w-full sm:w-auto`}>
              Zatražite razgovor
            </OtvoriRazgovor>
            <a href="#ponuda" className={`${veza} text-brand`}>
              Pogledajte ponudu
              <ChevronRight size={17} className={strelica} />
            </a>
            <Link href="/upitnik" className={`${veza} text-brand`}>
              Provjerite gdje vaš tim stoji
              <ChevronRight size={17} className={strelica} />
            </Link>
          </div>
          <p
            style={{ animationDelay: "300ms" }}
            className="uvod mt-6 text-sm font-medium text-ink/70"
          >
            Što nam povjerite, ostaje kod nas. To možemo garantirati.
          </p>
        </div>

        <div
          style={{ animationDelay: "360ms" }}
          className="uvod mx-auto max-w-6xl px-5 pb-20 md:pb-28 lg:px-8"
        >
          <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {UVOD_FOTO.map(([foto, pozicija], i) => (
              <Foto
                key={foto}
                foto={foto}
                pozicija={pozicija}
                priority={i === 1}
                sizes="(min-width: 768px) 33vw, 80vw"
                className="aspect-[4/5] w-[80%] shrink-0 snap-start max-md:aspect-[4/5] max-md:h-auto max-md:max-h-none md:w-auto"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Uspjeh tima */}
      <Section tone="alt" unutra="max-w-4xl text-center">
        <p className="font-display text-balance text-[clamp(1.9rem,1.1rem+2.8vw,3rem)] leading-[1.12] font-bold tracking-[-0.03em] text-brand">
          Uspjeh je rezultat{" "}
          <span className="text-accent-clay">
            uspješnog funkcioniranja tima.
          </span>
        </p>
        <p className="lead mx-auto mt-7 max-w-2xl text-ink/80">
          Vrijeme je da vaš tim postane više od grupe ljudi koji rade zajedno.
          Gradimo timove koji vjeruju jedni drugima, surađuju i zajedno stvaraju
          rezultate. Jer tim je jak onoliko koliko su jake njegove veze.
        </p>
      </Section>

      {/* Bez dvorane */}
      <Section tone="surface">
        <SectionTitle className="max-w-3xl">
          Bez prezentacija u dvorani. <Tiho>Tim radi, a ne sluša.</Tiho>
        </SectionTitle>
        <div className="mt-12 grid gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
          <Otkrij className="md:col-span-2 md:row-span-2">
            <div className="relative h-full min-h-[420px] overflow-hidden">
              <Foto
                foto="koordinacija"
                pozicija="center 40%"
                sizes="(min-width: 768px) 66vw, 90vw"
                className="absolute inset-0 aspect-auto h-full max-md:aspect-auto max-md:h-full max-md:max-h-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/15 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-8 text-surface md:p-10">
                <p className="natpis text-surface/75">Teren i izazovi</p>
                <h3 className="font-display mt-3 max-w-md text-[clamp(1.6rem,1rem+1.6vw,2.4rem)] leading-[1.1] font-bold tracking-[-0.03em]">
                  Većinu dana ste vani i rješavate zadatke zajedno.
                </h3>
              </div>
            </div>
          </Otkrij>
          <Otkrij kasnjenje={110}>
            <article
              className={`flex h-full flex-col bg-brand p-8 text-surface ${podigni}`}
            >
              <p className="natpis text-surface/60">Tko vas vodi</p>
              <h3 className="font-display mt-4 text-2xl leading-tight font-bold">
                Psihologinja i vojni instruktori
              </h3>
              <p className="mt-auto pt-6 leading-relaxed text-surface/75">
                Ljudi koji znaju voditi grupu i kad postane napeto.
              </p>
            </article>
          </Otkrij>
          <Otkrij kasnjenje={220}>
            <article
              className={`flex h-full flex-col bg-accent-clay p-8 text-white ${podigni}`}
            >
              <p className="natpis text-white/70">Što ostaje</p>
              <h3 className="font-display mt-4 text-2xl leading-tight font-bold">
                Dan koji tim pamti
              </h3>
              <p className="mt-auto pt-6 leading-relaxed text-white/85">
                Puno smijeha, a na kraju zajednički osvrt koji ide u ured.
              </p>
            </article>
          </Otkrij>
        </div>
      </Section>

      {/* Dan s nama */}
      <Section tone="dark" id="dan">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="dark">Teren</Eyebrow>
            <SectionTitle tone="dark" className="mt-4">
              Kako izgleda dan s nama
            </SectionTitle>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-surface/70">
            Jedan dan, od dolaska do završnog kruga.
          </p>
        </div>
        <div className="mt-12">
          <Vrtuljak oznaka="Koraci jednog dana" svijetlo>
            {DAN.map((d, i) => (
              <article
                key={d.naslov}
                className={`relative flex min-h-[320px] w-[78%] shrink-0 snap-start flex-col bg-surface p-8 text-brand sm:w-[46%] lg:w-[calc((100%-24px)/3)] ${podigni}`}
              >
                <p className="natpis text-accent-clay">{d.kada}</p>
                <span
                  aria-hidden
                  className="font-display absolute top-5 right-7 text-7xl font-bold tracking-[-0.05em] text-brand/[0.07]"
                >
                  {`0${i + 1}`}
                </span>
                <h3 className="font-display mt-auto text-3xl font-bold">
                  {d.naslov}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/80">{d.tekst}</p>
              </article>
            ))}
          </Vrtuljak>
        </div>
      </Section>

      {/* Problem */}
      <Section tone="surface" unutra="max-w-4xl text-center">
        <Eyebrow>Problem</Eyebrow>
        <SectionTitle className="mt-4">
          Je li vaš teambuilding samo još jedan izlet u prirodu?
        </SectionTitle>
        <blockquote className="font-display mt-10 text-balance text-[clamp(1.5rem,1rem+1.8vw,2.25rem)] leading-[1.2] font-bold tracking-[-0.025em] text-brand">
          „Ljudi se dobro provedu. Vrate se u ured i sve ostane isto.{" "}
          <span className="text-accent-clay">
            Kod nas zabava dolazi iz zadataka koji ostaju u sjećanju.”
          </span>
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Foto
            foto="portretZajedno"
            pozicija="center 30%"
            sizes="48px"
            className="aspect-square size-12 max-md:aspect-square max-md:h-12 max-md:max-h-12"
          />
          <p className="text-sm font-semibold text-brand">Helena i Dinko</p>
        </div>
      </Section>

      {/* Jak tim */}
      <Section tone="alt">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Tim</Eyebrow>
            <SectionTitle className="mt-4">
              Jak tim ne nastaje slučajno. <Tiho>Gradi se.</Tiho>
            </SectionTitle>
            <div className="mt-8 space-y-4 leading-relaxed">
              <p className="lead text-ink">
                Tim nije samo skup pojedinaca. Tim čine odnosi, povjerenje,
                komunikacija i sposobnost da ljudi djeluju zajedno, čak i onda
                kada se ne slažu. Uspješni rezultati nisu posljedica samo
                individualnog talenta. Oni su rezultat dobrog funkcioniranja
                cijelog tima.
              </p>
              <p className="text-lg text-ink/80">
                Snaga tima mjeri se kvalitetom odnosa među njegovim članovima.
                Kada postoje povjerenje, otvorena komunikacija i spremnost na
                suradnju, tim ne samo da bolje funkcionira. On napreduje.
              </p>
              <p className="font-display py-2 text-2xl leading-snug font-bold tracking-[-0.02em] text-accent-clay">
                Zato teambuilding nije samo druženje izvan ureda.
              </p>
              <p className="text-lg text-ink/80">
                To je prilika da se članovi tima bolje upoznaju i povežu, nauče
                slušati jedni druge, prepoznaju svoje različitosti i zajedno
                pronađu način da ih pretvore u snagu.
              </p>
              <p className="text-lg text-ink/80">
                <span className="font-semibold text-brand">
                  A konflikti? I oni su dio svakog tima.
                </span>{" "}
                Ne moraju biti problem. Mogu biti prilika za učenje, razvoj i
                napredak.
              </p>
            </div>
          </div>
          <Foto foto="suradnja" pozicija="center 30%" className="w-full" />
        </div>
      </Section>

      {/* Tri stupa */}
      <Section tone="surface">
        <div className="max-w-3xl">
          <Eyebrow>Diferencijacija</Eyebrow>
          <SectionTitle className="mt-4">
            Zašto ovo nije klasičan teambuilding?
          </SectionTitle>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-3 md:gap-4">
          {STUPOVI.map((s, i) => (
            <Otkrij key={s.naslov} kasnjenje={i * 110}>
              <article
                className={`relative flex h-full flex-col bg-surface-alt p-8 ${podigni}`}
              >
                <span
                  aria-hidden
                  className="font-display absolute top-5 right-7 text-6xl font-bold tracking-[-0.05em] text-brand/[0.08]"
                >
                  {`0${i + 1}`}
                </span>
                <h3 className="font-display mt-16 text-2xl leading-tight font-bold text-brand">
                  {s.naslov}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/80">{s.tekst}</p>
              </article>
            </Otkrij>
          ))}
        </div>
      </Section>

      {/* Kako izgleda suradnja */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">Proces</Eyebrow>
          <SectionTitle tone="dark" className="mt-4">
            Tri koraka, <Tiho>ne jedan dan</Tiho>
          </SectionTitle>
          <p className="lead mt-5 text-surface/75">
            Dan na terenu je srce. Prije njega se dogovorimo što tim treba, a
            poslije sjednemo na zajednički osvrt.
          </p>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-3 md:gap-4">
          {KORACI.map((k, i) => (
            <Otkrij key={k.broj} kasnjenje={i * 110}>
              <article
                className={`relative flex h-full min-h-[280px] flex-col bg-surface p-8 text-brand ${podigni}`}
              >
                <p className="natpis text-accent-clay">Korak {k.broj}</p>
                <span
                  aria-hidden
                  className="font-display absolute top-5 right-7 text-7xl font-bold tracking-[-0.05em] text-brand/[0.07]"
                >
                  {k.broj}
                </span>
                <h3 className="font-display mt-auto text-3xl font-bold">
                  {k.naslov}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/80">{k.tekst}</p>
              </article>
            </Otkrij>
          ))}
        </div>
      </Section>

      {/* Ponuda */}
      <Section tone="alt" id="ponuda">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Ponuda</Eyebrow>
            <SectionTitle className="mt-4">Programi za vaš tim</SectionTitle>
            <p className="lead mt-5 text-ink/80">
              Sadržaj, lokaciju i način provedbe dogovaramo prema potrebama
              vašeg tima i našoj procjeni. Sjedište nam je u okolici Zagreba.
              Najzgodnija nam je Zagrebačka županija, a otvoreni smo za rad
              diljem Hrvatske. Sve cijene uključuju PDV. Kliknite na program za
              opis i cjenik.
            </p>
          </div>
          <Link
            href="/upitnik"
            className={`${veza} shrink-0 self-start text-accent-clay-dark sm:self-auto`}
          >
            Niste sigurni? Ispunite upitnik
            <ChevronRight size={17} className={strelica} />
          </Link>
        </div>
        <div className="mt-12">
          <ProgramKartice izgled="novo" />
        </div>
      </Section>

      {/* Mjerenje */}
      <section className="bg-accent-clay text-white">
        <Otkrij className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2 md:items-end md:py-28 lg:px-8">
          <div>
            <p className="eyebrow text-white/75">Nakon dana</p>
            <h2 className="font-display mt-4 text-balance text-[clamp(2rem,1.2rem+3vw,3.25rem)] leading-[1.08] font-bold">
              Kako znate da je vrijedilo
            </h2>
          </div>
          <p className="font-display text-balance text-[clamp(1.4rem,1rem+1.4vw,2rem)] leading-[1.2] font-bold tracking-[-0.02em] text-white/90">
            Ako program zadrži jednu osobu, platio se sam.
          </p>
        </Otkrij>
      </section>

      {/* Osnivači */}
      <Section tone="surface">
        <div className="max-w-3xl">
          <Eyebrow>Autoritet</Eyebrow>
          <SectionTitle className="mt-4">
            Metode razvijene ondje gdje greška ima posljedice
          </SectionTitle>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-2 md:gap-4">
          {[
            {
              foto: "helena" as const,
              pozicija: "center 72%",
              ime: "Helena",
              uloga: "Psihologinja i bivša časnica OSRH",
              tekst:
                "Psihologinja. Bivša časnica OSRH, s terena i iz vojske. Poznaje vodstvo i hijerarhiju iznutra. Coach je sljedeći korak: pomaže timovima i liderima izgraditi psihološku otpornost i otvorenu komunikaciju pod pritiskom.",
            },
            {
              foto: "dinko" as const,
              pozicija: "center 20%",
              ime: "Dinko",
              uloga: "Bivši dočasnik i vojni instruktor",
              tekst:
                "Ekonomist. Bivši dočasnik i vojni instruktor u OSRH. Prenosi operativnu strukturu u poslovne timove i osmišljava vježbe u kojima svatko ima svoju ulogu.",
            },
          ].map((o, i) => (
            <Otkrij key={o.ime} kasnjenje={i * 120}>
              <article
                className={`flex h-full flex-col bg-surface-alt ${podigni}`}
              >
                <Foto
                  foto={o.foto}
                  pozicija={o.pozicija}
                  sizes="(min-width: 768px) 50vw, 90vw"
                  className="aspect-[4/3] max-md:aspect-[4/3] max-md:h-auto max-md:max-h-none"
                />
                <div className="p-8">
                  <p className="natpis text-accent-clay">{o.uloga}</p>
                  <h3 className="font-display mt-3 text-3xl font-bold text-brand">
                    {o.ime}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink/80">{o.tekst}</p>
                </div>
              </article>
            </Otkrij>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl leading-snug font-bold tracking-[-0.02em] text-balance text-brand">
            Držimo prostor i vodimo vas i kada postane teško.
          </p>
          <Link
            href="/o-nama"
            className={`${veza} shrink-0 text-accent-clay-dark`}
          >
            Više o nama
            <ChevronRight size={17} className={strelica} />
          </Link>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-20">
          <div>
            <Eyebrow>Instagram</Eyebrow>
            <SectionTitle className="mt-4">Zadnje objave</SectionTitle>
            <p className="lead mt-5 text-ink">
              Helena i Dinko na @{INSTAGRAM_HANDLE}. Profil se otvara u novom
              tabu.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${veza} mt-6 text-accent-clay-dark`}
            >
              Otvori Instagram
              <ChevronRight size={17} className={strelica} />
            </a>
          </div>
          <div className="bg-surface p-3 sm:p-4">
            <InstagramFeed />
          </div>
        </div>
      </Section>

      {/* Za koga nije */}
      <Section tone="surface" unutra="pb-0 md:pb-0">
        <div className="bg-surface-alt px-6 py-10 sm:px-12 sm:py-14">
          <Eyebrow>Granice</Eyebrow>
          <SectionTitle className="mt-4">Kad nismo pravi izbor</SectionTitle>
          <p className="lead mt-6 max-w-2xl text-ink">
            Kod nas ima zabave, ali ne samo zabave. Ako želite isključivo
            opušteni izlet, reći ćemo vam iskreno.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Česta pitanja</Eyebrow>
            <SectionTitle className="mt-4">
              Ono što HR obično pita prvo
            </SectionTitle>
          </div>
          <Accordion multiple={false} className="w-full">
            {PITANJA.map((p, i) => (
              <AccordionItem
                key={p.q}
                value={`p-${i}`}
                className="border-b border-brand/15"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-semibold tracking-[-0.01em] text-brand hover:no-underline">
                  {p.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-ink/80">
                  {p.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Završni CTA */}
      <Section id="razgovor" tone="dark">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle
              tone="dark"
              className="text-[clamp(2.2rem,1.1rem+3.6vw,3.75rem)]"
            >
              Recite nam gdje tim zapinje
            </SectionTitle>
            <p className="lead mt-6 text-surface">
              Petnaest minuta razgovora, bez obveze. Ako procijenimo da vam ne
              možemo pomoći, reći ćemo vam.
            </p>
            <p className="mt-4 leading-relaxed text-surface/75">
              Javljamo se unutar 24 radna sata, s konkretnim prijedlogom koraka.
              Bez generičke prezentacije.
            </p>
          </div>
          <div className="bg-surface">
            <RazgovorObrazac idPrefix="podnozje" />
          </div>
        </div>
      </Section>
    </>
    </NoviIzgledOkvir>
  );
}
