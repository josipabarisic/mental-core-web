"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, CircleAlert, CircleCheck, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { KONTAKT_MAIL } from "@/lib/kontakt";
import { mailEndpoint } from "@/lib/mail-endpoint";

const DOGADJAJ = "mentalcore:razgovor";

const VELICINE = ["Do 10 ljudi", "10 – 25 ljudi", "25 – 50 ljudi", "50+ ljudi"];

const FOKUSI = [
  "Komunikacija u timu",
  "Preopterećenost i stres",
  "Novi lideri / promjene",
  "Izgradnja povjerenja",
  "Samo želimo kvalitetan program",
];

const BESPLATNE = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "net.hr", "inet.hr"];

const DEMO =
  process.env.NEXT_PUBLIC_STATIC_DEMO === "1" &&
  !process.env.NEXT_PUBLIC_MAIL_ENDPOINT;

type Polje = "ime" | "email" | "telefon" | "zapinje";
type Greske = Partial<Record<Polje, string>>;
type Detalj = { program?: string };

export function otvoriRazgovor(program?: string) {
  window.dispatchEvent(
    new CustomEvent<Detalj>(DOGADJAJ, { detail: { program } }),
  );
}

export function OtvoriRazgovor({
  className,
  children,
  program,
}: {
  className?: string;
  children: React.ReactNode;
  program?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => otvoriRazgovor(program)}>
      {children}
    </button>
  );
}

function samoZnamenke(vrijednost: string) {
  const plus = vrijednost.trim().startsWith("+");
  const znamenke = vrijednost.replace(/\D/g, "");
  return plus ? `+${znamenke}` : znamenke;
}

function greskaPolja(
  polje: Polje,
  vrijednost: {
    ime: string;
    email: string;
    telefon: string;
    zapinje: string;
    fokus: string[];
    program?: string;
  },
): string | undefined {
  if (polje === "ime" && !vrijednost.ime.trim()) return "Upišite ime i prezime.";
  if (polje === "email") {
    const email = vrijednost.email.trim();
    if (!email) return "Upišite e-mail adresu.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "Provjerite e-mail adresu.";
  }
  if (polje === "telefon" && vrijednost.telefon.trim()) {
    const n = samoZnamenke(vrijednost.telefon).replace(/\D/g, "").length;
    if (n < 6 || n > 15) {
      return "Broj izgleda nepotpuno. Možete ga ostaviti praznim.";
    }
  }
  if (polje === "zapinje") {
    const imaTekst = vrijednost.zapinje.trim().length >= 3;
    if (!imaTekst && vrijednost.fokus.length === 0 && !vrijednost.program?.trim()) {
      return "Odaberite temu ili napišite ukratko gdje tim zapinje.";
    }
  }
  return undefined;
}

const FOKUSABILNO =
  'a[href], button:not([disabled]), textarea, input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])';

const POZADINA = ["header", "main", "footer", "a[href='#sadrzaj']"];

