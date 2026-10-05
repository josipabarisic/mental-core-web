import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const openSauce = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-open-sauce",
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
    <html lang="hr" className={`${openSauce.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-surface">
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
