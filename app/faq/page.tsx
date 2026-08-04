"use client";

import { useState } from "react";
import Link from "next/link";
import LinkButton from "@/components/LinkButton";

const FAQS = [
  {
    q: "When and where is BEACHBASH PARTY?",
    a: "Saturday, October 10, 2026 in Lagos, Nigeria. The exact venue will be revealed to ticket holders 14 days before the event via email.",
  },
  {
    q: "How much are tickets?",
    a: "General Access starts at ₦50,000. VIP Access is ₦100,000, and VVIP Table is ₦250,000 (private table for 4 + bottle service).",
  },
  {
    q: "How do I get my ticket after purchase?",
    a: "After placing your order you'll receive payment instructions by email. Once payment is confirmed, your digital ticket will be sent. Show it at the gate — no printing needed.",
  },
  {
    q: "How long do I have to complete payment?",
    a: "Your spot is reserved for 24 hours. If payment isn't received within that window, the reservation is released.",
  },
  {
    q: "Can I buy tickets for multiple people?",
    a: "Yes. You can add up to 10 tickets per type to your cart.",
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
    q: "What time does it start and end?",
    a: "Gates open at 4:00 PM. The party runs till dawn — we don't set a hard end time.",
  },
  {
    q: "What's in General Access?",
    a: "Full entry to the main party grounds, beach area, main stage, and bar access.",
  },
  {
    q: "What extra does VIP get me?",
    a: "Everything in General, plus: VIP lounge, VIP viewing deck, priority entry, and 2 complimentary drinks.",
  },
  {
    q: "What is VVIP Table?",
    a: "Private table for 4, 1 bottle of your choice, backstage access, personal host, and a complimentary merch pack.",
  },
  {
    q: "Is there parking?",
    a: "Parking details will be shared alongside the venue reveal, 14 days before the event.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-colors ${open ? "border-purple-200 bg-purple-50/50" : "border-purple-100"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[#1e0a3c] font-medium text-sm">{q}</span>
        <span
          className={`text-purple-300 text-lg shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-purple-100">
          <p className="text-purple-500 text-xs leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="tag mx-auto w-fit mb-4">Got Questions?</p>
          <h1 className="font-black text-4xl sm:text-6xl text-[#1e0a3c] mb-3">
            FAQ
          </h1>
          <p className="text-purple-400 text-sm">
            Everything you need to know.
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-12">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="card rounded-2xl p-7 text-center">
          <div className="text-3xl mb-3">💬</div>
          <h2 className="text-[#1e0a3c] font-black text-lg mb-1.5">
            Still have questions?
          </h2>
          <p className="text-purple-400 text-xs mb-5 leading-relaxed">
            Hit us up via Instagram or email. We&apos;ll get back ASAP.
          </p>
          <a
            href="mailto:info@beachbashparty.com"
            className="btn-outline px-5 py-2 text-xs"
          >
            Email Us
          </a>
        </div>

        <div className="text-center mt-10">
          <LinkButton
            href="/tickets"
            className="text-purple-400 hover:text-purple-700 text-xs transition-colors underline underline-offset-4 inline-flex items-center gap-1"
            spinnerClass="w-3 h-3"
          >
            Ready to buy? Get your tickets →
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
