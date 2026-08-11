"use client";

import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/tickets";
import OrderSteps from "@/components/OrderSteps";
import LinkButton from "@/components/LinkButton";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  const bg = {
    background:
      "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-5 text-center" style={bg}>
        {/* Glow blobs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
        </div>
        <div className="relative">
          <div className="text-6xl mb-5">🛒</div>
          <h1 className="font-black text-3xl text-white mb-2">Cart is Empty</h1>
          <p className="text-white/40 text-sm mb-8">No tickets added yet.</p>
          <LinkButton
            href="/tickets"
            className="btn-primary px-6 py-2.5 text-sm"
          >
            Browse Tickets
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-5" style={bg}>
      {/* Glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-4">
            <span className="text-white/50 text-[11px] tracking-widest uppercase font-medium">
              Your Order
            </span>
          </div>
          <h1 className="font-black text-3xl sm:text-4xl text-white">Cart</h1>
        </div>

        {/* Steps — dark variant */}
        <div className="mb-10">
          <OrderSteps current="cart" dark />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.ticket.id}
                className="rounded-2xl p-5 border border-white/10"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                }}
              >
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
                    className="text-white/25 hover:text-red-400 transition-colors text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-white/8 rounded-xl p-1 border border-white/10">
                    <button
                      onClick={() =>
                        updateQuantity(item.ticket.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center text-base font-bold"
                    >
                      −
                    </button>
                    <span className="text-white font-bold text-sm w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.ticket.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= 10}
                      className="w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center text-base font-bold disabled:opacity-25 disabled:cursor-not-allowed"
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
            <div
              className="rounded-2xl p-5 sticky top-20 border border-white/10"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <p className="text-white font-black text-sm mb-5">Summary</p>

              <div className="flex flex-col gap-2.5 mb-5">
                {items.map((item) => (
                  <div
                    key={item.ticket.id}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-white/45">
                      {item.ticket.name} × {item.quantity}
                    </span>
                    <span className="text-white/70 font-medium">
                      {formatNaira(item.ticket.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs">
                    {totalItems} ticket{totalItems !== 1 ? "s" : ""}
                  </span>
                  <span className="text-white font-black text-xl">
                    {formatNaira(totalPrice)}
                  </span>
                </div>
              </div>

              <LinkButton
                href="/checkout"
                className="btn-primary w-full justify-center py-3 text-sm font-black"
              >
                Checkout →
              </LinkButton>
              <LinkButton
                href="/tickets"
                className="w-full justify-center text-xs mt-2 text-white/35 hover:text-white/60 transition-colors"
                spinnerClass="w-3 h-3"
              >
                + Add more tickets
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
