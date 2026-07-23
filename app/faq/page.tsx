"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "When and where is BEACHBASH PARTY?",
    a: "BEACHBASH PARTY is happening on Saturday, October 10, 2026 in Lagos, Nigeria. The exact venue will be revealed to ticket holders 14 days before the event via email.",
  },
  {
    q: "How much are tickets?",
    a: "General Access tickets start at ₦50,000. VIP Access is ₦100,000, and VVIP Table packages are ₦250,000 (includes a private table for 4 + bottle service).",
  },
  {
    q: "How do I get my ticket after purchase?",
    a: "After placing your order, you'll receive payment instructions by email. Once your payment is confirmed, your digital ticket will be sent to your email address. Show it at the gate — no printing needed.",
  },
  {
    q: "How long do I have to complete payment?",
    a: "Your spot is reserved for 24 hours after placing an order. If payment isn't received within that window, the reservation is released.",
  },
  {
    q: "Can I buy tickets for multiple people?",
    a: "Yes. You can add up to 10 tickets per type to your cart. Each ticket is tied to the buyer's order — guests don't need separate accounts.",
  },
  {
    q: "Are there refunds or transfers?",
    a: "All ticket sales are final. No refunds, no exchanges, no transfers. Make sure you can attend before purchasing.",
  },
  {
    q: "What's the age limit?",
    a: "BEACHBASH PARTY is an 18+ event. Valid ID required at the gate.",
  },
  {
    q: "What time does the party start and end?",
    a: "Gates open at 8:00 PM. The party runs till dawn — we don't set a hard end time. Lagos doesn't sleep.",
  },
  {
    q: "What's included in General Access?",
    a: "General Access gives you full entry to the main party grounds, beach area, main stage, and bar access.",
  },
  {
    q: "What extra does VIP get me?",
    a: "VIP Access includes everything in General, plus: dedicated VIP lounge, VIP viewing deck, priority entry (no queue), and 2 complimentary drinks.",
  },
  {
    q: "What is VVIP Table?",
    a: "VVIP is the full experience — private table for 4, 1 bottle of your choice, backstage access, personal host, and a complimentary merch pack.",
  },
  {
    q: "Is there parking available?",
    a: "Parking details will be shared with ticket holders alongside the venue reveal, 14 days before the event.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-bold text-sm sm:text-base">{q}</span>
        <span
          className={`text-orange-400 text-xl flex-shrink-0 transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-400 font-bold tracking-widest text-sm uppercase mb-3">
            Got Questions?
          </p>
          <h1 className="font-black text-5xl sm:text-7xl text-white mb-4">
            FAQ
          </h1>
          <p className="text-zinc-400 text-lg">
            Everything you need to know about BEACHBASH PARTY.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-3 mb-16">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* Still have questions */}
        <div className="ticket-card rounded-3xl p-8 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-white font-black text-2xl mb-2">
            Still have questions?
          </h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Reach out via Instagram or email and we&apos;ll get back to you
            ASAP.
          </p>
          <a
            href="mailto:info@beachbashparty.com"
            className="btn-orange text-white font-bold px-8 py-3 rounded-full inline-block text-sm"
          >
            Email Us
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/tickets"
            className="text-orange-400 font-bold hover:text-orange-300 transition-colors underline underline-offset-4"
          >
            Ready to buy? Get your tickets →
          </Link>
        </div>
      </div>
    </div>
  );
}
