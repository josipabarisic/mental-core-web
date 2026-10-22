import { NextResponse } from "next/server";
import { posaljiUpitnik } from "@/lib/mail";
import { PITANJA_UPITNIKA } from "@/lib/upitnik";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { ime, tvrtka, email, uloga, velicinaTima, program, komentar, odgovori, med } =
    data as Record<string, unknown>;

  if (typeof med === "string" && med.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const missing =
    [ime, tvrtka, email, velicinaTima].some(
      (v) => typeof v !== "string" || v.trim() === "",
    ) || !Array.isArray(odgovori);

  if (missing) {
    return NextResponse.json(
      { error: "Nedostaju obavezna polja." },
      { status: 400 },
    );
  }

  const ocjene = (odgovori as unknown[]).flatMap((o) => {
    if (!o || typeof o !== "object") return [];
    const red = o as { tvrdnja?: unknown; ocjena?: unknown; kategorija?: unknown };
    if (typeof red.tvrdnja !== "string" || typeof red.ocjena !== "string") return [];
    if (!red.ocjena.trim()) return [];
    return [
      {
        tvrdnja: red.tvrdnja,
        ocjena: red.ocjena,
        kategorija: typeof red.kategorija === "string" ? red.kategorija : undefined,
      },
    ];
  });

  if (ocjene.length !== PITANJA_UPITNIKA.length) {
    return NextResponse.json(
      { error: "Nedostaju odgovori na pitanja." },
      { status: 400 },
    );
  }

  try {
    await posaljiUpitnik({
      ime: String(ime).trim(),
      tvrtka: String(tvrtka).trim(),
      email: String(email).trim(),
      uloga: typeof uloga === "string" ? uloga : undefined,
      velicinaTima: typeof velicinaTima === "string" ? velicinaTima : undefined,
      program: typeof program === "string" ? program : undefined,
      komentar: typeof komentar === "string" ? komentar : undefined,
      odgovori: ocjene,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[upitnik]", error);
    return NextResponse.json(
      { error: "Slanje nije uspjelo." },
      { status: 502 },
    );
  }
}
