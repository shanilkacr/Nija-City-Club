import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { MegaMenu } from "@/components/club/MegaMenu";
import { SiteFooter } from "@/components/club/SiteFooter";
import { SITE } from "@/config/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.location}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <MegaMenu />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
