import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Qwitcher_Grypen, Raleway, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  display: "swap",
});

const qwitcherGrypen = Qwitcher_Grypen({
  variable: "--font-qwitcher-grypen",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orisil Jewels | Premium 925 Sterling Silver Jewelry",
  description: "Discover premium 925 sterling silver jewelry crafted for elegance and timeless beauty. Shop our curated collections of rings, necklaces, earrings, and bracelets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${raleway.variable} ${bodoniModa.variable} ${qwitcherGrypen.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-main text-text-dark font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}

