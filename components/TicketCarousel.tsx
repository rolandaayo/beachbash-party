"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { TICKETS, formatNaira } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

const ICONS: Record<string, string> = {
  "regular-girls-25": "👩🏽",
  "regular-girls-40": "👩🏽",
  "regular-guys-40": "👨🏽",
  "regular-guys-60": "👨🏽",
  "table-700": "🥃",
  "table-1m": "⭐",
  "table-1.5m": "👑",
};
const LABELS: Record<string, string> = {
  "regular-girls-25": "General Entry",
  "regular-girls-40": "General Entry",
  "regular-guys-40": "General Entry",
  "regular-guys-60": "General Entry",
  "table-700": "Standing Table",
  "table-1m": "Premium Table",
  "table-1.5m": "Private Cabana",
};
const CAPACITY: Record<string, string> = {
  "regular-girls-25": "per person",
  "regular-girls-40": "per person",
  "regular-guys-40": "per person",
  "regular-guys-60": "per person",
  "table-700": "2–4 people",
  "table-1m": "2–6 people",
  "table-1.5m": "2–8 people",
};

export default function TicketCarousel() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const sectionRef = useRef<HTMLElement>(null) as React.MutableRefObject<HTMLElement>;
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-80px 0px",
  });

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;
    const offset =
      card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });
    setActive(index);
  }, []);

  function next() {
    scrollTo(Math.min(active + 1, TICKETS.length - 1));
  }
  function prev() {
    scrollTo(Math.max(active - 1, 0));
  }

  function onScroll() {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0,
      minDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 border-t border-purple-100 bg-white overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-8 gap-4 flex-wrap px-5"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "circOut" }}
        >
          <div>
            <p className="tag mb-3 w-fit">Grab Your Spot</p>
            <h2 className="font-black text-3xl sm:text-4xl text-[#1e0a3c]">
              Ticket Options
            </h2>
          </div>
          <p className="text-purple-400 text-sm">
            Limited tickets. Don&apos;t sleep on this.
          </p>
        </motion.div>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TICKETS.map((ticket, i) => {
            const dark = ticket.id === "table-1m" || ticket.id === "table-700";
            const isActive = i === active;

            return (
              <motion.div
                key={ticket.id}
                onClick={() => scrollTo(i)}
                initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.85 }}
                animate={
                  inView
                    ? {
                        opacity: isActive ? 1 : 0.55,
                        y: 0,
                        rotateX: 0,
                        scale: isActive ? 1 : 0.97,
                      }
                    : { opacity: 0, y: 60, rotateX: 25, scale: 0.85 }
                }
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.65,
                  ease: "circOut",
                }}
                whileHover={{
                  rotateX: -4,
                  rotateY: isActive ? 4 : 0,
                  scale: isActive ? 1.03 : 1,
                  transition: { duration: 0.25 },
                }}
                style={{
                  transformPerspective: 900,
                  transformStyle: "preserve-3d",
                }}
                className={`snap-center shrink-0 w-[78vw] sm:w-72 rounded-2xl flex flex-col overflow-hidden cursor-pointer ${
                  isActive ? "shadow-xl shadow-purple-100" : ""
                } ${dark ? "ticket-tier-vip" : "bg-white border border-purple-100"} card-3d`}
              >
                {/* Card header */}
                <div
                  className={`px-5 pt-5 pb-4 border-b ${dark ? "border-white/10" : "border-purple-50"}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {ticket.id === "table-1m" && (
                        <div className="inline-flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-2 py-0.5 mb-1.5">
                          <span className="live-dot w-1 h-1 rounded-full bg-green-400 inline-block" />
                          <span className="text-white/60 text-[9px] font-bold tracking-widest uppercase">
                            Popular
                          </span>
                        </div>
                      )}
                      <p
                        className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${dark ? "text-white/50" : "text-black/40"}`}
                      >
                        {LABELS[ticket.id]}
                      </p>
                      <h3
                        className={`font-black text-lg leading-none ${dark ? "text-white" : "text-black"}`}
                      >
                        {ticket.name}
                      </h3>
                    </div>
                    <motion.span
                      className="text-2xl"
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      {ICONS[ticket.id]}
                    </motion.span>
                  </div>
                  <p
                    className={`font-black text-3xl leading-none ${dark ? "text-white" : "text-black"}`}
                  >
                    {formatNaira(ticket.price)}
                  </p>
                  <p
                    className={`text-xs mt-1 ${dark ? "text-white/40" : "text-black/40"}`}
                  >
                    {CAPACITY[ticket.id]}
                  </p>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${dark ? "text-white/60" : "text-black/60"}`}
                  >
                    {ticket.description}
                  </p>
                </div>

                {/* Perks */}
                <div className="px-5 py-4 flex-1">
                  <ul className="flex flex-col gap-2">
                    {ticket.perks.slice(0, 5).map((perk, pi) => (
                      <motion.li
                        key={perk}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.08 + pi * 0.05 }}
                        className={`flex items-center gap-2 text-xs ${dark ? "text-white/70" : "text-black/70"}`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${dark ? "bg-white/10 text-white/60" : "bg-black/8 text-black/50"}`}
                        >
                          ✓
                        </span>
                        {perk}
                      </motion.li>
                    ))}
                    {ticket.perks.length > 5 && (
                      <li
                        className={`text-[11px] mt-0.5 ${dark ? "text-white/35" : "text-black/35"}`}
                      >
                        +{ticket.perks.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  <AddToCartButton
                    ticket={ticket}
                    variant={dark ? "dark" : "light"}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <motion.div
          className="flex items-center justify-between mt-6 px-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            {TICKETS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to ticket ${i + 1}`}
                animate={
                  i === active
                    ? { width: 24, backgroundColor: "#7c3aed" }
                    : { width: 8, backgroundColor: "#ddd6fe" }
                }
                className="h-2 rounded-full"
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {[
              { fn: prev, disabled: active === 0, icon: "M15 19l-7-7 7-7" },
              {
                fn: next,
                disabled: active === TICKETS.length - 1,
                icon: "M9 5l7 7-7 7",
              },
            ].map(({ fn, disabled, icon }, bi) => (
              <motion.button
                key={bi}
                onClick={fn}
                disabled={disabled}
                whileHover={disabled ? {} : { scale: 1.1 }}
                whileTap={disabled ? {} : { scale: 0.93 }}
                className="w-9 h-9 rounded-full border border-purple-200 flex items-center justify-center text-purple-500 hover:text-purple-800 hover:border-purple-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="flex items-center justify-between mt-6 pt-6 border-t border-purple-100 px-5"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-purple-300 text-xs">
            Secure checkout · Digital delivery · No printing needed
          </p>
          <Link
            href="/tickets"
            className="text-[#7c3aed] text-xs font-semibold hover:opacity-60 transition-opacity"
          >
            View all details →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
