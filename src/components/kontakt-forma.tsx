"use client";

import { useCallback, useState } from "react";
import { ArrowRight, CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Polje = "ime" | "tvrtka" | "email" | "velicinaTima" | "izazov";
type Greske = Partial<Record<Polje, string>>;
type Stanje = "unos" | "salje" | "uspjeh" | "greska";

const VELICINE = [
  "3 do 10 osoba",
  "11 do 20 osoba",
  "21 do 40 osoba",
  "više od 40 osoba",
];

const BESPLATNE_DOMENE = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "net.hr",
  "inet.hr",
];

const KONTAKT_MAIL = "info@mentalcore.hr";

const DEMO = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

function provjeri(data: Record<Polje, string>): Greske {
  const g: Greske = {};
  if (!data.ime.trim()) g.ime = "Upišite ime i prezime.";
  if (!data.tvrtka.trim()) g.tvrtka = "Upišite naziv tvrtke.";
  if (!data.email.trim()) {
    g.email = "Upišite e-mail adresu.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
    g.email = "Provjerite e-mail adresu.";
  }
  if (!data.velicinaTima) g.velicinaTima = "Odaberite veličinu tima.";
  if (data.izazov.trim().length < 10) {
    g.izazov = "Napišite barem rečenicu, pomaže nam da se pripremimo.";
  }
  return g;
}

/** Same order as the form, so focus lands on the first field that failed. */
const REDOSLIJED: Polje[] = ["ime", "tvrtka", "email", "velicinaTima", "izazov"];

const FOKUS_ID: Record<Polje, string> = {
  ime: "ime",
  tvrtka: "tvrtka",
  email: "email",
  velicinaTima: "velicina-tima",
  izazov: "izazov",
};

const PRAZNO: Record<Polje, string> = {
  ime: "",
  tvrtka: "",
  email: "",
  velicinaTima: "",
  izazov: "",
};

