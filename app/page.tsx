import Link from "next/link";
import { TICKETS, formatNaira } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";

export default function Home() {
  return (
    <div className="pt-14">
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[96vh] flex items-center justify-center overflow-hidden">
        {/* subtle noise texture via gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%), #080808",
          }}
        />

        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <div className="tag mb-6 mx-auto w-fit">
            ONE NIGHT ONLY · OCT 10, 2026
          </div>

          <h1 className="font-black text-[clamp(3.5rem,14vw,8rem)] leading-[0.9] tracking-tight text-white mb-5">
            BEACH
            <br />
            <span className="text-white/30">BASH</span>
          </h1>

          <p className="text-white/40 text-sm sm:text-base tracking-widest uppercase mb-2 font-medium">
            Party 2026
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/30 text-xs sm:text-sm mb-8">
            <span>📍 Lagos, Nigeria</span>
            <span className="text-white/10">·</span>
            <span>📅 October 10, 2026</span>
            <span className="text-white/10">·</span>
            <span>🌙 8 PM till dawn</span>
          </div>

          <p className="text-white/40 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
            The biggest beach party Lagos has ever seen. Live music, DJ sets,
            vibes, and the ocean. Tickets from{" "}
            <span className="text-white font-semibold">
              {formatNaira(50000)}
            </span>
            .
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tickets" className="btn-primary px-6 py-2.5 text-sm">
              Get Tickets 🎟️
            </Link>
            <Link href="/about" className="btn-outline px-6 py-2.5 text-sm">
              Learn More
            </Link>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-[11px] tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-6 bg-white/15" />
        </div>
      </section>

      {/* ── WHAT TO EXPECT ─────────────────────────────────────────────── */}
      <section className="py-20 px-5 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="tag mx-auto w-fit mb-4">The Event</p>
          <h2 className="font-black text-3xl sm:text-4xl text-white">
            What to Expect
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: "🎵",
              title: "Live Performances",
              desc: "Top Nigerian artists on the main stage all night long.",
            },
            {
              icon: "🌊",
              title: "Beach Vibes",
              desc: "Party right on the Lagos shoreline as the waves set the mood.",
            },
            {
              icon: "🍹",
              title: "Premium Bar",
              desc: "Curated cocktails, premium spirits, cold drinks all night.",
            },
            {
              icon: "🔥",
              title: "DJ Sets",
              desc: "The hottest DJs in Lagos keeping energy through till dawn.",
            },
          ].map((item) => (
            <div key={item.title} className="card rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1.5">
                {item.title}
              </h3>
              <p className="text-white/35 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKET PREVIEW ─────────────────────────────────────────────── */}
      <section className="py-20 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="tag mx-auto w-fit mb-4">Grab Your Spot</p>
            <h2 className="font-black text-3xl sm:text-4xl text-white">
              Ticket Options
            </h2>
            <p className="text-white/35 mt-3 text-sm">
              Limited tickets. Don&apos;t sleep on this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TICKETS.map((ticket) => (
              <div
                key={ticket.id}
                className={`rounded-2xl p-6 flex flex-col ${
                  ticket.id === "vip"
                    ? "card-highlight ring-1 ring-white/20"
                    : "card"
                }`}
              >
                {ticket.id === "vip" && (
                  <span className="tag mb-4 w-fit text-white/80 border-white/20">
                    MOST POPULAR
                  </span>
                )}
                <p className="text-white font-black text-lg mb-0.5">
                  {ticket.name}
                </p>
                <p className="text-white font-black text-2xl mb-4">
                  {formatNaira(ticket.price)}
                </p>
                <p className="text-white/35 text-xs leading-relaxed mb-5">
                  {ticket.description}
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {ticket.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-xs text-white/50"
                    >
                      <span className="text-white/60">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <AddToCartButton ticket={ticket} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tickets"
              className="text-white/40 hover:text-white text-xs transition-colors underline underline-offset-4"
            >
              View full ticket details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOCATION ───────────────────────────────────────────────────── */}
      <section className="py-20 px-5 max-w-5xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="tag mb-4 w-fit">Location</p>
            <h2 className="font-black text-3xl sm:text-4xl text-white mb-5">
              Lagos, Nigeria 🇳🇬
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              We&apos;re bringing the biggest beach party to Lagos. The exact
              venue will be revealed to ticket holders 2 weeks before the show.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              {[
                {
                  icon: "📅",
                  label: "Date",
                  val: "Saturday, October 10, 2026",
                },
                { icon: "🕗", label: "Time", val: "8:00 PM — Till Dawn" },
                { icon: "📍", label: "City", val: "Lagos, Nigeria" },
                { icon: "🎟️", label: "From", val: formatNaira(50000) },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-base w-5 text-center">{r.icon}</span>
                  <span className="text-white/25 text-xs w-10">{r.label}</span>
                  <span className="text-white/70 text-xs">{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-white font-black text-xl mb-2">Venue TBA</h3>
            <p className="text-white/35 text-xs leading-relaxed">
              Exact location sent to all ticket holders via email 14 days before
              the event. All we can say — it&apos;s beachfront. 🌊
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-black text-4xl sm:text-5xl text-white mb-3">
            Don&apos;t Miss Out.
          </h2>
          <p className="text-white/35 text-sm mb-8">
            Tickets are limited. Once they&apos;re gone, they&apos;re gone.
            October 10, Lagos.
          </p>
          <Link href="/tickets" className="btn-primary px-8 py-3 text-sm">
            Buy Tickets Now 🎟️
          </Link>
        </div>
      </section>
    </div>
  );
}
