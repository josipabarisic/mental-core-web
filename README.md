# Mental Core, skica weba

Skica web stranice za Mental Core, B2B brend za razvoj timova i lidera na hrvatskom tržištu. Stranice: Početna, Programi sa stranicom za svaki program, Upitnik o timu, O nama i Kontakt.

Objavljeno na https://mentalcoreteam.com. Podaci tvrtke i kontakti su još rezervirana mjesta.

## Na čemu se temelji

Sadržaj i struktura slijede plan u Agent Store-u projekta:
`docs/plan-web-mental-core.md`, poglavlja 3 (struktura stranica), 5 (ton glasa) i 6 (vizualni identitet).

Paleta je izmjerena izravno iz klijentičinih datoteka vizualnog identiteta i zapisana kao dizajn tokeni u `src/app/globals.css`. Omjeri kontrasta za svaki par boja navedeni su u planu, poglavlje 6.4.

## Logotip i znak

Odabran je logotip B: MENTAL CORE s deskriptorom RAZVOJ TIMOVA I LIDERA, bez slikovnog znaka. Znak za favicon je slovo M s crticom ispod, u `src/app/icon.tsx`.

## Programi i cijene

Svi programi, opisi i cijene su na jednom mjestu, u `src/lib/programi.ts`. Početna, stranica Programi i stranica svakog programa čitaju odatle, pa se cijena mijenja samo ondje.

## Fotografije

Odabrane fotografije su u `public/foto/`, smanjene za web. Popis i opisi za čitače zaslona su u `src/components/photo-slot.tsx`.

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
src/app/            stranice, favicon i Open Graph slika
src/app/api/        endpointi za kontakt formu i upitnik
src/components/     zaglavlje, podnožje, sekcije, forma
src/components/brand/  logotip
src/lib/programi.ts programi, opisi i cijene
public/foto/        fotografije
```

## Što nedostaje prije objave

- Izvorno pismo s licencom za web.
- Podaci tvrtke: naziv, OIB, sjedište. Trenutno su rezervirano mjesto u podnožju.
- Stvarni e-mail i telefon.
- Kontakt forma i upitnik trenutno ne šalju ništa. Prije objave ide Resend ili Formspree, plus zaštita od neželjene pošte.
- Pravila privatnosti i mjerenje (Plausible i LinkedIn Insight Tag).