export function KontaktForma() {
  const [data, setData] = useState(PRAZNO);
  const [greske, setGreske] = useState<Greske>({});
  const [stanje, setStanje] = useState<Stanje>("unos");

  // The form is replaced by the confirmation, so focus would fall back to the
  // body. Move it onto the confirmation and scroll it clear of the sticky header.
  const otkrijPotvrdu = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const mirno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "start", behavior: mirno ? "auto" : "smooth" });
    el.focus({ preventScroll: true });
  }, []);

  const poslovniMail = (() => {
    const domena = data.email.split("@")[1]?.toLowerCase();
    return domena ? !BESPLATNE_DOMENE.includes(domena) : true;
  })();

  function set(polje: Polje, vrijednost: string) {
    setData((d) => ({ ...d, [polje]: vrijednost }));
    if (greske[polje]) setGreske((g) => ({ ...g, [polje]: undefined }));
  }

  async function posalji(e: React.FormEvent) {
    e.preventDefault();
    const g = provjeri(data);
    setGreske(g);
    if (Object.keys(g).length > 0) {
      const prvo = REDOSLIJED.find((p) => g[p]);
      if (prvo) {
        requestAnimationFrame(() =>
          document.getElementById(FOKUS_ID[prvo])?.focus(),
        );
      }
      return;
    }

    setStanje("salje");

    // The statically published sketch has no server to post to.
    if (DEMO) {
      await new Promise((r) => setTimeout(r, 600));
      setStanje("uspjeh");
      return;
    }

    try {
      const res = await fetch("/api/upit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          Upit je zaprimljen.
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Javljamo se na {data.email} u roku od jednog radnog dana. Ako vam
          treba brže, nazovite.
        </p>
        {DEMO && (
          <p className="mt-4 border-l-2 border-line pl-4 text-sm text-ink-muted">
            Ovo je skica, pa upit nije stvarno poslan. Slanje se uključuje kad
            stranica dobije domenu i poslovni e-mail.
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setData(PRAZNO);
            setStanje("unos");
          }}
          className="mt-6 text-sm font-semibold text-accent-clay-dark underline underline-offset-4"
        >
          Pošaljite još jedan upit
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={posalji}
      noValidate
      aria-labelledby="forma-naslov"
      className="border border-line bg-surface p-6 sm:p-9"
    >
      <h2 id="forma-naslov" className="sr-only">
        Obrazac za upit
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Polje
          id="ime"
          label="Ime i prezime"
          value={data.ime}
          onChange={(v) => set("ime", v)}
          error={greske.ime}
          autoComplete="name"
        />
        <Polje
          id="tvrtka"
          label="Tvrtka"
          value={data.tvrtka}
          onChange={(v) => set("tvrtka", v)}
          error={greske.tvrtka}
          autoComplete="organization"
        />
      </div>

      <div className="mt-5">
        <Polje
          id="email"
          label="Poslovni e-mail"
          type="email"
          value={data.email}
          onChange={(v) => set("email", v)}
          error={greske.email}
          autoComplete="email"
          hint={
            data.email && !poslovniMail && !greske.email
              ? "Radije bismo poslovnu adresu, ali i ova prolazi."
              : undefined
          }
        />
      </div>

      <fieldset
        className="mt-6"
        aria-describedby={greske.velicinaTima ? "velicina-greska" : undefined}
      >
        <legend className="text-sm font-semibold text-brand-deep">
          Veličina tima
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {VELICINE.map((v, i) => (
            <button
              key={v}
              id={i === 0 ? "velicina-tima" : undefined}
              type="button"
              aria-pressed={data.velicinaTima === v}
              onClick={() => set("velicinaTima", v)}
              className={cn(
                "border px-4 py-2.5 text-sm transition-colors",
                data.velicinaTima === v
                  ? "border-brand bg-brand text-surface"
                  : "border-line text-ink-muted hover:border-brand hover:text-brand-deep",
              )}
            >
              {v}
            </button>
          ))}
        </div>
        {greske.velicinaTima && (
          <Greska poruka={greske.velicinaTima} id="velicina-greska" />
        )}
      </fieldset>

      <div className="mt-6">
        <label
          htmlFor="izazov"
          className="text-sm font-semibold text-brand-deep"
        >
          Najveći izazov tima trenutno
        </label>
        <textarea
          id="izazov"
          rows={4}
          value={data.izazov}
          onChange={(e) => set("izazov", e.target.value)}
          aria-invalid={Boolean(greske.izazov)}
          aria-describedby={greske.izazov ? "izazov-greska" : undefined}
          placeholder="Na primjer: tim dobro radi dok je mirno, a pod rokom komunikacija stane."
          className={cn(
            "mt-2 w-full resize-y border bg-white px-3.5 py-3 text-[0.95rem] text-ink placeholder:text-ink/40",
            greske.izazov ? "border-destructive" : "border-line",
          )}
        />
        {greske.izazov && <Greska poruka={greske.izazov} id="izazov-greska" />}
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={stanje === "salje"}
          className="inline-flex items-center justify-center gap-2 bg-accent-clay px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-clay-dark disabled:opacity-70"
        >
          {stanje === "salje" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Šaljemo...
            </>
          ) : (
            <>
              Pošaljite upit
              <ArrowRight size={16} />
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-ink-muted">
          Vaši podaci ostaju kod nas. Ne šaljemo newsletter bez vašeg pristanka.
        </p>
      </div>

      {stanje === "greska" && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <CircleAlert size={17} className="mt-0.5 shrink-0" />
          <span>
            Slanje nije uspjelo. Pišite nam izravno na{" "}
            <a href={`mailto:${KONTAKT_MAIL}`} className="underline">
              {KONTAKT_MAIL}
            </a>{" "}
            ili pokušajte ponovno.
          </span>
        </p>
      )}
    </form>
  );
}

function Polje({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-brand-deep">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [error && `${id}-greska`, hint && `${id}-napomena`]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          "mt-2 w-full border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink",
          error ? "border-destructive" : "border-line",
        )}
      />
      {error && <Greska poruka={error} id={`${id}-greska`} />}
      {hint && (
        <p id={`${id}-napomena`} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      )}
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
