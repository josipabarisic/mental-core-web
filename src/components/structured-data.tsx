import { faqJsonLd, jsonLd, siteJsonLd } from "@/lib/seo";

export function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd()) }}
    />
  );
}

export function FaqSchema({
  stavke,
}: {
  stavke: { q: string; a: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(stavke)) }}
    />
  );
}
