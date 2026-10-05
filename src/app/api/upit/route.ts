import { NextResponse } from "next/server";
import { posaljiUpit } from "@/lib/mail";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { ime, tvrtka, email, velicinaTima, izazov, med } = data as Record<
    string,
    unknown
  >;

  if (typeof med === "string" && med.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const missing = [ime, tvrtka, email, velicinaTima, izazov].some(
    (v) => typeof v !== "string" || v.trim() === "",
  );

  if (missing) {
    return NextResponse.json(
      { error: "Nedostaju obavezna polja." },
      { status: 400 },
    );
  }

  try {
    await posaljiUpit({
      ime: String(ime).trim(),
      tvrtka: String(tvrtka).trim(),
      email: String(email).trim(),
      velicinaTima: String(velicinaTima).trim(),
      izazov: String(izazov).trim(),
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
