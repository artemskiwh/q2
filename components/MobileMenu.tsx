"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { Icon } from "./Icons";
import { Logo } from "./Logo";
import { NAV } from "./Header";

/** Выезжающая шторка навигации — одна на все разрешения. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Фокус не убегает из шторки, пока она открыта
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={clsx("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Затемнение */}
      <div
        className={clsx(
          "absolute inset-0 bg-night/85 backdrop-blur-md transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      {/* Панель */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Меню сайта"
        className={clsx(
          "absolute inset-y-0 right-0 flex w-[min(92vw,430px)] flex-col border-l border-white/10 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          background:
            "radial-gradient(120% 55% at 100% 0%, #1b1b1b 0%, #101010 45%, #0a0a0a 100%)",
        }}
      >
        {/* Шапка шторки */}
        <div className="flex items-start justify-between px-7 pb-7 pt-7">
          <Logo size="sm" href="/" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-ink transition-all duration-300 hover:rotate-90 hover:border-white/60"
          >
            <Icon.Close className="h-5 w-5" />
          </button>
        </div>

        <span className="mx-7 h-px bg-white/10" />

        {/* Навигация */}
        <nav className="flex-1 overflow-y-auto px-7 py-4">
          {NAV.map((item, i) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "group flex items-center gap-4 border-b border-white/10 py-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                )}
                style={{ transitionDelay: open ? `${140 + i * 70}ms` : "0ms" }}
              >
                <span
                  className={clsx(
                    "w-6 text-[0.66rem] tabular-nums transition-colors",
                    active ? "text-ink" : "text-ink-mute",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={clsx(
                    "display-xl flex-1 text-[1.5rem] transition-colors",
                    active ? "text-ink" : "text-ink/80 group-hover:text-ink",
                  )}
                >
                  {item.label}
                </span>

                {active ? (
                  <span className="h-1.5 w-1.5 rotate-45 bg-white" aria-hidden="true" />
                ) : (
                  <Icon.Arrow className="h-4 w-4 -translate-x-2 text-ink/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ink/70" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
