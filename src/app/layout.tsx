import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
  title: "VNUA SYSTEMS APPAREL",
  description: "The creative-engineering identity of Adriel Ventura. Heavy duty tactical apparel.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground uppercase tracking-widest selection:bg-neon-green selection:text-black font-mono">
        {/* Full-bleed brutalist wrapper */}
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full brutal-border bg-black/95 my-0 md:my-8 shadow-[10px_10px_0px_0px_rgba(0,230,107,1)]">
          <Navigation />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
        <CartHUD />
      </body>
    </html>
  );
}
