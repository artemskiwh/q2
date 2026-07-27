"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { restaurant } from "@/lib/restaurant";

export const NAV = [
  { href: "/menu", label: "Меню" },
  { href: "/about", label: "О ресторане" },
  { href: "/booking", label: "Бронирование" },
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
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-gold/15 bg-night/90 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-night/70 to-transparent",
        )}
      >
        <div className="container-page flex h-[74px] items-center justify-between gap-6 md:h-[86px]">
          <Logo size="sm" />

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative py-2 text-[0.7rem] font-medium uppercase tracking-wider2 transition-colors",
                    active ? "text-gold" : "text-ink/75 hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    className={clsx(
                      "absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300",
                      active ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${restaurant.phoneHref}`}
              className="hidden items-center gap-2 text-[0.8rem] tracking-wide text-ink/85 transition-colors hover:text-gold xl:flex"
            >
              <Icon.Phone className="h-4 w-4 text-gold" />
              {restaurant.phoneLabel}
            </a>

            <Link href="/booking" className="btn btn-gold hidden md:inline-flex">
              Забронировать
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="grid h-11 w-11 place-items-center border border-gold/25 text-ink transition-colors hover:border-gold/60 lg:hidden"
            >
              <Icon.Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
