"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { SideMenu } from "./SideMenu";
import { RESTAURANT } from "@/lib/icon-data";

export const NAV = [
  { href: "/", label: "Главная" },
  { href: "/menu/", label: "Меню" },
  { href: "#about", label: "О нас" },
  { href: "#karaoke", label: "Караоке" },
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
          scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="relative flex h-[110px] items-center justify-between px-4 md:h-[130px] md:px-6">
          <a
            href={RESTAURANT.phoneHref}
            aria-label="Позвонить"
            className="icon-frame"
          >
            <span className="cf-tr" />
            <span className="cf-bl" />
            <PhoneIcon className="h-5 w-5" />
          </a>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo />
          </div>

          <button
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
            className="icon-frame"
          >
            <span className="cf-tr" />
            <span className="cf-bl" />
            <BurgerIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <SideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.6 19.6 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function BurgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