export function RazgovorOkvir() {
  const naslovId = useId();
  const putanja = usePathname();
  const dijalo = useRef<HTMLDivElement>(null);
  const povratak = useRef<HTMLElement | null>(null);
  const [otvoren, setOtvoren] = useState(false);
  const [prikazan, setPrikazan] = useState(false);
  const [prosaoUvod, setProsaoUvod] = useState(false);
  const [vidiKraj, setVidiKraj] = useState(false);
  const [interes, setInteres] = useState("");
  const [kljuc, setKljuc] = useState(0);
  const naObrascu =
    putanja.startsWith("/kontakt") || putanja.startsWith("/upitnik");

  const zatvori = useCallback(() => setOtvoren(false), []);

  useEffect(() => {
    const otvori = (e: Event) => {
      const program = (e as CustomEvent<Detalj>).detail?.program ?? "";
      povratak.current = document.activeElement as HTMLElement | null;
      setInteres(program);
      setKljuc((k) => k + 1);
      setOtvoren(true);
    };
    window.addEventListener(DOGADJAJ, otvori);
    return () => window.removeEventListener(DOGADJAJ, otvori);
  }, []);

  useEffect(() => {
    const uvod = document.getElementById("uvod");
    const kraj = document.getElementById("razgovor");
    const promatraci: IntersectionObserver[] = [];
    const ciscenje: Array<() => void> = [];

    setProsaoUvod(false);
    setVidiKraj(false);

    if (uvod) {
      const o = new IntersectionObserver(([e]) => {
        setProsaoUvod(e.boundingClientRect.bottom <= 0);
      });
      o.observe(uvod);
      promatraci.push(o);
    } else {
      const naPomak = () => setProsaoUvod(window.scrollY > 360);
      naPomak();
      window.addEventListener("scroll", naPomak, { passive: true });
      ciscenje.push(() => window.removeEventListener("scroll", naPomak));
    }

    let krajSakrij = false;
    let podnozjeSakrij = false;
    const osvjezi = () => setVidiKraj(krajSakrij || podnozjeSakrij);
    const opcije = { rootMargin: "0px 0px -72px 0px", threshold: 0 };

    if (kraj) {
      const o = new IntersectionObserver(([e]) => {
        krajSakrij = e.isIntersecting || e.boundingClientRect.bottom <= 80;
        osvjezi();
      }, opcije);
      o.observe(kraj);
      promatraci.push(o);
    }

    const podnozje = document.querySelector("footer");
    if (podnozje) {
      const o = new IntersectionObserver(([e]) => {
        podnozjeSakrij = e.isIntersecting || e.boundingClientRect.bottom <= 80;
        osvjezi();
      }, opcije);
      o.observe(podnozje);
      promatraci.push(o);
    }

    return () => {
      promatraci.forEach((o) => o.disconnect());
      ciscenje.forEach((fn) => fn());
    };
  }, [putanja]);

  useEffect(() => {
    if (otvoren) {
      const id = requestAnimationFrame(() => setPrikazan(true));
      return () => cancelAnimationFrame(id);
    }
    setPrikazan(false);
  }, [otvoren]);

  useEffect(() => {
    if (!otvoren) return;
    const prethodni = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const pozadina = POZADINA.flatMap((s) => [...document.querySelectorAll(s)]);
    pozadina.forEach((el) => el.setAttribute("inert", ""));
    const korijen = dijalo.current;
    korijen?.querySelector<HTMLElement>("[data-prvi]")?.focus();

    function naTipku(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOtvoren(false);
        return;
      }
      if (e.key !== "Tab" || !korijen) return;
      const lista = [...korijen.querySelectorAll<HTMLElement>(FOKUSABILNO)].filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex >= 0,
      );
      if (lista.length > 0 && !korijen.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? lista[lista.length - 1] : lista[0]).focus();
        return;
      }
      if (lista.length === 0) return;
      const prvi = lista[0];
      const zadnji = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === prvi) {
        e.preventDefault();
        zadnji.focus();
      } else if (!e.shiftKey && document.activeElement === zadnji) {
        e.preventDefault();
        prvi.focus();
      }
    }

    document.addEventListener("keydown", naTipku);
    return () => {
      document.removeEventListener("keydown", naTipku);
      document.body.style.overflow = prethodni;
      pozadina.forEach((el) => el.removeAttribute("inert"));
      povratak.current?.focus();
    };
  }, [otvoren]);

  const traka = prosaoUvod && !vidiKraj && !otvoren && !naObrascu;

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[rgba(38,46,48,0.92)] px-4 pt-3 backdrop-blur-[8px] md:hidden",
          "klizanje",
          traka
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        aria-hidden={!traka}
      >
        <button
          type="button"
          tabIndex={traka ? 0 : -1}
          onClick={() => otvoriRazgovor()}
          className="gumb flex min-h-12 w-full items-center justify-center bg-accent-clay px-6 py-2 text-center text-sm font-bold leading-tight text-white hover:bg-accent-clay-dark"
        >
          Dogovorite 15 minuta konzultacija
        </button>
      </div>

      {otvoren && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-[4px]"
            aria-label="Zatvori obrazac"
            onClick={zatvori}
          />
          <div
            ref={dijalo}
            role="dialog"
            aria-modal="true"
            aria-labelledby={naslovId}
            className={cn(
              "absolute inset-x-0 bottom-0 flex max-h-[90vh] flex-col overflow-hidden rounded-t-[20px] bg-surface shadow-xl md:inset-y-0 md:right-0 md:left-auto md:h-screen md:max-h-none md:w-full md:max-w-[480px] md:rounded-none",
              "klizanje",
              prikazan
                ? "translate-y-0 md:translate-x-0"
                : "translate-y-full md:translate-x-full md:translate-y-0",
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <p className="eyebrow text-accent-clay">Razgovor</p>
                <h2 id={naslovId} className="mt-2 text-2xl font-bold text-brand-deep">
                  Recite nam gdje tim zapinje
                </h2>
              </div>
              <button
                type="button"
                onClick={zatvori}
                className="inline-flex size-12 shrink-0 items-center justify-center text-brand-deep"
                aria-label="Zatvori"
              >
                <X size={22} />
              </button>
            </div>
            <RazgovorObrazac
              key={kljuc}
              idPrefix="razgovor"
              program={interes}
              onUkloniProgram={() => setInteres("")}
              prvoPolje
            />
          </div>
        </div>
      )}
    </>
  );
}

