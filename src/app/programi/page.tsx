import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section } from "@/components/section";
import { ProgramKartice } from "@/components/program-kartice";

export const metadata: Metadata = {
  title: "Programi",
  description:
    "Analiza tima i radionice, Mental Core MINI, STANDARD, MAXI, PREMIUM i FUN. Opisi programa i cijene s PDV-om.",
};

export default function Programi() {
  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <Eyebrow tone="dark">Ponuda</Eyebrow>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl">
            Šest načina za naš početak
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
            Od analize tima u vašem prostoru do dvodnevnog programa na terenu.
            Sve cijene uključuju PDV.
          </p>
        </div>
      </section>

      <Section tone="alt">
        <ProgramKartice naslovRazina={2} />
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl leading-relaxed text-ink">
            Niste sigurni koji program? Ispunite upitnik, a mi vam na e-mail
            šaljemo feedback i ponudu.
          </p>
          <Link
            href="/upitnik"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark"
          >
            Ispunite upitnik
            <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
