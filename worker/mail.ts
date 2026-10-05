/**
 * Cloudflare Worker: primi POST s weba i pošalji mail preko Resenda.
 * Tajna: wrangler secret put RESEND_API_KEY
 */
const FROM = "Mental Core <info@mentalcoreteam.com>";
const DOZVOLJENO = [
  "https://mentalcoreteam.com",
  "https://www.mentalcoreteam.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function cors(origin: string | null) {
  const ok = origin && DOZVOLJENO.includes(origin) ? origin : DOZVOLJENO[0];
  return {
    "Access-Control-Allow-Origin": ok,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(naslov: string, tijelo: string) {
  return `<!doctype html><html><body style="margin:0;background:#fbf8f1;color:#2d3839;font-family:Georgia,serif;"><div style="max-width:560px;margin:0 auto;padding:32px 24px;"><p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#84593c;font-family:Arial,sans-serif;">Mental Core</p><h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;">${naslov}</h1>${tijelo}</div></body></html>`;
}

async function posalji(
  apiKey: string,
  poruka: {
    to: string;
    replyTo: string;
    subject: string;
    html: string;
  },
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [poruka.to],
      reply_to: poruka.replyTo,
      subject: poruka.subject,
      html: poruka.html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Resend nije prihvatio mail.");
  }
}

export default {
  async fetch(
    request: Request,
    env: { RESEND_API_KEY: string; MAIL_TO?: string },
  ) {
    const TO = env.MAIL_TO || "info@mentalcoreteam.com";
    const origin = request.headers.get("Origin");
    const headers = cors(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== "POST") {
      return Response.json({ error: "Metoda nije dozvoljena." }, { status: 405, headers });
    }

    const url = new URL(request.url);
    const data = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!data) {
      return Response.json({ error: "Neispravan zahtjev." }, { status: 400, headers });
    }
    if (typeof data.med === "string" && data.med.trim() !== "") {
      return Response.json({ ok: true }, { headers });
    }

    try {
      if (url.pathname.endsWith("/api/upit")) {
        const ime = String(data.ime ?? "").trim();
        const tvrtka = String(data.tvrtka ?? "").trim();
        const email = String(data.email ?? "").trim();
        const velicinaTima = String(data.velicinaTima ?? "").trim();
        const izazov = String(data.izazov ?? "").trim();
        if (!ime || !tvrtka || !email || !velicinaTima || !izazov) {
          return Response.json({ error: "Nedostaju obavezna polja." }, { status: 400, headers });
        }
        const redovi = [
          ["Ime", ime],
          ["Tvrtka", tvrtka],
          ["E-mail", email],
          ["Veličina tima", velicinaTima],
          ["Izazov", izazov],
        ]
          .map(([k, v]) => `<p style="margin:0 0 12px;"><strong>${k}</strong><br>${escapeHtml(v)}</p>`)
          .join("");
        await posalji(env.RESEND_API_KEY, {
          to: TO,
          replyTo: email,
          subject: `Novi upit: ${tvrtka}`,
          html: wrap("Novi upit s weba", redovi),
        });
        await posalji(env.RESEND_API_KEY, {
          to: email,
          replyTo: "info@mentalcoreteam.com",
          subject: "Primili smo vaš upit. Mental Core",
          html: wrap(
            "Upit je zaprimljen.",
            `<p>Pozdrav, ${escapeHtml(ime.split(" ")[0] || ime)}.</p><p>Javljamo se u roku od jednog radnog dana. Ako vam treba brže, odgovorite na ovaj mail.</p><p>Helena i Dinko<br>Mental Core</p>`,
          ),
        });
        return Response.json({ ok: true }, { headers });
      }

      if (url.pathname.endsWith("/api/upitnik")) {
        const ime = String(data.ime ?? "").trim();
        const tvrtka = String(data.tvrtka ?? "").trim();
        const email = String(data.email ?? "").trim();
        if (!ime || !tvrtka || !email || !Array.isArray(data.odgovori)) {
          return Response.json({ error: "Nedostaju obavezna polja." }, { status: 400, headers });
        }
        const meta = [
          ["Ime", ime],
          ["Tvrtka", tvrtka],
          ["E-mail", email],
          ["Uloga", String(data.uloga ?? "")],
          ["Veličina tima", String(data.velicinaTima ?? "")],
          ["Program", String(data.program ?? "")],
        ]
          .filter(([, v]) => v)
          .map(([k, v]) => `<p style="margin:0 0 12px;"><strong>${k}</strong><br>${escapeHtml(v)}</p>`)
          .join("");
        const ocjene = (data.odgovori as { tvrdnja?: string; ocjena?: string }[])
          .filter((o) => o?.tvrdnja && o?.ocjena)
          .map(
            (o) =>
              `<p style="margin:0 0 10px;"><strong>${escapeHtml(o.ocjena!)}</strong> · ${escapeHtml(o.tvrdnja!)}</p>`,
          )
          .join("");
        const komentar = String(data.komentar ?? "").trim()
          ? `<p style="margin:16px 0 0;"><strong>Komentar</strong><br>${escapeHtml(String(data.komentar))}</p>`
          : "";
        await posalji(env.RESEND_API_KEY, {
          to: TO,
          replyTo: email,
          subject: `Upitnik: ${tvrtka}`,
          html: wrap("Novi upitnik s weba", `${meta}${ocjene}${komentar}`),
        });
        await posalji(env.RESEND_API_KEY, {
          to: email,
          replyTo: "info@mentalcoreteam.com",
          subject: "Primili smo upitnik. Mental Core",
          html: wrap(
            "Hvala, upitnik je zaprimljen.",
            `<p>Pozdrav, ${escapeHtml(ime.split(" ")[0] || ime)}.</p><p>Pregledavamo odgovore i javljamo se s feedbackom i ponudom.</p><p>Helena i Dinko<br>Mental Core</p>`,
          ),
        });
        return Response.json({ ok: true }, { headers });
      }

      return Response.json({ error: "Nepoznat endpoint." }, { status: 404, headers });
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Slanje nije uspjelo." }, { status: 502, headers });
    }
  },
};
