import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BEACHBASH PARTY | Lagos",
  description:
    "The biggest beach party Lagos has ever seen. One night only. October 10, 2026.",
  openGraph: {
    title: "BEACHBASH PARTY — Lagos, Oct 10 2026",
    description:
      "The biggest beach party Lagos has ever seen. One night only. October 10, 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/5 py-8 text-center">
            <p className="text-white/20 text-xs tracking-wide">
              © 2026 BEACHBASH PARTY · Lagos, Nigeria
            </p>
            <p className="text-white/10 text-[11px] mt-1 tracking-widest uppercase">
              One Night · One Vibe · Oct 10 2026
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
