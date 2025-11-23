import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import GtmLoader from "./(consent)/GtmLoader";
import AuthProvider from "@/components/AuthProvider";
import ScrollTexture from "@/components/ScrollTexture";
import GoldenEdgeLines from "@/components/GoldenEdgeLines";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <head>
        <GtmLoader />
      </head>
      <body className={`${inter.className} bg-white min-h-screen`}>
        <AuthProvider>
          {/* Fixed HOME Button - Always Visible */}
          <Link
            href="/"
            className="fixed top-6 left-6 z-50 group bg-white/90 backdrop-blur-md border border-white/70 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
            style={{
              boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.06)'
            }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200 hidden sm:block">
                home
              </span>
            </div>
            {/* Premium glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <ScrollTexture />
          <GoldenEdgeLines />
          <main className="bg-white">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}