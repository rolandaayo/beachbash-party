import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import NavigationLoader from "@/components/NavigationLoader";
import ChatWidget from "@/components/ChatWidget";
import WelcomeToast from "@/components/WelcomeToast";
import { ToastContainer } from "@/components/Toast";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf5ff] text-[#1e0a3c]">
        <AuthProvider>
          <CartProvider>
            <NavigationLoader />
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-purple-100 py-8 text-center">
              <p className="text-[#1e0a3c] text-xs tracking-wide">
                © 2026 BEACHBASH PARTY · Lagos, Nigeria
              </p>
              <p className="text-[#1e0a3c]/60 text-[11px] mt-1 tracking-widest uppercase">
                One Night · One Vibe · Oct 10 2026
              </p>
            </footer>
            <ChatWidget />
            <WelcomeToast />
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
