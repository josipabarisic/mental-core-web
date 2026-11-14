"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROGRAMI, eur } from "@/lib/programi";
import { otvoriRazgovor } from "@/components/razgovor";

export function ProgramKartice({
  naslovRazina = 3,
  izgled = "klasicno",
}: {
  naslovRazina?: 2 | 3;
  /** "novo" je izgled s početne. Ostale stranice zadržavaju dosadašnje kartice. */
  izgled?: "klasicno" | "novo";
}) {
  const Naslov = naslovRazina === 2 ? "h2" : "h3";

  if (izgled === "novo") return <KarticeNovo Naslov={Naslov} />;
  return <KarticeKlasicno Naslov={Naslov} />;
}

function KarticeNovo({ Naslov }: { Naslov: "h2" | "h3" }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory scroll-ps-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pt-2 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:scroll-ps-0 md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
      {PROGRAMI.map((p) => {
        const href = p.bezStranice ? "/kontakt" : `/programi/${p.slug}`;
        const istaknut = !!p.preporuceno;
        const ime = p.naziv.replace(/^Mental Core /, "");
        const natpis = istaknut
          ? "Preporučeno"
          : ime !== p.naziv
            ? "Mental Core"
            : null;
        return (
          <article
            key={p.slug}
            className={cn(
              "relative flex h-full w-[85vw] shrink-0 snap-start flex-col p-8 transition-[translate,box-shadow,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:ring-2 focus-within:ring-accent-clay active:scale-[0.985] md:w-auto md:shrink md:hover:-translate-y-1.5 md:hover:shadow-[0_28px_50px_-30px_rgba(45,56,57,0.55)]",
              istaknut ? "bg-accent-clay text-white" : "bg-surface text-brand",
            )}
          >
            {natpis && (
              <p
                className={cn(
                  "natpis mb-4",
                  istaknut ? "text-white/70" : "text-accent-clay",
                )}
              >
                {natpis}
              </p>
            )}
            <div className="flex flex-1 flex-col">
              <Naslov className="font-display text-3xl leading-tight font-bold">
                <span className="sr-only">
                  {ime !== p.naziv && "Mental Core "}
                </span>
                {ime}
              </Naslov>
              <p
                className={cn(
                  "mt-1.5 text-sm font-medium",
                  istaknut ? "text-white/80" : "text-accent-clay-dark",
                )}
              >
                {p.podnaslov}
              </p>
              <p
                className={cn(
                  "mt-4 leading-relaxed",
                  istaknut ? "text-white/85" : "text-ink/80",
                )}
              >
                {p.sazetak}
              </p>
              <ul
                className={cn(
                  "mt-6 space-y-1.5 text-sm",
                  istaknut ? "text-white/80" : "text-ink/75",
                )}
              >
                {p.detalji.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div
              className={cn(
                "mt-8 border-t pt-5",
                istaknut ? "border-white/25" : "border-brand/15",
              )}
            >
              <p className="font-display text-2xl font-bold">
                {p.cijenaOd ? (
                  <>
                    <span className="text-base font-semibold">od </span>
                    {eur(p.cijenaOd)}
                    <span
                      className={cn(
                        "mt-0.5 block font-sans text-xs font-normal",
                        istaknut ? "text-white/75" : "text-ink/70",
                      )}
                    >
                      PDV uključen
                    </span>
                  </>
                ) : (
                  "Cijena po dogovoru"
                )}
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => otvoriRazgovor(p.naziv)}
                  className={cn(
                    "gumb relative z-10 inline-flex min-h-12 w-full items-center justify-center gap-1.5 px-6 text-center text-sm font-bold leading-tight",
                    istaknut
                      ? "bg-surface text-brand-deep hover:bg-white"
                      : "bg-accent-clay text-white hover:bg-accent-clay-dark",
                  )}
                >
                  Zatražite razgovor
                  <ArrowRight size={16} />
                </button>
                {!p.bezStranice && (
                  <Link
                    href={href}
                    className={cn(
                      "inline-flex min-h-12 items-center justify-center gap-1.5 text-center text-sm font-semibold leading-tight after:absolute after:inset-0",
                      istaknut ? "text-white" : "text-accent-clay-dark",
                    )}
                  >
                    Pogledajte što uključuje program
                    <ArrowRight size={16} />
                    <span className="sr-only">, {p.naziv}</span>
                  </Link>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function KarticeKlasicno({ Naslov }: { Naslov: "h2" | "h3" }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory scroll-ps-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:scroll-ps-0 md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
      {PROGRAMI.map((p) => {
        const href = p.bezStranice ? "/kontakt" : `/programi/${p.slug}`;
        return (
          <article
            key={p.slug}
            className={cn(
              "relative flex h-full w-[85vw] shrink-0 snap-start flex-col border-2 bg-white p-7 focus-within:border-accent-clay motion-safe:transition motion-safe:duration-200 md:w-auto md:shrink md:hover:-translate-y-1 md:hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]",
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
            <div className="flex flex-1 flex-col">
              <Naslov className="text-xl font-bold text-brand-deep">
                {p.naziv}
              </Naslov>
              <p className="mt-1.5 text-sm font-medium text-accent-clay-dark">
                {p.podnaslov}
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                {p.sazetak}
              </p>
              <ul className="mt-6 space-y-1.5 text-sm text-ink-muted">
                {p.detalji.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 border-t border-line pt-5">
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
                  className="gumb relative z-10 inline-flex min-h-12 w-full items-center justify-center gap-1.5 bg-accent-clay px-6 text-center text-sm font-bold leading-tight text-white hover:bg-accent-clay-dark"
                >
                  Zatražite razgovor
                  <ArrowRight size={16} />
                </button>
                {!p.bezStranice && (
                  <Link
                    href={href}
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 text-center text-sm font-semibold leading-tight text-accent-clay-dark after:absolute after:inset-0"
                  >
                    Pogledajte što uključuje program
                    <ArrowRight size={16} />
                    <span className="sr-only">, {p.naziv}</span>
                  </Link>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
