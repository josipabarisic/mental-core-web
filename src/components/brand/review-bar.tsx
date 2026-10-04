"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLogoVariant, type LogoVariant } from "./logo-variant";
import { BrandSymbol, SYMBOL_OPTIONS } from "./symbol";

const OPTIONS: { value: LogoVariant; label: string; note: string }[] = [
  {
    value: "postojeci",
    label: "A. Postojeći",
    note: "Znak s tri figure i deskriptor TEAMBUILDING, kako je sada.",
  },
  {
    value: "prijedlog",
    label: "B. Prijedlog",
    note: "Bez znaka, deskriptor RAZVOJ TIMOVA I LIDERA. Obrazloženje je u planu, poglavlje 6.",
  },
];

/**
 * Keyboard handling the radiogroup pattern requires: arrows, Home and End move
 * the selection, and the group is a single tab stop through a roving tabindex.
 */
function tipkeZaRadio<T>(
  vrijednosti: T[],
  odabrano: T,
  odaberi: (v: T) => void,
) {
  return (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const i = vrijednosti.indexOf(odabrano);
    const zadnji = vrijednosti.length - 1;
    let sljedeci: number;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") sljedeci = i === zadnji ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") sljedeci = i === 0 ? zadnji : i - 1;
    else if (e.key === "Home") sljedeci = 0;
    else if (e.key === "End") sljedeci = zadnji;
    else return;

    e.preventDefault();
    odaberi(vrijednosti[sljedeci]);
    const grupa = e.currentTarget.parentElement;
    (grupa?.children[sljedeci] as HTMLElement | undefined)?.focus();
  };
}

export function ReviewBar() {
  const { variant, setVariant, symbol, setSymbol } = useLogoVariant();
  const [open, setOpen] = useState(true);
  const active = OPTIONS.find((o) => o.value === variant);
  const activeSymbol = SYMBOL_OPTIONS.find((o) => o.kind === symbol);
  const barRef = useRef<HTMLElement>(null);

  // The bar floats above everything, so the footer has to reserve exactly its
  // height. Measured rather than guessed, because the bar changes height
  // between breakpoints and between logo variants.
  useEffect(() => {
    const el = barRef.current;
    const root = document.documentElement;
    const apply = () => {
      root.style.setProperty(
        "--review-bar-h",
        el ? `${el.offsetHeight}px` : "5rem",
      );
    };
    apply();
    if (!el) return;
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, variant]);

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty("--review-bar-h");
    };
  }, []);

  if (!open) {
    return (
      <aside aria-label="Skica, usporedba logotipa">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed right-4 bottom-4 z-50 rounded-full bg-brand-deep px-4 py-2 text-xs font-semibold text-surface shadow-lg"
        >
          Usporedi logotip
        </button>
      </aside>
    );
  }

  return (
    <aside
      ref={barRef}
      aria-label="Skica, usporedba logotipa"
      data-skica-traka
      className="on-dark fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-brand-deep"
    >
      <div className="mx-auto max-w-6xl px-5 py-3">
        {/* Wraps rather than pushing "Sakrij" off screen on a narrow phone. */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5">
          <span className="eyebrow w-14 shrink-0 text-accent-clay-soft sm:w-16">
            Logotip
          </span>

          <div
            role="radiogroup"
            aria-label="Varijanta logotipa"
            className="flex shrink-0 gap-1 rounded-sm bg-white/10 p-1"
          >
            {OPTIONS.map((o) => (
              <button
                key={o.value}
                role="radio"
                aria-checked={variant === o.value}
                tabIndex={variant === o.value ? 0 : -1}
                onKeyDown={tipkeZaRadio(
                  OPTIONS.map((x) => x.value),
                  variant,
                  setVariant,
                )}
                type="button"
                onClick={() => setVariant(o.value)}
                className={cn(
                  "rounded-[2px] px-3 py-1.5 text-xs font-semibold transition-colors",
                  variant === o.value
                    ? "bg-surface text-brand-deep"
                    : "text-line hover:text-surface",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>

          <p className="hidden min-w-0 flex-1 text-xs leading-snug text-line/85 lg:block">
            {active?.note}
          </p>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto shrink-0 text-xs font-medium text-line underline underline-offset-4 hover:text-surface lg:ml-0"
          >
            Sakrij
          </button>
        </div>

        {variant === "prijedlog" && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-3 sm:gap-x-5">
            <span className="eyebrow w-14 shrink-0 text-accent-clay-soft sm:w-16">
              Znak
            </span>

            <div
              role="radiogroup"
              aria-label="Znak za favicon i avatar"
              className="flex shrink-0 gap-1 rounded-sm bg-white/10 p-1"
            >
              {SYMBOL_OPTIONS.map((o) => (
                <button
                  key={o.kind}
                  role="radio"
                  aria-checked={symbol === o.kind}
                  tabIndex={symbol === o.kind ? 0 : -1}
                  onKeyDown={tipkeZaRadio(
                    SYMBOL_OPTIONS.map((x) => x.kind),
                    symbol,
                    setSymbol,
                  )}
                  aria-label={o.label}
                  type="button"
                  onClick={() => setSymbol(o.kind)}
                  className={cn(
                    "flex items-center gap-2 rounded-[2px] px-2.5 py-1.5 text-xs font-semibold transition-colors",
                    symbol === o.kind
                      ? "bg-surface text-brand-deep"
                      : "text-line hover:text-surface",
                  )}
                >
                  <BrandSymbol
                    kind={o.kind}
                    inverted={symbol === o.kind}
                    className="size-4 text-base"
                  />
                  <span className="hidden sm:inline">{o.label}</span>
                </button>
              ))}
            </div>

            <p className="hidden min-w-0 flex-1 text-xs leading-snug text-line/85 lg:block">
              {activeSymbol?.note}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
