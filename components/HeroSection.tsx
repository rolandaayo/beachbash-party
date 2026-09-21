"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import LinkButton from "@/components/LinkButton";

const IMAGES = [
  "/hero-bg.jpg",
  "/hero-bg-2.png",
  "/hero-bg-3.png",
  "/hero-bg-4.png",
];
const INTERVAL = 4500;

// Floating particles scattered around the hero
const PARTICLES = [
  {
    emoji: "🌊",
    size: "text-3xl",
    top: "12%",
    left: "8%",
    cls: "particle-a",
    delay: "0s",
  },
  {
    emoji: "🏖️",
    size: "text-2xl",
    top: "20%",
    left: "88%",
    cls: "particle-b",
    delay: "1.2s",
  },
  {
    emoji: "🎉",
    size: "text-xl",
    top: "65%",
    left: "6%",
    cls: "particle-c",
    delay: "0.6s",
  },
  {
    emoji: "🎶",
    size: "text-2xl",
    top: "72%",
    left: "90%",
    cls: "particle-a",
    delay: "2s",
  },
  {
    emoji: "🌴",
    size: "text-3xl",
    top: "38%",
    left: "93%",
    cls: "particle-b",
    delay: "0.3s",
  },
  {
    emoji: "✨",
    size: "text-lg",
    top: "48%",
    left: "4%",
    cls: "particle-c",
    delay: "1.8s",
  },
  {
    emoji: "🍹",
    size: "text-2xl",
    top: "82%",
    left: "45%",
    cls: "particle-a",
    delay: "0.9s",
  },
  {
    emoji: "🔥",
    size: "text-xl",
    top: "15%",
    left: "55%",
    cls: "particle-b",
    delay: "1.5s",
  },
];

// Stagger config for the title letters
const LETTER_VARIANTS = {
  hidden: { opacity: 0, y: 80, rotateX: -90, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.7,
      ease: "circOut",
    },
  }),
};

const SUBTITLE_VARIANTS = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.8, duration: 0.8, ease: "easeOut" },
  },
};

const BUTTON_VARIANTS = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 1.05, duration: 0.6, ease: "circOut" },
  },
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax — raw values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smooth the raw mouse position
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });

  // Map mouse offset → subtle bg translate + rotate
  const bgX = useTransform(springX, [-1, 1], ["-2%", "2%"]);
  const bgY = useTransform(springY, [-1, 1], ["-2%", "2%"]);
  const rotateX = useTransform(springY, [-1, 1], [3, -3]);
  const rotateY = useTransform(springX, [-1, 1], [-4, 4]);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % IMAGES.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }
  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const BEACH = "BEACH".split("");
  const BASH = "BASH".split("");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[62vh] flex items-end overflow-hidden perspective-1200"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background slides with parallax ─────────────────────────── */}
      {IMAGES.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
            transition: mounted ? "opacity 1.2s ease" : "none",
            zIndex: i === current ? 2 : 1,
            x: bgX,
            y: bgY,
            scale: 1.06, // extra room for parallax movement
          }}
        />
      ))}

      {/* ── Gradient overlay ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(26,0,64,0.95) 0%, rgba(46,16,101,0.55) 40%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* ── Floating emoji particles ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 4 }}
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`absolute select-none ${p.size} ${p.cls}`}
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              filter: "drop-shadow(0 2px 8px rgba(124,58,237,0.5))",
              opacity: 0.85,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* ── 3D content card ──────────────────────────────────────────── */}
      <motion.div
        className="relative w-full px-5 pb-14 pt-32 max-w-5xl mx-auto transform-style-3d"
        style={{ zIndex: 5, rotateX, rotateY, transformPerspective: 1200 }}
      >
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "circOut" }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-8"
        >
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          <span className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
            Tickets on sale now
          </span>
        </motion.div>

        {/* 3D letter-by-letter title */}
        <div className="perspective-800 mb-2">
          <h1
            className="font-black leading-none tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {/* BEACH — large white letters */}
            <div className="flex overflow-hidden">
              {BEACH.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={LETTER_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-white"
                  style={{
                    fontSize: "clamp(3.5rem,12vw,7rem)",
                    transformOrigin: "bottom center",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* BASH — ghost letters with shimmer sweep */}
            <div className="flex overflow-hidden relative">
              {BASH.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={BEACH.length + i}
                  variants={LETTER_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-white/25 relative"
                  style={{
                    fontSize: "clamp(3.5rem,12vw,7rem)",
                    transformOrigin: "bottom center",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              {/* shimmer sweep over BASH */}
              <motion.div
                className="absolute inset-0 pointer-events-none shimmer-sweep"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              />
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={SUBTITLE_VARIANTS}
          initial="hidden"
          animate="visible"
          className="text-white/55 text-sm leading-relaxed max-w-sm mb-8"
        >
          The biggest beach party Lagos has ever seen. October 10. Doors open 4
          PM till dawn.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={BUTTON_VARIANTS}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <LinkButton
              href="/tickets"
              className="bg-white text-[#4c1d95] font-bold text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 hover:bg-purple-50 transition-colors glow-pulse"
            >
              Get Tickets 🎟️
            </LinkButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <LinkButton
              href="/about"
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/15 transition-colors font-semibold text-sm px-6 py-2.5 rounded-full"
            >
              Learn More
            </LinkButton>
          </motion.div>
        </motion.div>

        {/* Dot indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-2 mt-8"
        >
          {IMAGES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              animate={
                i === current
                  ? { width: 20, opacity: 1 }
                  : { width: 6, opacity: 0.35 }
              }
              transition={{ duration: 0.3 }}
              className={`h-1.5 rounded-full ${i === current ? "bg-white" : "bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Bottom glow bar ───────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          zIndex: 6,
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.8), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
      />
    </section>
  );
}
