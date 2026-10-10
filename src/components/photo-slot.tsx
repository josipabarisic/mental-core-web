import Image from "next/image";
import { cn } from "@/lib/utils";

// Static export without a custom domain serves assets under /<repo>.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const FOTO = {
  flipchart: { src: "helena-dinko-flipchart.jpg", w: 1600, h: 1065, alt: "Helena i Dinko rade s flipchartom tijekom radionice" },
  portretZajedno: { src: "helena-dinko-portret.jpg", w: 1480, h: 1600, alt: "Helena i Dinko, osnivači Mental Corea" },
  suradnja: { src: "helena-dinko-suradnja.jpg", w: 1065, h: 1600, alt: "Helena i Dinko zajedno pregledavaju bilješke" },
  helena: { src: "helena-portret.jpg", w: 1065, h: 1600, alt: "Helena, psihologinja i coach" },
  dinko: { src: "dinko-portret.jpg", w: 1065, h: 1600, alt: "Dinko, vojni instruktor i operativni analitičar" },
  dvorana: { src: "helena-dinko-dvorana.jpg", w: 1600, h: 1065, alt: "Helena i Dinko u dvorani za edukaciju" },
  biljeske: { src: "analiza-tima-biljeske.jpg", w: 1065, h: 1600, alt: "Bilješke na podlozi za pisanje tijekom analize tima" },
  upitnik: { src: "pregled-upitnika.jpg", w: 1065, h: 1600, alt: "Helena i Dinko pregledavaju ispunjene materijale" },
  planiranje: { src: "helena-dinko-planiranje.jpg", w: 1065, h: 1600, alt: "Helena i Dinko planiraju program za stolom" },
  povjerenje: {
    src: "helena-dinko-povjerenje.jpg",
    w: 681,
    h: 1024,
    alt: "Helena i Dinko u vježbi povjerenja na terenu",
  },
  orijentacija: {
    src: "helena-dinko-orijentacija.jpg",
    w: 681,
    h: 1024,
    alt: "Helena i Dinko u vježbi orijentacije na terenu",
  },
  dvoranskaVjezba: {
    src: "helena-dinko-dvoranska-vjezba.jpg",
    w: 681,
    h: 1024,
    alt: "Helena i Dinko u vježbi u dvorani",
  },
  teren: {
    src: "helena-dinko-teren.jpg",
    w: 681,
    h: 1024,
    alt: "Helena i Dinko u terenskoj vježbi",
  },
  koordinacija: {
    src: "helena-dinko-koordinacija.jpg",
    w: 681,
    h: 1024,
    alt: "Zajednički zadatak na terenu, vježba koordinacije",
  },
} as const;

export type FotoKljuc = keyof typeof FOTO;

export function Foto({
  foto,
  className,
  pozicija = "center",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  foto: FotoKljuc;
  className?: string;
  pozicija?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const f = FOTO[foto];
  return (
    <div className={cn("relative aspect-[3/4] overflow-hidden bg-surface-alt", className)}>
      <Image
        src={`${BASE}/foto/${f.src}`}
        alt={f.alt}
        width={f.w}
        height={f.h}
        priority={priority}
        sizes={sizes}
        style={{ objectPosition: pozicija }}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}
