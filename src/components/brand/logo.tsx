"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLogoVariant } from "./logo-variant";

type Tone = "light" | "dark";

/**
 * The extracted mark PNGs keep their original opaque background because the
 * source artwork has no vector version yet. Each file therefore only sits
 * correctly on the surface colour it was cut from.
 */
// Set when the sketch is published under a repository subpath on GitHub Pages.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const MARK = {
  light: { src: `${BASE}/brand/mark-on-cream.png`, width: 543, height: 357 },
  dark: { src: `${BASE}/brand/mark-on-dark.png`, width: 630, height: 414 },
} as const;

export function Logo({
  tone = "light",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const { variant } = useLogoVariant();
  const mark = MARK[tone];

  const wordColor = tone === "light" ? "text-brand-deep" : "text-surface";
  const ruleColor = tone === "light" ? "bg-brand-deep/70" : "bg-surface/60";
  const descColor = tone === "light" ? "text-ink-muted" : "text-line";

  return (
    <span className={cn("inline-flex flex-col items-start gap-1.5", className)}>
      {variant === "postojeci" && (
        <Image
          src={mark.src}
          alt=""
          width={mark.width}
          height={mark.height}
          priority
          className="h-7 w-auto sm:h-8"
        />
      )}
      <span className="flex flex-col items-start">
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
          {variant === "postojeci" ? "TEAMBUILDING" : "RAZVOJ TIMOVA I LIDERA"}
        </span>
      </span>
      <span className="sr-only">Mental Core</span>
    </span>
  );
}
