"use client";

import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/tickets";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-5 text-center">
        <div className="text-6xl mb-5 opacity-30">🛒</div>
        <h1 className="font-black text-3xl text-white mb-2">Cart is Empty</h1>
        <p className="text-white/35 text-sm mb-8">No tickets added yet.</p>
        <Link href="/tickets" className="btn-primary px-6 py-2.5 text-sm">
          Browse Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="tag mb-3 w-fit">Your Order</p>
          <h1 className="font-black text-3xl sm:text-4xl text-white">Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.ticket.id} className="card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-white font-bold text-sm">
                      {item.ticket.name}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {formatNaira(item.ticket.price)} each
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.ticket.id)}
                    className="text-white/20 hover:text-white/60 transition-colors text-xs"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.ticket.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors flex items-center justify-center text-sm font-bold"
                    >
                      −
                    </button>
                    <span className="text-white font-bold text-sm w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.ticket.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= 10}
                      className="w-7 h-7 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors flex items-center justify-center text-sm font-bold disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-auto text-white font-black text-base">
                    {formatNaira(item.ticket.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card rounded-2xl p-5 sticky top-20">
              <p className="text-white font-black text-sm mb-5">Summary</p>

              <div className="flex flex-col gap-2.5 mb-5">
                {items.map((item) => (
                  <div
                    key={item.ticket.id}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-white/35">
                      {item.ticket.name} × {item.quantity}
                    </span>
                    <span className="text-white/60">
                      {formatNaira(item.ticket.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t divider pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-xs">
                    {totalItems} ticket{totalItems !== 1 ? "s" : ""}
                  </span>
                  <span className="text-white font-black text-lg">
                    {formatNaira(totalPrice)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full justify-center py-2.5 text-xs"
              >
                Checkout →
              </Link>
              <Link
                href="/tickets"
                className="btn-ghost w-full justify-center text-[11px] mt-1"
              >
                + Add more tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
