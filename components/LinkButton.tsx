"use client";

import Link from "next/link";
import { useState, MouseEvent, ReactNode } from "react";
import Spinner from "@/components/Spinner";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  spinnerClass?: string;
};

export default function LinkButton({
  href,
  children,
  className = "",
  spinnerClass = "w-3.5 h-3.5",
}: Props) {
  const [pending, setPending] = useState(false);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Don't intercept modifier-key clicks (open in new tab etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Don't show spinner if we're already on this page
    const currentPath = window.location.pathname + window.location.search;
    const targetPath = href.startsWith("/") ? href : `/${href}`;
    if (
      currentPath === targetPath ||
      window.location.pathname === targetPath.split("?")[0]
    )
      return;

    setPending(true);
    window.dispatchEvent(new Event("nav-start"));
    setTimeout(() => setPending(false), 8000);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${className} ${pending ? "opacity-75 pointer-events-none" : ""}`}
    >
      {pending ? (
        <>
          <Spinner className={spinnerClass} />
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}
