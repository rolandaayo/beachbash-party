"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const ITEMS = [
  {
    icon: "🎵",
    label: "01",
    title: "Live Performances",
    desc: "Top Nigerian artists on the main stage all night long.",
    color: "from-violet-600 to-purple-800",
  },
  {
    icon: "🌊",
    label: "02",
    title: "Beach Vibes",
    desc: "Party right on the Lagos shoreline as the waves set the mood.",
    color: "from-blue-600 to-violet-700",
  },
  {
    icon: "🍹",
    label: "03",
    title: "Premium Bar",
    desc: "Curated cocktails, premium spirits, cold drinks all night.",
    color: "from-pink-600 to-rose-800",
  },
  {
    icon: "🔥",
    label: "04",
    title: "DJ Sets",
    desc: "The hottest DJs in Lagos keeping energy through till dawn.",
    color: "from-orange-500 to-red-700",
  },
];

export default function EventCarousel() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null) as React.MutableRefObject<HTMLElement>;
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-80px 0px",
  });
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
      ref={sectionRef}
      className="py-20 px-5 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, #3b0764 0%, #4c1d95 50%, #2e1065 100%)",
      }}
    >
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
            top: "-10%",
            right: "10%",
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-56 h-56 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            bottom: "5%",
            left: "5%",
          }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, -15, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "circOut" }}
        >
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-2">
            What to Expect
          </p>
          <h2 className="font-black text-3xl sm:text-4xl text-white">
            The Full Experience 🎪
          </h2>
        </motion.div>

        {/* Drag/swipe container */}
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
          <motion.div
            className="flex gap-4"
            animate={{ x: `calc(${-active * 92}vw / 1)` }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            {ITEMS.map((item, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={item.label}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 60, rotateX: 20 }}
                  animate={
                    inView
                      ? {
                          opacity: isActive ? 1 : 0.45,
                          y: 0,
                          rotateX: 0,
                          scale: isActive ? 1 : 0.93,
                        }
                      : { opacity: 0, y: 60, rotateX: 20 }
                  }
                  transition={{
                    delay: 0.15 + i * 0.1,
                    duration: 0.7,
                    ease: "circOut",
                  }}
                  whileHover={
                    isActive
                      ? {
                          rotateX: -3,
                          rotateY: 5,
                          scale: 1.04,
                          transition: { duration: 0.25 },
                        }
                      : {}
                  }
                  style={{ transformPerspective: 900 }}
                  className={`flex-shrink-0 rounded-3xl p-7 flex flex-col w-[80vw] sm:w-72 card-3d ${
                    isActive
                      ? "bg-white shadow-2xl shadow-purple-900/50"
                      : "bg-white/8 border border-white/10"
                  }`}
                >
                  {/* Card top row */}
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase ${isActive ? "text-purple-300" : "text-white/30"}`}
                    >
                      {item.label}
                    </span>
                    <motion.span
                      className="text-3xl"
                      animate={
                        isActive
                          ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }
                          : {}
                      }
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      {item.icon}
                    </motion.span>
                  </div>

                  {/* Gradient accent bar */}
                  {isActive && (
                    <motion.div
                      className={`h-1 rounded-full bg-gradient-to-r ${item.color} mb-4`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}

                  <h3
                    className={`font-black text-lg mb-2 ${isActive ? "text-[#1e0a3c]" : "text-white/70"}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed flex-1 ${isActive ? "text-purple-500" : "text-white/35"}`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          className="flex items-center justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            {ITEMS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                animate={
                  i === active
                    ? { width: 24, backgroundColor: "#ffffff" }
                    : { width: 8, backgroundColor: "rgba(255,255,255,0.25)" }
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
                disabled: active === ITEMS.length - 1,
                icon: "M9 5l7 7-7 7",
              },
            ].map(({ fn, disabled, icon }, bi) => (
              <motion.button
                key={bi}
                onClick={fn}
                disabled={disabled}
                whileHover={
                  disabled
                    ? {}
                    : { scale: 1.12, borderColor: "rgba(255,255,255,0.6)" }
                }
                whileTap={disabled ? {} : { scale: 0.92 }}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
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
      </div>
    </section>
  );
}
