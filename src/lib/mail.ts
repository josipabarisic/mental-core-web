import { Resend } from "resend";
import { KONTAKT_MAIL } from "@/lib/kontakt";

const FROM = "Mental Core <info@mentalcoreteam.com>";

export type Upit = {
  ime: string;
  tvrtka: string;
  email: string;
  velicinaTima: string;
  izazov: string;
};

export type UpitnikOdgovor = { tvrdnja: string; ocjena: string };

export type Upitnik = {
  ime: string;
  tvrtka: string;
  email: string;
  uloga?: string;
  velicinaTima?: string;
  program?: string;
  komentar?: string;
  odgovori: UpitnikOdgovor[];
};

function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Nedostaje RESEND_API_KEY.");
  const contactEmail = process.env.CONTACT_EMAIL?.trim();
  if (!contactEmail) throw new Error("Nedostaje CONTACT_EMAIL.");
  return { client: new Resend(key), contactEmail };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(naslov: string, tijelo: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#fbf8f1;color:#2d3839;font-family:Georgia,serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#84593c;font-family:Arial,sans-serif;">Mental Core</p>
      <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;">${naslov}</h1>
      ${tijelo}
    </div>
  </body>
</html>`;
}

export async function posaljiUpit(data: Upit) {
  const { client, contactEmail } = resend();
  const redovi = [
    ["Ime", data.ime],
    ["Tvrtka", data.tvrtka],
    ["E-mail", data.email],
    ["Veličina tima", data.velicinaTima],
    ["Izazov", data.izazov],
  ]
    .map(
      ([k, v]) =>
        `<p style="margin:0 0 12px;"><strong>${k}</strong><br>${escapeHtml(v)}</p>`,
    )
    .join("");

  const interni = await client.emails.send({
    from: FROM,
    to: contactEmail,
    replyTo: data.email,
    subject: `Novi upit: ${data.tvrtka}`,
    html: wrap("Novi upit s weba", redovi),
  });
  if (interni.error) throw new Error(interni.error.message);

  const potvrda = await client.emails.send({
    from: FROM,
    to: data.email,
    replyTo: KONTAKT_MAIL,
    subject: "Primili smo vaš upit. Mental Core",
    html: wrap(
      "Upit je zaprimljen.",
      `<p>Pozdrav, ${escapeHtml(data.ime.split(" ")[0] || data.ime)}.</p>
       <p>Javljamo se u roku od jednog radnog dana. Ako vam treba brže, odgovorite na ovaj mail.</p>
       <p>Helena i Dinko<br>Mental Core</p>`,
    ),
  });
  if (potvrda.error) throw new Error(potvrda.error.message);
}

export async function posaljiUpitnik(data: Upitnik) {
  const { client, contactEmail } = resend();
  const meta = [
    ["Ime", data.ime],
    ["Tvrtka", data.tvrtka],
    ["E-mail", data.email],
    ["Uloga", data.uloga ?? ""],
    ["Veličina tima", data.velicinaTima ?? ""],
    ["Program", data.program ?? ""],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<p style="margin:0 0 12px;"><strong>${k}</strong><br>${escapeHtml(v)}</p>`,
    )
    .join("");

  const ocjene = data.odgovori
    .map(
      (o) =>
        `<p style="margin:0 0 10px;"><strong>${escapeHtml(o.ocjena)}</strong> · ${escapeHtml(o.tvrdnja)}</p>`,
    )
    .join("");

  const komentar = data.komentar?.trim()
    ? `<p style="margin:16px 0 0;"><strong>Komentar</strong><br>${escapeHtml(data.komentar)}</p>`
    : "";

  const interni = await client.emails.send({
    from: FROM,
    to: contactEmail,
    replyTo: data.email,
    subject: `Upitnik: ${data.tvrtka}`,
    html: wrap("Novi upitnik s weba", `${meta}${ocjene}${komentar}`),
  });
  if (interni.error) throw new Error(interni.error.message);

  const potvrda = await client.emails.send({
    from: FROM,
    to: data.email,
    replyTo: KONTAKT_MAIL,
    subject: "Primili smo upitnik. Mental Core",
    html: wrap(
      "Hvala, upitnik je zaprimljen.",
      `<p>Pozdrav, ${escapeHtml(data.ime.split(" ")[0] || data.ime)}.</p>
       <p>Pregledavamo odgovore i javljamo se s feedbackom i ponudom.</p>
       <p>Helena i Dinko<br>Mental Core</p>`,
    ),
  });
  if (potvrda.error) throw new Error(potvrda.error.message);
}
