import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const BASE = process.env.BASE ?? "http://127.0.0.1:43917";
const OUT = ".review-screenshots";
const AXE = await readFile(
  createRequire(import.meta.url).resolve("axe-core/axe.min.js"),
  "utf8",
);
const STRANICE = ["/", "/programi", "/programi/standard", "/upitnik", "/o-nama", "/kontakt", "/impressum"];

const results = [];
const errors = [];

// Set while we deliberately request a missing page, so its 404 does not land
// in the browser error list.
let ocekujemo404 = false;

function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  :: " + detail : ""}`);
}

const browser = await chromium.launch();

async function newPage(viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    if (ocekujemo404 && m.text().includes("404")) return;
    errors.push(`console: ${m.text()}`);
  });
  return { ctx, page };
}

await mkdir(OUT, { recursive: true });

/* ---------- Desktop ---------- */
{
  const { ctx, page } = await newPage({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle" });

  const desc = await page.locator("header").innerText();
  check("logotip ima RAZVOJ TIMOVA I LIDERA", desc.includes("RAZVOJ TIMOVA I LIDERA"));
  check("logotip nema sliku znaka", (await page.locator("header img").count()) === 0);
  check("ponuda ima šest programa", (await page.locator("#ponuda article").count()) === 6);

  // --- FAQ accordion ---
  const q = page.getByRole("button", { name: /Koliko ljudi može sudjelovati/ });
  await q.scrollIntoViewIfNeeded();
  await q.click();
  await page.waitForTimeout(500);
  const faqOpen = await page
    .getByText(/Analiza tima radi se za 3 do 15 osoba/)
    .isVisible()
    .catch(() => false);
  check("FAQ se otvara", faqOpen);

  const q2 = page.getByRole("button", { name: /Je li program fizički zahtjevan/ });
  await q2.click();
  await page.waitForTimeout(500);
  const firstStillOpen = await page
    .getByText(/Analiza tima radi se za 3 do 15 osoba/)
    .isVisible()
    .catch(() => false);
  check("FAQ drži samo jedno otvoreno", !firstStillOpen);

  await page.screenshot({ path: `${OUT}/01-pocetna.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await ctx.close();
}

/* ---------- Contact form ---------- */
{
  const { ctx, page } = await newPage({ width: 1440, height: 900 });
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });

  await page.locator("button:has-text('Pošaljite')").click();
  await page.waitForTimeout(400);
  const err = await page.getByText("Upišite ime i prezime.").isVisible();
  check("prazna forma pokazuje greške", err);

  await page.locator("#ime").fill("Ana Horvat");
  await page.locator("#tvrtka").fill("Testna d.o.o.");
  await page.locator("#email").fill("ana@gmail.com");
  await page.waitForTimeout(300);
  const stillAlive = await page.locator("#izazov").isVisible();
  check("stranica ne puca pri unosu e-maila", stillAlive);

  const hint = await page
    .getByText(/Radije bismo poslovnu adresu/)
    .isVisible()
    .catch(() => false);
  check("napomena o poslovnom e-mailu", hint);

  await page.locator("button:has-text('11 do 20 osoba')").click();
  const chipSelected = await page
    .locator("button:has-text('11 do 20 osoba')")
    .getAttribute("aria-pressed");
  check("odabrana veličina tima je označena", chipSelected === "true");

  await page
    .locator("#izazov")
    .fill("Tim dobro radi dok je mirno, a pod rokom komunikacija stane.");
  await page.locator("button:has-text('Pošaljite')").click();
  await page.waitForTimeout(1200);
  const success = await page.getByText("Upit je zaprimljen.").isVisible();
  check("uspješno slanje forme", success);
  await page.screenshot({ path: `${OUT}/03-forma-uspjeh.png` });

  await ctx.close();
}

/* ---------- Mobile ---------- */
{
  const { ctx, page } = await newPage({ width: 390, height: 844 });

  for (const path of ["/", "/o-nama", "/kontakt"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(`mobitel bez vodoravnog scrolla ${path}`, overflow <= 0, `overflow ${overflow}px`);
  }

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Otvori izbornik" }).click();
  await page.waitForTimeout(300);
  const menuLink = page
    .locator("header nav")
    .getByRole("link", { name: "O nama", exact: true });
  check("mobilni izbornik se otvara", await menuLink.isVisible());
  await menuLink.click();
  await page.waitForURL(/\/o-nama\/?$/);
  await page.waitForTimeout(400);
  check("mobilni izbornik navigira i zatvara se", page.url().includes("/o-nama"));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Otvori izbornik" }).click();
  await page.waitForTimeout(250);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  const zatvoren = await page
    .locator("#mobilni-izbornik")
    .count()
    .then((n) => n === 0);
  const fokusNaGumbu = await page.evaluate(
    () => document.activeElement?.id === "izbornik-gumb",
  );
  check("Escape zatvara mobilni izbornik", zatvoren);
  check("Escape vraća fokus na gumb izbornika", fokusNaGumbu);

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/04-mobitel-pocetna.png`, fullPage: true });

  await ctx.close();
}

/* ---------- Pristupačnost ---------- */

/** Resolves any CSS colour (including oklab with alpha) through a canvas. */
const KONTRAST = `(() => {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  const cache = new Map();
  function parse(c) {
    if (!c || c === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
    if (cache.has(c)) return cache.get(c);
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = c;
    cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data;
    const a = d[3] / 255;
    const res = a === 0 ? { r: 0, g: 0, b: 0, a: 0 } : { r: d[0], g: d[1], b: d[2], a };
    cache.set(c, res);
    return res;
  }
  const over = (f, b) => ({
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  function bgOf(el) {
    const stack = [];
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c.a > 0) { stack.push(c); if (c.a === 1) break; }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return base;
  }
  function record(el, color, size, weight, text, out) {
    const fg = parse(color);
    if (fg.a === 0) return;
    const bg = bgOf(el);
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    out.push({
      text: text.slice(0, 40),
      ratio: Math.round(ratio(over(fg, bg), bg) * 100) / 100,
      need: large ? 3 : 4.5,
    });
  }
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent.trim();
    const el = n.parentElement;
    if (!t || !el || seen.has(el) || el.closest(".sr-only")) continue;
    seen.add(el);
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0") continue;
    if (!r.width && !r.height) continue;
    record(el, cs.color, parseFloat(cs.fontSize), parseInt(cs.fontWeight, 10) || 400, t, out);
  }
  // axe-core skips placeholders, and ours carries an example the user reads
  document.querySelectorAll("[placeholder]").forEach((el) => {
    record(el, getComputedStyle(el, "::placeholder").color,
      parseFloat(getComputedStyle(el).fontSize), 400, "[placeholder] " + el.placeholder, out);
  });
  return out.filter((c) => c.ratio < c.need);
})()`;

{
  const { ctx, page } = await newPage({ width: 1280, height: 900 });

  // The 404 page carries the same header and footer, so it gets
  // the same treatment as the three real pages.
  for (const path of [...STRANICE, "/nepostojeca-stranica"]) {
    ocekujemo404 = path === "/nepostojeca-stranica";
    const odgovor = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    if (ocekujemo404) {
      check("nepoznata adresa vraća 404", odgovor.status() === 404, `status ${odgovor.status()}`);
    }

    // --- axe-core ---
    await page.addScriptTag({ content: AXE });
    const axe = await page.evaluate(async () =>
      window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"],
        },
      }),
    );
    check(
      `axe bez prekršaja ${path}`,
      axe.violations.length === 0,
      axe.violations.map((v) => `${v.id} (${v.nodes.length})`).join(", "),
    );

    // --- Contrast, including placeholders ---
    const loseBoje = await page.evaluate(KONTRAST);
    check(
      `kontrast teksta ${path}`,
      loseBoje.length === 0,
      loseBoje.map((c) => `${c.ratio}:1 "${c.text}"`).join(" | "),
    );

    // --- Heading hierarchy ---
    const naslovi = await page.evaluate(() =>
      [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]),
    );
    const skokovi = naslovi.filter((l, i) => i > 0 && l > naslovi[i - 1] + 1);
    check(
      `jedan h1 i bez preskočenih razina ${path}`,
      naslovi.filter((l) => l === 1).length === 1 && skokovi.length === 0,
      `h1 = ${naslovi.filter((l) => l === 1).length}, skokovi = ${skokovi.length}`,
    );

    // --- Skip link ---
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.keyboard.press("Tab");
    const preskoci = await page.evaluate(() => {
      const el = document.activeElement;
      const r = el.getBoundingClientRect();
      return { text: el.textContent.trim(), vidljiv: r.width > 1 && r.height > 1 };
    });
    check(
      `prva Tab meta je vidljiva preskočnica ${path}`,
      preskoci.text === "Preskoči na sadržaj" && preskoci.vidljiv,
      `${preskoci.text}, vidljiva: ${preskoci.vidljiv}`,
    );
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check(
      `preskočnica vodi na sadržaj ${path}`,
      await page.evaluate(() => document.activeElement?.id === "sadrzaj"),
    );

    // --- Every tab stop is visibly focused and not hidden under the header ---
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => document.body.focus());
    const bezOznake = [];
    const prekriveni = [];
    let zamka = false;
    for (let i = 0; i < 120; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const hr = document.querySelector("header").getBoundingClientRect();
        return {
          text: (el.textContent || el.getAttribute("aria-label") || el.id || "").trim().slice(0, 30),
          oznaka:
            (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 1) ||
            cs.boxShadow !== "none",
          // The skip link is fixed above the header on purpose.
          prekriven: r.top < hr.bottom && r.bottom > hr.top && el.closest("header") === null && el.getAttribute("href") !== "#sadrzaj",
        };
      });
      if (!info) break;
      if (!info.oznaka) bezOznake.push(info.text);
      if (info.prekriven) prekriveni.push(info.text);
      if (i === 119) zamka = true;
    }
    check(`svaka Tab meta ima vidljiv fokus ${path}`, bezOznake.length === 0, bezOznake.join(", "));
    check(
      `fokus ne završava ispod ljepljivog zaglavlja ${path}`,
      prekriveni.length === 0,
      prekriveni.join(", "),
    );
    check(`Tab izlazi iz dokumenta, nema zamke ${path}`, !zamka);

    // --- Text spacing, WCAG 1.4.12 ---
    await page.addStyleTag({
      content: `* { line-height: 1.5 !important; letter-spacing: 0.12em !important;
        word-spacing: 0.16em !important; }
        p, li, h1, h2, h3 { margin-bottom: 2em !important; }`,
    });
    await page.waitForTimeout(300);
    const odsjeceno = await page.evaluate(() =>
      [...document.querySelectorAll("body *")]
        .filter(
          (el) =>
            !el.children.length &&
            el.textContent.trim() &&
            !el.closest(".sr-only") &&
            getComputedStyle(el).overflow !== "visible" &&
            (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2),
        )
        .slice(0, 5)
        .map((el) => el.textContent.trim().slice(0, 30)),
    );
    check(
      `razmaknut tekst ne odsijeca sadržaj ${path}`,
      odsjeceno.length === 0,
      odsjeceno.join(" | "),
    );
  }

  ocekujemo404 = false;

  // --- Anchor link clears the sticky header ---
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.click("a[href='#ponuda']");
  await page.waitForTimeout(800);
  const sidro = await page.evaluate(() => {
    const t = document.querySelector("#ponuda").getBoundingClientRect();
    const h = document.querySelector("header").getBoundingClientRect();
    return Math.round(t.top - h.bottom);
  });
  check("sidro #ponuda ne završi ispod zaglavlja", sidro >= 0, `razmak ${sidro}px`);

  await ctx.close();
}

