import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Yatra_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dmsans" 
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

import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", dmSans.variable, playfair.variable, yatra.variable)}>
      <body className="font-sans bg-background text-foreground antialiased no-scrollbar">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
