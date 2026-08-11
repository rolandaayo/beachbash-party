"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { QRCodeSVG } from "qrcode.react";
import LinkButton from "@/components/LinkButton";

const bg = {
  background: "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
};

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "BB-XXXXXXX";
  const paid = params.get("paid") === "1";
  const ticketUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/ticket/${orderId}`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={bg}
    >
      {/* Glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm pt-16">
        {paid ? (
          /* ── PAID VIEW ─────────────────────────────────────────── */
          <div
            className="rounded-2xl border border-white/10 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Status bar */}
            <div className="bg-green-500/20 border-b border-green-500/20 px-5 py-2.5 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 font-black text-xs tracking-widest uppercase">
                ✓ Payment Confirmed · PAID
              </span>
            </div>

            <div className="px-5 py-5 text-center">
              {/* Event header */}
              <p className="text-white font-black text-base mb-0.5">
                BEACHBASH PARTY 🏖️
              </p>
              <p className="text-white/35 text-[11px] mb-4">
                October 10, 2026 · Lagos, Nigeria
              </p>

              {/* QR code — centrepiece */}
              <div className="inline-block bg-white p-4 rounded-2xl shadow-2xl shadow-purple-900/60 mb-3">
                <QRCodeSVG
                  value={ticketUrl}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#1e0a3c"
                  level="H"
                />
              </div>

              <p className="text-white/40 text-[10px] tracking-widest uppercase mb-4">
                Scan at entry
              </p>

              {/* Order details — compact */}
              <div className="border-t border-white/10 pt-4 mb-4 grid grid-cols-2 gap-3 text-left">
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                    Order ID
                  </p>
                  <p className="text-white text-xs font-black">{orderId}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                    Date
                  </p>
                  <p className="text-white text-xs font-bold">Oct 10, 2026</p>
                </div>
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                    Doors
                  </p>
                  <p className="text-white text-xs font-bold">4:00 PM</p>
                </div>
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                    Venue
                  </p>
                  <p className="text-white text-xs font-bold">Lagos 🇳🇬</p>
                </div>
              </div>

              {/* Screenshot prompt */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-left mb-4">
                <p className="text-yellow-400 font-black text-xs mb-0.5">
                  📸 Screenshot this page
                </p>
                <p className="text-yellow-400/60 text-[10px] leading-relaxed">
                  Save to your camera roll — show at the entrance on Oct 10.
                </p>
              </div>

              <p className="text-white/20 text-[10px]">
                A copy has also been sent to your email.
              </p>
            </div>
          </div>
        ) : (
          /* ── PENDING VIEW ──────────────────────────────────────── */
          <div
            className="rounded-2xl border border-white/10 p-6 text-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="text-5xl mb-3">📩</div>
            <div className="inline-flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/20 rounded-full px-3 py-1 mb-4 text-[10px] font-black text-yellow-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              Pending Payment
            </div>
            <h1 className="font-black text-2xl text-white mb-2">
              Order Reserved
            </h1>
            <p className="text-white/45 text-sm mb-5">
              BEACHBASH PARTY · Oct 10, 2026
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left mb-5">
              <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                Order ID
              </p>
              <p className="text-white font-black text-sm">{orderId}</p>
            </div>
            <ol className="text-left text-white/40 text-xs space-y-2 list-decimal list-inside mb-5 leading-relaxed">
              <li>Check your email for payment instructions</li>
              <li>Complete payment within 24 hours</li>
              <li>QR code sent after confirmation</li>
            </ol>
          </div>
        )}

        <div className="mt-4 text-center">
          <LinkButton href="/" className="btn-primary px-6 py-2.5 text-sm">
            Back to Home 🏖️
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center text-white/30 text-sm"
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
