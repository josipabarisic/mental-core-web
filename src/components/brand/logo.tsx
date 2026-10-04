import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const wordColor = tone === "light" ? "text-brand-deep" : "text-surface";
  const ruleColor = tone === "light" ? "bg-brand-deep/70" : "bg-surface/60";
  const descColor = tone === "light" ? "text-ink-muted" : "text-line";

  return (
    <span className={cn("inline-flex flex-col items-start", className)}>
      <span
        className={cn(
          "text-[0.95rem] leading-none font-bold tracking-[0.13em] sm:text-lg",
          wordColor,
        )}
      >
        MENTAL CORE
      </span>
      <span className={cn("my-1 h-px w-full", ruleColor)} />
      <span
        className={cn(
          "text-[0.5rem] leading-none font-medium tracking-[0.3em] sm:text-[0.6rem]",
          descColor,
        )}
      >
        RAZVOJ TIMOVA I LIDERA
      </span>
      <span className="sr-only">Mental Core</span>
    </span>
  );
}
