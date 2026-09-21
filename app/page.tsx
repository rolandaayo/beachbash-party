"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import LinkButton from "@/components/LinkButton";
import EventCarousel from "@/components/EventCarousel";
import TicketCarousel from "@/components/TicketCarousel";
import HeroSection from "@/components/HeroSection";
import { formatNaira } from "@/lib/tickets";

/* ── Reusable scroll-triggered wrapper ──────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  rotateX = 10,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  rotateX?: number;
}) {
  const ref = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>;
  const inView = useInView(ref, {
    once: true,
    margin: "-80px 0px",
  });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{ delay, duration: 0.75, ease: "circOut" }}
        style={{ transformPerspective: 900 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Staggered container for lists ──────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  const locationRef = useRef<HTMLElement>(
    null,
  ) as React.MutableRefObject<HTMLElement>;
  const locationInView = useInView(locationRef, {
    once: true,
    margin: "-60px 0px",
  });
  const ctaRef = useRef<HTMLElement>(
    null,
  ) as React.MutableRefObject<HTMLElement>;
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px 0px" });

  const INFO_ROWS = [
    { icon: "📅", label: "Date", val: "Saturday, October 10, 2026" },
    { icon: "🕗", label: "Time", val: "4:00 PM — Till Dawn" },
    { icon: "📍", label: "City", val: "Lagos, Nigeria" },
    { icon: "🎟️", label: "From", val: formatNaira(25000) },
  ];

  return (
    <div className="pt-14">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-purple-100 py-4 bg-[#faf5ff] select-none">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                "OCTOBER 10 2026",
                "FEEL THE ENERGY",
                "OCTOBER 10 2026",
                "LAGOS BEACH NIGHT",
                "OCTOBER 10 2026",
                "LOSE YOURSELF",
                "OCTOBER 10 2026",
                "ONE NIGHT ONLY",
                "OCTOBER 10 2026",
                "BE THERE",
              ].map((word, j) => (
                <span key={j} className="flex items-center">
                  <span
                    className={`whitespace-nowrap font-black tracking-widest uppercase text-sm px-6 ${
                      word === "OCTOBER 10 2026"
                        ? "text-[#7c3aed]"
                        : "text-purple-200"
                    }`}
                  >
                    {word}
                  </span>
                  <span className="text-purple-200 text-xs">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKET CAROUSEL ──────────────────────────────────────────── */}
      <TicketCarousel />

      {/* ── WHAT TO EXPECT ───────────────────────────────────────────── */}
      <EventCarousel />

      {/* ── LOCATION ─────────────────────────────────────────────────── */}
      <section
        ref={locationRef}
        className="py-20 px-5 max-w-5xl mx-auto border-t border-purple-100 perspective-1200"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -12 }}
            animate={locationInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, ease: "circOut" }}
            style={{ transformPerspective: 1000 }}
          >
            <Reveal delay={0}>
              <p className="tag mb-4 w-fit">Location</p>
              <h2 className="font-black text-3xl sm:text-4xl text-[#1e0a3c] mb-5">
                Lagos, Nigeria 🇳🇬
              </h2>
              <p className="text-purple-400 text-sm leading-relaxed mb-6">
                We&apos;re bringing the biggest beach party to Lagos. The exact
                venue will be revealed to ticket holders 2 weeks before the
                show.
              </p>
            </Reveal>

            {/* Staggered info rows */}
            <motion.div
              className="flex flex-col gap-2.5"
              variants={staggerContainer}
              initial="hidden"
              animate={locationInView ? "visible" : "hidden"}
            >
              {INFO_ROWS.map((r) => (
                <motion.div
                  key={r.label}
                  variants={staggerItem}
                  className="flex items-center gap-3 group"
                >
                  <motion.span
                    className="text-base w-5 text-center"
                    whileHover={{ scale: 1.4, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {r.icon}
                  </motion.span>
                  <span className="text-purple-300 text-xs w-10">
                    {r.label}
                  </span>
                  <span className="text-purple-600 text-xs font-medium">
                    {r.val}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — venue TBA card with 3D hover tilt */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 12 }}
            animate={locationInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "circOut",
            }}
            style={{ transformPerspective: 1000 }}
            whileHover={{
              rotateX: -4,
              rotateY: 6,
              scale: 1.03,
              transition: { duration: 0.3 },
            }}
            className="card-3d depth-shadow"
          >
            <div className="card rounded-2xl p-8 text-center">
              <motion.div
                className="text-5xl mb-4 inline-block"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🗺️
              </motion.div>
              <h3 className="text-[#1e0a3c] font-black text-xl mb-2">
                Venue TBA
              </h3>
              <p className="text-purple-400 text-xs leading-relaxed">
                Exact location sent to all ticket holders via email 14 days
                before the event. All we can say — it&apos;s beachfront. 🌊
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-20 px-5 border-t border-purple-100 ticket-hero overflow-hidden relative"
      >
        {/* Orbiting glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
              top: "10%",
              left: "5%",
            }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)",
              bottom: "5%",
              right: "8%",
            }}
            animate={{ x: [0, -25, 0], y: [0, 18, 0], scale: [1, 1.2, 1] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="max-w-xl mx-auto text-center relative">
          <motion.h2
            className="font-black text-4xl sm:text-5xl text-white mb-3"
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: "circOut" }}
            style={{ transformPerspective: 800 }}
          >
            Don&apos;t Miss Out.
          </motion.h2>

          <motion.p
            className="text-white/45 text-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Tickets are limited. Once they&apos;re gone, they&apos;re gone.
            October 10, Lagos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.35,
              duration: 0.6,
              ease: "circOut",
            }}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <LinkButton
              href="/tickets"
              className="bg-white text-[#4c1d95] font-bold text-sm px-8 py-3 rounded-full inline-flex items-center gap-2 hover:bg-purple-50 transition-colors depth-shadow"
            >
              Buy Tickets Now 🎟️
            </LinkButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
