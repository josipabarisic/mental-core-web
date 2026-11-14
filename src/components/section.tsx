import { createContext, use } from "react";
import { cn } from "@/lib/utils";
import { Otkrij } from "@/components/pokret";

type Tone = "surface" | "alt" | "dark";

const TONE: Record<Tone, string> = {
  surface: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  dark: "on-dark bg-brand text-white",
};

/** Uključuje novi izgled samo na stranicama koje su u ovom okviru. */
const NoviIzgled = createContext(false);

export function NoviIzgledOkvir({ children }: { children: React.ReactNode }) {
  return (
    <NoviIzgled.Provider value={true}>
      <div className="novi-izgled contents">{children}</div>
    </NoviIzgled.Provider>
  );
}

export function Section({
  tone = "surface",
  className,
  unutra,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  unutra?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const svjeze = use(NoviIzgled);
  const unutarnji = cn(
    "mx-auto max-w-6xl px-5 lg:px-8",
    svjeze ? "py-20 md:py-28" : "py-16 md:py-24",
    unutra,
  );

  return (
    <section id={id} className={cn(TONE[tone], className)}>
      {svjeze ? (
        <Otkrij className={unutarnji}>{children}</Otkrij>
      ) : (
        <div className={unutarnji}>{children}</div>
      )}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const svjeze = use(NoviIzgled);

  return (
    <p
      className={cn(
        "eyebrow",
        svjeze
          ? tone === "light"
            ? "text-accent-clay"
            : "text-accent-clay-soft"
          : tone === "light"
            ? "text-accent-clay"
            : "text-white",
      )}
    >
      {children}
    </p>
  );
}

export function Koraci({
  stavke,
}: {
  stavke: { broj: string; tekst: string }[];
}) {
  const svjeze = use(NoviIzgled);

  if (svjeze) {
    return (
      <ol className="mt-5 grid gap-3">
        {stavke.map((k) => (
          <li
            key={k.broj}
            className="relative bg-surface p-5 pr-16 leading-relaxed text-ink"
          >
            <span
              aria-hidden
              className="font-display absolute top-3 right-5 text-3xl font-bold tracking-[-0.04em] text-brand/15"
            >
              {k.broj}
            </span>
            <span className="sr-only">{k.broj}. </span>
            {k.tekst}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="mt-5 grid grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-x-4 gap-y-5">
      {stavke.map((k) => (
        <li key={k.broj} className="contents">
          <span className="pt-1 text-sm tabular-nums text-accent-clay">
            {k.broj}
          </span>
          <span className="leading-relaxed text-ink">{k.tekst}</span>
        </li>
      ))}
    </ol>
  );
}

export function SectionTitle({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const svjeze = use(NoviIzgled);

  return (
    <h2
      className={cn(
        svjeze
          ? "font-display text-balance text-[clamp(2rem,1.2rem+3vw,3.25rem)] leading-[1.08] font-bold"
          : "font-display text-balance text-[clamp(1.75rem,1.15rem+2.4vw,2.75rem)] leading-[1.18] font-bold tracking-[0.01em]",
        svjeze
          ? tone === "light"
            ? "text-brand"
            : "text-surface"
          : tone === "light"
            ? "text-brand-deep"
            : "text-white",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Drugi, tiši dio dvobojnog naslova. */
export function Tiho({ children }: { children: React.ReactNode }) {
  return <span className="tiho">{children}</span>;
}

/** Uvod podstranice: krem podloga, veliki naslov, kratak tekst. */
export function UvodStranice({
  natpis,
  naslov,
  prije,
  children,
}: {
  natpis?: React.ReactNode;
  naslov: React.ReactNode;
  prije?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-14 md:pt-24 md:pb-20 lg:px-8">
        {prije && <div className="uvod mb-8">{prije}</div>}
        {natpis && <p className="uvod eyebrow text-accent-clay">{natpis}</p>}
        <h1
          style={{ animationDelay: "80ms" }}
          className="uvod font-display mt-4 max-w-4xl text-balance text-[clamp(2.4rem,1.2rem+4.4vw,4.4rem)] leading-[1.04] font-bold text-brand"
        >
          {naslov}
        </h1>
        {children && (
          <div
            style={{ animationDelay: "160ms" }}
            className="uvod mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl"
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