/* ---------- Forma: fokus i najava ---------- */
{
  const { ctx, page } = await newPage({ width: 1280, height: 900 });
  await page.goto(`${BASE}/kontakt`, { waitUntil: "networkidle" });

  await page.locator("button:has-text('Pošaljite')").click();
  await page.waitForTimeout(400);
  check(
    "greška u formi pomiče fokus na prvo polje",
    await page.evaluate(() => document.activeElement?.id === "ime"),
  );
  check(
    "poruka o grešci je povezana s poljem",
    await page.evaluate(() => {
      const el = document.querySelector("#ime");
      const id = (el.getAttribute("aria-describedby") || "").split(" ")[0];
      return el.getAttribute("aria-invalid") === "true" &&
        document.getElementById(id)?.textContent.includes("Upišite ime");
    }),
  );

  await page.locator("#ime").fill("Ana Horvat");
  await page.locator("#tvrtka").fill("Testna d.o.o.");
  await page.locator("#email").fill("ana@gmail.com");
  await page.waitForTimeout(250);
  check(
    "napomena uz e-mail je povezana s poljem",
    await page.evaluate(() => {
      const el = document.querySelector("#email");
      const ids = (el.getAttribute("aria-describedby") || "").split(" ");
      return ids.some((i) =>
        document.getElementById(i)?.textContent.includes("poslovnu adresu"),
      );
    }),
  );

  await page.locator("button:has-text('11 do 20 osoba')").click();
  await page.locator("#izazov").fill("Tim dobro radi dok je mirno, a pod rokom komunikacija stane.");
  await page.locator("button:has-text('Pošaljite')").click();
  await page.waitForTimeout(1400);
  check(
    "potvrda preuzima fokus i najavljuje se",
    await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("role") === "status" &&
        el.textContent.includes("Upit je zaprimljen");
    }),
  );

  await ctx.close();
}

