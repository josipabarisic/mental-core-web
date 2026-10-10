import {
  INSTAGRAM_URL,
  KONTAKT_MAIL,
  LINKEDIN_URL,
  OIB,
  TVRTKA,
} from "@/lib/kontakt";
import { PROGRAMI } from "@/lib/programi";

export const SITE_URL = "https://mentalcoreteam.com";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Mental Core. Uspjeh je rezultat uspješnog funkcioniranja tima.",
};

export const LOGO = {
  url: `${SITE_URL}/logo.png`,
  width: 180,
  height: 180,
};

/** Kanonski URL produkcije. Statički izvoz koristi trailing slash. */
export function absoluteUrl(path: string) {
  if (path === "" || path === "/") return `${SITE_URL}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const OPISI: Record<string, string> = {
  standard:
    "Jednodnevni trening od 8 do 10 sati s terenskim vježbama, feedbackom i izvješćem.",
  maxi: "Dvodnevni program rada na terenu za dublju promjenu i timsku povezanost.",
  premium:
    "Personalizirani paket skrojen prema specifičnim izazovima tima i lidera.",
  "analiza-tima":
    "Dubinska dijagnostika dinamike tima i ciljane radionice za rješavanje uskih grla.",
};

export function siteJsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const serviceId = `${SITE_URL}/#service`;

  const founders = [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#helena-maruscak`,
      name: "Helena Maruščak",
      jobTitle: "Direktorica & Trenerica",
      url: absoluteUrl("/o-nama"),
      worksFor: { "@id": organizationId },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#dinko-maruscak`,
      name: "Dinko Maruščak",
      jobTitle: "Suosnivač & Voditelj terenskih programa",
      url: absoluteUrl("/o-nama"),
      worksFor: { "@id": organizationId },
    },
  ];

  const address = {
    "@type": "PostalAddress",
    streetAddress: "Savska ulica 14",
    addressLocality: "Javorje",
    postalCode: "10291",
    addressCountry: "HR",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Mental Core",
        legalName: TVRTKA,
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: LOGO.url,
          width: LOGO.width,
          height: LOGO.height,
        },
        image: `${SITE_URL}${OG_IMAGE.url}`,
        description:
          "Strukturirani razvoj timova, analiza dinamike, teambuilding treninzi pod realnim stresom i individualni coaching lidera.",
        email: KONTAKT_MAIL,
        taxID: OIB,
        vatID: `HR${OIB}`,
        address,
        sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
        founder: founders,
        knowsAbout: [
          "Razvoj timova",
          "Coaching lidera",
          "Analiza timske dinamike",
          "Teambuilding",
          "Psihološka otpornost timova",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: "Mental Core",
        legalName: TVRTKA,
        url: absoluteUrl("/"),
        image: `${SITE_URL}${OG_IMAGE.url}`,
        logo: {
          "@type": "ImageObject",
          url: LOGO.url,
          width: LOGO.width,
          height: LOGO.height,
        },
        description:
          "Strukturirani razvoj timova, analiza dinamike, teambuilding treninzi pod realnim stresom i individualni coaching lidera.",
        email: KONTAKT_MAIL,
        address,
        parentOrganization: { "@id": organizationId },
        provider: { "@id": organizationId },
        areaServed: {
          "@type": "Country",
          name: "Hrvatska",
        },
        founder: founders.map((person) => ({ "@id": person["@id"] })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Programi razvoja timova",
          itemListElement: PROGRAMI.filter((p) => !p.bezStranice).map(
            (program) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: program.naziv,
                description: OPISI[program.slug] ?? program.sazetak,
                url: absoluteUrl(`/programi/${program.slug}`),
                areaServed: "Hrvatska",
                provider: { "@id": organizationId },
              },
            }),
          ),
        },
      },
    ],
  };
}

export function faqJsonLd(stavke: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: stavke.map((stavka) => ({
      "@type": "Question",
      name: stavka.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: stavka.a,
      },
    })),
  };
}
