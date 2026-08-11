"use client";

import { useState } from "react";
import { createUser, type CreateUserPayload } from "@/lib/admin";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin";
};

const empty: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  role: "user",
};

const inputCls =
  "mt-1 w-full bg-white/8 border border-white/10 text-white placeholder-white/25 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";

const labelCls =
  "text-[11px] font-semibold text-white/40 uppercase tracking-wide";

export default function AddUserModal({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  function close() {
    setForm(empty);
    setError("");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload: CreateUserPayload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim() || undefined,
        role: form.role,
      };
      await createUser(payload);
      onCreated();
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0f0520]/70 backdrop-blur-sm"
        onClick={close}
      />
      <div
        className="relative rounded-2xl border border-white/10 shadow-2xl w-full max-w-md p-6"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <h2 className="font-black text-lg text-white mb-1">Add User</h2>
        <p className="text-white/40 text-xs mb-5">
          Create a new account manually
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="First Name"
              value={form.firstName}
              onChange={(v) => setForm((p) => ({ ...p, firstName: v }))}
              required
            />
            <Field
              label="Last Name"
              value={form.lastName}
              onChange={(v) => setForm((p) => ({ ...p, lastName: v }))}
              required
            />
          </div>
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            required
          />
          <Field
            label="Phone"
            value={form.phone}
            onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
          />
          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => setForm((p) => ({ ...p, password: v }))}
            required
            minLength={6}
          />
          <div>
            <label className={labelCls}>Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  role: e.target.value as "user" | "admin",
                }))
              }
              className="mt-1 w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="user" className="bg-[#1e0a3c]">
                User
              </option>
              <option value="admin" className="bg-[#1e0a3c]">
                Admin
              </option>
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 py-2.5 text-xs font-semibold text-white/60 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 text-xs font-bold text-white bg-[#7c3aed] rounded-xl hover:bg-[#6d28d9] disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating…" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="mt-1 w-full bg-white/8 border border-white/10 text-white placeholder-white/25 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
}
