"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatNaira } from "@/lib/tickets";
import { useRouter } from "next/navigation";
import OrderSteps from "@/components/OrderSteps";
import Spinner from "@/components/Spinner";
import LinkButton from "@/components/LinkButton";
import { API_BASE } from "@/lib/api";
import { toast } from "@/components/Toast";

const PAYSTACK_PK = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

const bg = {
  background: "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
};
const inputCls =
  "w-full rounded-xl px-4 py-3 text-base text-white placeholder-white/25 bg-white/8 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all";
const glass = "rounded-2xl border border-white/10 p-6" as const;
const glassStyle = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(16px)",
};

// ── Defined OUTSIDE CheckoutPage so it never remounts on re-render ─────────
function Field({
  name,
  label,
  type = "text",
  placeholder,
  span,
  value,
  error,
  onChange,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  span?: boolean;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputCls} ${error ? "border-red-500/50 ring-1 ring-red-500/30" : ""}`}
      />
      {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [draftEmail, setDraftEmail] = useState("");

  useEffect(() => {
    if (user) {
      setForm((p) => ({
        ...p,
        firstName: p.firstName || user.firstName,
        lastName: p.lastName || user.lastName,
        email: p.email || user.email,
      }));
    }
  }, [user]);

  // Don't flash empty cart while loading (Paystack popup open) or while redirecting
  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-5 text-center" style={bg}>
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
        </div>
        <div className="relative">
          <div className="text-6xl mb-5">🛒</div>
          <h1 className="font-black text-3xl text-white mb-2">
            Nothing to Checkout
          </h1>
          <p className="text-white/40 text-sm mb-8">Add tickets first.</p>
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

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^(\+?234|0)[789]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Nigerian number";
    return e;
  }

  // Step 1: validate form, then show email confirmation modal
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setDraftEmail(form.email);
    setEditingEmail(false);
    setShowConfirm(true);
  }

  // Step 2: after user confirms email, place the order
  async function proceedToPayment() {
    setShowConfirm(false);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          customer: { ...form, email: draftEmail },
          tickets: items.map((i) => ({
            ticketId: i.ticket.id,
            name: i.ticket.name,
            price: i.ticket.price,
            quantity: i.quantity,
          })),
          total: totalPrice,
        }),
      });

      if (!res.ok) throw new Error("Order creation failed");
      const data = await res.json();

      if (PAYSTACK_PK) {
        const PaystackPop = (await import("@paystack/inline-js")).default;
        const popup = new PaystackPop();
        popup.newTransaction({
          key: PAYSTACK_PK,
          email: draftEmail,
          amount: totalPrice * 100,
          ref: data.orderId,
          onSuccess: async (transaction: { reference: string }) => {
            // Mark order as paid via API (handles localhost where webhook can't fire)
            try {
              await fetch(`${API_BASE}/api/orders/${data.orderId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  status: "paid",
                  paystackRef: transaction.reference,
                }),
              });
            } catch {
              // Best-effort — webhook will handle it in production
            }
            clearCart();
            router.push(`/confirmation?orderId=${data.orderId}&paid=1`);
          },
          onCancel: () => {
            setLoading(false);
            toast(
              "Payment cancelled. Your order is saved — contact support to complete payment.",
              "warning",
            );
          },
        });
        return;
      }

      if (data.paystack?.authorization_url) {
        clearCart();
        window.location.href = data.paystack.authorization_url;
        return;
      }

      setLoading(false);
      toast("Payment system not configured. Add your Paystack keys.", "error");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast("Order creation failed. Please try again.", "error");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((p) => ({ ...p, [e.target.name]: "" }));
  }

  const ticketNames = items.map((i) => i.ticket.name).join(", ");

  return (
    <>
      {/* Full-screen loading overlay while Paystack is initialising */}
      {loading && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4"
          style={{
            background: "rgba(15,5,32,0.92)",
            backdropFilter: "blur(8px)",
          }}
        >
          <svg
            className="animate-spin w-10 h-10 text-[#7c3aed]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <p className="text-white font-bold text-sm">Opening payment…</p>
          <p className="text-white/40 text-xs">
            Please wait, do not close this page
          </p>
        </div>
      )}

      <div className="min-h-screen pt-20 pb-20 px-5" style={bg}>
        {/* Glow blobs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-4">
              <span className="text-white/50 text-[11px] tracking-widest uppercase font-medium">
                Final Step
              </span>
            </div>
            <h1 className="font-black text-3xl sm:text-4xl text-white">
              Checkout
            </h1>
          </div>

          <OrderSteps current="checkout" dark />

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left col */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className={glass} style={glassStyle}>
                  <p className="text-white font-bold text-sm mb-5">
                    Your Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      name="firstName"
                      label="First Name"
                      placeholder="John"
                      value={form.firstName}
                      error={errors.firstName}
                      onChange={handleChange}
                    />
                    <Field
                      name="lastName"
                      label="Last Name"
                      placeholder="Doe"
                      value={form.lastName}
                      error={errors.lastName}
                      onChange={handleChange}
                    />
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="you@email.com"
                      span
                      value={form.email}
                      error={errors.email}
                      onChange={handleChange}
                    />
                    <Field
                      name="phone"
                      label="Phone (NG)"
                      type="tel"
                      placeholder="+2348012345678"
                      span
                      value={form.phone}
                      error={errors.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={glass} style={glassStyle}>
                  <p className="text-white font-bold text-sm mb-4">Payment</p>
                  {PAYSTACK_PK ? (
                    <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <span className="text-xl mt-0.5">💳</span>
                      <div>
                        <p className="text-green-400 font-semibold text-xs mb-1">
                          Paystack — Card / Bank / USSD
                        </p>
                        <p className="text-green-400/70 text-[11px] leading-relaxed">
                          Secure payment powered by Paystack. You&apos;ll be
                          prompted to pay after confirming.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                      <span className="text-xl mt-0.5">🏦</span>
                      <div>
                        <p className="text-white/70 font-semibold text-xs mb-1">
                          Bank Transfer
                        </p>
                        <p className="text-white/40 text-[11px] leading-relaxed">
                          Payment details will be emailed after you place your
                          order. Spot reserved for 24 hours.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary sidebar */}
              <div className="lg:col-span-1">
                <div
                  className="rounded-2xl border border-white/10 p-5 sticky top-20"
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
                    <div className="flex justify-between items-baseline">
                      <span className="text-white/40 text-xs">
                        {totalItems} ticket{totalItems !== 1 ? "s" : ""}
                      </span>
                      <span className="text-white font-black text-xl">
                        {formatNaira(totalPrice)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-3 text-sm font-black disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Spinner className="w-3.5 h-3.5" />
                        <span>Processing…</span>
                      </>
                    ) : PAYSTACK_PK ? (
                      "Pay Now 💳"
                    ) : (
                      "Place Order 🎟️"
                    )}
                  </button>
                  <p className="text-white/25 text-[11px] text-center mt-3">
                    All sales are final. No refunds.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ── Email confirmation modal ─────────────────────────────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0f0520]/75 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />

          {/* Modal */}
          <div
            className="relative w-full max-w-sm rounded-2xl border border-white/10 p-6 shadow-2xl"
            style={{
              background: "rgba(30,10,60,0.95)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed]/20 border border-purple-500/20 flex items-center justify-center text-2xl mx-auto mb-3">
                ✉️
              </div>
              <h2 className="font-black text-white text-lg mb-1">
                Confirm your Email Address
              </h2>
              <p className="text-white/45 text-xs leading-relaxed">
                Please confirm the email address below to ensure your tickets
                are sent correctly.
              </p>
            </div>

            {/* Email display / edit */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
              {editingEmail ? (
                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={draftEmail}
                    onChange={(e) => setDraftEmail(e.target.value)}
                    autoFocus
                    className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {draftEmail}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5 truncate">
                      {ticketNames}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingEmail(true)}
                    className="text-[#7c3aed] text-xs font-bold hover:text-purple-300 transition-colors shrink-0"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={proceedToPayment}
                disabled={
                  !draftEmail.trim() ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draftEmail)
                }
                className="btn-primary w-full justify-center py-3 text-sm font-black disabled:opacity-40"
              >
                Continue →
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2.5 text-xs font-semibold text-white/40 hover:text-white/70 transition-colors"
              >
                Back to edit details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
