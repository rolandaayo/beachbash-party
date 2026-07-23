"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import OrderSteps from "@/components/OrderSteps";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "BB-XXXXXXX";

  return (
    <div className="pt-28 pb-20 px-5 text-center max-w-xl mx-auto">
      <OrderSteps current="confirmation" />
      <div className="float-anim text-6xl mb-5 opacity-80">🎉</div>
      <p className="tag mx-auto w-fit mb-4">You&apos;re in!</p>
      <h1 className="font-black text-4xl sm:text-5xl text-white mb-3">
        Order Confirmed
      </h1>
      <p className="text-white/40 text-sm mb-1">
        Your tickets for{" "}
        <span className="text-white font-semibold">BEACHBASH PARTY</span> are
        reserved.
      </p>
      <p className="text-white/25 text-xs mb-8">
        Payment details sent to your email. Complete within 24 hours to secure
        your spot.
      </p>

      {/* Order card */}
      <div className="card rounded-2xl p-6 text-left mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">🎟️</span>
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-widest">
              Order ID
            </p>
            <p className="text-white font-black text-base tracking-widest">
              {orderId}
            </p>
          </div>
        </div>
        <div className="border-t divider pt-4 grid grid-cols-3 gap-4 text-xs">
          {[
            { label: "Event", val: "BEACHBASH PARTY" },
            { label: "Date", val: "Oct 10, 2026" },
            { label: "Location", val: "Lagos, Nigeria" },
          ].map((r) => (
            <div key={r.label}>
              <p className="text-white/20 uppercase tracking-wider mb-1 text-[10px]">
                {r.label}
              </p>
              <p className="text-white/70 font-semibold">{r.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-5 text-left mb-8">
        <p className="text-white/50 font-bold text-xs uppercase tracking-wider mb-3">
          Next Steps
        </p>
        <ol className="flex flex-col gap-2 text-white/35 text-xs list-decimal list-inside leading-relaxed">
          <li>Check your email for payment instructions</li>
          <li>Complete payment within 24 hours</li>
          <li>Receive your digital ticket after payment confirmation</li>
          <li>Venue details shared 14 days before the event</li>
        </ol>
      </div>

      <Link href="/" className="btn-primary px-7 py-2.5 text-sm">
        Back to Home 🏖️
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 text-center text-white/20 text-sm">Loading…</div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
