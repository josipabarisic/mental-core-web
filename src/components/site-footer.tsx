import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { KONTAKT_MAIL, OIB, SJEDISTE, TVRTKA } from "@/lib/kontakt";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-brand text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Analiza tima, radionice i coaching lidera. Programi za timove koji
              moraju funkcionirati i kad nije sve pod kontrolom.
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-white">Stranice</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Početna
                </Link>
              </li>
              <li>
                <Link href="/programi" className="hover:text-white">
                  Programi
                </Link>
              </li>
              <li>
                <Link href="/upitnik" className="hover:text-white">
                  Upitnik o timu
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="hover:text-white">
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-white">Kontakt</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${KONTAKT_MAIL}`} className="hover:text-white">
                  {KONTAKT_MAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/helena-i-dinko-maru%C5%A1%C4%8Dak-45b915440/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-white"
                >
                  LinkedIn: Helena i Dinko
                </a>
              </li>
              <li className="pt-1">Radimo na području cijele Hrvatske</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            {TVRTKA}, {SJEDISTE}. OIB: {OIB}.
          </p>
          <p>Mental Core. Razvoj timova i lidera.</p>
        </div>
      </div>
    </footer>
  );
}
