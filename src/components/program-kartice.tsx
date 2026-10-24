"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROGRAMI, eur } from "@/lib/programi";
import { otvoriRazgovor } from "@/components/razgovor";

export function ProgramKartice({ naslovRazina = 3 }: { naslovRazina?: 2 | 3 }) {
  const Naslov = naslovRazina === 2 ? "h2" : "h3";

  return (
    <div className="-mx-5 flex snap-x snap-mandatory scroll-ps-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:scroll-ps-0 md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
      {PROGRAMI.map((p) => {
        const href = p.bezStranice ? "/kontakt" : `/programi/${p.slug}`;
        return (
          <article
            key={p.slug}
            className={cn(
              "relative flex w-[85vw] shrink-0 snap-start flex-col border-2 bg-white p-7 focus-within:border-accent-clay motion-safe:transition motion-safe:duration-200 md:w-auto md:shrink md:hover:-translate-y-1 md:hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]",
              p.preporuceno
                ? "border-accent-clay"
                : "border-line md:hover:border-accent-clay",
            )}
          >
            {p.preporuceno && (
              <p className="mb-4 text-[0.7rem] font-bold tracking-[0.18em] text-accent-clay uppercase">
                Preporučeno
              </p>
            )}
            <Naslov className="text-xl font-bold text-brand-deep">
              {p.naziv}
            </Naslov>
            <p className="mt-1.5 text-sm font-medium text-accent-clay-dark">
              {p.podnaslov}
            </p>
            <p className="mt-4 flex-1 leading-relaxed text-ink-muted">
              {p.sazetak}
            </p>
            <div className="mt-6 border-t border-line pt-5">
              <ul className="space-y-1.5 text-sm text-ink-muted">
                {p.detalji.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="mt-5">
                <p className="text-sm text-ink-muted">
                  {p.cijenaOd ? (
                    <>
                      od{" "}
                      <span className="text-lg font-bold text-brand-deep">
                        {eur(p.cijenaOd)}
                      </span>
                      <span className="block text-xs">PDV uključen</span>
                    </>
                  ) : (
                    <span className="font-semibold text-brand-deep">
                      Cijena po dogovoru
                    </span>
                  )}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => otvoriRazgovor(p.naziv)}
                    className="gumb relative z-10 inline-flex min-h-12 w-full items-center justify-center gap-1.5 bg-accent-clay px-4 text-sm font-bold text-white hover:bg-accent-clay-dark"
                  >
                    Zatražite razgovor
                    <ArrowRight size={16} />
                  </button>
                  {!p.bezStranice && (
                    <Link
                      href={href}
                      className="inline-flex min-h-12 items-center justify-center gap-1.5 text-sm font-semibold text-accent-clay-dark after:absolute after:inset-0 md:min-h-0 md:justify-start"
                    >
                      Detalji i cijene
                      <ArrowRight size={16} />
                      <span className="sr-only">, {p.naziv}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
