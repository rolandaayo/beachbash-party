import { TICKETS, formatNaira } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-14">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="ticket-hero px-5 pt-20 pb-14">
        <div className="max-w-5xl mx-auto w-full">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3 py-1.5 mb-8">
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
          <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
            The biggest beach party Lagos has ever seen. One night only —
            October 10, 2026. Doors open 8 PM till dawn.
          </p>
          <div className="flex flex-wrap gap-3">
            <LinkButton
              href="/tickets"
              className="btn-primary px-6 py-2.5 text-sm"
            >
              Get Tickets 🎟️
            </LinkButton>
            <LinkButton
              href="/about"
              className="inline-flex items-center gap-1.5 bg-white/8 border border-white/12 text-white/70 hover:text-white hover:bg-white/12 transition-colors font-semibold text-sm px-6 py-2.5 rounded-full"
            >
              Learn More
            </LinkButton>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-black/6 py-4 bg-white select-none">
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
                    className={`whitespace-nowrap font-black tracking-widest uppercase text-sm px-6 ${
                      word === "OCTOBER 10 2026"
                        ? "text-[#0a0a0a]"
                        : "text-black/20"
                    }`}
                  >
                    {word}
                  </span>
                  <span className="text-black/15 text-xs">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT TO EXPECT ───────────────────────────────────────────── */}
      <section className="py-20 px-5 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="tag mx-auto w-fit mb-4">The Event</p>
          <h2 className="font-black text-3xl sm:text-4xl text-[#0a0a0a]">
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
              <h3 className="text-[#0a0a0a] font-bold text-sm mb-1.5">
                {item.title}
              </h3>
              <p className="text-black/35 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKET PREVIEW ───────────────────────────────────────────── */}
      <section className="py-20 px-5 border-t border-black/6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="tag mx-auto w-fit mb-4">Grab Your Spot</p>
            <h2 className="font-black text-3xl sm:text-4xl text-[#0a0a0a]">
              Ticket Options
            </h2>
            <p className="text-black/35 mt-3 text-sm">
              Limited tickets. Don&apos;t sleep on this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TICKETS.map((ticket) => (
              <div
                key={ticket.id}
                className={`rounded-2xl p-6 flex flex-col ${ticket.id === "vip" ? "card-highlight ring-1 ring-black/15" : "card"}`}
              >
                {ticket.id === "vip" && (
                  <span className="tag mb-4 w-fit border-black/12">
                    MOST POPULAR
                  </span>
                )}
                <p className="text-[#0a0a0a] font-black text-lg mb-0.5">
                  {ticket.name}
                </p>
                <p className="text-[#0a0a0a] font-black text-2xl mb-4">
                  {formatNaira(ticket.price)}
                </p>
                <p className="text-black/35 text-xs leading-relaxed mb-5">
                  {ticket.description}
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {ticket.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-xs text-black/50"
                    >
                      <span className="text-black/40">✓</span>
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
              className="text-black/35 hover:text-[#0a0a0a] text-xs transition-colors underline underline-offset-4"
            >
              View full ticket details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────────────────── */}
      <section className="py-20 px-5 max-w-5xl mx-auto border-t border-black/6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="tag mb-4 w-fit">Location</p>
            <h2 className="font-black text-3xl sm:text-4xl text-[#0a0a0a] mb-5">
              Lagos, Nigeria 🇳🇬
            </h2>
            <p className="text-black/40 text-sm leading-relaxed mb-6">
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
                { icon: "🕗", label: "Time", val: "8:00 PM — Till Dawn" },
                { icon: "📍", label: "City", val: "Lagos, Nigeria" },
                { icon: "🎟️", label: "From", val: formatNaira(50000) },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-base w-5 text-center">{r.icon}</span>
                  <span className="text-black/25 text-xs w-10">{r.label}</span>
                  <span className="text-black/60 text-xs">{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-[#0a0a0a] font-black text-xl mb-2">
              Venue TBA
            </h3>
            <p className="text-black/35 text-xs leading-relaxed">
              Exact location sent to all ticket holders via email 14 days before
              the event. All we can say — it&apos;s beachfront. 🌊
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 border-t border-black/6 bg-[#0a0a0a]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-black text-4xl sm:text-5xl text-white mb-3">
            Don&apos;t Miss Out.
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Tickets are limited. Once they&apos;re gone, they&apos;re gone.
            October 10, Lagos.
          </p>
          <LinkButton
            href="/tickets"
            className="bg-white text-[#0a0a0a] font-bold text-sm px-8 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/90 transition-colors"
          >
            Buy Tickets Now 🎟️
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
