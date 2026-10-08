"use client";

import { useCallback, useState } from "react";
import { ArrowRight, CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { KONTAKT_MAIL } from "@/lib/kontakt";
import { mailEndpoint } from "@/lib/mail-endpoint";
import { PROGRAMI, oznakaPrograma } from "@/lib/programi";

const TVRDNJE = [
  "U timu se otvoreno govori o problemima.",
  "Svatko zna za što je odgovoran.",
  "Ciljevi su jasni svim članovima.",
  "Članovi tima vjeruju jedni drugima.",
  "Pod pritiskom roka tim ostaje usklađen.",
];

const LJESTVICA = [
  { vrijednost: "1", oznaka: "Uopće se ne slažem" },
  { vrijednost: "2", oznaka: "Ne slažem se" },
  { vrijednost: "3", oznaka: "Djelomično" },
  { vrijednost: "4", oznaka: "Slažem se" },
  { vrijednost: "5", oznaka: "Potpuno se slažem" },
];

const VELICINE = ["3 do 10 osoba", "11 do 20 osoba", "21 do 40 osoba", "više od 40 osoba"];

const DEMO =
  process.env.NEXT_PUBLIC_STATIC_DEMO === "1" &&
  !process.env.NEXT_PUBLIC_MAIL_ENDPOINT;

type Podaci = {
  ime: string;
  tvrtka: string;
  email: string;
  velicinaTima: string;
  program: string;
  odgovori: Record<number, string>;
  komentar: string;
};

type Greske = Partial<Record<"ime" | "tvrtka" | "email" | "velicinaTima" | "tvrdnje", string>>;

const PRAZNO: Podaci = {
  ime: "",
  tvrtka: "",
  email: "",
  velicinaTima: "",
  program: "",
  odgovori: {},
  komentar: "",
};

function provjeri(d: Podaci): Greske {
  const g: Greske = {};
  if (!d.ime.trim()) g.ime = "Upišite ime i prezime.";
  if (!d.tvrtka.trim()) g.tvrtka = "Upišite naziv tvrtke.";
  if (!d.email.trim()) g.email = "Upišite e-mail adresu, na nju šaljemo feedback.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
    g.email = "Provjerite e-mail adresu.";
  if (!d.velicinaTima) g.velicinaTima = "Odaberite veličinu tima.";
  const bez = TVRDNJE.length - Object.keys(d.odgovori).length;
  if (bez > 0)
    g.tvrdnje = bez === 1 ? "Ostala je jedna tvrdnja bez odgovora." : `Ostalo je ${bez} tvrdnji bez odgovora.`;
  return g;
}

const FOKUS: Record<keyof Greske, string> = {
  ime: "u-ime",
  tvrtka: "u-tvrtka",
  email: "u-email",
  velicinaTima: "u-velicina-0",
  tvrdnje: "tvrdnje",
};

export function UpitnikForma() {
  const [d, setD] = useState<Podaci>(PRAZNO);
  const [greske, setGreske] = useState<Greske>({});
  const [stanje, setStanje] = useState<"unos" | "salje" | "uspjeh" | "greska">("unos");
  const [med, setMed] = useState("");

  const otkrijPotvrdu = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const mirno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "start", behavior: mirno ? "auto" : "smooth" });
    el.focus({ preventScroll: true });
  }, []);

  function set<K extends keyof Podaci>(polje: K, v: Podaci[K]) {
    setD((s) => ({ ...s, [polje]: v }));
    if (polje in greske) setGreske((g) => ({ ...g, [polje]: undefined }));
  }

  function odgovori(i: number, v: string) {
    setD((s) => ({ ...s, odgovori: { ...s.odgovori, [i]: v } }));
    const odgovoreno = Object.keys({ ...d.odgovori, [i]: v }).length;
    if (greske.tvrdnje && odgovoreno === TVRDNJE.length) {
      setGreske((g) => ({ ...g, tvrdnje: undefined }));
    }
  }

  async function posalji(e: React.FormEvent) {
    e.preventDefault();
    const g = provjeri(d);
    setGreske(g);
    const prvo = (Object.keys(FOKUS) as (keyof Greske)[]).find((k) => g[k]);
    if (prvo) {
      requestAnimationFrame(() => document.getElementById(FOKUS[prvo])?.focus());
      return;
    }

    setStanje("salje");

    if (DEMO) {
      setStanje("greska");
      return;
    }

    try {
      const res = await fetch(mailEndpoint("/api/upitnik"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...d,
          odgovori: TVRDNJE.map((t, i) => ({ tvrdnja: t, ocjena: d.odgovori[i] })),
          med,
        }),
      });
      if (!res.ok) throw new Error("neuspjelo");
      setStanje("uspjeh");
    } catch {
      setStanje("greska");
    }
  }

  if (stanje === "uspjeh") {
    return (
      <div
        ref={otkrijPotvrdu}
        role="status"
        tabIndex={-1}
        className="scroll-mt-28 border border-line bg-surface p-8 sm:p-10"
      >
        <CircleCheck size={28} className="text-accent-clay" strokeWidth={1.75} />
        <h2 className="mt-5 text-2xl font-bold text-brand-deep">
          Hvala, upitnik je zaprimljen.
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Odgovore pregledavamo i na {d.email} šaljemo naš feedback i ponudu.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={posalji}
      noValidate
      aria-label="Upitnik o timu"
      className="relative border border-line bg-surface p-6 sm:p-9"
    >
      <input
        type="text"
        name="med"
        tabIndex={-1}
        autoComplete="off"
        value={med}
        onChange={(e) => setMed(e.target.value)}
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Unos id="u-ime" label="Ime i prezime" value={d.ime} onChange={(v) => set("ime", v)} error={greske.ime} autoComplete="name" />
        <Unos id="u-tvrtka" label="Tvrtka" value={d.tvrtka} onChange={(v) => set("tvrtka", v)} error={greske.tvrtka} autoComplete="organization" />
      </div>
      <div className="mt-5">
        <Unos id="u-email" label="E-mail" type="email" value={d.email} onChange={(v) => set("email", v)} error={greske.email} autoComplete="email" />
      </div>
      <Izbor
        idPrefix="u-velicina"
        legenda="Veličina tima"
        opcije={VELICINE}
        odabrano={d.velicinaTima}
        onChange={(v) => set("velicinaTima", v)}
        error={greske.velicinaTima}
      />

      <p id="tvrdnje-uputa" className="mt-10 text-sm leading-relaxed text-ink">
        Koliko se svaka tvrdnja odnosi na vaš tim danas. 1 ne slažem se, 5 slažem se.
      </p>
      <div
        id="tvrdnje"
        tabIndex={-1}
        aria-describedby={greske.tvrdnje ? "tvrdnje-greska" : undefined}
        className="mt-6 space-y-6 outline-none"
      >
        {TVRDNJE.map((t, i) => {
          const neodgovoreno = Boolean(greske.tvrdnje) && !d.odgovori[i];
          return (
            <fieldset
              key={t}
              aria-describedby="tvrdnje-uputa"
              className={cn(
                "border-l-2 pl-4",
                neodgovoreno ? "border-destructive" : "border-line",
              )}
            >
              <legend className="text-ink">
                <span className="mr-2 text-sm tabular-nums text-accent-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t}
              </legend>
              <div className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2">
                {LJESTVICA.map((o) => {
                  const id = `t${i}-${o.vrijednost}`;
                  const odabran = d.odgovori[i] === o.vrijednost;
                  return (
                    <label
                      key={o.vrijednost}
                      htmlFor={id}
                        className={cn(
                        "flex cursor-pointer items-center justify-center border px-1 py-2.5 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                        odabran
                          ? "border-brand bg-brand text-white"
                          : "border-line text-ink hover:border-brand",
                      )}
                    >
                      <input
                        id={id}
                        type="radio"
                        name={`tvrdnja-${i}`}
                        value={o.vrijednost}
                        checked={odabran}
                        onChange={() => odgovori(i, o.vrijednost)}
                        className="sr-only"
                      />
                      <span>{o.vrijednost}</span>
                      <span className="sr-only">{o.oznaka}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>
      {greske.tvrdnje && <Greska id="tvrdnje-greska" poruka={greske.tvrdnje} />}

      <div className="mt-10">
        <label htmlFor="u-program" className="text-sm text-ink">
          Program koji vas zanima
        </label>
        <select
          id="u-program"
          value={d.program}
          onChange={(e) => set("program", e.target.value)}
          className="mt-2 w-full border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink"
        >
          <option value="">Još ne znam, predložite</option>
          {PROGRAMI.map((p) => (
            <option key={p.slug} value={p.naziv}>
              {oznakaPrograma(p)}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        <label htmlFor="u-komentar" className="text-sm text-ink">
          Što biste najviše željeli promijeniti u timu?{" "}
          <span className="text-ink/60">(nije obavezno)</span>
        </label>
        <textarea
          id="u-komentar"
          rows={4}
          value={d.komentar}
          onChange={(e) => set("komentar", e.target.value)}
          className="mt-2 w-full resize-y border border-line bg-white px-3.5 py-3 text-[0.95rem] text-ink"
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={stanje === "salje"}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark disabled:opacity-70"
        >
          {stanje === "salje" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Šaljemo...
            </>
          ) : (
            <>
              Pošaljite
              <ArrowRight size={16} />
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-ink-muted">
          Odgovori ostaju kod nas i služe samo za pripremu feedbacka i ponude
          za vaš tim.
        </p>
      </div>

      {stanje === "greska" && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <CircleAlert size={17} className="mt-0.5 shrink-0" />
          <span>
            {DEMO
              ? "Upitnik trenutačno nije povezan za slanje. Pošaljite nam e-mail na "
              : "Slanje nije uspjelo. Pišite nam izravno na "}
            <a href={`mailto:${KONTAKT_MAIL}`} className="underline">
              {KONTAKT_MAIL}
            </a>
            .
          </span>
        </p>
      )}
    </form>
  );
}

function Izbor({
  idPrefix,
  legenda,
  opcije,
  odabrano,
  onChange,
  error,
}: {
  idPrefix: string;
  legenda: string;
  opcije: string[];
  odabrano: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset
      className="mt-6"
      aria-describedby={error ? `${idPrefix}-greska` : undefined}
    >
      <legend className="text-sm text-ink">{legenda}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {opcije.map((o, i) => (
          <button
            key={o}
            id={`${idPrefix}-${i}`}
            type="button"
            aria-pressed={odabrano === o}
            onClick={() => onChange(o)}
            className={cn(
              "border px-4 py-2.5 text-sm transition-colors",
              odabrano === o
                ? "border-brand bg-brand text-surface"
                : "border-line text-ink-muted hover:border-brand hover:text-brand-deep",
            )}
          >
            {o}
          </button>
        ))}
      </div>
      {error && <Greska poruka={error} id={`${idPrefix}-greska`} />}
    </fieldset>
  );
}

function Unos({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-greska` : undefined}
        className={cn(
          "mt-2 w-full border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink",
          error ? "border-destructive" : "border-line",
        )}
      />
      {error && <Greska poruka={error} id={`${id}-greska`} />}
    </div>
  );
}

function Greska({ poruka, id }: { poruka: string; id?: string }) {
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-destructive">
      {poruka}
    </p>
  );
}
