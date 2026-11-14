"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Otkrij({
  as: Oznaka = "div",
  kasnjenje = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  kasnjenje?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  // Server i prvi prikaz su vidljivi, da sadržaj postoji i bez JavaScripta.
  // Skriva se samo ono što je u tom trenutku ispod ekrana.
  const [faza, setFaza] = useState<"mir" | "skriveno" | "otkriveno">("mir");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const promatrac = new IntersectionObserver(
      ([unos]) => {
        if (unos.isIntersecting) {
          setFaza((f) => (f === "skriveno" ? "otkriveno" : f));
          promatrac.disconnect();
        } else if (unos.boundingClientRect.top > window.innerHeight) {
          setFaza((f) => (f === "mir" ? "skriveno" : f));
        } else {
          promatrac.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    promatrac.observe(el);
    return () => promatrac.disconnect();
  }, []);

  const stanje =
    faza === "skriveno"
      ? "translate-y-7 scale-[0.98] opacity-0"
      : faza === "otkriveno"
        ? "transition-[opacity,translate,scale] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        : "";

  return (
    <Oznaka
      ref={ref}
      style={
        faza === "otkriveno" ? { transitionDelay: `${kasnjenje}ms` } : undefined
      }
      className={`motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 ${stanje} ${className}`}
    >
      {children}
    </Oznaka>
  );
}

export function Vrtuljak({
  oznaka,
  svijetlo = false,
  children,
}: {
  oznaka: string;
  svijetlo?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rub, setRub] = useState({ pocetak: true, kraj: false });

  function osvjezi() {
    const el = ref.current;
    if (!el) return;
    setRub({
      pocetak: el.scrollLeft < 8,
      kraj: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
    });
  }

  function pomakni(smjer: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const korak =
      (el.firstElementChild as HTMLElement | null)?.offsetWidth ??
      el.clientWidth;
    el.scrollBy({ left: smjer * (korak + 12), behavior: "smooth" });
  }

  const gumb = `grid size-11 place-items-center border transition-[background-color,opacity,scale] duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-30 ${
    svijetlo
      ? "border-[#fbf8f1]/30 text-[#fbf8f1] hover:bg-[#fbf8f1]/10"
      : "border-[#424e4f]/25 text-[#424e4f] hover:bg-[#424e4f]/5"
  }`;

  return (
    <div>
      <div
        ref={ref}
        onScroll={osvjezi}
        role="region"
        aria-label={oznaka}
        tabIndex={0}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Prethodno"
          disabled={rub.pocetak}
          onClick={() => pomakni(-1)}
          className={gumb}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Sljedeće"
          disabled={rub.kraj}
          onClick={() => pomakni(1)}
          className={gumb}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
