import { TICKETS, formatNaira } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";
import LinkButton from "@/components/LinkButton";

export const metadata = { title: "Tickets — BEACHBASH PARTY" };

export default function TicketsPage() {
  return (
    <div className="pt-14">
      {/* ── PAGE HERO ──────────────────────────────────────────────────── */}
      <div className="ticket-hero px-5 pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3 py-1.5 mb-8">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <span className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
              Tickets on sale now
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="font-black text-5xl sm:text-7xl text-white leading-none tracking-tight mb-4">
                Get Your
                <br />
                <span className="text-white/30">Tickets</span>
              </h1>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                One show. One night. October 10, 2026, Lagos, Nigeria. Doors
                open 8 PM — till dawn.
              </p>
            </div>

            {/* Event quick-facts */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Date", value: "Oct 10, 2026" },
                { label: "City", value: "Lagos 🇳🇬" },
                { label: "Doors", value: "8:00 PM" },
                { label: "From", value: formatNaira(50000) },
              ].map((f) => (
                <div
                  key={f.label}
                  className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3"
                >
                  <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">
                    {f.label}
                  </p>
                  <p className="text-white font-bold text-sm">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#0a0a0a] py-5 select-none border-t border-white/5">
        <div className="marquee-track-reverse">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                { text: "₦50,000", accent: true },
                { text: "SECURE YOUR SPOT", accent: false },
                { text: "OCT 10 · LAGOS", accent: true },
                { text: "LIMITED TICKETS", accent: false },
                { text: "BEACHBASH 2026", accent: true },
                { text: "DOORS OPEN 8PM", accent: false },
                { text: "GENERAL · VIP · VVIP", accent: true },
                { text: "DON'T MISS THIS", accent: false },
              ].map((item, j) => (
                <span key={j} className="flex items-center">
                  <span
                    className={`whitespace-nowrap font-black tracking-[0.15em] uppercase px-7 ${
                      item.accent
                        ? "text-white text-xl"
                        : "text-white/20 text-sm"
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="text-white/10 text-base">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKET CARDS ───────────────────────────────────────────────── */}
      <div className="bg-white px-5 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[#0a0a0a] font-black text-xl">
              Choose your tier
            </span>
            <div className="flex-1 h-px bg-black/6" />
            <span className="text-black/25 text-xs">3 options</span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
            {/* GENERAL */}
            <div className="ticket-tier-general rounded-3xl p-7 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-black/30 text-[10px] uppercase tracking-widest font-bold mb-1">
                    General
                  </p>
                  <h2 className="text-[#0a0a0a] font-black text-xl leading-none">
                    General
                    <br />
                    Access
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-xl">
                  🎟️
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[#0a0a0a] font-black text-4xl leading-none">
                  {formatNaira(TICKETS[0].price)}
                </p>
                <p className="text-black/25 text-xs mt-1">per person</p>
              </div>

              <div className="flex-1 border-t border-black/6 pt-5 mb-6">
                <ul className="flex flex-col gap-3">
                  {TICKETS[0].perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-xs text-black/55"
                    >
                      <span className="w-4 h-4 rounded-full bg-black/6 flex items-center justify-center text-[10px] shrink-0 text-black/40">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <AddToCartButton ticket={TICKETS[0]} variant="light" />
            </div>

            {/* VIP — dark/featured */}
            <div className="ticket-tier-vip rounded-3xl p-7 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              {/* subtle top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-white/20" />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 mb-2">
                    <span className="live-dot w-1 h-1 rounded-full bg-green-400 inline-block" />
                    <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">
                      Most popular
                    </span>
                  </div>
                  <h2 className="text-white font-black text-xl leading-none">
                    VIP
                    <br />
                    Access
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                  ⭐
                </div>
              </div>

              <div className="mb-6">
                <p className="text-white font-black text-4xl leading-none">
                  {formatNaira(TICKETS[1].price)}
                </p>
                <p className="text-white/30 text-xs mt-1">per person</p>
              </div>

              <div className="flex-1 border-t border-white/10 pt-5 mb-6">
                <ul className="flex flex-col gap-3">
                  {TICKETS[1].perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-xs text-white/55"
                    >
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0 text-white/50">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <AddToCartButton ticket={TICKETS[1]} variant="dark" />
            </div>

            {/* VVIP */}
            <div className="ticket-tier-vvip rounded-3xl p-7 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-black/30 text-[10px] uppercase tracking-widest font-bold mb-1">
                    Ultra Premium
                  </p>
                  <h2 className="text-[#0a0a0a] font-black text-xl leading-none">
                    VVIP
                    <br />
                    Table
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-xl">
                  👑
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[#0a0a0a] font-black text-4xl leading-none">
                  {formatNaira(TICKETS[2].price)}
                </p>
                <p className="text-black/25 text-xs mt-1">table of 4</p>
              </div>

              <div className="flex-1 border-t border-black/6 pt-5 mb-6">
                <ul className="flex flex-col gap-3">
                  {TICKETS[2].perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-xs text-black/55"
                    >
                      <span className="w-4 h-4 rounded-full bg-black/6 flex items-center justify-center text-[10px] shrink-0 text-black/40">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <AddToCartButton ticket={TICKETS[2]} variant="light" />
            </div>
          </div>

          {/* ── COMPARISON STRIP ─────────────────────────────────────── */}
          <div className="bg-[#0a0a0a] rounded-3xl p-7 mb-10 overflow-x-auto">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-5">
              Quick comparison
            </p>
            <table className="w-full text-xs min-w-[440px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left text-white/30 font-medium pb-3 w-1/2">
                    Feature
                  </th>
                  <th className="text-center text-white/60 font-bold pb-3">
                    General
                  </th>
                  <th className="text-center text-white font-bold pb-3">VIP</th>
                  <th className="text-center text-white/60 font-bold pb-3">
                    VVIP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Beach access", true, true, true],
                  ["Main stage", true, true, true],
                  ["Bar access", true, true, true],
                  ["VIP lounge", false, true, true],
                  ["Priority entry", false, true, true],
                  ["2 free drinks", false, true, true],
                  ["Private table for 4", false, false, true],
                  ["Bottle service", false, false, true],
                  ["Backstage access", false, false, true],
                  ["Personal host", false, false, true],
                ].map(([feature, gen, vip, vvip]) => (
                  <tr key={feature as string}>
                    <td className="text-white/40 py-2.5">
                      {feature as string}
                    </td>
                    <td className="text-center py-2.5">
                      {gen ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <span className="text-white/15">—</span>
                      )}
                    </td>
                    <td className="text-center py-2.5">
                      {vip ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <span className="text-white/15">—</span>
                      )}
                    </td>
                    <td className="text-center py-2.5">
                      {vvip ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <span className="text-white/15">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── TRUST STRIP ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🔒",
                title: "Secure Checkout",
                desc: "Payment info is encrypted and never stored on our servers.",
              },
              {
                icon: "📱",
                title: "Digital Tickets",
                desc: "Sent instantly to your email. Show at the gate — no printing needed.",
              },
              {
                icon: "⚠️",
                title: "No Refunds",
                desc: "All ticket sales are final and non-transferable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-5 rounded-2xl border border-black/7 hover:border-black/14 transition-colors"
              >
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-[#0a0a0a] font-bold text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-black/35 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────── */}
      <div className="border-t border-black/6 bg-[#fafafa] py-12 px-5 text-center">
        <p className="text-black/35 text-sm mb-2">Still deciding?</p>
        <p className="text-[#0a0a0a] font-black text-2xl mb-6">
          Questions? We&apos;ve got answers.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <LinkButton href="/faq" className="btn-outline px-6 py-2.5 text-sm">
            Read the FAQ
          </LinkButton>
          <LinkButton href="/about" className="btn-ghost px-6 py-2.5 text-sm">
            About the Event
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