/* ---------- Nezgodne širine, 320 je i prag za WCAG 1.4.10 ---------- */
for (const width of [320, 768, 1024, 1280]) {
  const { ctx, page } = await newPage({ width, height: 900 });
  for (const path of STRANICE) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const res = await page.evaluate(() => {
      const doc = document.documentElement;
      const sirina = doc.clientWidth;
      const izvan = [...document.querySelectorAll("body *")]
        .filter((el) => {
          if (el.closest(".sr-only")) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > sirina + 1 || r.left < -1);
        })
        .slice(0, 3)
        .map((el) => el.tagName.toLowerCase() + " " + el.textContent.trim().slice(0, 20));
      return { overflow: doc.scrollWidth - sirina, izvan };
    });
    check(
      `${width}px bez vodoravnog scrolla ${path}`,
      res.overflow <= 0 && res.izvan.length === 0,
      `overflow ${res.overflow}px ${res.izvan.join(" | ")}`,
    );
  }
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/05-sirina-${width}.png`, clip: { x: 0, y: 0, width, height: 900 } });
  await ctx.close();
}

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} provjera prošlo`);
if (errors.length) {
  console.log("\nGreške u pregledniku:");
  [...new Set(errors)].forEach((e) => console.log("  " + e));
}
process.exit(failed.length ? 1 : 0);
