import { NextResponse } from "next/server";

/**
 * Sketch endpoint, like /api/upit. Answers are validated and logged until a
 * mail provider is wired up.
 */
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { ime, tvrtka, email, odgovori } = data as Record<string, unknown>;

  const missing =
    [ime, tvrtka, email].some((v) => typeof v !== "string" || v.trim() === "") ||
    !Array.isArray(odgovori);

  if (missing) {
    return NextResponse.json(
      { error: "Nedostaju obavezna polja." },
      { status: 400 },
    );
  }

  console.info("[upitnik]", data);

  return NextResponse.json({ ok: true });
}
