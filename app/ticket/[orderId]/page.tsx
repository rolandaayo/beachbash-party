"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type TicketLine = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};
type TicketInfo = {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tickets: TicketLine[];
  total: number;
  paidAt: string;
  checkedIn: boolean;
  checkedInAt: string | null;
};
type ScanState = "loading" | "paid" | "pending" | "notfound";

const bgStyle = {
  background: "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
};

export default function TicketScanPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [data, setData] = useState<TicketInfo | null>(null);
  const [state, setState] = useState<ScanState>("loading");

  useEffect(() => {
    if (!orderId) return;
    fetch(`${API_BASE}/api/orders/ticket/${orderId}`)
      .then(async (r) => {
        if (r.ok) {
          setData(await r.json());
          setState("paid");
        } else if (r.status === 402) setState("pending");
        else setState("notfound");
      })
      .catch(() => setState("notfound"));
  }, [orderId]);

  if (state === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={bgStyle}
      >
        <div className="text-white/40 text-sm animate-pulse">
          Verifying ticket…
        </div>
      </div>
    );
  }

  if (state === "pending") {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-5"
        style={bgStyle}
      >
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">⏳</div>
          <h1 className="font-black text-2xl text-white mb-2">
            Payment Processing
          </h1>
          <p className="text-white/40 text-sm mb-4">
            Your order exists but payment hasn&apos;t been confirmed yet. This
            usually takes a few seconds.
          </p>
          <button
            onClick={() => {
              setState("loading");
              window.location.reload();
            }}
            className="btn-primary px-6 py-2.5 text-sm"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  if (state === "notfound" || !data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-5"
        style={bgStyle}
      >
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="font-black text-2xl text-white mb-2">
            Ticket Not Found
          </h1>
          <p className="text-white/40 text-sm">
            This ticket ID does not exist in our system.
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
      style={bgStyle}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-5">
          <div className="text-3xl mb-1">🏖️</div>
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-bold">
            BeachBash Party · Lagos 2026
          </p>
        </div>

        <div
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className={`px-5 py-3 flex items-center gap-2 border-b ${
              data.checkedIn
                ? "bg-blue-500/20 border-blue-500/20"
                : "bg-green-500/20 border-green-500/20"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${data.checkedIn ? "bg-blue-400" : "bg-green-400"}`}
            />
            <span
              className={`font-black text-sm tracking-widest uppercase ${data.checkedIn ? "text-blue-300" : "text-green-400"}`}
            >
              {data.checkedIn ? "✓ CHECKED IN" : "PAID ✓ VALID ENTRY"}
            </span>
          </div>

          <div className="px-5 py-5 space-y-4">
            <div className="text-center pb-3 border-b border-white/10">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
                Guest
              </p>
              <p className="text-white font-black text-2xl leading-tight">
                {data.firstName} {data.lastName}
              </p>
              <p className="text-white/50 text-xs mt-0.5">{data.email}</p>
              {data.phone && (
                <p className="text-white/35 text-xs">{data.phone}</p>
              )}
            </div>

            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">
                Package
              </p>
              <div className="space-y-2">
                {data.tickets.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2.5"
                  >
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-white/40 text-[10px]">
                        × {t.quantity}
                      </p>
                    </div>
                    <p className="text-white font-black text-sm">
                      ₦{(t.price * t.quantity).toLocaleString("en-NG")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2 px-3 py-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <span className="text-white/60 text-xs font-semibold">
                  Total Paid
                </span>
                <span className="text-white font-black text-base">
                  ₦{data.total.toLocaleString("en-NG")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
              <div>
                <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                  Order ID
                </p>
                <p className="text-white text-xs font-bold">{data.orderId}</p>
              </div>
              <div>
                <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">
                  Paid On
                </p>
                <p className="text-white text-xs font-bold">{paidDate}</p>
              </div>
              {data.checkedIn && data.checkedInAt && (
                <div className="col-span-2">
                  <p className="text-blue-300/60 text-[9px] uppercase tracking-widest mb-0.5">
                    Checked In At
                  </p>
                  <p className="text-blue-300 text-xs font-bold">
                    {new Date(data.checkedInAt).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
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

        <p className="text-center text-white/20 text-[10px] mt-4 tracking-wide">
          Non-transferable · One entry per ticket
        </p>
      </div>
    </div>
  );
}
