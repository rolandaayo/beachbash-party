import Link from "next/link";
import { formatNaira } from "@/lib/tickets";

export const metadata = {
  title: "About — BEACHBASH PARTY",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="float-anim inline-block text-6xl mb-6">🏖️</div>
          <p className="text-orange-400 font-bold tracking-widest text-sm uppercase mb-3">
            The Story
          </p>
          <h1 className="font-black text-5xl sm:text-7xl text-white mb-6">
            About BEACHBASH
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            One night, one beach, one Lagos experience you&apos;ll never forget.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-white font-black text-3xl mb-4">
              What Is BEACHBASH?
            </h2>
            <div className="flex flex-col gap-4 text-zinc-400 leading-relaxed">
              <p>
                BEACHBASH PARTY is a one-night-only beach party experience
                happening on{" "}
                <strong className="text-white">October 10, 2026</strong> in{" "}
                <strong className="text-white">Lagos, Nigeria</strong>.
              </p>
              <p>
                This is not a festival. It&apos;s not a weekend retreat.
                It&apos;s one show — carefully curated, intentionally limited,
                and completely unmatched in energy.
              </p>
              <p>
                Live performances, world-class DJ sets, premium bars, and the
                Lagos ocean as your backdrop. If you know, you know.
              </p>
            </div>
          </div>
          <div className="ticket-card rounded-3xl p-8 text-center">
            <div className="text-6xl mb-4">🌊</div>
            <h3 className="text-white font-black text-2xl mb-2">
              One Show Only
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              No second dates. No alternative venues. This is a one-time event.
              When the tickets are gone, they&apos;re gone.
            </p>
          </div>
        </div>

        {/* Event facts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          {[
            { label: "Date", value: "Oct 10", sub: "2026" },
            { label: "City", value: "Lagos", sub: "Nigeria 🇳🇬" },
            { label: "Starts", value: "8 PM", sub: "till dawn" },
            { label: "From", value: "₦50K", sub: "per ticket" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="ticket-card rounded-2xl p-5 text-center"
            >
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-white font-black text-2xl">{stat.value}</p>
              <p className="text-zinc-500 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* What's happening */}
        <div className="mb-20">
          <h2 className="text-white font-black text-3xl mb-8 text-center">
            What&apos;s Going Down
          </h2>
          <div className="flex flex-col gap-4">
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
                desc: "Main stage comes alive. Artists TBA — but trust us, it will be worth it.",
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
            ].map((item) => (
              <div key={item.time} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-orange-400 font-bold text-sm">
                    {item.time}
                  </span>
                </div>
                <div className="flex-shrink-0 w-px bg-orange-500/30 self-stretch mt-1" />
                <div className="pb-4">
                  <p className="text-white font-bold mb-1">{item.title}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/tickets"
            className="btn-orange text-white font-black text-lg px-12 py-5 rounded-full inline-block"
          >
            Get Your Ticket — From {formatNaira(50000)} 🎟️
          </Link>
        </div>
      </div>
    </div>
  );
}
