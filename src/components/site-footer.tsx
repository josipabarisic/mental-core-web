"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { useLogoVariant } from "@/components/brand/logo-variant";
import { BrandSymbol } from "@/components/brand/symbol";

export function SiteFooter() {
  const { variant, symbol } = useLogoVariant();

  return (
    <footer className="on-dark bg-brand pb-[var(--review-bar-h,0px)] text-line">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Analiza tima, radionice i coaching lidera. Programi za timove koji
              moraju funkcionirati i kad nije sve pod kontrolom.
            </p>
            {variant === "prijedlog" && (
              <div className="mt-7">
                <div className="flex items-end gap-3">
                  <BrandSymbol kind={symbol} inverted className="size-12 text-3xl" />
                  <BrandSymbol kind={symbol} inverted className="size-8 text-2xl" />
                  <BrandSymbol kind={symbol} inverted className="size-4 text-base" />
                </div>
                <p className="mt-3 max-w-xs text-xs leading-relaxed">
                  Znak za favicon i avatar na LinkedInu, prikazan u stvarnim
                  veličinama. Najmanji je 16 piksela, tamo se odluka i lomi.
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="eyebrow text-surface">Stranice</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-surface">
                  Početna
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="hover:text-surface">
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-surface">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-surface">Kontakt</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="mailto:info@mentalcore.hr" className="hover:text-surface">
                  info@mentalcore.hr
                </a>
              </li>
              <li>
                <a href="tel:+385000000000" className="hover:text-surface">
                  +385 00 000 0000
                </a>
              </li>
              <li>LinkedIn: Helena i Dinko</li>
              <li className="pt-1">Radimo na području cijele Hrvatske</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>Mental Core. Naziv tvrtke, OIB i sjedište dolaze prije objave.</p>
          <p>Skica za internu raspravu, podaci i fotografije nisu konačni.</p>
        </div>
      </div>
    </footer>
  );
}
