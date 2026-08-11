"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tickets", label: "Tickets" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

function UserAvatar({
  firstName,
  lastName,
  size = "md",
}: {
  firstName: string;
  lastName: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "w-7 h-7 text-[10px]" : "w-8 h-8 text-[11px]";
  return (
    <span
      className={`relative ${dim} rounded-full bg-[#7c3aed] text-white font-black flex items-center justify-center uppercase shrink-0`}
    >
      {firstName[0]}
      {lastName[0]}
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
    </span>
  );
}

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function onBump() {
      setCartBump(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setCartBump(false), 650);
    }
    window.addEventListener("bb-cart-bump", onBump);
    return () => {
      window.removeEventListener("bb-cart-bump", onBump);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setUserMenuOpen(false);
    setOpen(false);
    await logout();
    router.push("/");
  }

  return (
    <>
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
          <Link
            href="/"
            onClick={() => {
              if (window.location.pathname !== "/") {
                window.dispatchEvent(new Event("nav-start"));
              }
            }}
            className="flex items-center gap-2 group"
          >
            <span className="text-xl leading-none">🏖️</span>
            <span className="font-black text-sm tracking-[0.18em] text-[#4c1d95] group-hover:text-purple-400 transition-colors uppercase">
              BeachBash
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <LinkButton
                key={href}
                href={href}
                spinnerClass="w-3 h-3"
                className={`btn-ghost text-xs font-medium tracking-wide ${
                  pathname === href ? "text-[#4c1d95] bg-purple-50" : ""
                }`}
              >
                {label}
              </LinkButton>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              id="nav-cart-btn"
              href="/cart"
              onClick={() => {
                if (window.location.pathname !== "/cart") {
                  window.dispatchEvent(new Event("nav-start"));
                }
              }}
              className={`relative btn-primary text-xs py-2 px-3 sm:px-4 ${cartBump ? "cart-bump" : ""}`}
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
                <span
                  key={totalItems}
                  className={`absolute -top-1.5 -right-1.5 cart-dot text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none ${cartBump ? "cart-dot-pop" : ""}`}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Desktop auth */}
            <div className="hidden md:block">
              {!isLoading && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 btn-ghost text-xs font-medium pl-1.5 pr-3 py-1.5"
                    aria-label="Account menu"
                  >
                    <UserAvatar
                      firstName={user.firstName}
                      lastName={user.lastName}
                    />
                    <span className="text-[#4c1d95] max-w-[90px] truncate font-semibold">
                      {user.firstName}
                    </span>
                    <svg
                      className={`w-3 h-3 text-purple-300 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-1 w-52 bg-white border border-purple-100 rounded-xl shadow-lg py-1 z-50">
                      <div className="px-3 py-2.5 border-b border-purple-50">
                        <p className="text-xs font-bold text-[#1e0a3c]">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-[11px] text-purple-300 truncate mt-0.5">
                          {user.email}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Signed in
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2.5 text-xs text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : !isLoading ? (
                <LinkButton
                  href="/login"
                  spinnerClass="w-3 h-3"
                  className="btn-ghost text-xs font-medium tracking-wide"
                >
                  Sign In
                </LinkButton>
              ) : null}
            </div>

            {/* Mobile: avatar when logged in + hamburger */}
            <div className="flex md:hidden items-center gap-1">
              {!isLoading && user && (
                <button
                  onClick={() => setOpen(true)}
                  aria-label="Open account menu"
                  className="btn-ghost p-1"
                >
                  <UserAvatar
                    firstName={user.firstName}
                    lastName={user.lastName}
                    size="sm"
                  />
                </button>
              )}
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="btn-ghost p-2"
              >
                <svg
                  className="w-5 h-5 text-[#4c1d95]"
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
        </div>
      </nav>

      {open && (
        <>
          <div
            className="drawer-overlay fixed inset-0 z-60 bg-purple-950/40"
            onClick={() => setOpen(false)}
          />
          <div className="drawer-panel fixed top-0 right-0 bottom-0 z-70 w-72 bg-[#faf5ff] border-l border-purple-100 flex flex-col">
            <div className="flex items-center justify-between px-6 h-14 border-b border-purple-100">
              <span className="font-black text-sm tracking-[0.18em] text-[#4c1d95] uppercase">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-purple-300 hover:text-purple-700 transition-colors"
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

            {/* Logged-in banner at top of drawer */}
            {!isLoading && user && (
              <div className="mx-4 mt-4 flex items-center gap-3 rounded-xl bg-white border border-purple-100 px-3 py-3">
                <UserAvatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#1e0a3c] truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-[11px] text-purple-300 truncate">
                    {user.email}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Signed in
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1 p-4 flex-1">
              {NAV_LINKS.map(({ href, label }) => (
                <LinkButton
                  key={href}
                  href={href}
                  spinnerClass="w-3.5 h-3.5"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === href
                      ? "bg-purple-100 text-[#4c1d95]"
                      : "text-purple-400 hover:text-[#4c1d95] hover:bg-purple-50"
                  }`}
                >
                  {label}
                </LinkButton>
              ))}

              {!isLoading && user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-purple-100 pt-3"
                >
                  Sign Out
                </button>
              ) : !isLoading ? (
                <LinkButton
                  href="/login"
                  spinnerClass="w-3.5 h-3.5"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-purple-400 hover:text-[#4c1d95] hover:bg-purple-50 transition-colors mt-2 border-t border-purple-100 pt-3"
                >
                  Sign In / Create Account
                </LinkButton>
              ) : null}
            </div>

            <div className="p-4 border-t border-purple-100">
              <LinkButton
                href="/tickets"
                className="btn-primary w-full justify-center text-xs py-3"
              >
                Get Tickets 🎟️
              </LinkButton>
              <p className="text-center text-purple-200 text-[11px] mt-4 tracking-wide">
                OCT 10 · LAGOS, NIGERIA
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
