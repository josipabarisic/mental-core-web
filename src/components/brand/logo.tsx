import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const wordColor = tone === "light" ? "text-brand-deep" : "text-white";
  const ruleColor = tone === "light" ? "bg-brand-deep/70" : "bg-white/60";
  const descColor = tone === "light" ? "text-accent-clay" : "text-white";

  return (
    <span className={cn("inline-flex flex-col items-start", className)}>
      <span
        className={cn(
          "font-display text-[0.95rem] leading-none font-bold tracking-[0.13em] sm:text-lg",
          wordColor,
        )}
      >
        MENTAL CORE
      </span>
      <span className={cn("my-1 h-px w-full", ruleColor)} />
      <span
        className={cn(
          "font-display text-[0.5rem] leading-none font-bold tracking-[0.24em] sm:text-[0.6rem]",
          descColor,
        )}
      >
        RAZVOJ TIMOVA I LIDERA
      </span>
      <span className="sr-only">Mental Core</span>
    </span>
  );
}
