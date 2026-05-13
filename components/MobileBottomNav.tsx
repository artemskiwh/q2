"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Icon } from "./Icons";
import { useCart } from "./CartProvider";
import { useFavorites } from "./FavoritesProvider";

const ITEMS = [
  { href: "/", label: "Главная", icon: Icon.Home },
  { href: "/catalog", label: "Каталог", icon: Icon.Catalog },
  { href: "/favorites", label: "Избранное", icon: Icon.Heart },
  { href: "/cart", label: "Корзина", icon: Icon.Cart },
  { href: "/contacts", label: "Контакты", icon: Icon.User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalQty } = useCart();
  const { count: favCount } = useFavorites();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-bg-line bg-bg/95 backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-5">
        {ITEMS.map((it) => {
          const active = pathname === it.href;
          const Comp = it.icon;
          const isCart = it.href === "/cart";
          const isFav = it.href === "/favorites";
          const badgeQty = isCart ? totalQty : isFav ? favCount : 0;
          const badgeColor = isCart ? "bg-brand text-white" : "bg-accent text-bg";
          return (
            <Link
              key={it.href}
              href={it.href}
              className={clsx(
                "relative flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] transition",
                active ? "text-white" : "text-muted",
              )}
            >
              <span className="relative">
                <Comp className="h-5 w-5" />
                {badgeQty > 0 && (
                  <span
                    className={clsx(
                      "absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold",
                      badgeColor,
                    )}
                  >
                    {badgeQty}
                  </span>
                )}
              </span>
              <span>{it.label}</span>
              {active && (
                <span className="absolute inset-x-5 top-0 h-0.5 rounded-b-full bg-brand" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
