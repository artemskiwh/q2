"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "@/lib/products";
import { Icon } from "./Icons";
import { CategoryIcons } from "./CategoryIcons";
import { Logo } from "./Logo";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О компании" },
  { href: "/wholesale", label: "Условия опта" },
  { href: "/profile", label: "Профиль" },
  { href: "/cart", label: "Корзина" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col border-r border-bg-line bg-bg-soft"
          >
            <div className="flex items-center justify-between border-b border-bg-line p-4">
              <Logo size="sm" />
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg border border-bg-line"
              >
                <Icon.X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-bg-card"
                >
                  {item.label}
                  <Icon.Chevron className="h-4 w-4 text-muted" />
                </Link>
              ))}
            </nav>

            <div className="border-t border-bg-line p-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-muted">Категории</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => {
                  const Cat = CategoryIcons[c.id];
                  return (
                    <Link
                      key={c.id}
                      onClick={onClose}
                      href={`/catalog?category=${c.id}`}
                      className="flex items-center gap-2 rounded-lg border border-bg-line bg-bg-card px-3 py-2 text-sm"
                    >
                      <Cat className="h-4 w-4 text-brand" />
                      {c.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto border-t border-bg-line p-4">
              <Link
                href="/wholesale"
                onClick={onClose}
                className="btn-primary w-full justify-center"
              >
                Стать партнёром
              </Link>
              <p className="mt-3 text-center text-xs text-muted">
                Опт от 10 000 ₽ · Доставка по РФ
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
