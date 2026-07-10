"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { SideMenu } from "./SideMenu";

export const NAV = [
  { href: "/", label: "Главная" },
  { href: "/menu/", label: "Меню" },
  { href: "/#about", label: "О нас" },
  { href: "/#contacts", label: "Контакты" },
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
          scrolled ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="relative flex h-[110px] items-center justify-between px-4 md:h-[130px] md:px-6">
          {/* left spacer keeps the logo centred (call button removed) */}
          <span className="h-12 w-12" aria-hidden />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo />
          </div>

          <button
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
            className="icon-btn"
          >
            <BurgerIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <SideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function BurgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
