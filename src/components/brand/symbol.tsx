"use client";

import { cn } from "@/lib/utils";

export type SymbolKind = "zagrada" | "jezgra" | "slovo-m" | "mc";

export const SYMBOL_OPTIONS: {
  kind: SymbolKind;
  label: string;
  note: string;
}[] = [
  {
    kind: "zagrada",
    label: "Zagrade",
    note: 'Dvije zagrade koje drže prazan prostor. Iz vlastite rečenice brenda: "Držimo prostor i kada postane teško."',
  },
  {
    kind: "jezgra",
    label: "Jezgra",
    note: "Struktura koja drži jezgru. Doslovan prijevod imena, bez figura i bez slova.",
  },
  {
    kind: "slovo-m",
    label: "Slovo M",
    note: "Samo M, s linijom iz logotipa. Sigurno, ali malo po čemu prepoznatljivo.",
  },
  {
    kind: "mc",
    label: "MC",
    note: "Dosadašnji prijedlog. Čita se i kao voditelj ili reper, pa ga ne preporučujem.",
  },
];

/**
 * Candidates for the small mark used where the wordmark does not fit:
 * favicon, LinkedIn avatar, stamp on the post-programme report.
 * Everything is drawn so it survives 16px and a single colour.
 */
export function BrandSymbol({
  kind,
  className,
  inverted = false,
}: {
  kind: SymbolKind;
  className?: string;
  inverted?: boolean;
}) {
  const box = cn(
    "inline-flex shrink-0 items-center justify-center",
    inverted ? "bg-surface text-brand-deep" : "bg-brand text-surface",
    className,
  );

  if (kind === "mc" || kind === "slovo-m") {
    return (
      <span aria-hidden className={box}>
        <span className="flex flex-col items-center leading-none">
          <span className="text-[0.44em] font-bold tracking-[0.04em]">
            {kind === "mc" ? "MC" : "M"}
          </span>
          {kind === "slovo-m" && (
            <span className="mt-[0.1em] h-[0.055em] w-[0.34em] bg-current" />
          )}
        </span>
      </span>
    );
  }

  return (
    <span aria-hidden className={box}>
      <svg
        viewBox="0 0 32 32"
        className="size-[0.68em]"
        fill="none"
        stroke="currentColor"
        strokeWidth={4.5}
        strokeLinecap="butt"
      >
        {kind === "zagrada" ? (
          <>
            <path d="M11 4.5H4.75v23H11" />
            <path d="M21 4.5h6.25v23H21" />
          </>
        ) : (
          <>
            <rect x="4.5" y="4.5" width="23" height="23" />
            <rect
              x="11.5"
              y="11.5"
              width="9"
              height="9"
              fill="currentColor"
              stroke="none"
            />
          </>
        )}
      </svg>
    </span>
  );
}
