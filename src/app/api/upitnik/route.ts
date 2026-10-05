import { NextResponse } from "next/server";
import { posaljiUpitnik } from "@/lib/mail";

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
    [ime, tvrtka, email].some((v) => typeof v !== "string" || v.trim() === "") ||
    !Array.isArray(odgovori);

  if (missing) {
    return NextResponse.json(
      { error: "Nedostaju obavezna polja." },
      { status: 400 },
    );
  }

  const ocjene = (odgovori as unknown[]).filter(
    (o): o is { tvrdnja: string; ocjena: string } =>
      Boolean(o) &&
      typeof o === "object" &&
      typeof (o as { tvrdnja?: unknown }).tvrdnja === "string" &&
      typeof (o as { ocjena?: unknown }).ocjena === "string",
  );

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
