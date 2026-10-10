import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Section, SectionTitle } from "@/components/section";
import {
  KONTAKT_MAIL,
  DATUM_OSNIVANJA,
  DIREKTOR,
  MBS,
  OIB,
  SJEDISTE,
  TVRTKA,
  TVRTKA_PUNI_NAZIV,
} from "@/lib/kontakt";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Podaci o društvu Psihologija po mjeri j.d.o.o.",
};

const PODACI = [
  { oznaka: "Puni naziv", vrijednost: TVRTKA_PUNI_NAZIV },
  { oznaka: "Skraćeni naziv", vrijednost: TVRTKA },
  { oznaka: "Sjedište i adresa", vrijednost: SJEDISTE },
  { oznaka: "OIB", vrijednost: OIB },
  { oznaka: "MBS", vrijednost: MBS },
  { oznaka: "Direktor", vrijednost: DIREKTOR },
  { oznaka: "Datum osnivanja", vrijednost: DATUM_OSNIVANJA },
];

export default function Impressum() {
  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <Eyebrow tone="dark">Pravne informacije</Eyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl">
            Impressum
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
            Podaci o društvu koje upravlja ovom web-stranicom.
          </p>
        </div>
      </section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Podaci o društvu</Eyebrow>
            <SectionTitle className="mt-5">Psihologija po mjeri</SectionTitle>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {PODACI.map(({ oznaka, vrijednost }) => (
              <div
                key={oznaka}
                className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="text-sm font-semibold text-brand-deep">
                  {oznaka}
                </dt>
                <dd className="leading-relaxed text-ink-muted">{vrijednost}</dd>
              </div>
            ))}
            <div className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-brand-deep">E-mail</dt>
              <dd>
                <a
                  href={`mailto:${KONTAKT_MAIL}`}
                  className="text-ink underline underline-offset-4"
                >
                  {KONTAKT_MAIL}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-10 max-w-2xl leading-relaxed text-ink-muted">
            Pogledajte i{" "}
            <Link
              href="/pravila-privatnosti"
              className="text-ink underline underline-offset-4"
            >
              Pravila privatnosti
            </Link>{" "}
            i{" "}
            <Link
              href="/politika-o-kolacicima"
              className="text-ink underline underline-offset-4"
            >
              Politiku o kolačićima
            </Link>
            .
          </p>
        </div>

      </Section>
    </>
  );
}
