"use client";

import { useRef, useCallback, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  TICKETS,
  TICKET_META,
  formatNaira,
  formatNairaFull,
} from "@/lib/tickets";
import type { TicketType } from "@/context/CartContext";
import AddToCartButton from "@/components/AddToCartButton";
import LinkButton from "@/components/LinkButton";

/* ── Scroll-reveal wrapper ───────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const inView = useInView(ref, {
    once: true,
    margin: "-60px 0px",
  });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{ delay, duration: 0.7, ease: "circOut" as const }}
        style={{ transformPerspective: 900 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── 3D tilt + click-to-open card wrapper ────────────────────────────────── */
function TiltCard({
  children,
  className = "",
  delay = 0,
  index = 0,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const observerRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const inView = useInView(observerRef, {
    once: true,
    margin: "-40px 0px",
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(springX, [-1, 1], [-12, 12]);
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const glowX = useTransform(springX, [-1, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [-1, 1], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [rawX, rawY],
  );
  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div ref={observerRef} className={`relative cursor-pointer ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 70, rotateX: 30, scale: 0.88 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{
          delay: delay + index * 0.09,
          duration: 0.75,
          ease: "circOut" as const,
        }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        {/* Spotlight glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl z-10"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(124,58,237,0.18) 0%, transparent 65%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        {/* "Tap for details" hint */}
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center z-20">
          <span className="text-[9px] font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 text-purple-400 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 select-none">
            tap for details
          </span>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

/* ── Ticket detail popup modal ───────────────────────────────────────────── */
function TicketModal({
  ticket,
  onClose,
}: {
  ticket: TicketType;
  onClose: () => void;
}) {
  const meta = TICKET_META[ticket.id];
  const isPremium = meta?.isPremium ?? false;

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdrop}
      style={{ background: "rgba(10,0,30,0.75)", backdropFilter: "blur(8px)" }}
    >
      <motion.div
        className="w-full sm:max-w-md relative overflow-hidden"
        initial={{ y: 80, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 80, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          borderRadius: "1.5rem 1.5rem 0 0",
          ...(typeof window !== "undefined" && window.innerWidth >= 640
            ? { borderRadius: "1.5rem" }
            : {}),
        }}
      >
        {/* ── Modal shell ──────────────────────────────────────────── */}
        <div
          className={`rounded-t-3xl sm:rounded-3xl overflow-hidden ${
            isPremium
              ? "bg-gradient-to-br from-[#1e0a3c] to-[#4c1d95]"
              : "bg-white"
          }`}
        >
          {/* Coloured header bar */}
          <div
            className={`px-5 pt-5 pb-4 relative ${
              isPremium
                ? "border-b border-white/10"
                : "border-b border-purple-100"
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors ${
                isPremium
                  ? "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                  : "bg-purple-50 text-purple-400 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              ×
            </button>

            {/* Premium boat+safari banner */}
            {isPremium && (
              <motion.div
                className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/30 rounded-full px-3 py-1 mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span className="text-xs">🚢</span>
                <span className="text-amber-300 text-[10px] font-black tracking-widest uppercase">
                  Boat + Safari included
                </span>
              </motion.div>
            )}

            {/* Tier + name */}
            <div className="flex items-start justify-between pr-10">
              <div>
                <p
                  className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${
                    isPremium ? "text-white/50" : "text-purple-300"
                  }`}
                >
                  {meta?.tierLabel ?? "Entry"}
                </p>
                <h2
                  className={`font-black text-2xl leading-tight ${
                    isPremium ? "text-white" : "text-[#1e0a3c]"
                  }`}
                >
                  {ticket.name}
                </h2>
                <p
                  className={`text-xs mt-1 leading-relaxed max-w-xs ${
                    isPremium ? "text-white/55" : "text-purple-500"
                  }`}
                >
                  {ticket.description}
                </p>
              </div>
              <motion.span
                className="text-4xl shrink-0 ml-3"
                animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {meta?.icon ?? "🎟️"}
              </motion.span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2">
              <span
                className={`font-black text-4xl ${
                  isPremium ? "text-white" : "text-[#1e0a3c]"
                }`}
              >
                {ticket.price >= 1_000_000
                  ? formatNairaFull(ticket.price)
                  : formatNaira(ticket.price)}
              </span>
              <span
                className={`text-xs ${
                  isPremium ? "text-white/40" : "text-purple-300"
                }`}
              >
                {meta?.capacity ?? "per person"}
              </span>
            </div>
          </div>

          {/* ── What's included ──────────────────────────────────────── */}
          <div className="px-5 pt-5 pb-4">
            <p
              className={`text-[10px] font-black tracking-widest uppercase mb-3 ${
                isPremium ? "text-white/40" : "text-purple-300"
              }`}
            >
              What&apos;s included
            </p>
            <ul className="flex flex-col gap-2.5">
              {ticket.perks.map((perk, i) => {
                const isTransport =
                  perk.toLowerCase().includes("boat") ||
                  perk.toLowerCase().includes("safari");
                return (
                  <motion.li
                    key={perk}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.06 }}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                        isTransport
                          ? "bg-amber-400/25 text-amber-300 border border-amber-400/30"
                          : isPremium
                            ? "bg-white/15 text-white/70"
                            : "bg-purple-100 text-purple-500"
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isTransport
                          ? "text-amber-300 font-bold"
                          : isPremium
                            ? "text-white/80"
                            : "text-[#1e0a3c]/80"
                      }`}
                    >
                      {perk}
                    </span>
                    {isTransport && (
                      <span className="ml-auto text-[9px] font-black tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/25 px-2 py-0.5 rounded-full">
                        Included
                      </span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ── Transport note ────────────────────────────────────────── */}
          {!isPremium && (
            <div className="mx-5 mb-4 px-3 py-2.5 rounded-xl bg-purple-50 border border-purple-100 flex items-start gap-2">
              <span className="text-base mt-0.5">🚗</span>
              <p className="text-[11px] text-purple-500 leading-relaxed">
                <span className="font-bold text-purple-700">
                  Self-transport:
                </span>{" "}
                Make your own way to the beach house. No boat or safari ride
                with this ticket.
              </p>
            </div>
          )}

          {/* ── Add to Cart (inside modal) ────────────────────────────── */}
          <div
            className={`px-5 pb-6 pt-1 ${
              isPremium
                ? "border-t border-white/10"
                : "border-t border-purple-50"
            }`}
          >
            <AddToCartButton
              ticket={ticket}
              variant={isPremium ? "dark" : "light"}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Ticket card body ────────────────────────────────────────────────────── */
function TicketCard({
  ticket,
  variant,
  fullWidth,
  onOpenModal,
}: {
  ticket: TicketType;
  variant: "general" | "vip" | "vvip";
  fullWidth?: boolean;
  onOpenModal: () => void;
}) {
  const meta = TICKET_META[ticket.id];
  const isPremium = meta?.isPremium ?? false;
  const isVip = variant === "vip";
  const isVvip = variant === "vvip";
  const isDark = isVip;

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden ${
        fullWidth ? "h-full" : ""
      } ${
        isPremium
          ? "bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-amber-400/60 shadow-lg shadow-amber-500/25"
          : isVip
            ? "ticket-tier-vip"
            : "ticket-tier-general"
      } ${isVvip ? "border-2 border-purple-200" : ""}`}
      style={
        isVvip && !isPremium
          ? { background: "linear-gradient(135deg,#faf5ff,#f3e8ff)" }
          : undefined
      }
    >
      {/* ── Boat+safari banner ─────────────────────────────────────── */}
      {isPremium && (
        <div className="bg-black/20 px-4 py-1.5 flex items-center justify-center gap-2 border-b border-white/10">
          <span className="text-xs">🚢</span>
          <span className="text-white text-[10px] font-black tracking-widest uppercase">
            Boat Ride + Safari Included
          </span>
          <span className="text-xs">🚙</span>
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        className={`px-4 sm:px-5 pt-4 pb-3 border-b ${
          isPremium
            ? "border-white/15"
            : isDark
              ? "border-white/10"
              : "border-purple-100"
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0">
            {/* Badge row */}
            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
              {meta?.badge && !isPremium && ticket.id === "table-1m" && (
                <div className="inline-flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-2 py-0.5">
                  <span className="live-dot w-1 h-1 rounded-full bg-green-400 inline-block" />
                  <span className="text-white/70 text-[9px] font-bold tracking-widest uppercase">
                    {meta.badge}
                  </span>
                </div>
              )}
            </div>

            <p
              className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-0.5 ${
                isPremium
                  ? "text-white/70"
                  : isDark
                    ? "text-white/50"
                    : isVvip
                      ? "text-purple-400"
                      : "text-purple-300"
              }`}
            >
              {meta?.tierLabel ?? "Entry"}
            </p>
            <h2
              className={`font-black text-sm sm:text-lg leading-tight ${
                isPremium || isDark ? "text-white" : "text-[#1e0a3c]"
              }`}
            >
              {ticket.name}
            </h2>
          </div>
          <motion.span
            className="text-xl sm:text-2xl shrink-0 ml-1"
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
          >
            {meta?.icon ?? "🎟️"}
          </motion.span>
        </div>

        {/* Price */}
        <p
          className={`font-black text-2xl sm:text-3xl leading-none ${
            isPremium || isDark ? "text-white" : "text-[#1e0a3c]"
          }`}
        >
          {ticket.price >= 1_000_000
            ? formatNairaFull(ticket.price)
            : formatNaira(ticket.price)}
        </p>
        <p
          className={`text-[10px] mt-0.5 ${
            isPremium
              ? "text-white/60"
              : isDark
                ? "text-white/40"
                : "text-purple-300"
          }`}
        >
          {meta?.capacity ?? "per person"}
        </p>
      </div>

      {/* ── Perks preview ──────────────────────────────────────────── */}
      <div className="px-4 sm:px-5 py-3 flex-1">
        <ul className="flex flex-col gap-1.5">
          {ticket.perks.slice(0, 4).map((perk) => {
            const isTransport =
              perk.toLowerCase().includes("boat") ||
              perk.toLowerCase().includes("safari");
            return (
              <li
                key={perk}
                className={`flex items-center gap-2 text-[10px] sm:text-xs font-medium ${
                  isTransport
                    ? "text-amber-200"
                    : isPremium
                      ? "text-white/75"
                      : isDark
                        ? "text-white/65"
                        : isVvip
                          ? "text-purple-600"
                          : "text-purple-500"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] shrink-0 ${
                    isTransport
                      ? "bg-amber-400/30 text-amber-300"
                      : isPremium
                        ? "bg-white/20 text-white/70"
                        : isDark
                          ? "bg-white/15 text-white/60"
                          : isVvip
                            ? "bg-purple-200 text-purple-500"
                            : "bg-purple-100 text-purple-400"
                  }`}
                >
                  ✓
                </span>
                {perk}
              </li>
            );
          })}
          {ticket.perks.length > 4 && (
            <li
              className={`text-[10px] font-semibold ${
                isPremium
                  ? "text-white/50"
                  : isDark
                    ? "text-white/30"
                    : "text-purple-300"
              }`}
            >
              +{ticket.perks.length - 4} more
            </li>
          )}
        </ul>
      </div>

      {/* ── "View details" hint ────────────────────────────────────── */}
      <div
        className={`px-4 sm:px-5 py-2 text-center text-[9px] font-bold tracking-widest uppercase border-t ${
          isPremium
            ? "border-white/10 text-white/40"
            : isDark
              ? "border-white/10 text-white/30"
              : "border-purple-50 text-purple-300"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal();
        }}
      >
        Tap for full details ↗
      </div>

      {/* ── Add to Cart ────────────────────────────────────────────── */}
      <div className="px-4 sm:px-5 pb-4" onClick={(e) => e.stopPropagation()}>
        <AddToCartButton
          ticket={ticket}
          variant={isPremium || isDark ? "dark" : "light"}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
export default function TicketsPage() {
  const [modalTicket, setModalTicket] = useState<TicketType | null>(null);

  // tickets.ts now orders: girls25, guys40, girls40, guys60, t700, t1m, t15m
  const [girls25, guys40, girls40, guys60, t700, t1m, t15m] = TICKETS;

  const heroRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const heroInView = useInView(heroRef, {
    once: true,
  });
  const tableRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const tableInView = useInView(tableRef, {
    once: true,
    margin: "-60px 0px",
  });
  const trustRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const trustInView = useInView(trustRef, {
    once: true,
    margin: "-40px 0px",
  });
  const ctaRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const ctaInView = useInView(ctaRef, {
    once: true,
    margin: "-40px 0px",
  });

  const HERO_BADGES = [
    { icon: "📅", val: "Oct 10, 2026" },
    { icon: "📍", val: "Lagos 🇳🇬" },
    { icon: "🕗", val: "4:00 PM" },
    { icon: "🎟️", val: "From ₦25k" },
  ];

  const COMPARISON_ROWS: (string | boolean)[][] = [
    ["General entry", true, true, true, true, true, true, true],
    ["Boat ride", false, false, true, true, false, false, false],
    ["Safari ride", false, false, true, true, false, false, false],
    ["1 Cocktail", true, true, true, true, false, false, false],
    ["Food platter", false, false, false, false, true, true, true],
    [
      "Premium spirits",
      false,
      false,
      false,
      false,
      "VSOP",
      "Casa",
      "Don Julio",
    ],
    ["Champagne", false, false, false, false, "×1", "×2", "×2"],
    ["Shisha", false, false, false, false, false, true, true],
    ["Private cabana", false, false, false, false, false, false, true],
  ];

  const TRUST_ITEMS = [
    {
      icon: "🔒",
      title: "Secure Checkout",
      desc: "Encrypted payment. Your info is never stored.",
    },
    {
      icon: "📱",
      title: "Digital Tickets",
      desc: "QR code sent to your email. No printing needed.",
    },
    {
      icon: "⚠️",
      title: "No Refunds",
      desc: "All ticket sales are final and non-transferable.",
    },
  ];

  return (
    <div className="pt-14">
      {/* ── TICKET MODAL ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalTicket && (
          <TicketModal
            ticket={modalTicket}
            onClose={() => setModalTicket(null)}
          />
        )}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="ticket-hero px-5 pt-12 pb-10 overflow-hidden relative"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
              top: "-5%",
              right: "5%",
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
              bottom: "0%",
              left: "10%",
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, -20, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 2,
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "circOut" as const }}
          >
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <span className="text-white/60 text-[10px] tracking-widest uppercase font-medium">
              Tickets on sale now
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-black text-4xl sm:text-6xl text-white leading-none tracking-tight mb-2"
                  initial={{ y: 80, rotateX: -40, opacity: 0 }}
                  animate={heroInView ? { y: 0, rotateX: 0, opacity: 1 } : {}}
                  transition={{
                    delay: 0.1,
                    duration: 0.8,
                    ease: "circOut" as const,
                  }}
                  style={{ transformPerspective: 800 }}
                >
                  Get Your
                  <br />
                  <motion.span
                    className="text-white/25 inline-block"
                    initial={{ y: 80, rotateX: -40, opacity: 0 }}
                    animate={heroInView ? { y: 0, rotateX: 0, opacity: 1 } : {}}
                    transition={{
                      delay: 0.22,
                      duration: 0.8,
                      ease: "circOut" as const,
                    }}
                    style={{ transformPerspective: 800 }}
                  >
                    Tickets
                  </motion.span>
                </motion.h1>
              </div>
              <motion.p
                className="text-white/45 text-sm max-w-xs"
                initial={{ opacity: 0, y: 15 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.38, duration: 0.6 }}
              >
                Oct 10, 2026 · Lagos, Nigeria · 4 PM till dawn
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.4 },
                },
              }}
            >
              {HERO_BADGES.map((f) => (
                <motion.div
                  key={f.val}
                  variants={{
                    hidden: { opacity: 0, scale: 0.7, y: 10 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    },
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-1.5 bg-white/10 border border-white/12 rounded-full px-3 py-1.5 cursor-default"
                >
                  <span className="text-sm">{f.icon}</span>
                  <span className="text-white/70 text-xs font-medium">
                    {f.val}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#2e1065] py-4 select-none border-t border-white/5">
        <div className="marquee-track-reverse">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                {
                  text: "GIRLS ₦25K (NO TRANSPORT) · ₦40K (BOAT + SAFARI)",
                  accent: true,
                },
                { text: "SECURE YOUR SPOT", accent: false },
                {
                  text: "GUYS ₦40K (NO TRANSPORT) · ₦60K (BOAT + SAFARI)",
                  accent: true,
                },
                { text: "LIMITED TABLES", accent: false },
                { text: "BEACHBASH 2026", accent: true },
                { text: "OCT 10 · LAGOS", accent: false },
              ].map((item, j) => (
                <span key={j} className="flex items-center">
                  <span
                    className={`whitespace-nowrap font-black tracking-[0.15em] uppercase px-6 ${item.accent ? "text-white text-sm" : "text-white/20 text-xs"}`}
                  >
                    {item.text}
                  </span>
                  <span className="text-purple-500/30 text-sm">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKET CARDS ─────────────────────────────────────────────── */}
      <div className="bg-[#faf5ff] px-4 sm:px-5 py-12">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex items-center gap-3 mb-10">
            <h2 className="font-black text-xl text-[#1e0a3c]">
              Choose your experience
            </h2>
            <div className="flex-1 h-px bg-purple-100" />
            <span className="text-purple-300 text-xs">7 options</span>
          </Reveal>

          {/* ── Girls ────────────────────────────────────────────────── */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[11px] font-bold tracking-widest uppercase text-purple-300">
                👩🏽 Girls
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-400 font-semibold border border-purple-200">
                  ₦25k — no transport
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold border border-amber-200">
                  ₦40k — 🚢 boat + safari
                </span>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10 perspective-1200">
            <TiltCard
              index={0}
              delay={0.05}
              onClick={() => setModalTicket(girls25)}
            >
              <TicketCard
                ticket={girls25}
                variant="vip"
                onOpenModal={() => setModalTicket(girls25)}
              />
            </TiltCard>
            <TiltCard
              index={1}
              delay={0.05}
              onClick={() => setModalTicket(girls40)}
            >
              <TicketCard
                ticket={girls40}
                variant="general"
                onOpenModal={() => setModalTicket(girls40)}
              />
            </TiltCard>
          </div>

          {/* ── Guys ─────────────────────────────────────────────────── */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[11px] font-bold tracking-widest uppercase text-purple-300">
                👨🏽 Guys
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-400 font-semibold border border-purple-200">
                  ₦40k — no transport
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold border border-amber-200">
                  ₦60k — 🚢 boat + safari
                </span>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10 perspective-1200">
            <TiltCard
              index={0}
              delay={0.1}
              onClick={() => setModalTicket(guys40)}
            >
              <TicketCard
                ticket={guys40}
                variant="vip"
                onOpenModal={() => setModalTicket(guys40)}
              />
            </TiltCard>
            <TiltCard
              index={1}
              delay={0.1}
              onClick={() => setModalTicket(guys60)}
            >
              <TicketCard
                ticket={guys60}
                variant="general"
                onOpenModal={() => setModalTicket(guys60)}
              />
            </TiltCard>
          </div>

          {/* ── Tables ───────────────────────────────────────────────── */}
          <Reveal delay={0.05}>
            <p className="text-[11px] font-bold tracking-widest uppercase text-purple-300 mb-3">
              🍾 Tables
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-14 perspective-1200">
            <TiltCard
              index={0}
              delay={0.15}
              onClick={() => setModalTicket(t700)}
            >
              <TicketCard
                ticket={t700}
                variant="general"
                onOpenModal={() => setModalTicket(t700)}
              />
            </TiltCard>
            <TiltCard
              index={1}
              delay={0.15}
              onClick={() => setModalTicket(t1m)}
            >
              <TicketCard
                ticket={t1m}
                variant="vip"
                onOpenModal={() => setModalTicket(t1m)}
              />
            </TiltCard>
            <TiltCard
              index={2}
              delay={0.15}
              className="col-span-2 md:col-span-1"
              onClick={() => setModalTicket(t15m)}
            >
              <TicketCard
                ticket={t15m}
                variant="vvip"
                fullWidth
                onOpenModal={() => setModalTicket(t15m)}
              />
            </TiltCard>
          </div>

          {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
          <motion.div
            ref={tableRef}
            className="ticket-hero rounded-3xl p-5 sm:p-7 mb-8 overflow-x-auto depth-shadow"
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={tableInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: "circOut" as const }}
            style={{ transformPerspective: 1000 }}
          >
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-5">
              Quick comparison
            </p>
            <table className="w-full text-xs min-w-[520px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/30 font-medium pb-3 w-2/5">
                    Feature
                  </th>
                  {[
                    { label: "Girls", sub: "₦25k" },
                    { label: "Guys", sub: "₦40k" },
                    { label: "Girls", sub: "₦40k 🚢", gold: true },
                    { label: "Guys", sub: "₦60k 🚢", gold: true },
                    { label: "700K", sub: null },
                    { label: "1M", sub: null, bright: true },
                    { label: "1.5M", sub: null },
                  ].map((h, hi) => (
                    <th
                      key={hi}
                      className={`text-center font-bold pb-3 ${h.gold ? "text-amber-300" : h.bright ? "text-white" : "text-white/50"}`}
                    >
                      {h.label}
                      {h.sub && (
                        <>
                          <br />
                          <span
                            className={`font-normal text-[10px] ${h.gold ? "text-amber-400/70" : "text-white/25"}`}
                          >
                            {h.sub}
                          </span>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON_ROWS.map(([feature, ...vals], ri) => (
                  <motion.tr
                    key={feature as string}
                    initial={{ opacity: 0, x: -20 }}
                    animate={tableInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + ri * 0.07, duration: 0.45 }}
                  >
                    <td className="text-white/40 py-2.5 pr-3">
                      {feature as string}
                    </td>
                    {vals.map((val, ci) => (
                      <td key={ci} className="text-center py-2.5">
                        {val === true ? (
                          <motion.span
                            className={`inline-block font-bold ${(ci === 2 || ci === 3) && (feature === "Boat ride" || feature === "Safari ride") ? "text-amber-300 text-base" : "text-green-400"}`}
                            whileHover={{ scale: 1.4 }}
                          >
                            ✓
                          </motion.span>
                        ) : val === false ? (
                          <span className="text-white/15">—</span>
                        ) : (
                          <span className="text-purple-300 font-semibold">
                            {val as string}
                          </span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* ── TRUST STRIP ──────────────────────────────────────────── */}
          <motion.div
            ref={trustRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            initial="hidden"
            animate={trustInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {TRUST_ITEMS.map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.93 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, ease: "circOut" as const },
                  },
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="flex items-start gap-3 p-4 rounded-2xl border border-purple-100 bg-white hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100/60 transition-shadow cursor-default"
              >
                <motion.span
                  className="text-xl mt-0.5"
                  whileHover={{ rotate: 12, scale: 1.25 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.icon}
                </motion.span>
                <div>
                  <p className="text-[#1e0a3c] font-bold text-xs mb-1">
                    {item.title}
                  </p>
                  <p className="text-purple-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <div
        ref={ctaRef}
        className="border-t border-purple-100 bg-white py-12 px-5 text-center overflow-hidden relative"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.p
          className="text-purple-400 text-sm mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Still deciding?
        </motion.p>
        <motion.p
          className="text-[#1e0a3c] font-black text-2xl mb-6"
          initial={{ opacity: 0, y: 25, rotateX: 15 }}
          animate={ctaInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.65, ease: "circOut" as const }}
          style={{ transformPerspective: 700 }}
        >
          Questions? We&apos;ve got answers.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {[
            {
              href: "/faq",
              label: "Read the FAQ",
              cls: "btn-outline px-6 py-2.5 text-sm",
            },
            {
              href: "/about",
              label: "About the Event",
              cls: "btn-ghost  px-6 py-2.5 text-sm",
            },
          ].map(({ href, label, cls }) => (
            <motion.div
              key={href}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                },
              }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <LinkButton href={href} className={cls}>
                {label}
              </LinkButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
