import { NextResponse } from "next/server";
import { posaljiUpit } from "@/lib/mail";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { ime, tvrtka, email, velicinaTima, izazov, telefon, fokus, med } =
    data as Record<string, unknown>;

  if (typeof med === "string" && med.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const tekst = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const teme = Array.isArray(fokus)
    ? fokus.filter((t): t is string => typeof t === "string" && t.trim() !== "")
    : [];
  const tijelo = tekst(izazov) || teme.join(", ");

  if (!tekst(ime) || !tekst(email) || !tijelo) {
    return NextResponse.json(
      { error: "Nedostaju obavezna polja." },
      { status: 400 },
    );
  }

  try {
    await posaljiUpit({
      ime: tekst(ime),
      email: tekst(email),
      izazov: tijelo,
      tvrtka: tekst(tvrtka) || undefined,
      velicinaTima: tekst(velicinaTima) || undefined,
      telefon: tekst(telefon) || undefined,
      fokus: teme,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[upit]", error);
    return NextResponse.json(
      { error: "Slanje nije uspjelo." },
      { status: 502 },
    );
  }
}
