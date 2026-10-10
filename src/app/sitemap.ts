import type { MetadataRoute } from "next";
import { PROGRAMI } from "@/lib/programi";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function entry(
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const programi = PROGRAMI.filter((p) => !p.bezStranice).map((p) =>
    entry(`/programi/${p.slug}`, "weekly", 0.8),
  );

  return [
    entry("/", "weekly", 1),
    entry("/programi", "weekly", 0.8),
    ...programi,
    entry("/o-nama", "monthly", 0.6),
    entry("/kontakt", "monthly", 0.6),
    entry("/upitnik", "monthly", 0.6),
    entry("/impressum", "yearly", 0.3),
    entry("/pravila-privatnosti", "yearly", 0.2),
    entry("/politika-o-kolacicima", "yearly", 0.2),
  ];
}
