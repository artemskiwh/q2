"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { RESTAURANT } from "@/lib/icon-data";
import { withBasePath } from "@/lib/path";
import { Logo } from "./Logo";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/menu/", label: "Меню" },
  { href: "/#about", label: "О нас" },
  { href: "/#contacts", label: "Контакты" },
];

export function SideMenu({
  open,
  onClose,
  onBook,
}: {
  open: boolean;
  onClose: () => void;
  onBook?: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const book = () => {
    onClose();
    setTimeout(() => {
      if (onBook) onBook();
      else window.dispatchEvent(new CustomEvent("open-booking"));
    }, 260);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] flex flex-col bg-black/95 backdrop-blur-2xl"
        >
          {/* header - mirrors the site header */}
          <div className="relative flex h-[110px] shrink-0 items-center justify-between px-4 md:h-[130px] md:px-6">
            <span className="h-12 w-12" aria-hidden />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Logo />
            </div>
            <button aria-label="Закрыть меню" onClick={onClose} className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="h-5 w-5">
                <path d="M6 6l12 12M6 18 18 6" />
              </svg>
            </button>
          </div>

          {/* nav */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-6 md:gap-7">
            {NAV.map((item, i) => {
              const hashIdx = item.href.indexOf("#");
              const hash = hashIdx >= 0 ? item.href.slice(hashIdx) : "";
              return (
                <motion.a
                  key={item.href}
                  href={withBasePath(item.href)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => {
                    onClose();
                    if (hash && typeof document !== "undefined" && document.querySelector(hash)) {
                      e.preventDefault();
                      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 260);
                    }
                  }}
                  className="serif-thin text-4xl leading-none text-white/90 transition-colors hover:text-white md:text-6xl"
                >
                  {item.label}
                </motion.a>
              );
            })}
          </nav>

          {/* footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="shrink-0 pb-12 text-center"
          >
            <a href={RESTAURANT.phoneHref} className="serif-thin block text-2xl text-white md:text-3xl">
              {RESTAURANT.phone}
            </a>
            <p className="serif mt-3 text-[15px] tracking-wide text-white/70">
              {RESTAURANT.address} · {RESTAURANT.city}
            </p>
            <p className="serif mt-1 text-[15px] tracking-wide text-white/70">
              {RESTAURANT.hoursShort}, ежедневно
            </p>
            <button onClick={book} className="btn-white mt-7">
              Забронировать
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
