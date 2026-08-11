"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function WelcomeToast() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!user) return;
    const flag = sessionStorage.getItem("bb_welcome");
    if (!flag) return;
    sessionStorage.removeItem("bb_welcome");

    // Small delay so the page has rendered before toast appears
    const show = setTimeout(() => setVisible(true), 300);
    // Start exit animation after 3.5s
    const hide = setTimeout(() => setExiting(true), 3800);
    // Remove from DOM after animation
    const remove = setTimeout(() => setVisible(false), 4300);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, [user]);

  if (!visible || !user) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 z-[100] -translate-x-1/2 transition-all duration-500 ${
        exiting
          ? "opacity-0 -translate-y-3 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border border-white/15"
        style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)" }}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center font-black text-white text-xs uppercase shrink-0">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>

        <div>
          <p className="text-white font-black text-sm leading-none">
            Welcome back, {user.firstName}! 🏖️
          </p>
          <p className="text-white/50 text-[11px] mt-0.5">
            Ready for the biggest beach party in Lagos?
          </p>
        </div>

        {/* Close */}
        <button
          onClick={() => setExiting(true)}
          className="ml-2 text-white/30 hover:text-white/70 transition-colors shrink-0"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
