import { TICKETS, formatNaira } from "@/lib/tickets";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata = { title: "Tickets — BEACHBASH PARTY" };

export default function TicketsPage() {
  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="tag mx-auto w-fit mb-4">October 10, 2026 · Lagos</p>
          <h1 className="font-black text-4xl sm:text-6xl text-white mb-3">
            Get Your Tickets
          </h1>
          <p className="text-white/35 text-sm max-w-md mx-auto">
            One show. One night. Pick your experience.
          </p>
          <div className="mt-5 tag mx-auto w-fit">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
            Limited availability
          </div>
        </div>

        {/* Ticket Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {TICKETS.map((ticket, i) => (
            <div
              key={ticket.id}
              className={`rounded-2xl p-7 flex flex-col relative overflow-hidden ${
                ticket.id === "vip"
                  ? "card-highlight ring-1 ring-white/20"
                  : "card"
              }`}
            >
              {/* tier badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="tag text-[11px]">
                  {i === 0 ? "Standard" : i === 1 ? "Premium" : "Ultra Premium"}
                </span>
                {ticket.id === "vip" && (
                  <span className="tag border-white/20 text-white/70 text-[11px]">
                    Popular
                  </span>
                )}
                {ticket.id === "vvip" && (
                  <span className="tag border-white/20 text-white/70 text-[11px]">
                    ★ Premium
                  </span>
                )}
              </div>

              <h2 className="text-white font-black text-xl mb-1">
                {ticket.name}
              </h2>
              <p className="text-white font-black text-3xl mb-1">
                {formatNaira(ticket.price)}
              </p>
              <p className="text-white/25 text-[11px] mb-4">per ticket</p>

              <p className="text-white/40 text-xs leading-relaxed mb-5">
                {ticket.description}
              </p>

              <div className="flex-1">
                <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase mb-3">
                  Included
                </p>
                <ul className="flex flex-col gap-2.5">
                  {ticket.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2.5 text-xs text-white/50"
                    >
                      <span className="text-white/40 shrink-0 mt-0.5">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <AddToCartButton ticket={ticket} />
              </div>
            </div>
          ))}
        </div>

        {/* Info row */}
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
              className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/6"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-white/70 font-semibold text-xs mb-1">
                  {item.title}
                </p>
                <p className="text-white/25 text-[11px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
