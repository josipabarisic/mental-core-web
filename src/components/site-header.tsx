"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

const NAV = [
  { href: "/", label: "Početna" },
  { href: "/programi", label: "Programi" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape has to close the menu, otherwise a keyboard user who opened it by
  // accident has to tab through the whole list to get out.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("izbornik-gumb")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <Link href="/" aria-label="Mental Core, početna stranica">
          <Logo tone="light" />
        </Link>

        <nav aria-label="Glavni izbornik" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "py-2 text-sm font-medium transition-colors hover:text-accent-clay",
                pathname === item.href
                  ? "text-accent-clay"
                  : "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="bg-accent-clay px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark"
          >
            Zatražite razgovor
          </Link>
        </nav>

        <button
          id="izbornik-gumb"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobilni-izbornik"
          aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
          className="p-1.5 text-brand-deep md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div id="mobilni-izbornik" className="border-t border-line bg-surface md:hidden">
          <nav
            aria-label="Glavni izbornik, mobilni"
            className="mx-auto flex max-w-6xl flex-col px-5 py-2"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "border-b border-line/60 py-3.5 text-base font-medium",
                  pathname === item.href ? "text-accent-clay" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={close}
              className="mt-4 mb-2 bg-accent-clay px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Zatražite razgovor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
