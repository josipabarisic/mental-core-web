import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/section";
import { UpitnikForma } from "@/components/upitnik-forma";
import { Foto } from "@/components/photo-slot";

export const metadata: Metadata = {
  title: "Upitnik o timu",
  description:
    "Provjerite gdje vaš tim stoji. Ispunite upitnik, a mi vam na e-mail šaljemo feedback i ponudu.",
};

const KORACI = [
  { broj: "01", tekst: "Ispunite upitnik. Traje oko pet minuta." },
  { broj: "02", tekst: "Pregledavamo vaše odgovore i pripremamo feedback." },
  { broj: "03", tekst: "Na e-mail dobivate naš feedback i ponudu za vaš tim." },
];

export default function Upitnik() {
  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <Eyebrow tone="dark">Upitnik</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl leading-[1.1] font-bold tracking-[-0.02em] text-surface sm:text-5xl">
            Provjerite gdje vaš tim stoji
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-line">
            Ispunite upitnik. Nakon slanja upitnika na e-mail dobivate naš
            feedback i ponudu.
          </p>
        </div>
      </section>

      <Section tone="alt">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <UpitnikForma />
          <div>
            <h2 className="eyebrow text-accent-clay">Kako izgleda dalje</h2>
            <ol className="mt-5 space-y-5">
              {KORACI.map((k) => (
                <li key={k.broj} className="flex gap-4">
                  <span className="text-sm font-bold tracking-[0.1em] text-accent-clay">
                    {k.broj}
                  </span>
                  <span className="leading-relaxed text-ink">{k.tekst}</span>
                </li>
              ))}
            </ol>
            <Foto
              foto="upitnik"
              sizes="(min-width: 1024px) 380px, 100vw"
              pozicija="center 35%"
              className="mt-10 hidden lg:block"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
