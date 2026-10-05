import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Eyebrow, Section } from "@/components/section";
import { Foto } from "@/components/photo-slot";
import {
  DODATNE_USLUGE,
  NAPOMENA_LOGISTIKA,
  NAPOMENA_LOKACIJA,
  PROGRAMI,
  eur,
  programPoSlugu,
  type Stavka,
} from "@/lib/programi";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRAMI.filter((p) => !p.bezStranice).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = programPoSlugu(slug);
  if (!p) return {};
  return { title: p.naziv, description: `${p.podnaslov}. ${p.sazetak}` };
}

function Cijene({ stavke, naslov }: { stavke: Stavka[]; naslov?: string }) {
  return (
    <div>
      {naslov && (
        <h3 className="mb-2 text-base font-bold text-brand-deep">{naslov}</h3>
      )}
      <dl className="border-t border-line">
        {stavke.map((s) => (
          <div
            key={s.opis}
            className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
          >
            <dt className="text-ink">{s.opis}</dt>
            <dd className="shrink-0 font-bold text-brand-deep tabular-nums">
              {eur(s.iznos)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function ProgramStranica({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = programPoSlugu(slug);
  if (!p) notFound();

  return (
    <>
      <section className="on-dark bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <Link
            href="/programi"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white underline underline-offset-4 hover:text-white"
          >
            <ArrowLeft size={15} />
            Svi programi
          </Link>
          <h1 className="font-display mt-6 max-w-3xl text-balance text-4xl leading-[1.18] font-bold tracking-[0.01em] text-white sm:text-5xl">
            {p.naziv}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white">
            {p.podnaslov}
          </p>
        </div>
      </section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>O programu</Eyebrow>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink">
              {p.opis.map((o) => (
                <p key={o}>{o}</p>
              ))}
            </div>

            {p.ukljuceno && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-brand-deep">
                  {p.ukljucenoNaslov ?? "Uključeno"}
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {p.ukljuceno.map((u) => (
                    <li key={u} className="flex gap-3 text-ink-muted">
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-accent-clay"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.foto && (
              <Foto
                foto={p.foto}
                pozicija="center 40%"
                className="mt-10 max-w-md"
              />
            )}
          </div>

          <aside aria-labelledby="cijene-naslov" className="lg:pt-1">
            <div className="border border-line bg-surface-alt p-7 sm:p-8">
              <h2 id="cijene-naslov" className="text-xl font-bold text-brand-deep">
                Cijene
              </h2>
              {p.cjenik ? (
                <>
                  <p className="mt-1.5 text-sm text-ink-muted">
                    Sve cijene uključuju PDV.
                    {p.napomena && ` ${p.napomena}`}
                  </p>
                  <div className="mt-6 space-y-8">
                    {p.cjenik.map((c, i) => (
                      <Cijene key={c.naslov ?? i} {...c} />
                    ))}
                  </div>
                </>
              ) : (
                <p className="mt-3 leading-relaxed text-ink-muted">
                  Po dogovoru. Cijenu šaljemo u ponudi, prema dogovorenom
                  sadržaju programa.
                </p>
              )}
              {p.dodatneUsluge && (
                <div className="mt-10">
                  <h2 className="mb-2 text-base font-bold text-brand-deep">
                    Dodatne usluge
                  </h2>
                  <Cijene stavke={DODATNE_USLUGE} />
                  <div className="mt-6 space-y-3 text-sm leading-relaxed text-ink-muted">
                    <p>
                      <span className="font-semibold text-brand-deep">
                        Napomena:
                      </span>{" "}
                      {NAPOMENA_LOGISTIKA}
                    </p>
                    <p>{NAPOMENA_LOKACIJA}</p>
                  </div>
                </div>
              )}
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/upitnik"
                  className="inline-flex items-center justify-center gap-2 bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark"
                >
                  Ispunite upitnik i dobijte ponudu
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/kontakt"
                  className="text-center text-sm font-semibold text-accent-clay-dark underline underline-offset-4"
                >
                  Ili nam pišite izravno
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
