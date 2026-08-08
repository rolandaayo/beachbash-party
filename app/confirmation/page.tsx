"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import OrderSteps from "@/components/OrderSteps";
import LinkButton from "@/components/LinkButton";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "BB-XXXXXXX";
  const paid = params.get("paid") === "1";

  return (
    <div className="pt-28 pb-20 px-5 text-center max-w-xl mx-auto">
      <OrderSteps current="confirmation" />

      <div className="float-anim text-6xl mb-5">{paid ? "🎉" : "📩"}</div>
      <p className="tag mx-auto w-fit mb-4">
        {paid ? "Payment Confirmed!" : "You're in!"}
      </p>

      <h1 className="font-black text-4xl sm:text-5xl text-[#1e0a3c] mb-3">
        {paid ? "Tickets Secured" : "Order Confirmed"}
      </h1>

      <p className="text-purple-400 text-sm mb-1">
        Your tickets for{" "}
        <span className="text-[#1e0a3c] font-semibold">BEACHBASH PARTY</span>{" "}
        are {paid ? "paid and confirmed." : "reserved."}
      </p>
      <p className="text-purple-300 text-xs mb-8">
        {paid
          ? "Your digital ticket will be sent to your email shortly."
          : "Payment details sent to your email. Complete within 24 hours to secure your spot."}
      </p>

      {/* Status badge */}
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold ${
          paid
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${paid ? "bg-green-500" : "bg-yellow-400"}`}
        />
        {paid ? "PAID" : "PENDING PAYMENT"}
      </div>

      <div className="card rounded-2xl p-6 text-left mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">🎟️</span>
          <div>
            <p className="text-purple-300 text-[10px] uppercase tracking-widest">
              Order ID
            </p>
            <p className="text-[#1e0a3c] font-black text-base tracking-widest">
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
              <p className="text-purple-300 uppercase tracking-wider mb-1 text-[10px]">
                {r.label}
              </p>
              <p className="text-purple-700 font-semibold">{r.val}</p>
            </div>
          ))}
        </div>
      </div>

      {!paid && (
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 text-left mb-8">
          <p className="text-[#7c3aed] font-bold text-xs uppercase tracking-wider mb-3">
            Next Steps
          </p>
          <ol className="flex flex-col gap-2 text-purple-500 text-xs list-decimal list-inside leading-relaxed">
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
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 text-center text-purple-300 text-sm">
          Loading…
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
