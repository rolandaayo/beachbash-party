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

    setPending(true);

    // Fire the global nav-start event so NavigationLoader picks it up
    window.dispatchEvent(new Event("nav-start"));

    // Safety reset in case navigation never completes
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
