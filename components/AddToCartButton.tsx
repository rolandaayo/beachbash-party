"use client";

import { useState } from "react";
import { useCart, TicketType } from "@/context/CartContext";
import Link from "next/link";

export default function AddToCartButton({ ticket }: { ticket: TicketType }) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.ticket.id === ticket.id);

  function handleAdd() {
    addToCart(ticket, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button
        onClick={handleAdd}
        className={`w-full font-semibold py-2.5 rounded-xl text-xs tracking-wide transition-all ${
          added
            ? "bg-white/10 text-white/60 cursor-default"
            : "btn-primary justify-center"
        }`}
      >
        {added ? "✓ Added" : "Add to Cart"}
      </button>
      {inCart && !added && (
        <Link
          href="/cart"
          className="text-center text-white/30 text-[11px] hover:text-white/60 transition-colors"
        >
          {inCart.quantity} in cart · View →
        </Link>
      )}
    </div>
  );
}
