"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type TicketInfo = {
  valid: boolean;
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  tickets: { name: string; quantity: number }[];
  total: number;
  paidAt: string;
};

export default function TicketScanPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [data, setData] = useState<TicketInfo | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    fetch(`${API_BASE}/api/orders/ticket/${orderId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setData(d))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0520]">
        <div className="text-white/40 text-sm animate-pulse">
          Verifying ticket…
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0520] px-5">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="font-black text-2xl text-white mb-2">
            Invalid Ticket
          </h1>
          <p className="text-white/40 text-sm">
            This ticket was not found or payment has not been confirmed.
          </p>
        </div>
      </div>
    );
  }

  const paidDate = new Date(data.paidAt).toLocaleString("en-NG", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
      }}
    >
      {/* Glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏖️</div>
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-bold">
            BeachBash Party · Lagos 2026
          </p>
        </div>

        {/* Main card */}
        <div
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* PAID banner */}
          <div className="bg-green-500/20 border-b border-green-500/20 px-5 py-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
            <span className="text-green-400 font-black text-sm tracking-widest uppercase">
              PAID ✓ VALID ENTRY
            </span>
          </div>

          <div className="px-5 py-6 space-y-5">
            {/* Guest name */}
            <div className="text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
                Guest
              </p>
              <p className="text-white font-black text-2xl">
                {data.firstName} {data.lastName}
              </p>
              <p className="text-white/50 text-xs mt-0.5">{data.email}</p>
            </div>

            {/* Tickets */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">
                Tickets
              </p>
              <div className="space-y-2">
                {data.tickets.map((t, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">
                      {t.name}
                    </span>
                    <span className="text-white/50 text-xs">
                      × {t.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details grid */}
            <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  Order ID
                </p>
                <p className="text-white text-xs font-bold">{data.orderId}</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  Total Paid
                </p>
                <p className="text-white text-xs font-bold">
                  ₦{data.total.toLocaleString("en-NG")}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  Payment Confirmed
                </p>
                <p className="text-white text-xs font-bold">{paidDate}</p>
              </div>
            </div>

            {/* Event info */}
            <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Event", val: "BEACHBASH" },
                { label: "Date", val: "Oct 10, 2026" },
                { label: "Venue", val: "Lagos 🇳🇬" },
              ].map((r) => (
                <div key={r.label}>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                    {r.label}
                  </p>
                  <p className="text-white text-[11px] font-semibold">
                    {r.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-white/25 text-[10px] mt-5 tracking-wide">
          This ticket is non-transferable · One entry per ticket
        </p>
      </div>
    </div>
  );
}
