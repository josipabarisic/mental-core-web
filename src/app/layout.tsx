import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteSchema } from "@/components/structured-data";
import { OG_IMAGE } from "@/lib/seo";

// Lokalni font za naslove
const openSauce = localFont({
  src: [
    {
      path: "../fonts/OpenSauceOne-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/OpenSauceOne-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/OpenSauceOne-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-sauce",
  display: "swap",
});

// Inter s punom podrškom za hrvatska slova (č, ć, đ, š, ž)
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mentalcoreteam.com"),
  title: {
    default: "Mental Core | Razvoj timova i lidera kroz iskustvo i analizu",
    template: "%s | Mental Core",
  },
  description:
    "Programi za timove koji moraju funkcionirati i kad nije sve pod kontrolom. Analiza timske dinamike, terenske vježbe, coaching lidera i strukturirani teambuilding.",
  keywords: [
    "teambuilding hrvatska",
    "razvoj timova i lidera",
    "analiza tima radionice",
    "coaching lidera zagreb",
    "teambuilding sa svrhom",
    "psihološka otpornost timova",
    "mental core tim",
    "helena maruscak",
    "dinko maruscak",
  ],
  authors: [
    { name: "Helena Maruščak", url: "https://mentalcoreteam.com/o-nama/" },
    { name: "Dinko Maruščak", url: "https://mentalcoreteam.com/o-nama/" },
  ],
  creator: "Mental Core",
  publisher: "Psihologija po mjeri j.d.o.o.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "./",
    siteName: "Mental Core",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr" className={`${openSauce.variable} ${inter.variable} font-sans h-full`}>
      <body className="flex min-h-full flex-col bg-surface font-sans">
        <SiteSchema />
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-brand-deep focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-surface"
        >
          Preskoči na sadržaj
        </a>
        <SiteHeader />
        <main id="sadrzaj" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
