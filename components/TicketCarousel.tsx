"use client";

import { useRef, useState } from "react";
import { TICKETS, formatNaira } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

const ICONS: Record<string, string> = {
  regular: "🎟️",
  "table-700": "🥃",
  "table-1m": "⭐",
  "table-1.5m": "👑",
};
const LABELS: Record<string, string> = {
  regular: "Early Bird",
  "table-700": "Standing Table",
  "table-1m": "Premium Table",
  "table-1.5m": "Private Cabana",
};
const CAPACITY: Record<string, string> = {
  regular: "girls ₦40k · guys ₦60k",
  "table-700": "2–4 people",
  "table-1m": "2–6 people",
  "table-1.5m": "2–8 people",
};

export default function TicketCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  function next() {
    setActive((a) => Math.min(a + 1, TICKETS.length - 1));
  }
  function prev() {
    setActive((a) => Math.max(a - 1, 0));
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchMove(e: React.TouchEvent) {
    dragDelta.current = e.touches[0].clientX - touchStart.current;
  }
  function onTouchEnd() {
    if (dragDelta.current < -50) next();
    else if (dragDelta.current > 50) prev();
    dragDelta.current = 0;
  }

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    touchStart.current = e.clientX;
  }
  function onMouseMove(e: React.MouseEvent) {
    if (isDragging.current) dragDelta.current = e.clientX - touchStart.current;
  }
  function onMouseUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDelta.current < -50) next();
    else if (dragDelta.current > 50) prev();
    dragDelta.current = 0;
  }

  return (
    <section className="py-20 border-t border-purple-100 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap px-5">
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

        {/* Carousel */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none pl-5"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div
            className="flex gap-4 transition-transform duration-400 ease-out"
            style={{
              transform: `translateX(calc(${-active} * (min(75vw, 320px) + 16px)))`,
            }}
          >
            {TICKETS.map((ticket, i) => {
              const isVip = ticket.id === "table-1m";
              const isActive = i === active;

              return (
                <div
                  key={ticket.id}
                  onClick={() => setActive(i)}
                  style={{ minWidth: "min(75vw, 320px)" }}
                  className={`flex-shrink-0 rounded-3xl flex flex-col overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "scale-100 opacity-100 shadow-xl shadow-purple-100"
                      : "scale-95 opacity-50"
                  } ${isVip ? "ticket-tier-vip" : "bg-white border border-purple-100"}`}
                >
                  {/* Card header */}
                  <div
                    className={`px-6 pt-6 pb-5 border-b ${isVip ? "border-white/10" : "border-purple-50"}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {isVip && (
                          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 mb-2">
                            <span className="live-dot w-1 h-1 rounded-full bg-green-400 inline-block" />
                            <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">
                              Popular
                            </span>
                          </div>
                        )}
                        <p
                          className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isVip ? "text-white/30" : "text-purple-300"}`}
                        >
                          {LABELS[ticket.id]}
                        </p>
                        <h3
                          className={`font-black text-xl leading-none ${isVip ? "text-white" : "text-[#1e0a3c]"}`}
                        >
                          {ticket.name}
                        </h3>
                      </div>
                      <span className="text-2xl">{ICONS[ticket.id]}</span>
                    </div>
                    <p
                      className={`font-black text-3xl leading-none ${isVip ? "text-white" : "text-[#1e0a3c]"}`}
                    >
                      {ticket.id === "regular"
                        ? "₦40k"
                        : formatNaira(ticket.price)}
                    </p>
                    <p
                      className={`text-xs mt-1 ${isVip ? "text-white/30" : "text-purple-300"}`}
                    >
                      {CAPACITY[ticket.id]}
                    </p>
                  </div>

                  {/* Perks */}
                  <div className="px-6 py-5 flex-1">
                    <ul className="flex flex-col gap-2.5">
                      {ticket.perks.map((perk) => (
                        <li
                          key={perk}
                          className={`flex items-center gap-2.5 text-xs ${isVip ? "text-white/60" : "text-purple-500"}`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${isVip ? "bg-white/10 text-white/50" : "bg-purple-100 text-purple-400"}`}
                          >
                            ✓
                          </span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-6">
                    <AddToCartButton
                      ticket={ticket}
                      variant={isVip ? "dark" : "light"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8 px-5">
          <div className="flex items-center gap-2">
            {TICKETS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-[#7c3aed]"
                    : "w-2 h-2 bg-purple-200 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={active === 0}
              className="w-9 h-9 rounded-full border border-purple-200 flex items-center justify-center text-purple-400 hover:text-purple-700 hover:border-purple-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
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
              className="w-9 h-9 rounded-full border border-purple-200 flex items-center justify-center text-purple-400 hover:text-purple-700 hover:border-purple-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
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

        {/* Footer row */}
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
