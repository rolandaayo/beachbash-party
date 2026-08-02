"use client";

import { useRef, useState } from "react";

const ITEMS = [
  {
    icon: "🎵",
    label: "01",
    title: "Live Performances",
    desc: "Top Nigerian artists on the main stage all night long.",
  },
  {
    icon: "🌊",
    label: "02",
    title: "Beach Vibes",
    desc: "Party right on the Lagos shoreline as the waves set the mood.",
  },
  {
    icon: "🍹",
    label: "03",
    title: "Premium Bar",
    desc: "Curated cocktails, premium spirits, cold drinks all night.",
  },
  {
    icon: "🔥",
    label: "04",
    title: "DJ Sets",
    desc: "The hottest DJs in Lagos keeping energy through till dawn.",
  },
];

export default function EventCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  function next() {
    setActive((a) => Math.min(a + 1, ITEMS.length - 1));
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
    <section
      className="py-20 px-5"
      style={{
        background:
          "linear-gradient(135deg, #3b0764 0%, #4c1d95 50%, #2e1065 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Overflow wrapper */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
              transform: `translateX(calc(${-active * 92}vw / 1 + ${active === 0 ? 0 : 0}px))`,
            }}
          >
            {ITEMS.map((item, i) => (
              <div
                key={item.label}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 rounded-3xl p-7 flex flex-col transition-all duration-300 ${
                  i === active
                    ? "bg-white shadow-2xl opacity-100 scale-100 w-[80vw] sm:w-72"
                    : "bg-white/8 border border-white/10 opacity-50 scale-95 w-[80vw] sm:w-72"
                }`}
              >
                <div className="flex items-start justify-between mb-8">
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase ${i === active ? "text-purple-300" : "text-white/30"}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3
                  className={`font-black text-lg mb-2 ${i === active ? "text-[#1e0a3c]" : "text-white/70"}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed flex-1 ${i === active ? "text-purple-500" : "text-white/35"}`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={active === 0}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
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
              disabled={active === ITEMS.length - 1}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
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
      </div>
    </section>
  );
}
