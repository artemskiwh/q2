"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Icon } from "./Icons";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { useCart } from "./CartProvider";
import { MobileMenu } from "./MobileMenu";

const NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О нас" },
  { href: "/wholesale", label: "Опт" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const { totalQty } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-bg-line bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent bg-bg/60 backdrop-blur",
        )}
      >
        <div className="container-page flex h-16 items-center gap-4 md:h-[72px]">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-bg-line bg-bg-soft text-white/90 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Меню"
          >
            <Icon.Menu className="h-5 w-5" />
          </button>

          <Logo />

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-bg-elev text-white"
                      : "text-muted hover:bg-bg-soft hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden flex-1 md:flex lg:hidden">
            <SearchBar size="sm" />
          </div>

          <div className="ml-auto hidden w-[280px] lg:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
            <Link
              href="/favorites"
              className="hidden h-10 w-10 place-items-center rounded-xl border border-bg-line bg-bg-soft text-white/90 hover:bg-bg-elev md:grid"
              aria-label="Избранное"
            >
              <Icon.Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-bg-line bg-bg-soft text-white/90 hover:bg-bg-elev"
              aria-label="Корзина"
            >
              <Icon.Cart className="h-5 w-5" />
              {totalQty > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                  {totalQty}
                </span>
              )}
            </Link>
            <Link
              href="/wholesale"
              className="ml-1 hidden h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-hover md:inline-flex"
            >
              Стать партнёром
            </Link>
          </div>
        </div>

        <div className="container-page pb-3 md:hidden">
          <SearchBar size="sm" />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
