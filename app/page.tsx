import LinkButton from "@/components/LinkButton";
import EventCarousel from "@/components/EventCarousel";
import TicketCarousel from "@/components/TicketCarousel";
import { formatNaira } from "@/lib/tickets";

export default function Home() {
  return (
    <div className="pt-14">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/*
        BACKGROUND IMAGE SLOT
        To add a background image, place your image in /public/hero-bg.jpg
        and uncomment the style below. The purple overlay stays on top
        so text remains readable.

        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      */}
      <section
        className="relative min-h-[85vh] flex items-end overflow-hidden"
        style={{
          /* ↓ swap this for your image when ready ↓ */
          background:
            "linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #3b0764 100%)",
        }}
      >
        {/*
          ── IMAGE SLOT ──────────────────────────────────────────────
          When you have a background photo, replace the section style above with:
            backgroundImage: "url('/hero-bg.jpg')"
            backgroundSize: "cover"
            backgroundPosition: "center top"
          Then this overlay div will darken the photo so text stays sharp.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0040]/90 via-[#2e1065]/50 to-transparent pointer-events-none" />

        {/* Content sits at the bottom of the hero */}
        <div className="relative z-10 w-full px-5 pb-14 pt-32 max-w-5xl mx-auto">
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
            The biggest beach party Lagos has ever seen. One night only —
            October 10, 2026. Doors open 4 PM till dawn.
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
        </div>
      </section>

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
                    className={`whitespace-nowrap font-black tracking-widest uppercase text-sm px-6 ${word === "OCTOBER 10 2026" ? "text-[#7c3aed]" : "text-purple-200"}`}
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
      <section className="py-20 px-5 max-w-5xl mx-auto border-t border-purple-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="tag mb-4 w-fit">Location</p>
            <h2 className="font-black text-3xl sm:text-4xl text-[#1e0a3c] mb-5">
              Lagos, Nigeria 🇳🇬
            </h2>
            <p className="text-purple-400 text-sm leading-relaxed mb-6">
              We&apos;re bringing the biggest beach party to Lagos. The exact
              venue will be revealed to ticket holders 2 weeks before the show.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                {
                  icon: "📅",
                  label: "Date",
                  val: "Saturday, October 10, 2026",
                },
                { icon: "🕗", label: "Time", val: "4:00 PM — Till Dawn" },
                { icon: "📍", label: "City", val: "Lagos, Nigeria" },
                { icon: "🎟️", label: "From", val: formatNaira(40000) },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-base w-5 text-center">{r.icon}</span>
                  <span className="text-purple-300 text-xs w-10">
                    {r.label}
                  </span>
                  <span className="text-purple-600 text-xs font-medium">
                    {r.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-[#1e0a3c] font-black text-xl mb-2">
              Venue TBA
            </h3>
            <p className="text-purple-400 text-xs leading-relaxed">
              Exact location sent to all ticket holders via email 14 days before
              the event. All we can say — it&apos;s beachfront. 🌊
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 border-t border-purple-100 ticket-hero">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-black text-4xl sm:text-5xl text-white mb-3">
            Don&apos;t Miss Out.
          </h2>
          <p className="text-white/45 text-sm mb-8">
            Tickets are limited. Once they&apos;re gone, they&apos;re gone.
            October 10, Lagos.
          </p>
          <LinkButton
            href="/tickets"
            className="bg-white text-[#4c1d95] font-bold text-sm px-8 py-3 rounded-full inline-flex items-center gap-2 hover:bg-purple-50 transition-colors"
          >
            Buy Tickets Now 🎟️
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
