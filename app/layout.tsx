import type { Metadata } from "next";
import { Inter, Playfair_Display, Allura } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import GtmLoader from "./(consent)/GtmLoader";
import AuthProvider from "@/components/AuthProvider";
import ScrollTexture from "@/components/ScrollTexture";
import GoldenEdgeLines from "@/components/GoldenEdgeLines";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});
const allura = Allura({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-signature',
});

export const metadata: Metadata = {
  title: "Lil Movements",
  description: "Dance and movement classes with Lily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${allura.variable}`}>
      <head>
        <GtmLoader />
      </head>
      <body className={`${inter.className} bg-lmBg text-lmInk min-h-screen`}>
        <AuthProvider>
          <SiteHeader />
          <ScrollTexture />
          <GoldenEdgeLines />
          <main className="bg-lmBg">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}