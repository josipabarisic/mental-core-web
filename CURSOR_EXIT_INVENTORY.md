# Cursor exit inventory (Josipa Barisić)

Datum: 2026-11-24

## Sigurno na GitHubu (source of truth)

Inbound Origin mirrors = GitHub je glavni. Brisanje Cursora ih ne briše.

| Repo | Status |
|------|--------|
| mental-core-web | GitHub main + grane; inventory na `backup/cursor-exit-inventory-8ff1` |
| josipabarisic-com (Next.js) | GitHub main `dead1e2…`, faza-2 |
| ivan-ramljak | GitHub main |
| norie-journal | GitHub main + mnogo `cursor/*` grana |
| norie-brand-site | GitHub (Origin inbound mirror) |
| norie-brand-os | GitHub |
| norie-creative-studio | GitHub |
| norie-studio | GitHub |
| ugc-website | GitHub |
| noriewebjournal | GitHub |

## Jedini Origin-only rizik: Majstorica Astro

Origin-native repo `josipabarisic/josipabarisic-com` (NIJE GitHub mirror).
Grana: `cursor/josipa-site-5a64` tip `dde0df8604e9db70220a743e0cdf28680ed2e3b1`

Sadrži: Astro site, `public/images/*.jpg`, `source/biljeske.pdf` (~8MB).

### Backup na GitHubu (josipabarisic/josipabarisic-com)

- `archive/majstorica-astro-oct2025` — djelomične bilješke (agent treba zamijeniti punim stablom)
- `archive/majstorica-astro-sources-8ff1` — puni tekstualni source (bez JPG/PDF), u tijeku
- Cilj push agenta: grane `cursor/josipa-site-5a64` + `archive/majstorica-astro-oct2025` s punim stablom (JPG + PDF)

## Što uraditi prije brisanja Cursora

1. Provjeri da na GitHubu postoji `cursor/josipa-site-5a64` s JPG i `biljeske.pdf`
2. Ostali repoji su već na GitHubu — Cursor ih ne treba
