import { formatNaira } from "@/lib/tickets";
import LinkButton from "@/components/LinkButton";

export const metadata = { title: "About — BEACHBASH PARTY" };

export default function AboutPage() {
  return (
    <div className="pt-14">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="ticket-hero px-5 pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-8">
            <span className="float-anim inline-block text-base leading-none">
              🏖️
            </span>
            <span className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
              The Story
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="font-black text-5xl sm:text-7xl text-white leading-none tracking-tight mb-4">
                About
                <br />
                <span className="text-white/30">BEACHBASH</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                One night, one beach, one Lagos experience you&apos;ll never
                forget.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Date", value: "Oct 10, 2026" },
                { label: "City", value: "Lagos 🇳🇬" },
                { label: "Doors", value: "4:00 PM" },
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
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                { text: "OCTOBER 10 2026", accent: true },
                { text: "ONE NIGHT ONLY", accent: false },
                { text: "LAGOS BEACH NIGHT", accent: true },
                { text: "FEEL THE ENERGY", accent: false },
                { text: "BEACHBASH 2026", accent: true },
                { text: "LOSE YOURSELF", accent: false },
                { text: "TILL DAWN", accent: true },
                { text: "BE THERE", accent: false },
              ].map((item, j) => (
                <span key={j} className="flex items-center">
                  <span
                    className={`whitespace-nowrap font-black tracking-[0.15em] uppercase px-7 ${item.accent ? "text-white text-xl" : "text-white/20 text-sm"}`}
                  >
                    {item.text}
                  </span>
                  <span className="text-purple-500/30 text-base">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT IS BEACHBASH ────────────────────────────────────────── */}
      <section className="bg-[#faf5ff] px-5 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="tag mb-4 w-fit">What Is It</p>
              <h2 className="font-black text-3xl sm:text-4xl text-[#1e0a3c] mb-5">
                Not a festival.
                <br />
                Not a weekend.
              </h2>
              <div className="flex flex-col gap-4 text-purple-400 text-sm leading-relaxed">
                <p>
                  BEACHBASH PARTY is a one-night-only beach party experience
                  happening on{" "}
                  <span className="text-[#1e0a3c] font-semibold">
                    October 10, 2026
                  </span>{" "}
                  in{" "}
                  <span className="text-[#1e0a3c] font-semibold">
                    Lagos, Nigeria
                  </span>
                  .
                </p>
                <p>
                  It&apos;s one show — carefully curated, intentionally limited,
                  and completely unmatched in energy. Live performances,
                  world-class DJ sets, premium bars, and the Lagos ocean as your
                  backdrop.
                </p>
                <p>
                  When the tickets are gone, they&apos;re gone. No second dates.
                  No alternative venues.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "🌊",
                  title: "One Show Only",
                  desc: "No second dates. No alternative venues. When the tickets are gone, they're gone.",
                },
                {
                  icon: "🎤",
                  title: "Live Performances",
                  desc: "Main stage acts, world-class DJs, Afrobeats and Amapiano all night long.",
                },
                {
                  icon: "🥂",
                  title: "Premium Experience",
                  desc: "Curated bars, table packages, private cabanas, and a beach backdrop you won't forget.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-purple-100 bg-white hover:border-purple-200 transition-colors"
                >
                  <span className="text-2xl mt-0.5 shrink-0">{item.icon}</span>
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
      </section>

      {/* ── SCHEDULE ─────────────────────────────────────────────────── */}
      <section className="border-t border-purple-100 px-5 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <p className="tag w-fit">Schedule</p>
            <h2 className="font-black text-2xl sm:text-3xl text-[#1e0a3c]">
              What&apos;s Going Down
            </h2>
            <div className="flex-1 h-px bg-purple-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                time: "4:00 PM",
                title: "Gates Open",
                desc: "Early entry for all ticket holders. Set up at the beach, grab your first drink.",
                icon: "🚪",
              },
              {
                time: "5:00 PM",
                title: "DJ Sets Begin",
                desc: "The best DJs in Lagos warm up the crowd with Afrobeats, Amapiano, and everything in between.",
                icon: "🎧",
              },
              {
                time: "6:30 PM",
                title: "Live Performances",
                desc: "Main stage comes alive. Artists TBA — trust us, it will be worth it.",
                icon: "🎤",
              },
              {
                time: "8:00 PM",
                title: "Peak Hour",
                desc: "When the energy hits its highest point. The beach is yours.",
                icon: "🔥",
              },
              {
                time: "Till Dawn",
                title: "Night Continues",
                desc: "We keep going until the sun comes up. Lagos doesn't sleep.",
                icon: "🌅",
              },
            ].map((item) => (
              <div
                key={item.time}
                className="card rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 text-[11px] font-mono uppercase tracking-widest">
                    {item.time}
                  </span>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <p className="text-[#1e0a3c] font-bold text-sm">{item.title}</p>
                <p className="text-purple-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Filler card */}
            <div className="card rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 bg-linear-to-br from-[#faf5ff] to-[#f3e8ff]">
              <span className="text-3xl">🎟️</span>
              <p className="text-[#1e0a3c] font-bold text-sm">
                Secure Your Spot
              </p>
              <p className="text-purple-400 text-xs leading-relaxed">
                Tickets are limited. Don&apos;t wait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────────────────── */}
      <section className="border-t border-purple-100 px-5 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="tag mb-4 w-fit">Location</p>
              <h2 className="font-black text-3xl sm:text-4xl text-[#1e0a3c] mb-5">
                Lagos, Nigeria 🇳🇬
              </h2>
              <p className="text-purple-400 text-sm leading-relaxed mb-6">
                We&apos;re bringing the biggest beach party to Lagos. The exact
                venue will be revealed to ticket holders 2 weeks before the
                show.
              </p>
              <div className="flex flex-col gap-3">
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
                Exact location sent to all ticket holders via email 14 days
                before the event. All we can say — it&apos;s beachfront. 🌊
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="ticket-hero px-5 py-20 border-t border-purple-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-black text-4xl sm:text-5xl text-white mb-3">
            Don&apos;t Miss Out.
          </h2>
          <p className="text-white/45 text-sm mb-8">
            Tickets are limited. Once they&apos;re gone, they&apos;re gone.
            October 10, Lagos.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <LinkButton
              href="/tickets"
              className="bg-white text-[#4c1d95] font-bold text-sm px-8 py-3 rounded-full inline-flex items-center gap-2 hover:bg-purple-50 transition-colors"
            >
              Get Tickets — From {formatNaira(40000)} 🎟️
            </LinkButton>
            <LinkButton
              href="/faq"
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/15 transition-colors font-semibold text-sm px-6 py-3 rounded-full"
            >
              Read the FAQ
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
