"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { MobileMenu } from "./MobileMenu";

export const NAV = [
  { href: "/menu", label: "Меню" },
  { href: "/booking", label: "Бронирование" },
  { href: "/about", label: "О ресторане" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
          scrolled
            ? "bg-night/92 backdrop-blur-xl"
            : "bg-gradient-to-b from-night/80 to-transparent",
        )}
      >
        <div className="container-page relative flex items-center justify-center py-5 md:py-6">
          <Logo size="md" />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
            className="absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-ink transition-opacity hover:opacity-70 md:right-8"
          >
            <Icon.Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
