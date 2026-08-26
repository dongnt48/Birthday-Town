import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Light That Found You — Birthday Story",
  description: "A mobile-first cinematic birthday narrative guided by a single continuous light.",
  authors: [{ name: "The Light That Found You" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#040508",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="bg-space-950 text-neutral-100 antialiased overflow-x-hidden selection:bg-celestial-gold selection:text-space-950">
        <div className="film-grain" />
        <div className="vignette-overlay" />
        {children}
      </body>
    </html>
  );
}
