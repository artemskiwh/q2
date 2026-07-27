"use client";

import Link from "next/link";
import { useEffect } from "react";
import clsx from "clsx";
import { Icon } from "./Icons";
import { Logo } from "./Logo";
import { OrnamentDivider } from "./Ornament";
import { NAV } from "./Header";
import { restaurant } from "@/lib/restaurant";

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
      className={clsx(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
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
          "absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-gold/20 bg-night-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-gold/12 px-6 py-5">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="grid h-10 w-10 place-items-center border border-gold/25 text-ink"
          >
            <Icon.Close className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-8">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="wordmark border-b border-white/5 py-4 text-[1.6rem] text-ink transition-colors hover:text-gold"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label.toLowerCase()}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-10">
          <OrnamentDivider />
          <a
            href={`tel:${restaurant.phoneHref}`}
            className="mt-6 flex items-center gap-3 text-ink"
          >
            <Icon.Phone className="h-4 w-4 text-gold" />
            <span className="text-lg">{restaurant.phoneLabel}</span>
          </a>
          <p className="mt-2 text-sm text-ink-mute">
            {restaurant.address.street}, {restaurant.address.city}
          </p>
          <Link href="/booking" onClick={onClose} className="btn btn-gold mt-6 w-full">
            Забронировать стол
          </Link>
        </div>
      </div>
    </div>
  );
}
