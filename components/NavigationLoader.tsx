"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track previous path so we know when navigation actually completed
  const prevPath = useRef(pathname + searchParams.toString());

  // ── Clear everything ─────────────────────────────────────────────────────
  function dismiss() {
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    progressInterval.current = null;
    safetyTimer.current = null;
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
  }

  // ── Dismiss when route actually changes ──────────────────────────────────
  useEffect(() => {
    const current = pathname + searchParams.toString();
    if (current !== prevPath.current) {
      prevPath.current = current;
      if (loading) dismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // ── Listen for nav-start (only fires when destination ≠ current page) ────
  useEffect(() => {
    function handleStart() {
      setLoading(true);
      setProgress(15);

      if (progressInterval.current) clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 82) {
            clearInterval(progressInterval.current!);
            return 82;
          }
          return p + Math.random() * 10;
        });
      }, 200);

      // Hard safety: dismiss after 8 s no matter what
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(dismiss, 8000);
    }

    window.addEventListener("nav-start", handleStart);
    return () => window.removeEventListener("nav-start", handleStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return null;

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 z-[200] h-0.5 bg-[#7c3aed] transition-all duration-300 ease-out"
        style={{ width: `${progress}%`, opacity: progress >= 100 ? 0 : 1 }}
      />

      {/* Full-screen overlay */}
      <div
        className="fixed inset-0 z-[150] flex items-center justify-center"
        style={{
          background: "rgba(250,245,255,0.75)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-purple-100" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#7c3aed]"
              style={{ animation: "spin 0.7s linear infinite" }}
            />
          </div>
          <p className="text-purple-400 text-xs font-medium tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    </>
  );
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderInner />
    </Suspense>
  );
}
