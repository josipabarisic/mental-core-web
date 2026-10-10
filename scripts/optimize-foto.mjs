import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public/foto");
const files = readdirSync(dir).filter((name) => name.endsWith(".jpg"));

for (const name of files) {
  const src = join(dir, name);
  const base = name.replace(/\.jpg$/, "");
  const meta = await sharp(src).metadata();
  const width = meta.width ?? 0;
  const full = Math.min(width, 1440);

  await sharp(src)
    .resize({ width: full, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(join(dir, `${base}.webp`));

  if (width > 800) {
    await sharp(src)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(dir, `${base}-720.webp`));
  }

  console.log(`${name} ${width}px -> ${full}px webp`);
}
