import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROGRAMI, eur } from "@/lib/programi";

export function ProgramKartice({ naslovRazina = 3 }: { naslovRazina?: 2 | 3 }) {
  const Naslov = naslovRazina === 2 ? "h2" : "h3";

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {PROGRAMI.map((p) => {
        const href = p.bezStranice ? "/kontakt" : `/programi/${p.slug}`;
        return (
          <article
            key={p.slug}
            className="relative flex flex-col border border-line bg-surface p-7 transition-colors focus-within:border-brand hover:border-brand"
          >
            <Naslov className="text-xl font-bold text-brand-deep">
              {p.naziv}
            </Naslov>
            <p className="mt-1.5 text-sm font-medium text-accent-clay-dark">
              {p.podnaslov}
            </p>
            <p className="mt-4 flex-1 leading-relaxed text-ink-muted">
              {p.sazetak}
            </p>
            <ul className="mt-6 space-y-1.5 border-t border-line pt-5 text-sm text-ink-muted">
              {p.detalji.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
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
              {/* The ::after stretches the link over the whole card. */}
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-clay-dark underline underline-offset-4 after:absolute after:inset-0"
              >
                {p.bezStranice ? "Pitajte nas" : "Detalji i cijene"}
                <ArrowRight size={15} />
                <span className="sr-only">, {p.naziv}</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
