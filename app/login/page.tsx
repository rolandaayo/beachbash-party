"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "register";

const inputCls =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 bg-white/8 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all";

const labelCls =
  "block text-xs text-white/50 mb-1.5 font-medium tracking-wide uppercase";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "register" && password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      if (mode === "register") {
        await register(
          firstName,
          lastName,
          email,
          password,
          phone || undefined,
        );
      } else {
        await login(email, password);
      }
      router.push("/");
      // Signal home page to show welcome toast
      sessionStorage.setItem("bb_welcome", "1");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 pt-14"
      style={{
        background:
          "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
      }}
    >
      {/* Glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo + heading */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-4xl inline-block hover:scale-110 transition-transform"
          >
            🏖️
          </Link>
          <h1 className="font-black text-2xl text-white mt-3 tracking-tight">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {mode === "login"
              ? "Sign in to manage your tickets"
              : "Join the beach party"}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7 border border-white/10"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Tab toggle */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6 border border-white/8">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all capitalize ${
                  mode === m
                    ? "bg-[#7c3aed] text-white shadow-lg shadow-purple-900/50"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Register-only fields */}
            {mode === "register" && (
              <>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className={labelCls}>First name</label>
                    <input
                      type="text"
                      value={firstName}
                      required
                      placeholder="Ada"
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex-1">
                    <label className={labelCls}>Last name</label>
                    <input
                      type="text"
                      value={lastName}
                      required
                      placeholder="Obi"
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>
                    Phone{" "}
                    <span className="text-white/25 normal-case">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    placeholder="+2348012345678"
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </>
            )}

            <div>
              <label className={labelCls}>Email address</label>
              <input
                type="email"
                value={email}
                required
                placeholder="ada@example.com"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password"
                value={password}
                required
                minLength={mode === "register" ? 6 : undefined}
                placeholder={
                  mode === "register" ? "Min 6 characters" : "••••••••"
                }
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                <span className="text-red-400 text-base">⚠️</span>
                <p className="text-red-300 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-black text-white transition-all mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? "rgba(124,58,237,0.5)"
                  : "linear-gradient(135deg,#7c3aed,#4c1d95)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
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
                  {mode === "login" ? "Signing in…" : "Creating account…"}
                </span>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          <Link href="/" className="hover:text-white/60 transition-colors">
            ← Back to BeachBash
          </Link>
        </p>
      </div>
    </div>
  );
}
