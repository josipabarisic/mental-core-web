import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="on-dark bg-brand">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="eyebrow text-accent-clay-soft">Stranica 404</p>
        <h1 className="mt-5 max-w-2xl text-balance text-4xl leading-[1.1] font-bold tracking-[-0.02em] text-surface sm:text-5xl">
          Ove stranice nema.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-line">
          Poveznica je vjerojatno stara ili pogrešno upisana. Vratite se na
          početnu ili nam pišite i reći ćemo vam gdje je ono što tražite.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-surface px-6 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
          >
            Na početnu
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-2 py-3.5 text-sm font-medium text-line underline underline-offset-4 hover:text-surface"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
