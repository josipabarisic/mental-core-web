import { spawnSync } from "node:child_process";
import { existsSync, renameSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Builds the sketch as a static bundle for GitHub Pages.
 *
 * `output: "export"` cannot carry a POST route handler, so the contact
 * endpoint is moved aside for the duration of the build. The form detects
 * NEXT_PUBLIC_STATIC_DEMO and confirms without sending anything, which is
 * stated in the confirmation text so nobody thinks an enquiry went out.
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

console.log(`\nStatički izvoz je u ./out${basePath ? `, basePath ${basePath}` : ""}`);
