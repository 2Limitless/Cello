import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, EB_Garamond, Cinzel, Caveat, Great_Vibes } from "next/font/google";
import "./globals.css";
import { SiteContentProvider } from "@/context/SiteContentContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Lane & Edwards | Master Luthiers",
  description: "Find your truest voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} ${ebGaramond.variable} ${cinzel.variable} ${caveat.variable} ${greatVibes.variable} antialiased`}
      >
        <SiteContentProvider>
          {children}
        </SiteContentProvider>
      </body>
    </html>
  );
}
