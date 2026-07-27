"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { restaurant } from "@/lib/restaurant";

export const NAV = [
  { href: "/menu", label: "Меню" },
  { href: "/booking", label: "Бронирование" },
  { href: "/about", label: "О ресторане" },
  { href: "/contacts", label: "Контакты" },
];

/** Уголки-скобки вокруг кнопки — как на вывеске. */
function Bracket({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const corner = "absolute h-3.5 w-3.5 border-ink/60";
  return (
    <span className="relative grid h-12 w-12 place-items-center">
      <span
        className={clsx(
          corner,
          "top-0",
          side === "left" ? "left-0 border-l border-t" : "right-0 border-r border-t",
        )}
      />
      <span
        className={clsx(
          corner,
          "bottom-0",
          side === "left" ? "left-0 border-b border-l" : "right-0 border-b border-r",
        )}
      />
      {children}
    </span>
  );
}

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
          scrolled ? "bg-night/92 backdrop-blur-xl" : "bg-gradient-to-b from-night/80 to-transparent",
        )}
      >
        <div className="container-page flex items-start justify-between gap-4 py-4 md:py-5">
          <a
            href={`tel:${restaurant.phoneHref}`}
            aria-label={`Позвонить ${restaurant.phoneLabel}`}
            className="flex items-center gap-3 text-ink transition-opacity hover:opacity-70"
          >
            <Bracket side="left">
              <Icon.Phone className="h-5 w-5" />
            </Bracket>
            <span className="hidden text-sm tracking-wide lg:block">
              {restaurant.phoneLabel}
            </span>
          </a>

          <Logo size="md" />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
            className="flex items-center gap-3 text-ink transition-opacity hover:opacity-70"
          >
            <span className="hidden text-[0.7rem] uppercase tracking-wider2 lg:block">
              Меню
            </span>
            <Bracket side="right">
              <Icon.Menu className="h-5 w-5" />
            </Bracket>
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
