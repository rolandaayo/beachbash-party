"use client";

import { useEffect, useState } from "react";

export type ToastType = "info" | "success" | "error" | "warning";

export type ToastData = {
  id: number;
  message: string;
  type: ToastType;
};

const ICONS: Record<ToastType, string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "💬",
};

const COLORS: Record<ToastType, string> = {
  success: "bg-green-900/90 border-green-500/30 text-green-100",
  error: "bg-red-900/90 border-red-500/30 text-red-100",
  warning: "bg-yellow-900/90 border-yellow-500/30 text-yellow-100",
  info: "bg-[#2e1065]/95 border-purple-500/30 text-white",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: number) => void;
}) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const hide = setTimeout(() => setExiting(true), 4000);
    const remove = setTimeout(() => onDismiss(toast.id), 4500);
    return () => {
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`flex items-start gap-3 w-full max-w-sm px-4 py-3.5 rounded-2xl border shadow-2xl transition-all duration-500 ${
        COLORS[toast.type]
      } ${exiting ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}
    >
      <span className="text-base shrink-0 mt-0.5">{ICONS[toast.type]}</span>
      <p className="text-xs leading-relaxed flex-1">{toast.message}</p>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onDismiss(toast.id), 400);
        }}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity text-sm leading-none mt-0.5"
      >
        ×
      </button>
    </div>
  );
}

// ── Global toast container ────────────────────────────────────────────────────
// Rendered once in layout, driven by the event bus below.

let _push: ((msg: string, type?: ToastType) => void) | null = null;

export function toast(message: string, type: ToastType = "info") {
  _push?.(message, type);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    _push = (message, type = "info") => {
      setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
    };
    return () => {
      _push = null;
    };
  }, []);

  const dismiss = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 w-full px-4 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto w-full max-w-sm">
          <ToastItem toast={t} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  );
}
