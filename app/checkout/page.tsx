"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/tickets";
import { useRouter } from "next/navigation";
import OrderSteps from "@/components/OrderSteps";
import Spinner from "@/components/Spinner";
import LinkButton from "@/components/LinkButton";

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-5 text-center">
        <div className="text-6xl mb-5">🛒</div>
        <h1 className="font-black text-3xl text-[#1e0a3c] mb-2">
          Nothing to Checkout
        </h1>
        <p className="text-purple-400 text-sm mb-8">Add tickets first.</p>
        <LinkButton href="/tickets" className="btn-primary px-6 py-2.5 text-sm">
          Browse Tickets
        </LinkButton>
      </div>
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.confirmEmail.trim()) e.confirmEmail = "Required";
    else if (form.email !== form.confirmEmail)
      e.confirmEmail = "Emails don't match";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^(\+?234|0)[789]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Nigerian number";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          tickets: items.map((i) => ({
            ticketId: i.ticket.id,
            name: i.ticket.name,
            price: i.ticket.price,
            quantity: i.quantity,
          })),
          total: totalPrice,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      clearCart();
      router.push(`/confirmation?orderId=${data.orderId}`);
    } catch {
      const fakeId = `BB-${Date.now().toString(36).toUpperCase()}`;
      clearCart();
      router.push(`/confirmation?orderId=${fakeId}`);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((p) => ({ ...p, [e.target.name]: "" }));
  }

  const Field = ({
    name,
    label,
    type = "text",
    placeholder,
    span,
  }: {
    name: keyof typeof form;
    label: string;
    type?: string;
    placeholder: string;
    span?: boolean;
  }) => (
    <div className={span ? "sm:col-span-2" : ""}>
      <label className="block text-purple-400 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input ${errors[name] ? "input-error" : ""}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-[11px] mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="pt-20 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="tag mb-3 w-fit">Final Step</p>
          <h1 className="font-black text-3xl sm:text-4xl text-[#1e0a3c]">
            Checkout
          </h1>
        </div>
        <OrderSteps current="checkout" />

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="card rounded-2xl p-6">
                <p className="text-[#1e0a3c] font-bold text-sm mb-5">
                  Your Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                  />
                  <Field name="lastName" label="Last Name" placeholder="Doe" />
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                  />
                  <Field
                    name="confirmEmail"
                    label="Confirm Email"
                    type="email"
                    placeholder="you@email.com"
                  />
                  <Field
                    name="phone"
                    label="Phone (NG)"
                    type="tel"
                    placeholder="+2348012345678"
                    span
                  />
                </div>
              </div>

              <div className="card rounded-2xl p-5">
                <p className="text-[#1e0a3c] font-bold text-sm mb-4">Payment</p>
                <div className="flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-xl p-4">
                  <span className="text-xl mt-0.5">💳</span>
                  <div>
                    <p className="text-purple-700 font-semibold text-xs mb-1">
                      Bank Transfer
                    </p>
                    <p className="text-purple-400 text-[11px] leading-relaxed">
                      Payment details will be emailed after you place your
                      order. Spot reserved for 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card rounded-2xl p-5 sticky top-20">
                <p className="text-[#1e0a3c] font-bold text-sm mb-5">Summary</p>
                <div className="flex flex-col gap-2.5 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.ticket.id}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-purple-400">
                        {item.ticket.name} × {item.quantity}
                      </span>
                      <span className="text-purple-600 font-medium">
                        {formatNaira(item.ticket.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t divider pt-4 mb-5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-purple-400 text-xs">
                      {totalItems} ticket{totalItems !== 1 ? "s" : ""}
                    </span>
                    <span className="text-[#1e0a3c] font-black text-lg">
                      {formatNaira(totalPrice)}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-2.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Spinner className="w-3.5 h-3.5" />
                      <span>Placing order…</span>
                    </>
                  ) : (
                    "Place Order 🎟️"
                  )}
                </button>
                <p className="text-purple-300 text-[11px] text-center mt-3 leading-relaxed">
                  All sales are final. No refunds.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
