import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

/**
 * Builds the sketch as a static bundle for GitHub Pages.
 *
 * `output: "export"` cannot carry a POST route handler, so the contact
 * endpoint is moved aside for the duration of the build. Without a configured
 * mail endpoint, forms report that sending is unavailable instead of claiming
 * an enquiry was received.
 */
const root = process.cwd();
const api = join(root, "src/app/api");
const parked = join(root, ".api-parked");

const moved = existsSync(api);
if (moved) renameSync(api, parked);

const basePath = process.env.BASE_PATH ?? "";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
        STATIC_EXPORT: "1",
    BASE_PATH: basePath,
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_MAIL_ENDPOINT: process.env.NEXT_PUBLIC_MAIL_ENDPOINT ?? "",
    NEXT_PUBLIC_STATIC_DEMO: process.env.NEXT_PUBLIC_MAIL_ENDPOINT
      ? "0"
      : "1",
  },
});

if (moved) renameSync(parked, api);

if (result.status !== 0) process.exit(result.status ?? 1);

// Without this GitHub Pages runs Jekyll, which drops the _next directory.
const out = join(root, "out");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, ".nojekyll"), "");

// GitHub Pages bira Content-Type prema ekstenziji. Next metadata datoteke
// (icon, apple-icon, opengraph-image) nemaju ekstenziju, pa crawleri sliku odbiju.
const published = basePath ? join(out, basePath) : out;
copyFileSync(join(published, "opengraph-image"), join(published, "og-image.png"));
copyFileSync(join(published, "apple-icon"), join(published, "logo.png"));
copyFileSync(join(published, "apple-icon"), join(published, "apple-icon.png"));
copyFileSync(join(published, "icon"), join(published, "icon.png"));

function rewriteHtml(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      rewriteHtml(path);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const html = readFileSync(path, "utf8");
    const next = html
      .replaceAll(/\/opengraph-image\?[A-Za-z0-9]+/g, "/og-image.png")
      .replaceAll(/\/apple-icon\?[A-Za-z0-9]+/g, "/apple-icon.png")
      .replaceAll(/\/icon\?[A-Za-z0-9]+/g, "/icon.png");
    if (next !== html) writeFileSync(path, next);
  }
}

rewriteHtml(published);

console.log(`\nStatički izvoz je u ./out${basePath ? `, basePath ${basePath}` : ""}`);
