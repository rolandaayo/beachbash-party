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
      <section className="py-20 px-5 border-t border-black/6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="tag mb-3 w-fit">The Event</p>
              <h2 className="font-black text-3xl sm:text-4xl text-[#0a0a0a]">
                What to Expect
              </h2>
            </div>
            <p className="text-black/35 text-sm max-w-xs text-right hidden sm:block">
              One night. Four reasons you can&apos;t miss it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="group flex flex-col p-6 rounded-2xl border border-black/7 bg-white hover:border-black/14 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-black/15 text-[10px] font-bold tracking-widest uppercase">
                    {item.label}
                  </span>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-black/40 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKET PREVIEW ───────────────────────────────────────────── */}
      <section className="py-20 px-5 border-t border-black/6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="tag mb-3 w-fit">Grab Your Spot</p>
              <h2 className="font-black text-3xl sm:text-4xl text-[#0a0a0a]">
                Ticket Options
              </h2>
            </div>
            <p className="text-black/35 text-sm">
              Limited tickets. Don&apos;t sleep on this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TICKETS.map((ticket) => (
              <div
                key={ticket.id}
                className={`rounded-2xl flex flex-col overflow-hidden border transition-all duration-200 ${
                  ticket.id === "vip"
                    ? "bg-[#0a0a0a] border-[#0a0a0a]"
                    : "bg-white border-black/8 hover:border-black/16 hover:shadow-sm"
                }`}
              >
                {/* Card header */}
                <div
                  className={`px-6 pt-6 pb-5 border-b ${ticket.id === "vip" ? "border-white/10" : "border-black/7"}`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      {ticket.id === "vip" && (
                        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 mb-2">
                          <span className="live-dot w-1 h-1 rounded-full bg-green-400 inline-block" />
                          <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">
                            Most popular
                          </span>
                        </div>
                      )}
                      <p
                        className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${ticket.id === "vip" ? "text-white/30" : "text-black/30"}`}
                      >
                        {ticket.id === "general"
                          ? "Standard"
                          : ticket.id === "vip"
                            ? "Premium"
                            : "Ultra Premium"}
                      </p>
                      <h3
                        className={`font-black text-xl leading-none ${ticket.id === "vip" ? "text-white" : "text-[#0a0a0a]"}`}
                      >
                        {ticket.name}
                      </h3>
                    </div>
                    <span className="text-xl">
                      {ticket.id === "general"
                        ? "🎟️"
                        : ticket.id === "vip"
                          ? "⭐"
                          : "👑"}
                    </span>
                  </div>
                  <p
                    className={`font-black text-3xl leading-none ${ticket.id === "vip" ? "text-white" : "text-[#0a0a0a]"}`}
                  >
                    {formatNaira(ticket.price)}
                  </p>
                  <p
                    className={`text-xs mt-1 ${ticket.id === "vip" ? "text-white/30" : "text-black/25"}`}
                  >
                    {ticket.id === "vvip" ? "table of 4" : "per person"}
                  </p>
                </div>

                {/* Perks list */}
                <div className="px-6 py-5 flex-1">
                  <ul className="flex flex-col gap-2.5">
                    {ticket.perks.map((perk) => (
                      <li
                        key={perk}
                        className={`flex items-center gap-2.5 text-xs ${ticket.id === "vip" ? "text-white/55" : "text-black/50"}`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${ticket.id === "vip" ? "bg-white/10 text-white/50" : "bg-black/5 text-black/40"}`}
                        >
                          ✓
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <AddToCartButton
                    ticket={ticket}
                    variant={ticket.id === "vip" ? "dark" : "light"}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/6">
            <p className="text-black/30 text-xs">
              Secure checkout · Digital delivery · No printing needed
            </p>
            <Link
              href="/tickets"
              className="text-[#0a0a0a] text-xs font-semibold hover:opacity-60 transition-opacity flex items-center gap-1"
            >
              View full details →
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
