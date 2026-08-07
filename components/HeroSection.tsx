"use client";

import { useEffect, useState } from "react";
import LinkButton from "@/components/LinkButton";

const IMAGES = ["/hero-bg.jpg", "/hero-bg-2.png", "/hero-bg-3.png"];
const INTERVAL = 4000; // ms between slides

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % IMAGES.length;
      });
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-end overflow-hidden">
      {/* Outgoing slide — fades out */}
      {prev !== null && (
        <div
          key={`prev-${prev}`}
          className="absolute inset-0 bg-center bg-cover animate-hero-fade-out"
          style={{ backgroundImage: `url('${IMAGES[prev]}')` }}
        />
      )}

      {/* Incoming slide — fades in */}
      <div
        key={`curr-${current}`}
        className="absolute inset-0 bg-center bg-cover animate-hero-fade-in"
        style={{ backgroundImage: `url('${IMAGES[current]}')` }}
      />

      {/* Gradient overlay — always on top of images */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0040]/90 via-[#2e1065]/50 to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 w-full px-5 pb-14 pt-32 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-8">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          <span className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
            Tickets on sale now
          </span>
        </div>
        <h1 className="font-black text-[clamp(3.5rem,12vw,7rem)] text-white leading-none tracking-tight mb-5">
          BEACH
          <br />
          <span className="text-white/25">BASH</span>
        </h1>
        <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-8">
          The biggest beach party Lagos has ever seen. One night only — October
          10, 2026. Doors open 4 PM till dawn.
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
              onClick={() => {
                setPrev(current);
                setCurrent(i);
              }}
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
