import { cn } from "@/lib/utils";

type Tone = "surface" | "alt" | "dark";

const TONE: Record<Tone, string> = {
  surface: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  dark: "on-dark bg-brand text-line",
};

export function Section({
  tone = "surface",
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn(TONE[tone], className)}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
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
        tone === "light" ? "text-accent-clay" : "text-accent-clay-soft",
      )}
    >
      {children}
    </p>
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
        "text-balance text-3xl leading-[1.12] font-bold tracking-[-0.015em] sm:text-4xl lg:text-[2.75rem]",
        tone === "light" ? "text-brand-deep" : "text-surface",
        className,
      )}
    >
      {children}
    </h2>
  );
}
