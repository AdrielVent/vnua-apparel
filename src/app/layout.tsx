import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartHUD } from "@/components/CartHUD";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["600", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "VNUA — Engineered Apparel",
  description: "Modular apparel for creative systems. Built from motion, color, and controlled chaos. VNUA Drop 01.",
  keywords: ["VNUA", "clothing", "engineered apparel", "modular", "creative"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-mono selection:bg-gray-900 selection:text-white">
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <CartHUD />
      </body>
    </html>
  );
}
