import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Section } from "@/components/section";
import { LegalOdlomak } from "@/components/legal";
import { KONTAKT_MAIL, TVRTKA } from "@/lib/kontakt";

export const metadata: Metadata = {
  title: "Politika o kolačićima",
  description:
    "Mental Core na webu ne koristi kolačiće za analitiku, oglašavanje ni praćenje.",
};

export default function PolitikaKolacica() {
  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <Eyebrow tone="dark">Pravne informacije</Eyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl">
            Politika o kolačićima
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
            Na ovoj stranici ne radimo analitiku i ne postavljamo kolačiće za
            praćenje. Zadnje ažuriranje: 10. listopada 2026.
          </p>
        </div>
      </section>

      <Section tone="surface">
        <div className="mx-auto max-w-3xl space-y-10">
          <LegalOdlomak naslov="Što su kolačići">
            <p>
              Kolačići su male datoteke koje web-stranica može spremiti u
              preglednik. Neki služe da stranica radi, neki da mjere posjete
              ili prikazuju oglase.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Što mi ne radimo">
            <p>
              {TVRTKA} na ovom webu ne koristi kolačiće za analitiku,
              oglašavanje, personalizaciju ni praćenje ponašanja. Ne koristimo
              alate poput Google Analyticsa, Facebook Piksela ili sličnih
              servisa.
            </p>
            <p>
              Zato ne prikazujemo banner za privolu. Nema izbornih kolačića
              koje biste trebali prihvatiti ili odbijati.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Tehnički kolačići">
            <p>
              Preglednik ili hosting ponekad mogu postaviti strogo nužan
              kolačić da se stranica prikaže. Takav kolačić ne služi mjerenju
              posjeta niti izradi profila.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="E-mail i obrasci">
            <p>
              Obrasci ne postavljaju kolačiće za marketing. Ako nam pošaljete
              upit, to nije pretplata na newsletter. Više o tome stoji u{" "}
              <Link
                href="/pravila-privatnosti"
                className="underline underline-offset-4"
              >
                Pravilima privatnosti
              </Link>
              .
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Instagram">
            <p>
              Na početnoj stranici možete prikazati zadnje objave s Instagrama
              (@mentalcoreteam). Pregled se ne učitava sam. Tek kad kliknete
              Instagram (Meta) može postaviti vlastite kolačiće. Te kolačiće
              ne kontroliramo i ne koristimo ih za mjerenje posjeta našeg
              weba.
            </p>
          </LegalOdlomak>

          <LegalOdlomak naslov="Ako se ovo promijeni">
            <p>
              Ako jednog dana uvedemo analitiku ili druge neobavezne kolačiće,
              ovu stranicu ćemo ažurirati i, ako bude potrebno, zatražiti
              privolu prije nego ih postavimo.
            </p>
            <p>
              Pitanja šaljite na{" "}
              <a
                href={`mailto:${KONTAKT_MAIL}`}
                className="underline underline-offset-4"
              >
                {KONTAKT_MAIL}
              </a>
              .
            </p>
          </LegalOdlomak>
        </div>
      </Section>
    </>
  );
}
