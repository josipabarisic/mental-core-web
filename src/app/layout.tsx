import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
    default: "Mental Core, razvoj timova i lidera",
    template: "%s | Mental Core",
  },
  description:
    "Analiza tima, radionice i coaching lidera. Programi koji grade timove za stvarne uvjete: pritisak, umor i nepredvidivost.",
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Mental Core",
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
