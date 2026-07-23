import Link from "next/link";
import { formatNaira } from "@/lib/tickets";

export const metadata = { title: "About — BEACHBASH PARTY" };

export default function AboutPage() {
  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="float-anim inline-block text-5xl mb-5 opacity-80">
            🏖️
          </div>
          <p className="tag mx-auto w-fit mb-4">The Story</p>
          <h1 className="font-black text-4xl sm:text-6xl text-white mb-4">
            About BEACHBASH
          </h1>
          <p className="text-white/35 text-sm max-w-lg mx-auto leading-relaxed">
            One night, one beach, one Lagos experience you&apos;ll never forget.
          </p>
        </div>

        {/* What is it */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div>
            <h2 className="text-white font-black text-2xl mb-4">
              What Is BEACHBASH?
            </h2>
            <div className="flex flex-col gap-3 text-white/40 text-sm leading-relaxed">
              <p>
                BEACHBASH PARTY is a one-night-only beach party experience
                happening on{" "}
                <span className="text-white/80">October 10, 2026</span> in{" "}
                <span className="text-white/80">Lagos, Nigeria</span>.
              </p>
              <p>
                This is not a festival. It&apos;s not a weekend retreat.
                It&apos;s one show — carefully curated, intentionally limited,
                and completely unmatched in energy.
              </p>
              <p>
                Live performances, world-class DJ sets, premium bars, and the
                Lagos ocean as your backdrop.
              </p>
            </div>
          </div>
          <div className="card rounded-2xl p-7 text-center">
            <div className="text-5xl mb-3 opacity-60">🌊</div>
            <h3 className="text-white font-black text-xl mb-2">
              One Show Only
            </h3>
            <p className="text-white/35 text-xs leading-relaxed">
              No second dates. No alternative venues. When the tickets are gone,
              they&apos;re gone.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Date", value: "Oct 10", sub: "2026" },
            { label: "City", value: "Lagos", sub: "Nigeria 🇳🇬" },
            { label: "Doors", value: "8 PM", sub: "till dawn" },
            { label: "From", value: "₦50K", sub: "per ticket" },
          ].map((s) => (
            <div key={s.label} className="card rounded-xl p-4 text-center">
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <p className="text-white font-black text-xl">{s.value}</p>
              <p className="text-white/25 text-[11px]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-white font-black text-2xl mb-8 text-center">
            What&apos;s Going Down
          </h2>
          <div className="relative flex flex-col gap-0">
            {[
              {
                time: "8:00 PM",
                title: "Gates Open",
                desc: "Early entry for all ticket holders. Set up at the beach, grab your first drink.",
              },
              {
                time: "9:00 PM",
                title: "DJ Sets Begin",
                desc: "The best DJs in Lagos warm up the crowd with Afrobeats, Amapiano, and everything in between.",
              },
              {
                time: "10:30 PM",
                title: "Live Performances",
                desc: "Main stage comes alive. Artists TBA — trust us, it will be worth it.",
              },
              {
                time: "12:00 AM",
                title: "Peak Hour",
                desc: "When the energy hits its highest point. The beach is yours.",
              },
              {
                time: "Till Dawn",
                title: "DJ Sets Continue",
                desc: "We keep going until the sun comes up. Lagos doesn't sleep.",
              },
            ].map((item, i, arr) => (
              <div key={item.time} className="flex gap-5 items-start">
                {/* timeline spine */}
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 bg-white/8 my-1 min-h-[40px]" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-white/30 text-[11px] font-mono mb-0.5">
                    {item.time}
                  </p>
                  <p className="text-white font-bold text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/35 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-white/5 pt-12">
          <Link href="/tickets" className="btn-primary px-7 py-2.5 text-sm">
            Get Tickets — From {formatNaira(50000)} 🎟️
          </Link>
        </div>
      </div>
    </div>
  );
}
