"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tickets", label: "Tickets" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl leading-none">🏖️</span>
            <span className="font-black text-sm tracking-[0.18em] text-white group-hover:text-white/70 transition-colors uppercase">
              BeachBash
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`btn-ghost text-xs font-medium tracking-wide ${
                  pathname === href ? "text-white bg-white/8" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative btn-primary text-xs py-2 px-4"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 6h12.8M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 cart-dot text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden btn-ghost p-2"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h10"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="drawer-overlay fixed inset-0 z-[60] bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Panel — slides in from the right */}
          <div className="drawer-panel fixed top-0 right-0 bottom-0 z-[70] w-72 bg-[#0d0d0d] border-l border-white/8 flex flex-col">
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-white/6">
              <span className="font-black text-sm tracking-[0.18em] text-white uppercase">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-1 p-4 flex-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === href
                      ? "bg-white/8 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Drawer footer */}
            <div className="p-4 border-t border-white/6">
              <Link
                href="/tickets"
                className="btn-primary w-full justify-center text-xs py-3"
              >
                Get Tickets 🎟️
              </Link>
              <p className="text-center text-white/20 text-[11px] mt-4 tracking-wide">
                OCT 10 · LAGOS, NIGERIA
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
