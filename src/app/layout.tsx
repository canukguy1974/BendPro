import type { Metadata } from "next";
import { Barlow, Oxanium } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oxanium",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "BendPro",
  description: "BendPro dashboard mock",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oxanium.variable} ${barlow.variable}`}>
      <body className="min-h-screen bg-[#1a1a1a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
