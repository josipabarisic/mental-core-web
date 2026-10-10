import Image from "next/image";
import { FOTO } from "@/components/photo-slot";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/kontakt";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const PREGLED = FOTO.teren;

export function InstagramFeed() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[3/4] w-full overflow-hidden border border-line text-left"
    >
      <Image
        src={`${BASE}/foto/${PREGLED.src}`}
        alt={PREGLED.alt}
        width={PREGLED.w}
        height={PREGLED.h}
        sizes="(min-width: 1024px) 40vw, 100vw"
        style={{ objectPosition: "center 32%" }}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
      <span className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <span className="block text-lg font-bold text-white">
          @{INSTAGRAM_HANDLE}
        </span>
        <span className="mt-2 block max-w-sm text-sm leading-relaxed text-white">
          Objave ostaju na Instagramu. Klik otvara profil u novom tabu.
        </span>
        <span className="mt-5 inline-flex items-center justify-center bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors group-hover:bg-accent-clay-dark">
          Otvori Instagram
        </span>
      </span>
    </a>
  );
}
