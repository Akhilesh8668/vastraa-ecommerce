import type { Metadata } from "next";
import { Inter, Playfair_Display, Yatra_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

const yatra = Yatra_One({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-yatra" 
});

export const metadata: Metadata = {
  title: "Vastraa | Woven for Everyday",
  description: "Contemporary essentials rooted in Indian tradition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${inter.variable} ${playfair.variable} ${yatra.variable} font-sans bg-vastraa-white text-vastraa-ink antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
