"use client";

import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/tickets";
import OrderSteps from "@/components/OrderSteps";
import LinkButton from "@/components/LinkButton";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-5 text-center">
        <div className="text-6xl mb-5 opacity-20">🛒</div>
        <h1 className="font-black text-3xl text-[#0a0a0a] mb-2">
          Cart is Empty
        </h1>
        <p className="text-black/35 text-sm mb-8">No tickets added yet.</p>
        <LinkButton href="/tickets" className="btn-primary px-6 py-2.5 text-sm">
          Browse Tickets
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="tag mb-3 w-fit">Your Order</p>
          <h1 className="font-black text-3xl sm:text-4xl text-[#0a0a0a]">
            Cart
          </h1>
        </div>
        <OrderSteps current="cart" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.ticket.id} className="card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[#0a0a0a] font-bold text-sm">
                      {item.ticket.name}
                    </p>
                    <p className="text-black/40 text-xs mt-0.5">
                      {formatNaira(item.ticket.price)} each
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.ticket.id)}
                    className="text-black/20 hover:text-red-500 transition-colors text-xs"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-black/4 rounded-xl p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.ticket.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-lg text-black/40 hover:text-[#0a0a0a] hover:bg-black/6 transition-colors flex items-center justify-center text-sm font-bold"
                    >
                      −
                    </button>
                    <span className="text-[#0a0a0a] font-bold text-sm w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.ticket.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= 10}
                      className="w-7 h-7 rounded-lg text-black/40 hover:text-[#0a0a0a] hover:bg-black/6 transition-colors flex items-center justify-center text-sm font-bold disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-auto text-[#0a0a0a] font-black text-base">
                    {formatNaira(item.ticket.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="card rounded-2xl p-5 sticky top-20">
              <p className="text-[#0a0a0a] font-black text-sm mb-5">Summary</p>

              <div className="flex flex-col gap-2.5 mb-5">
                {items.map((item) => (
                  <div
                    key={item.ticket.id}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-black/35">
                      {item.ticket.name} × {item.quantity}
                    </span>
                    <span className="text-black/60">
                      {formatNaira(item.ticket.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t divider pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-black/40 text-xs">
                    {totalItems} ticket{totalItems !== 1 ? "s" : ""}
                  </span>
                  <span className="text-[#0a0a0a] font-black text-lg">
                    {formatNaira(totalPrice)}
                  </span>
                </div>
              </div>

              <LinkButton
                href="/checkout"
                className="btn-primary w-full justify-center py-2.5 text-xs"
              >
                Checkout →
              </LinkButton>
              <LinkButton
                href="/tickets"
                className="btn-ghost w-full justify-center text-[11px] mt-1"
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
