"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { NAV } from "./Header";
import { RESTAURANT } from "@/lib/icon-data";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-[84%] max-w-sm flex-col border-l border-gold/20 bg-ink-soft"
          >
            <div className="flex items-center justify-between border-b border-gold/15 p-5">
              <Logo size="sm" withTagline={false} />
              <button
                aria-label="Закрыть меню"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18 18 6" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col p-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="border-b border-ink-line/60 px-3 py-4 text-lg font-medium text-white/90 transition hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto space-y-3 border-t border-gold/15 p-5">
              <a href="#book" onClick={onClose} className="btn-gold w-full">
                Забронировать стол
              </a>
              <p className="text-center text-xs text-muted">
                {RESTAURANT.city} · {RESTAURANT.address}
              </p>
              <p className="text-center text-xs text-gold">{RESTAURANT.hoursShort}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
