"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { SymbolKind } from "./symbol";

export type LogoVariant = "postojeci" | "prijedlog";

const KEYS = {
  variant: "mc-logo-variant",
  symbol: "mc-brand-symbol",
} as const;

const DEFAULT_VARIANT: LogoVariant = "prijedlog";
const DEFAULT_SYMBOL: SymbolKind = "zagrada";

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function notify() {
  listeners.forEach((cb) => cb());
}

function read<T extends string>(key: string, allowed: readonly T[], fallback: T) {
  const saved = window.localStorage.getItem(key);
  return allowed.includes(saved as T) ? (saved as T) : fallback;
}

const VARIANTS = ["postojeci", "prijedlog"] as const;
const SYMBOLS = ["zagrada", "jezgra", "slovo-m", "mc"] as const;

type Ctx = {
  variant: LogoVariant;
  setVariant: (v: LogoVariant) => void;
  symbol: SymbolKind;
  setSymbol: (s: SymbolKind) => void;
};

const BrandChoiceContext = createContext<Ctx | null>(null);

export function LogoVariantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const variant = useSyncExternalStore(
    subscribe,
    () => read(KEYS.variant, VARIANTS, DEFAULT_VARIANT),
    () => DEFAULT_VARIANT,
  );

  const symbol = useSyncExternalStore(
    subscribe,
    () => read(KEYS.symbol, SYMBOLS, DEFAULT_SYMBOL),
    () => DEFAULT_SYMBOL,
  );

  const setVariant = useCallback((v: LogoVariant) => {
    window.localStorage.setItem(KEYS.variant, v);
    notify();
  }, []);

  const setSymbol = useCallback((s: SymbolKind) => {
    window.localStorage.setItem(KEYS.symbol, s);
    notify();
  }, []);

  const value = useMemo(
    () => ({ variant, setVariant, symbol, setSymbol }),
    [variant, setVariant, symbol, setSymbol],
  );

  return (
    <BrandChoiceContext.Provider value={value}>
      {children}
    </BrandChoiceContext.Provider>
  );
}

export function useLogoVariant() {
  const ctx = useContext(BrandChoiceContext);
  if (!ctx) {
    throw new Error("useLogoVariant mora biti unutar LogoVariantProvider");
  }
  return ctx;
}