export function RazgovorObrazac({
  idPrefix,
  program = "",
  onUkloniProgram,
  prvoPolje = false,
}: {
  idPrefix: string;
  program?: string;
  onUkloniProgram?: () => void;
  prvoPolje?: boolean;
}) {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [zapinje, setZapinje] = useState("");
  const [velicina, setVelicina] = useState("");
  const [fokus, setFokus] = useState<string[]>([]);
  const [greske, setGreske] = useState<Greske>({});
  const [stanje, setStanje] = useState<"unos" | "salje" | "uspjeh" | "greska">("unos");
  const [med, setMed] = useState("");
  const potvrda = useRef<HTMLDivElement>(null);

  const vrijednosti = { ime, email, telefon, zapinje, fokus, program };

  function naIzlaz(polje: Polje, vrijednost: string) {
    const sljedece = { ...vrijednosti, [polje]: vrijednost };
    setGreske((g) => ({ ...g, [polje]: greskaPolja(polje, sljedece) }));
  }

  function prebaciFokus(tema: string) {
    setFokus((trenutno) =>
      trenutno.includes(tema) ? trenutno.filter((t) => t !== tema) : [...trenutno, tema],
    );
  }

  const osobniMail = (() => {
    const domena = email.split("@")[1]?.toLowerCase();
    return Boolean(domena && BESPLATNE.includes(domena) && !greske.email);
  })();

  async function posalji(e: React.FormEvent) {
    e.preventDefault();
    const sljedeca: Greske = {
      ime: greskaPolja("ime", vrijednosti),
      email: greskaPolja("email", vrijednosti),
      telefon: greskaPolja("telefon", vrijednosti),
      zapinje: greskaPolja("zapinje", vrijednosti),
    };
    setGreske(sljedeca);
    const prvo = (["ime", "email", "telefon", "zapinje"] as Polje[]).find((p) => sljedeca[p]);
    if (prvo) {
      document.getElementById(`${idPrefix}-${prvo}`)?.focus();
      return;
    }

    setStanje("salje");
    if (DEMO) {
      setStanje("greska");
      return;
    }

    const cistTelefon = telefon.trim() ? samoZnamenke(telefon) : "";
    const tekst = zapinje.trim();
    const odabrano = program.trim();
    const biljeska = tekst || fokus.join(", ");
    const tijelo = [odabrano ? `Odabrani interes: ${odabrano}` : "", biljeska]
      .filter(Boolean)
      .join("\n\n");
    try {
      const res = await fetch(mailEndpoint("/api/upit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ime: ime.trim(),
          email: email.trim(),
          telefon: cistTelefon,
          tvrtka: odabrano || "Nije navedena",
          velicinaTima: velicina || "Nije odabrana",
          fokus,
          izazov: tijelo,
          med,
        }),
      });
      if (!res.ok) throw new Error("neuspjelo");
      setStanje("uspjeh");
      requestAnimationFrame(() => potvrda.current?.focus());
    } catch {
      setStanje("greska");
    }
  }

  return (
    <>
      {stanje === "uspjeh" ? (
        <div
          ref={potvrda}
          tabIndex={-1}
          role="status"
          className="flex flex-1 flex-col px-5 py-10 outline-none"
        >
          <CircleCheck size={32} className="text-accent-clay" strokeWidth={1.75} />
          <h3 className="mt-5 text-2xl font-bold text-brand-deep">
            Vaša poruka je na pravom mjestu.
          </h3>
          <p className="mt-3 leading-relaxed text-ink">
            Pročitat ćemo vaše bilješke i javiti vam se s konkretnim prijedlogom
            koraka unutar 24 radna sata (bez generičkih prodajnih prezentacija).
          </p>
        </div>
      ) : (
        <form onSubmit={posalji} noValidate className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6">
          {program.trim() && (
            <p className="mb-4 inline-flex w-fit max-w-full items-center gap-2 border border-line bg-white px-3 py-1.5 text-sm text-ink">
              <span className="min-w-0">
                Odabrani interes: {program.trim()}
              </span>
              <button
                type="button"
                onClick={onUkloniProgram}
                className="inline-flex size-8 shrink-0 items-center justify-center text-brand-deep"
                aria-label={`Ukloni ${program.trim()}`}
              >
                <X size={14} />
              </button>
            </p>
          )}
          <p className="text-sm leading-relaxed text-ink-muted">
            Petnaest minuta, bez obveze. Ono što napišete ostaje kod nas.
          </p>
          <input
            type="text"
            name="med"
            tabIndex={-1}
            autoComplete="off"
            value={med}
            onChange={(e) => setMed(e.target.value)}
            className="sr-only"
            aria-hidden="true"
          />

          <Polje
            id={`${idPrefix}-ime`}
            label="Ime i prezime"
            value={ime}
            onChange={setIme}
            onBlur={(v) => naIzlaz("ime", v)}
            error={greske.ime}
            autoComplete="name"
            obavezno
            prvo={prvoPolje}
          />
          <Polje
            id={`${idPrefix}-email`}
            label="Poslovni e-mail"
            type="email"
            value={email}
            onChange={setEmail}
            onBlur={(v) => naIzlaz("email", v)}
            error={greske.email}
            autoComplete="email"
            inputMode="email"
            obavezno
            hint={
              osobniMail
                ? "Može i osobna adresa. Poslovna nam pomaže da odgovor stigne na pravo mjesto."
                : undefined
            }
          />
          <Polje
            id={`${idPrefix}-telefon`}
            label="Telefon (opcionalno)"
            type="tel"
            value={telefon}
            onChange={setTelefon}
            onBlur={(v) => naIzlaz("telefon", v)}
            error={greske.telefon}
            autoComplete="tel"
            inputMode="tel"
          />

          <fieldset className="mt-6">
            <legend className="text-sm text-ink">Veličina tima</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {VELICINE.map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={velicina === v}
                  onClick={() => setVelicina((t) => (t === v ? "" : v))}
                  className={cn(
                    "min-h-12 border px-3 py-2 text-sm transition-colors duration-150",
                    velicina === v
                      ? "border-accent-clay bg-accent-clay text-white"
                      : "border-line text-ink hover:border-accent-clay",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6" aria-describedby={greske.zapinje ? `${idPrefix}-zapinje-greska` : undefined}>
            <legend className="text-sm text-ink">Fokus, ako želite odabrati</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {FOKUSI.map((f) => {
                const ukljucen = fokus.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={ukljucen}
                    onClick={() => prebaciFokus(f)}
                    className={cn(
                      "min-h-12 border px-3 py-2 text-left text-sm transition-colors duration-150",
                      ukljucen
                        ? "border-accent-clay bg-accent-clay text-white"
                        : "border-line text-ink hover:border-accent-clay",
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor={`${idPrefix}-zapinje`} className="text-sm text-ink">
              Gdje tim trenutno najviše zapinje?
            </label>
            <textarea
              id={`${idPrefix}-zapinje`}
              rows={4}
              value={zapinje}
              onChange={(e) => setZapinje(e.target.value)}
              onBlur={(e) => naIzlaz("zapinje", e.target.value)}
              aria-invalid={Boolean(greske.zapinje)}
              aria-describedby={greske.zapinje ? `${idPrefix}-zapinje-greska` : undefined}
              className="mt-2 w-full resize-y border border-line bg-white px-3.5 py-3 text-[0.95rem] text-ink transition-[border-color,outline-color] duration-150 outline-offset-2 focus-visible:border-accent-clay focus-visible:outline-2 focus-visible:outline-accent-clay"
            />
            {greske.zapinje && (
              <p id={`${idPrefix}-zapinje-greska`} className="mt-1.5 text-xs font-medium text-destructive">
                {greske.zapinje}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={stanje === "salje"}
            className="gumb mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-accent-clay px-6 text-sm font-bold text-white hover:bg-accent-clay-dark disabled:opacity-70"
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

          {stanje === "greska" && (
            <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-destructive">
              <CircleAlert size={17} className="mt-0.5 shrink-0" />
              <span>
                Slanje nije uspjelo. Pišite nam na{" "}
                <a href={`mailto:${KONTAKT_MAIL}`} className="underline">
                  {KONTAKT_MAIL}
                </a>
                .
              </span>
            </p>
          )}
        </form>
      )}
    </>
  );
}

function Polje({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  type = "text",
  autoComplete,
  inputMode,
  obavezno,
  prvo,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: (vrijednost: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel";
  obavezno?: boolean;
  prvo?: boolean;
}) {
  return (
    <div className="mt-5">
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        data-prvi={prvo ? "" : undefined}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={obavezno || undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={[error && `${id}-greska`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined}
        className={cn(
          "mt-2 min-h-12 w-full border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink transition-[border-color,outline-color] duration-150 outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-clay",
          error ? "border-destructive" : "border-line focus-visible:border-accent-clay",
        )}
      />
      {error && (
        <p id={`${id}-greska`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
