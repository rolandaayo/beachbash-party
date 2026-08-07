"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "register";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "register") {
        await register(firstName, lastName, email, password);
      } else {
        await login(email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-14 min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl">
            🏖️
          </Link>
          <h1 className="font-black text-2xl text-[#1e0a3c] mt-3">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-purple-400 text-sm mt-1">
            {mode === "login"
              ? "Sign in to manage your tickets"
              : "Join the beach party"}
          </p>
        </div>

        {/* Card */}
        <div className="card rounded-2xl p-7">
          {/* Mode toggle */}
          <div className="flex bg-purple-50 rounded-xl p-1 mb-6">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${
                  mode === m
                    ? "bg-white text-[#4c1d95] shadow-sm"
                    : "text-purple-400 hover:text-purple-600"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Register-only fields */}
            {mode === "register" && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-purple-400 mb-1 font-medium">
                    First name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="Ada"
                    className="w-full border border-purple-100 rounded-xl px-3 py-2.5 text-sm text-[#1e0a3c] placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-purple-400 mb-1 font-medium">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Obi"
                    className="w-full border border-purple-100 rounded-xl px-3 py-2.5 text-sm text-[#1e0a3c] placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs text-purple-400 mb-1 font-medium">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ada@example.com"
                autoComplete="email"
                className="w-full border border-purple-100 rounded-xl px-3 py-2.5 text-sm text-[#1e0a3c] placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs text-purple-400 mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={
                  mode === "register" ? "Min 6 characters" : "••••••••"
                }
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                className="w-full border border-purple-100 rounded-xl px-3 py-2.5 text-sm text-[#1e0a3c] placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm font-bold mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
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

        <p className="text-center text-purple-300 text-xs mt-6">
          <Link href="/" className="hover:text-purple-500 transition-colors">
            ← Back to BeachBash
          </Link>
        </p>
      </div>
    </div>
  );
}
