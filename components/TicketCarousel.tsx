"use client";

import { useRef, useState, useCallback } from "react";
import { TICKETS, formatNaira } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

const ICONS: Record<string, string> = {
  "regular-girls": "👩🏽",
  "regular-guys": "👨🏽",
  "table-700": "🥃",
  "table-1m": "⭐",
  "table-1.5m": "👑",
};
const LABELS: Record<string, string> = {
  "regular-girls": "Early Bird",
  "regular-guys": "Early Bird",
  "table-700": "Standing Table",
  "table-1m": "Premium Table",
  "table-1.5m": "Private Cabana",
};
const CAPACITY: Record<string, string> = {
  "regular-girls": "per person",
  "regular-guys": "per person",
  "table-700": "2–4 people",
  "table-1m": "2–6 people",
  "table-1.5m": "2–8 people",
};

export default function TicketCarousel() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to a card by index
  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;
    // Centre the card within the container
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

  // Update active dot when user scrolls/swipes natively
  function onScroll() {
    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
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
    <section className="py-12 sm:py-20 border-t border-purple-100 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap px-5">
          <div>
            <p className="tag mb-3 w-fit">Grab Your Spot</p>
            <h2 className="font-black text-3xl sm:text-4xl text-[#1e0a3c]">
              Ticket Options
            </h2>
          </div>
          <p className="text-purple-400 text-sm">
            Limited tickets. Don&apos;t sleep on this.
          </p>
        </div>

        {/* Scroll track — native scroll-snap, no clipping */}
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
              <div
                key={ticket.id}
                onClick={() => scrollTo(i)}
                className={`snap-center shrink-0 w-[78vw] sm:w-72 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "opacity-100 shadow-xl shadow-purple-100 scale-100"
                    : "opacity-55 scale-[0.97]"
                } ${dark ? "ticket-tier-vip" : "bg-white border border-purple-100"}`}
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
                    <span className="text-2xl">{ICONS[ticket.id]}</span>
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
                    {ticket.perks.slice(0, 5).map((perk) => (
                      <li
                        key={perk}
                        className={`flex items-center gap-2 text-xs ${dark ? "text-white/70" : "text-black/70"}`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${dark ? "bg-white/10 text-white/60" : "bg-black/8 text-black/50"}`}
                        >
                          ✓
                        </span>
                        {perk}
                      </li>
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
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6 px-5">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {TICKETS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to ticket ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-[#7c3aed]"
                    : "w-2 h-2 bg-purple-200 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-purple-200 flex items-center justify-center text-purple-500 hover:text-purple-800 hover:border-purple-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={active === TICKETS.length - 1}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-purple-200 flex items-center justify-center text-purple-500 hover:text-purple-800 hover:border-purple-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-purple-100 px-5">
          <p className="text-purple-300 text-xs">
            Secure checkout · Digital delivery · No printing needed
          </p>
          <Link
            href="/tickets"
            className="text-[#7c3aed] text-xs font-semibold hover:opacity-60 transition-opacity"
          >
            View all details →
          </Link>
        </div>
      </div>
    </section>
  );
}
