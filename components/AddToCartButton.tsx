"use client";

import { useState } from "react";
import { useCart, TicketType } from "@/context/CartContext";
import Spinner from "@/components/Spinner";
import LinkButton from "@/components/LinkButton";

type Variant = "light" | "dark";

export default function AddToCartButton({
  ticket,
  variant = "light",
}: {
  ticket: TicketType;
  variant?: Variant;
}) {
  const { addToCart, items } = useCart();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const inCart = items.find((i) => i.ticket.id === ticket.id);

  async function handleAdd() {
    if (state !== "idle") return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 600));
    addToCart(ticket, 1);
    setState("done");
    setTimeout(() => setState("idle"), 1600);
  }

  const base =
    "w-full flex items-center justify-center gap-2 font-semibold py-2.5 rounded-xl text-xs tracking-wide transition-all";

  const stateClass = {
    idle: "",
    loading:
      variant === "dark"
        ? "bg-white/10 text-white/40 cursor-wait"
        : "bg-purple-100 text-purple-300 cursor-wait",
    done:
      variant === "dark"
        ? "bg-white/15 text-white/70 cursor-default"
        : "bg-purple-100 text-purple-500 cursor-default",
  }[state];

  const idleClass =
    variant === "dark"
      ? `${base} bg-white text-[#4c1d95] font-bold hover:bg-purple-50 transition-colors`
      : `${base} btn-primary`;

  return (
    <div className="flex flex-col gap-1.5">
      <button
        onClick={handleAdd}
        disabled={state !== "idle"}
        className={state === "idle" ? idleClass : `${base} ${stateClass}`}
      >
        {state === "loading" && <Spinner className="w-3.5 h-3.5" />}
        {state === "loading" && "Adding…"}
        {state === "done" && "✓ Added"}
        {state === "idle" && "Add to Cart"}
      </button>

      {inCart && state === "idle" && (
        <LinkButton
          href="/cart"
          className={`flex items-center justify-center gap-1.5 text-[11px] transition-colors ${
            variant === "dark"
              ? "text-white/40 hover:text-white/70"
              : "text-purple-400 hover:text-purple-700"
          }`}
          spinnerClass="w-2.5 h-2.5"
        >
          {inCart.quantity} in cart · View →
        </LinkButton>
      )}
    </div>
  );
}
