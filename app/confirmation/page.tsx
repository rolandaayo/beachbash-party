"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "BB-XXXXXXX";

  return (
    <div className="pt-32 pb-20 px-4 text-center max-w-2xl mx-auto">
      <div className="float-anim text-8xl mb-6">🎉</div>
      <p className="text-orange-400 font-bold tracking-widest text-sm uppercase mb-3">
        You&apos;re in!
      </p>
      <h1 className="font-black text-4xl sm:text-6xl text-white mb-4">
        Order Confirmed!
      </h1>
      <p className="text-zinc-400 text-lg mb-2">
        Your tickets for{" "}
        <span className="text-orange-400 font-bold">BEACHBASH PARTY</span> are
        reserved.
      </p>
      <p className="text-zinc-500 text-sm mb-8">
        Payment details have been sent to your email. Complete payment within 24
        hours to secure your spot.
      </p>

      <div className="ticket-card rounded-2xl p-6 text-left mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎟️</span>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider">
              Order ID
            </p>
            <p className="text-orange-400 font-black text-xl tracking-widest">
              {orderId}
            </p>
          </div>
        </div>
        <div className="border-t border-zinc-700 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
              Event
            </p>
            <p className="text-white font-bold">BEACHBASH PARTY</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
              Date
            </p>
            <p className="text-white font-bold">Oct 10, 2026</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
              Location
            </p>
            <p className="text-white font-bold">Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 text-left mb-10">
        <p className="text-orange-300 font-bold text-sm">Next Steps:</p>
        <ol className="flex flex-col gap-2 text-zinc-400 text-sm list-decimal list-inside">
          <li>Check your email for payment instructions</li>
          <li>Complete payment within 24 hours</li>
          <li>
            Receive your digital ticket via email after payment confirmation
          </li>
          <li>Venue details will be shared 14 days before the event</li>
        </ol>
      </div>

      <Link
        href="/"
        className="btn-orange text-white font-black px-10 py-4 rounded-full inline-block"
      >
        Back to Home 🏖️
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 text-center text-zinc-400">Loading...</div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
