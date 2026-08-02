import { TICKETS, formatNaira, formatNairaFull } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";
import LinkButton from "@/components/LinkButton";

export const metadata = { title: "Tickets — BEACHBASH PARTY" };

const TIER_ICONS: Record<string, string> = {
  regular: "🎟️",
  "table-700": "🥃",
  "table-1m": "⭐",
  "table-1.5m": "👑",
};

const TIER_LABELS: Record<string, string> = {
  regular: "Early Bird",
  "table-700": "Table Package",
  "table-1m": "Premium Table",
  "table-1.5m": "Ultra VIP",
};

export default function TicketsPage() {
  const [regular, t700, t1m, t15m] = TICKETS;

  return (
    <div className="pt-14">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="ticket-hero px-5 pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-8">
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
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                One show. One night. October 10, 2026, Lagos, Nigeria. Doors
                open 8 PM — till dawn.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Date", value: "Oct 10, 2026" },
                { label: "City", value: "Lagos 🇳🇬" },
                { label: "Doors", value: "8:00 PM" },
                { label: "From", value: "₦40k" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="bg-white/8 border border-white/12 rounded-2xl px-4 py-3"
                >
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
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
      <div className="overflow-hidden bg-[#2e1065] py-5 select-none border-t border-white/5">
        <div className="marquee-track-reverse">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                { text: "₦40K EARLY BIRD", accent: true },
                { text: "SECURE YOUR SPOT", accent: false },
                { text: "OCT 10 · LAGOS", accent: true },
                { text: "LIMITED TABLES", accent: false },
                { text: "BEACHBASH 2026", accent: true },
                { text: "PRIVATE CABANA AVAIL.", accent: false },
                { text: "BOAT · JEEP · VIBES", accent: true },
                { text: "DON'T MISS THIS", accent: false },
              ].map((item, j) => (
                <span key={j} className="flex items-center">
                  <span
                    className={`whitespace-nowrap font-black tracking-[0.15em] uppercase px-7 ${item.accent ? "text-white text-xl" : "text-white/20 text-sm"}`}
                  >
                    {item.text}
                  </span>
                  <span className="text-purple-500/30 text-base">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKET CARDS ─────────────────────────────────────────────── */}
      <div className="bg-[#faf5ff] px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[#1e0a3c] font-black text-xl">
              Choose your experience
            </span>
            <div className="flex-1 h-px bg-purple-100" />
            <span className="text-purple-300 text-xs">4 options</span>
          </div>

          {/* ── REGULAR ENTRY ── */}
          <div className="ticket-tier-general rounded-3xl p-7 mb-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-xl">
                    🎟️
                  </div>
                  <div>
                    <p className="text-purple-300 text-[10px] uppercase tracking-widest font-bold">
                      Early Bird
                    </p>
                    <h2 className="text-[#1e0a3c] font-black text-xl leading-none">
                      Regular Entry
                    </h2>
                  </div>
                </div>
                <p className="text-purple-400 text-xs leading-relaxed mb-4">
                  General entry to the party. Limited early bird pricing
                  available.
                </p>
                <ul className="flex flex-col gap-2">
                  {regular.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-xs text-purple-500"
                    >
                      <span className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center text-[10px] shrink-0 text-purple-400">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:text-right flex flex-col sm:items-end gap-4">
                <div>
                  <p className="text-purple-300 text-xs mb-1">
                    Girls (Early Bird)
                  </p>
                  <p className="text-[#1e0a3c] font-black text-4xl leading-none">
                    ₦40k
                  </p>
                </div>
                <div>
                  <p className="text-purple-300 text-xs mb-1">
                    Guys (Early Bird)
                  </p>
                  <p className="text-[#1e0a3c] font-black text-4xl leading-none">
                    ₦60k
                  </p>
                </div>
                <div className="w-full sm:w-48">
                  <AddToCartButton ticket={regular} variant="light" />
                </div>
              </div>
            </div>
          </div>

          {/* ── TABLE PACKAGES ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {/* 700K */}
            <div className="ticket-tier-general rounded-3xl p-7 flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-purple-300 text-[10px] uppercase tracking-widest font-bold mb-1">
                    Standing Table
                  </p>
                  <h2 className="text-[#1e0a3c] font-black text-xl leading-none">
                    Table
                    <br />
                    700K
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-xl">
                  🥃
                </div>
              </div>
              <p className="text-[#1e0a3c] font-black text-3xl leading-none mb-1">
                {formatNairaFull(700000)}
              </p>
              <p className="text-purple-300 text-xs mb-5">2–4 people</p>
              <div className="flex-1 border-t border-purple-100 pt-4 mb-6">
                <ul className="flex flex-col gap-2.5">
                  {t700.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-xs text-purple-500"
                    >
                      <span className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center text-[10px] shrink-0 text-purple-400">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <AddToCartButton ticket={t700} variant="light" />
            </div>

            {/* 1M — featured */}
            <div className="ticket-tier-vip rounded-3xl p-7 flex flex-col relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-white/20" />
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 mb-2">
                    <span className="live-dot w-1 h-1 rounded-full bg-green-400 inline-block" />
                    <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">
                      Popular
                    </span>
                  </div>
                  <h2 className="text-white font-black text-xl leading-none">
                    Table
                    <br />
                    1M
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                  ⭐
                </div>
              </div>
              <p className="text-white font-black text-3xl leading-none mb-1">
                {formatNairaFull(1000000)}
              </p>
              <p className="text-white/30 text-xs mb-5">2–6 people</p>
              <div className="flex-1 border-t border-white/10 pt-4 mb-6">
                <ul className="flex flex-col gap-2.5">
                  {t1m.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-xs text-white/60"
                    >
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0 text-white/50">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <AddToCartButton ticket={t1m} variant="dark" />
            </div>

            {/* 1.5M */}
            <div
              className="ticket-tier-general rounded-3xl p-7 flex flex-col hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-purple-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                    Private Cabana
                  </p>
                  <h2 className="text-[#1e0a3c] font-black text-xl leading-none">
                    Table
                    <br />
                    1.5M
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-purple-200 flex items-center justify-center text-xl">
                  👑
                </div>
              </div>
              <p className="text-[#1e0a3c] font-black text-3xl leading-none mb-1">
                {formatNairaFull(1500000)}
              </p>
              <p className="text-purple-400 text-xs mb-5">2–8 people</p>
              <div className="flex-1 border-t border-purple-200 pt-4 mb-6">
                <ul className="flex flex-col gap-2.5">
                  {t15m.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2.5 text-xs text-purple-600"
                    >
                      <span className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center text-[10px] shrink-0 text-purple-500">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <AddToCartButton ticket={t15m} variant="light" />
            </div>
          </div>

          {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
          <div className="ticket-hero rounded-3xl p-7 mb-10 overflow-x-auto">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-5">
              Quick comparison
            </p>
            <table className="w-full text-xs min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/30 font-medium pb-3 w-2/5">
                    Feature
                  </th>
                  <th className="text-center text-white/50 font-bold pb-3">
                    Regular
                  </th>
                  <th className="text-center text-white/50 font-bold pb-3">
                    700K
                  </th>
                  <th className="text-center text-white font-bold pb-3">1M</th>
                  <th className="text-center text-white/50 font-bold pb-3">
                    1.5M
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["General entry", true, true, true, true],
                  ["To & fro boat ride", true, false, false, false],
                  ["General boat ride", false, true, true, false],
                  ["Private boat (×8)", false, false, false, true],
                  ["Safari jeep ride", true, true, true, true],
                  ["1 Cocktail", true, false, false, false],
                  ["Food platter", false, true, true, true],
                  ["Premium spirits", false, "VSOP", "Casa", "Don Julio"],
                  ["Champagne", false, "×1", "×2", "×2"],
                  ["Shisha", false, false, true, true],
                  ["Chivita", false, false, "×1", "×2"],
                  ["Private cabana", false, false, false, true],
                ].map(([feature, r, t7, t1, t15]) => (
                  <tr key={feature as string}>
                    <td className="text-white/40 py-2.5">
                      {feature as string}
                    </td>
                    {[r, t7, t1, t15].map((val, ci) => (
                      <td key={ci} className="text-center py-2.5">
                        {val === true ? (
                          <span className="text-green-400">✓</span>
                        ) : val === false ? (
                          <span className="text-white/15">—</span>
                        ) : (
                          <span className="text-purple-300 font-semibold">
                            {val}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🔒",
                title: "Secure Checkout",
                desc: "Payment info is encrypted and never stored.",
              },
              {
                icon: "📱",
                title: "Digital Tickets",
                desc: "Sent instantly to your email. No printing needed.",
              },
              {
                icon: "⚠️",
                title: "No Refunds",
                desc: "All ticket sales are final and non-transferable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-5 rounded-2xl border border-purple-100 hover:border-purple-200 transition-colors bg-white"
              >
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-[#1e0a3c] font-bold text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-purple-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-purple-100 bg-white py-12 px-5 text-center">
        <p className="text-purple-400 text-sm mb-2">Still deciding?</p>
        <p className="text-[#1e0a3c] font-black text-2xl mb-6">
          Questions? We&apos;ve got answers.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <LinkButton href="/faq" className="btn-outline px-6 py-2.5 text-sm">
            Read the FAQ
          </LinkButton>
          <LinkButton href="/about" className="btn-ghost  px-6 py-2.5 text-sm">
            About the Event
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
