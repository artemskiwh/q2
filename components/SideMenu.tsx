"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { RESTAURANT } from "@/lib/icon-data";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/menu/", label: "Меню" },
  { href: "#about", label: "О нас" },
  { href: "#contacts", label: "Контакты" },
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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-black"
          >
            {/* Close button - inside like LETH */}
            <div className="flex justify-end p-4 md:p-6">
              <button
                aria-label="Закрыть меню"
                onClick={onClose}
                className="icon-frame"
              >
                <span className="cf-tr" />
                <span className="cf-bl" />
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-end justify-center gap-5 px-8 pb-8 md:gap-6 md:px-14">
              {NAV.map((item) => {
                const isHash = item.href.startsWith("#");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (isHash) {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => {
                          const el = document.querySelector(item.href);
                          el?.scrollIntoView({ behavior: "smooth" });
                        }, 240);
                      } else {
                        onClose();
                      }
                    }}
                    className="serif-thin text-4xl text-white transition-opacity hover:opacity-70 md:text-5xl"
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col items-end gap-3 px-8 pb-8 text-right md:px-14 md:pb-12">
              <a
                href={RESTAURANT.phoneHref}
                className="serif-thin text-xl text-white md:text-2xl"
              >
                {RESTAURANT.phone}
              </a>
              <p className="text-sm text-white/70">
                {RESTAURANT.address}
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onBook) {
                    setTimeout(onBook, 240);
                  } else {
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("open-booking"));
                    }, 240);
                  }
                }}
                className="btn-white mt-4 w-full"
              >
                Забронировать
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
      <path d="M6 6l12 12M6 18 18 6" />
    </svg>
  );
}
