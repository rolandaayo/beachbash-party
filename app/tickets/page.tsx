import { TICKETS, formatNaira, formatNairaFull } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";
import LinkButton from "@/components/LinkButton";

export const metadata = { title: "Tickets — BEACHBASH PARTY" };

const ICONS: Record<string, string> = {
  "regular-girls": "👩🏽",
  "regular-guys": "👨🏽",
  "table-700": "🥃",
  "table-1m": "⭐",
  "table-1.5m": "👑",
};

const TIER_LABEL: Record<string, string> = {
  "regular-girls": "Early Bird",
  "regular-guys": "Early Bird",
  "table-700": "Standing Table",
  "table-1m": "Premium Table",
  "table-1.5m": "Private Cabana",
};

const CAPACITY: Record<string, string> = {
  "regular-girls": "per person",
  "regular-guys": "per person",
  "table-700": "2–4 people",
  "table-1m": "2–6 people",
  "table-1.5m": "2–8 people",
};

export default function TicketsPage() {
  const [girlsTicket, guysTicket, t700, t1m, t15m] = TICKETS;

  return (
    <div className="pt-14">
      {/* ── HERO — compact dark purple ───────────────────────────────── */}
      <div className="ticket-hero px-5 pt-12 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-5">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <span className="text-white/60 text-[10px] tracking-widest uppercase font-medium">
              Tickets on sale now
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h1 className="font-black text-4xl sm:text-6xl text-white leading-none tracking-tight mb-2">
                Get Your
                <br />
                <span className="text-white/25">Tickets</span>
              </h1>
              <p className="text-white/45 text-sm max-w-xs">
                Oct 10, 2026 · Lagos, Nigeria · 4 PM till dawn
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { icon: "📅", val: "Oct 10, 2026" },
                { icon: "📍", val: "Lagos 🇳🇬" },
                { icon: "🕗", val: "4:00 PM" },
                { icon: "🎟️", val: "From ₦40k" },
              ].map((f) => (
                <div
                  key={f.val}
                  className="flex items-center gap-1.5 bg-white/10 border border-white/12 rounded-full px-3 py-1.5"
                >
                  <span className="text-sm">{f.icon}</span>
                  <span className="text-white/70 text-xs font-medium">
                    {f.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#2e1065] py-4 select-none border-t border-white/5">
        <div className="marquee-track-reverse">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                { text: "₦40K GIRLS · ₦60K GUYS", accent: true },
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
                    className={`whitespace-nowrap font-black tracking-[0.15em] uppercase px-6 ${
                      item.accent
                        ? "text-white text-sm"
                        : "text-white/20 text-xs"
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="text-purple-500/30 text-sm">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKET CARDS ─────────────────────────────────────────────── */}
      <div className="bg-[#faf5ff] px-4 sm:px-5 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-black text-xl text-[#1e0a3c]">
              Choose your experience
            </h2>
            <div className="flex-1 h-px bg-purple-100" />
            <span className="text-purple-300 text-xs">5 options</span>
          </div>

          {/* Regular — 2 col on all screens */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-4">
            <TicketCard ticket={girlsTicket} variant="vip" />
            <TicketCard ticket={guysTicket} variant="general" />
          </div>

          {/* Table packages — 2 col mobile, 3 col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-12">
            <TicketCard ticket={t700} variant="general" />
            <TicketCard ticket={t1m} variant="vip" />
            <div className="col-span-2 md:col-span-1">
              <TicketCard ticket={t15m} variant="vvip" fullWidth />
            </div>
          </div>

          {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
          <div className="ticket-hero rounded-3xl p-5 sm:p-7 mb-8 overflow-x-auto">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-5">
              Quick comparison
            </p>
            <table className="w-full text-xs min-w-[460px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/30 font-medium pb-3 w-2/5">
                    Feature
                  </th>
                  <th className="text-center text-white/50 font-bold pb-3">
                    Girls
                    <br />
                    <span className="text-white/25 font-normal">₦40k</span>
                  </th>
                  <th className="text-center text-white/50 font-bold pb-3">
                    Guys
                    <br />
                    <span className="text-white/25 font-normal">₦60k</span>
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
                  ["General entry", true, true, true, true, true],
                  ["To & fro boat", true, true, false, false, false],
                  ["General boat ride", false, false, true, true, false],
                  ["Private boat (×8)", false, false, false, false, true],
                  ["Safari jeep ride", true, true, true, true, true],
                  ["1 Cocktail", true, true, false, false, false],
                  ["Food platter", false, false, true, true, true],
                  [
                    "Premium spirits",
                    false,
                    false,
                    "VSOP",
                    "Casa",
                    "Don Julio",
                  ],
                  ["Champagne", false, false, "×1", "×2", "×2"],
                  ["Shisha", false, false, false, true, true],
                  ["Private cabana", false, false, false, false, true],
                ].map(([feature, g, gu, t7, t1, t15]) => (
                  <tr key={feature as string}>
                    <td className="text-white/40 py-2.5 pr-3">
                      {feature as string}
                    </td>
                    {[g, gu, t7, t1, t15].map((val, ci) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: "🔒",
                title: "Secure Checkout",
                desc: "Encrypted payment. Your info is never stored.",
              },
              {
                icon: "📱",
                title: "Digital Tickets",
                desc: "QR code sent to your email. No printing needed.",
              },
              {
                icon: "⚠️",
                title: "No Refunds",
                desc: "All ticket sales are final and non-transferable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-4 rounded-2xl border border-purple-100 bg-white hover:border-purple-200 transition-colors"
              >
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-[#1e0a3c] font-bold text-xs mb-1">
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

      {/* ── BOTTOM CTA ──────────────────────────────────────────────── */}
      <div className="border-t border-purple-100 bg-white py-12 px-5 text-center">
        <p className="text-purple-400 text-sm mb-2">Still deciding?</p>
        <p className="text-[#1e0a3c] font-black text-2xl mb-6">
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

// ── Ticket card ──────────────────────────────────────────────────────────────
function TicketCard({
  ticket,
  variant,
  fullWidth,
}: {
  ticket: {
    id: string;
    name: string;
    price: number;
    description: string;
    perks: string[];
  };
  variant: "general" | "vip" | "vvip";
  fullWidth?: boolean;
}) {
  const isVip = variant === "vip";
  const isVvip = variant === "vvip";
  const isDark = isVip;

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300 ${
        fullWidth ? "h-full" : ""
      } ${
        isVip
          ? "ticket-tier-vip"
          : isVvip
            ? "ticket-tier-general"
            : "ticket-tier-general"
      } ${isVvip ? "border-2 border-purple-200" : ""}`}
      style={
        isVvip
          ? { background: "linear-gradient(135deg,#faf5ff,#f3e8ff)" }
          : undefined
      }
    >
      {/* Header */}
      <div
        className={`px-4 sm:px-6 pt-5 pb-4 border-b ${isDark ? "border-white/10" : "border-purple-100"}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            {ticket.id === "table-1m" && (
              <div className="inline-flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-2 py-0.5 mb-1.5">
                <span className="live-dot w-1 h-1 rounded-full bg-green-400 inline-block" />
                <span className="text-white/70 text-[9px] font-bold tracking-widest uppercase">
                  Popular
                </span>
              </div>
            )}
            <p
              className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-1 ${
                isDark
                  ? "text-white/50"
                  : isVvip
                    ? "text-purple-400"
                    : "text-purple-300"
              }`}
            >
              {TIER_LABEL[ticket.id]}
            </p>
            <h2
              className={`font-black text-sm sm:text-xl leading-tight ${isDark ? "text-white" : "text-[#1e0a3c]"}`}
            >
              {ticket.name}
            </h2>
          </div>
          <span className="text-xl sm:text-2xl shrink-0 ml-1">
            {ICONS[ticket.id]}
          </span>
        </div>

        <p
          className={`font-black text-2xl sm:text-3xl leading-none ${isDark ? "text-white" : "text-[#1e0a3c]"}`}
        >
          {ticket.price >= 1000000
            ? formatNairaFull(ticket.price)
            : formatNaira(ticket.price)}
        </p>
        <p
          className={`text-[10px] sm:text-xs mt-1 ${isDark ? "text-white/40" : "text-purple-300"}`}
        >
          {CAPACITY[ticket.id]}
        </p>
        <p
          className={`text-[10px] sm:text-xs mt-2 leading-relaxed line-clamp-2 ${isDark ? "text-white/55" : "text-purple-500"}`}
        >
          {ticket.description}
        </p>
      </div>

      {/* Perks */}
      <div className="px-4 sm:px-6 py-4 flex-1">
        <ul className="flex flex-col gap-2">
          {ticket.perks.slice(0, 5).map((perk) => (
            <li
              key={perk}
              className={`flex items-center gap-2 text-[10px] sm:text-xs ${isDark ? "text-white/65" : isVvip ? "text-purple-600" : "text-purple-500"}`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] shrink-0 ${
                  isDark
                    ? "bg-white/15 text-white/60"
                    : isVvip
                      ? "bg-purple-200 text-purple-500"
                      : "bg-purple-100 text-purple-400"
                }`}
              >
                ✓
              </span>
              {perk}
            </li>
          ))}
          {ticket.perks.length > 5 && (
            <li
              className={`text-[10px] ${isDark ? "text-white/30" : "text-purple-300"}`}
            >
              +{ticket.perks.length - 5} more
            </li>
          )}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-4 sm:px-6 pb-5">
        <AddToCartButton ticket={ticket} variant={isDark ? "dark" : "light"} />
      </div>
    </div>
  );
}
