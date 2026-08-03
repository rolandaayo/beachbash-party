"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPath = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();

    if (currentPath !== prevPath.current) {
      // New route — hide loader
      prevPath.current = currentPath;
      setProgress(100);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      timerRef.current = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 350);
    }
  }, [pathname, searchParams]);

  // Expose a way to start loading from LinkButton
  useEffect(() => {
    function handleStart() {
      setLoading(true);
      setProgress(10);
      if (progressRef.current) clearInterval(progressRef.current);
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 85) {
            clearInterval(progressRef.current!);
            return 85;
          }
          return p + Math.random() * 12;
        });
      }, 180);
    }

    window.addEventListener("nav-start", handleStart);
    return () => window.removeEventListener("nav-start", handleStart);
  }, []);

  if (!loading) return null;

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 z-[200] h-0.5 bg-[#7c3aed] transition-all duration-300 ease-out"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
      />

      {/* Full-screen overlay with spinner */}
      <div
        className="fixed inset-0 z-[150] flex items-center justify-center"
        style={{
          background: "rgba(250, 245, 255, 0.75)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Spinner ring */}
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
