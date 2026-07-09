"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export const NAV = [
  { href: "#about", label: "О ресторане" },
  { href: "#menu", label: "Меню" },
  { href: "#karaoke", label: "Караоке" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold/15 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-[76px] items-center justify-between">
          <Logo size="sm" withTagline={false} />

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-muted transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#book" className="btn-gold hidden sm:inline-flex">
              Забронировать
            </a>
            <button
              aria-label="Открыть меню"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
