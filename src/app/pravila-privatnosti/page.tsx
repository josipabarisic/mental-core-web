import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Section } from "@/components/section";
import { LegalOdlomak } from "@/components/legal";
import {
  KONTAKT_MAIL,
  OIB,
  SJEDISTE,
  TVRTKA,
  TVRTKA_PUNI_NAZIV,
} from "@/lib/kontakt";

export const metadata: Metadata = {
  title: "Pravila privatnosti",
  description:
    "Kako Mental Core tretira osobne podatke. Na webu ne radimo analitiku i ne skupljamo e-mailove za newsletter.",
};

export default function PravilaPrivatnosti() {
  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <Eyebrow tone="dark">Pravne informacije</Eyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl">
            Pravila privatnosti
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
            Što radimo s podacima, a što ne radimo. Zadnje ažuriranje: 10.
            listopada 2026.
          </p>
        </div>
      </section>

      <Section tone="surface">
        <div className="mx-auto max-w-3xl space-y-10">
          <LegalOdlomak naslov="Tko je voditelj obrade">
            <p>
              Voditelj obrade je {TVRTKA_PUNI_NAZIV} ({TVRTKA}), {SJEDISTE}.
              OIB: {OIB}.
            </p>
            <p>
              Za pitanja o osobnim podacima pišite na{" "}
              <a
                href={`mailto:${KONTAKT_MAIL}`}
                className="underline underline-offset-4"
              >
                {KONTAKT_MAIL}
              </a>
              .
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Što ovaj web ne radi">
            <p>
              Na ovoj stranici ne koristimo alate za analitiku, praćenje
              ponašanja ni oglašavanje. Ne postavljamo kolačiće u tu svrhu.
            </p>
            <p>
              Ne vodimo newsletter. Ne skupljamo e-mail adrese s weba. Ne
              kupujemo ni ne dijelimo kontakt-liste.
            </p>
            <p>
              Na početnoj stranici možete učitati pregled Instagrama. Učitava
              se samo ako kliknete. Tada Instagram (Meta) može postaviti
              vlastite kolačiće. Mi ih ne koristimo za svoju analitiku.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Kad nam sami nešto pošaljete">
            <p>
              Ako ispunite obrazac za upit ili upitnik, šaljete nam ono što
              upišete: ime, tvrtku, e-mail, veličinu tima i sadržaj poruke ili
              odgovora. Tu adresu koristimo samo da vam odgovorimo i, ako ste
              to zatražili, pošaljemo feedback ili ponudu.
            </p>
            <p>
              Tu adresu ne stavljamo na mailing listu. Ne šaljemo newsletter
              bez vašeg pristanka. Ako nam više ne trebate odgovor, možete
              zatražiti da poruku obrišemo.
            </p>
            <p>
              Pravna osnova je poduzimanje koraka na vaš zahtjev prije
              sklapanja ugovora, odnosno naš legitimni interes da odgovorimo na
              upit koji ste nam poslali.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Koliko čuvamo podatke">
            <p>
              Poruku čuvamo onoliko koliko treba da odgovorimo i da dogovor, ako
              ga bude, ima smisla. Nakon toga je ne držimo dulje nego što je
              potrebno za tu svrhu ili zbog zakonskih obveza.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="S kime dijelimo podatke">
            <p>
              Podatke ne prodajemo i ne predajemo za marketing. Tehnički ih
              mogu vidjeti samo pružatelj hostinga stranice i e-mail usluga
              kojom poruka stiže do nas, i to samo da stranica i slanje
              rade.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Kolačići">
            <p>
              Ne koristimo kolačiće za analitiku, oglašavanje ni praćenje.
              Pojedinosti su u{" "}
              <Link
                href="/politika-o-kolacicima"
                className="underline underline-offset-4"
              >
                Politici o kolačićima
              </Link>
              .
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Vaša prava">
            <p>
              Možete zatražiti uvid, ispravak, brisanje, ograničenje obrade,
              prigovor i prijenos podataka, tamo gdje to zakon predviđa.
              Pišite nam na {KONTAKT_MAIL}.
            </p>
            <p>
              Pravo na pritužbu imate i Agenciji za zaštitu osobnih podataka
              (AZOP), Selska cesta 136, 10000 Zagreb,{" "}
              <a
                href="https://azop.hr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                azop.hr
              </a>
              .
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Izmjene">
            <p>
              Ako se način rada stranice promijeni, na primjer ako uvedemo
              analitiku, ova pravila ćemo ažurirati na ovoj adresi.
            </p>
          </LegalOdlomak>
        </div>
      </Section>
    </>
  );
}
