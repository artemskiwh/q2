"use client";

import Link from "next/link";
import { useEffect } from "react";
import clsx from "clsx";
import { Icon } from "./Icons";
import { Logo } from "./Logo";
import { NAV } from "./Header";
import { restaurant } from "@/lib/restaurant";

/** Выезжающая панель навигации — одна на все разрешения. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={clsx("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-night/80 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          "absolute inset-y-0 right-0 flex w-[88%] max-w-md flex-col border-l border-white/12 bg-night-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <Logo size="sm" withTagline={false} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="grid h-11 w-11 place-items-center border border-white/20 text-ink transition-colors hover:border-white/50"
          >
            <Icon.Close className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="display-xl border-b border-white/8 py-5 text-[1.6rem] text-ink transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-10">
          <a href={`tel:${restaurant.phoneHref}`} className="flex items-center gap-3 text-ink">
            <Icon.Phone className="h-4 w-4" />
            <span className="text-lg">{restaurant.phoneLabel}</span>
          </a>
          <p className="mt-2 text-sm text-ink-mute">
            {restaurant.address.street}, {restaurant.address.city}
          </p>
          <Link href="/booking" onClick={onClose} className="btn btn-white mt-6 w-full">
            Забронировать стол
          </Link>
        </div>
      </div>
    </div>
  );
}
