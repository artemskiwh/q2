"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => setVisible(true);

    // No IntersectionObserver support → just show it.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    // If the element is already in or above the viewport on mount
    // (above-the-fold content, or a page restored mid-scroll), reveal it
    // on the next frame so it still animates in — the observer's initial
    // callback for already-visible elements isn't always delivered.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const raf = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    // Safety net: if the observer never fires for any reason, don't leave
    // content stuck invisible.
    const fallback = window.setTimeout(reveal, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}
