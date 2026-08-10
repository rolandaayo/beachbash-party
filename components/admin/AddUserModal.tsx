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
        className="absolute inset-0 bg-[#1e0a3c]/40 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative bg-white rounded-2xl border border-purple-100 shadow-xl w-full max-w-md p-6">
        <h2 className="font-black text-lg text-[#1e0a3c] mb-1">Add User</h2>
        <p className="text-purple-400 text-xs mb-5">
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
            <label className="text-[11px] font-semibold text-purple-400 uppercase tracking-wide">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  role: e.target.value as "user" | "admin",
                }))
              }
              className="mt-1 w-full bg-purple-50 border border-purple-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 py-2.5 text-xs font-semibold text-purple-500 border border-purple-200 rounded-xl hover:bg-purple-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 text-xs font-bold text-white bg-[#7c3aed] rounded-xl hover:bg-[#6d28d9] disabled:opacity-50"
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
      <label className="text-[11px] font-semibold text-purple-400 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="mt-1 w-full bg-purple-50 border border-purple-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
    </div>
  );
}
