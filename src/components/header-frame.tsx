"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-40 border-b border-line/70 bg-background transition-shadow duration-300"
    >
      {children}
    </header>
  );
}
