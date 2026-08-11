"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { QRCodeSVG } from "qrcode.react";
import OrderSteps from "@/components/OrderSteps";
import LinkButton from "@/components/LinkButton";

const bg = {
  background: "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
};
const glass = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
};

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "BB-XXXXXXX";
  const paid = params.get("paid") === "1";

  return (
    <div className="min-h-screen pt-28 pb-20 px-5 text-center" style={bg}>
      {/* Glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative max-w-xl mx-auto">
        <OrderSteps current="confirmation" dark />

        {/* Icon */}
        <div className="float-anim text-6xl mb-5">{paid ? "🎉" : "📩"}</div>

        {/* Status tag */}
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 text-xs font-bold border ${
            paid
              ? "bg-green-500/15 text-green-400 border-green-500/25"
              : "bg-yellow-500/15 text-yellow-400 border-yellow-500/25"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${paid ? "bg-green-400" : "bg-yellow-400"}`}
          />
          {paid ? "PAYMENT CONFIRMED!" : "YOU'RE IN!"}
        </div>

        {/* Heading */}
        <h1 className="font-black text-4xl sm:text-5xl text-white mb-3 leading-tight">
          {paid ? "Tickets Secured" : "Order Confirmed"}
        </h1>

        <p className="text-white/50 text-sm mb-1">
          Your tickets for{" "}
          <span className="text-white font-semibold">BEACHBASH PARTY</span> are{" "}
          {paid ? "paid and confirmed." : "reserved."}
        </p>
        <p className="text-white/35 text-xs mb-8">
          {paid
            ? "Your digital ticket will be sent to your email shortly."
            : "Payment details sent to your email. Complete within 24 hours to secure your spot."}
        </p>

        {/* Status pill */}
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-black border ${
            paid
              ? "bg-green-500/15 text-green-400 border-green-500/20"
              : "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${paid ? "bg-green-400" : "bg-yellow-400"}`}
          />
          {paid ? "PAID" : "PENDING PAYMENT"}
        </div>

        {/* ── QR CODE — top, prominent (paid only) ───────────────── */}
        {paid && (
          <div
            className="rounded-2xl border border-white/10 overflow-hidden mb-6 text-center"
            style={glass}
          >
            {/* QR header strip */}
            <div className="bg-green-500/15 border-b border-green-500/20 px-5 py-3 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 font-black text-xs tracking-widest uppercase">
                Your Entry Pass — Show at the Door
              </span>
            </div>

            <div className="px-6 py-6">
              {/* Event + name */}
              <p className="text-white font-black text-lg mb-0.5">
                BEACHBASH PARTY 🏖️
              </p>
              <p className="text-white/40 text-xs mb-5">
                October 10, 2026 · Lagos, Nigeria
              </p>

              {/* QR code — large and clear */}
              <div className="inline-block bg-white p-5 rounded-2xl shadow-2xl shadow-purple-900/50 mb-5">
                <QRCodeSVG
                  value={`${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/ticket/${orderId}`}
                  size={220}
                  bgColor="#ffffff"
                  fgColor="#1e0a3c"
                  level="H"
                  imageSettings={{
                    src: "/favicon.ico",
                    height: 32,
                    width: 32,
                    excavate: true,
                  }}
                />
              </div>

              <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
                Scan at entry · {orderId}
              </p>

              {/* Screenshot prompt — prominent */}
              <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/25 rounded-xl px-4 py-3.5 text-left">
                <span className="text-2xl shrink-0">📸</span>
                <div>
                  <p className="text-yellow-400 font-black text-sm mb-0.5">
                    Screenshot this QR code now
                  </p>
                  <p className="text-yellow-400/70 text-xs leading-relaxed">
                    Save it to your camera roll. You&apos;ll need it at the
                    entrance on Oct 10 — no internet required to show it.
                  </p>
                </div>
              </div>

              <p className="text-white/20 text-[10px] mt-4">
                A copy has also been sent to your email.
              </p>
            </div>
          </div>
        )}

        {/* Order card */}
        <div
          className="rounded-2xl p-6 text-left mb-6 border border-white/10"
          style={glass}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/30 border border-purple-500/20 flex items-center justify-center text-xl shrink-0">
              🎟️
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">
                Order ID
              </p>
              <p className="text-white font-black text-base tracking-widest">
                {orderId}
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-4 text-xs">
            {[
              { label: "Event", val: "BEACHBASH PARTY" },
              { label: "Date", val: "Oct 10, 2026" },
              { label: "Location", val: "Lagos, Nigeria" },
            ].map((r) => (
              <div key={r.label}>
                <p className="text-white/30 uppercase tracking-wider mb-1 text-[10px]">
                  {r.label}
                </p>
                <p className="text-white/80 font-semibold">{r.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps (pending only) */}
        {!paid && (
          <div
            className="rounded-2xl p-5 text-left mb-8 border border-white/10"
            style={glass}
          >
            <p className="text-purple-400 font-bold text-xs uppercase tracking-wider mb-3">
              Next Steps
            </p>
            <ol className="flex flex-col gap-2 text-white/50 text-xs list-decimal list-inside leading-relaxed">
              <li>Check your email for payment instructions</li>
              <li>Complete payment within 24 hours</li>
              <li>Receive your digital ticket after payment confirmation</li>
              <li>Venue details shared 14 days before the event</li>
            </ol>
          </div>
        )}

        <LinkButton href="/" className="btn-primary px-7 py-2.5 text-sm">
          Back to Home 🏖️
        </LinkButton>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen pt-32 text-center text-white/40 text-sm"
          style={bg}
        >
          Loading…
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
