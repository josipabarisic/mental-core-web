import { cn } from "@/lib/utils";

type Tone = "surface" | "alt" | "dark";

const TONE: Record<Tone, string> = {
  surface: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  dark: "on-dark bg-brand text-white",
};

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
  return (
    <section id={id} className={cn(TONE[tone], className)}>
      <div
        className={cn(
          "mx-auto max-w-6xl px-5 py-16 md:py-24 lg:px-8",
          unutra,
        )}
      >
        {children}
      </div>
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
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "light" ? "text-accent-clay" : "text-white",
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
  return (
    <h2
      className={cn(
        "font-display text-balance text-[clamp(1.75rem,1.15rem+2.4vw,2.75rem)] leading-[1.18] font-bold tracking-[0.01em]",
        tone === "light" ? "text-brand-deep" : "text-white",
        className,
      )}
    >
      {children}
    </h2>
  );
}
