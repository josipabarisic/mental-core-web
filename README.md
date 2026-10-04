# Mental Core, skica weba

Skica web stranice za Mental Core, B2B brend za razvoj timova i lidera na hrvatskom tržištu. Tri stranice: Početna, O nama, Kontakt.

Ovo je skica za internu raspravu s klijenticom, ne završna stranica. Fotografije, podaci tvrtke i kontakti su rezervirana mjesta.

## Na čemu se temelji

Sadržaj i struktura slijede plan u Agent Store-u projekta:
`docs/plan-web-mental-core.md`, poglavlja 3 (struktura stranica), 5 (ton glasa) i 6 (vizualni identitet).

Paleta je izmjerena izravno iz klijentičinih datoteka vizualnog identiteta i zapisana kao dizajn tokeni u `src/app/globals.css`. Omjeri kontrasta za svaki par boja navedeni su u planu, poglavlje 6.4.

## Usporedba logotipa

Stranica ima traku za pregled na dnu ekrana s dvije varijante logotipa:

- **A. Postojeći**, znak s tri figure i deskriptor TEAMBUILDING
- **B. Prijedlog**, bez znaka, deskriptor RAZVOJ TIMOVA I LIDERA

Odabir se pamti u pregledniku. Traka je alat za pregled i uklanja se prije objave, zajedno s `src/components/brand/review-bar.tsx` i kontekstom u `src/components/brand/logo-variant.tsx`.

## Pokretanje

```bash
npm install
npm run dev -- --port 43917
```

Stranica je na `http://localhost:43917`.

## Stack

- Next.js 16 s App Routerom i TypeScriptom
- Tailwind CSS 4, dizajn tokeni u `src/app/globals.css`
- shadcn/ui za primitivne komponente
- Inter kao web pismo, dok ne dobijemo izvorno pismo iz logotipa

## Struktura

```
src/app/            tri stranice, favicon i Open Graph slika
src/app/api/upit/   endpoint za kontakt formu
src/components/     zaglavlje, podnožje, sekcije, forma
src/components/brand/  logotip, varijante, traka za pregled
public/brand/       znak izvučen iz klijentičinih datoteka identiteta
```

## Što nedostaje prije objave

- Fotografije. Sva mjesta za fotografije su označena u sučelju.
- Logotip u vektoru i izvorno pismo s licencom za web.
- Podaci tvrtke: naziv, OIB, sjedište. Trenutno su rezervirano mjesto u podnožju.
- Stvarni e-mail i telefon.
- Kontakt forma trenutno samo zapisuje upit u konzolu. Prije objave ide Resend ili Formspree, plus zaštita od neželjene pošte.
- Pravila privatnosti i mjerenje (Plausible i LinkedIn Insight Tag).
