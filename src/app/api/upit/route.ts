import { NextResponse } from "next/server";

/**
 * Sketch endpoint. No mail provider is wired up yet, so the enquiry is only
 * validated and logged. Swapping this for Resend is a single call once the
 * client has a domain and an inbox.
 */
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { ime, tvrtka, email, velicinaTima, izazov } = data as Record<
    string,
    unknown
  >;

  const missing = [ime, tvrtka, email, velicinaTima, izazov].some(
    (v) => typeof v !== "string" || v.trim() === "",
  );

  if (missing) {
    return NextResponse.json(
      { error: "Nedostaju obavezna polja." },
      { status: 400 },
    );
  }

  console.info("[upit]", { ime, tvrtka, email, velicinaTima, izazov });

  return NextResponse.json({ ok: true });
}
