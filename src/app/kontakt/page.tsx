import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { Eyebrow, Koraci, Section, SectionTitle } from "@/components/section";
import { KontaktForma } from "@/components/kontakt-forma";
import { KONTAKT_MAIL } from "@/lib/kontakt";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Recite nam gdje tim zapinje. Javljamo se u roku od jednog radnog dana, prvi razgovor traje 15 minuta i ne obvezuje.",
};

const KORACI = [
  { broj: "01", tekst: "Javljamo se u roku od jednog radnog dana." },
  {
    broj: "02",
    tekst: "Petnaest minuta razgovora o tome što se u timu stvarno događa.",
  },
  {
    broj: "03",
    tekst:
      "Ako ima smisla, šaljemo prijedlog programa i okvirnu cijenu. Ako nema, reći ćemo vam.",
  },
];

const LOGISTIKA = [
  {
    q: "Koliko unaprijed treba rezervirati termin?",
    a: "Uobičajeno tri do četiri tjedna, jer analiza tima ide prije programa.",
  },
  {
    q: "Radite li izvan Zagreba?",
    a: "Da, radimo na području cijele Hrvatske. Dolazimo u vaš prostor ili organiziramo lokaciju.",
  },
  {
    q: "Možete li program prilagoditi smjenskom ili hibridnom timu?",
    a: "Možemo. Analiza tima i radionice održavaju se u vašem prostoru, unutar radnog vremena, pa se najlakše uklapaju u smjene.",
  },
];

export default function Kontakt() {
  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <Eyebrow tone="dark">Kontakt</Eyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl">
            Recite nam gdje tim zapinje
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
            Javljamo se u roku od jednog radnog dana. Prvi razgovor traje 15
            minuta i ne obvezuje ni na što.
          </p>
        </div>
      </section>

      <Section tone="alt">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <KontaktForma />

          <div className="space-y-10">
            <div>
              <h2 className="eyebrow text-accent-clay">Kako izgleda dalje</h2>
              <Koraci stavke={KORACI} />
            </div>

            <div className="border-t border-line pt-8">
              <h2 className="eyebrow text-accent-clay">Izravan kontakt</h2>
              <ul className="mt-5 space-y-3.5">
                <li className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-ink-muted" />
                  <a
                    href={`mailto:${KONTAKT_MAIL}`}
                    className="text-ink underline underline-offset-4"
                  >
                    {KONTAKT_MAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-ink-muted" />
                  <span className="text-ink">
                    Radimo na području cijele Hrvatske
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ExternalLink size={17} className="shrink-0 text-ink" />
                  <a
                    href="https://www.linkedin.com/in/helena-i-dinko-maru%C5%A1%C4%8Dak-45b915440/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline underline-offset-4"
                  >
                    Helena i Dinko na LinkedInu
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Logistika</Eyebrow>
            <SectionTitle className="mt-5">Prije nego što pitate</SectionTitle>
          </div>
          <dl className="space-y-7">
            {LOGISTIKA.map((l) => (
              <div key={l.q} className="border-t border-line pt-5">
                <dt className="font-bold text-brand-deep">{l.q}</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{l.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
