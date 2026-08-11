"use client";

import { useEffect, useState } from "react";
import LinkButton from "@/components/LinkButton";

const IMAGES = [
  "/hero-bg.jpg",
  "/hero-bg-2.png",
  "/hero-bg-3.png",
  "/hero-bg-4.png",
];
const INTERVAL = 4500;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  // Track whether we've mounted so the first slide shows instantly
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[55vh] flex items-end overflow-hidden">
      {/*
        All slides are always in the DOM — active one is opacity-100,
        others are opacity-0. No mount/unmount = no blank gaps.
        Before mount, the first image is visible immediately (no animation).
      */}
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
            transition: mounted ? "opacity 1.2s ease" : "none",
            // Stack: current on top so it covers the others cleanly
            zIndex: i === current ? 2 : 1,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(26,0,64,0.92) 0%, rgba(46,16,101,0.5) 40%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        className="relative w-full px-5 pb-14 pt-32 max-w-5xl mx-auto"
        style={{ zIndex: 4 }}
      >
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-8">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          <span className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
            Tickets on sale now
          </span>
        </div>
        <h1
          className="font-black text-[clamp(3.5rem,12vw,7rem)] text-white leading-none tracking-tight mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          BEACH
          <br />
          <span className="text-white/25">BASH</span>
        </h1>
        <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-8">
          The biggest beach party Lagos has ever seen. October 10. Doors open 4
          PM till dawn.
        </p>
        <div className="flex flex-wrap gap-3">
          <LinkButton
            href="/tickets"
            className="bg-white text-[#4c1d95] font-bold text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 hover:bg-purple-50 transition-colors"
          >
            Get Tickets 🎟️
          </LinkButton>
          <LinkButton
            href="/about"
            className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/15 transition-colors font-semibold text-sm px-6 py-2.5 rounded-full"
          >
            Learn More
          </LinkButton>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-8">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
