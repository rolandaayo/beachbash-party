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
    // Don't spin on modifier keys (open in new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    setPending(true);
    // Safety reset — if navigation takes > 8 s, clear the spinner
    setTimeout(() => setPending(false), 8000);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${className} ${pending ? "opacity-70 pointer-events-none" : ""}`}
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
