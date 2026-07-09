"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { REVIEWS, RESTAURANT } from "@/lib/icon-data";
import { Reveal } from "./Reveal";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export function Reviews() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title">Отзывы</h2>
          <p className="section-sub mx-auto mt-4 max-w-md">
            Живые впечатления гостей ICON
            <br />
            из карточки 2ГИС
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 flex max-w-2xl items-center justify-center gap-8">
            <div className="text-center">
              <div className="serif text-6xl text-white md:text-7xl">{RESTAURANT.rating}</div>
              <Stars className="mt-2 justify-center" />
            </div>
            <div className="h-16 w-px bg-white/25" />
            <div className="text-sm text-white/70">
              <p className="text-white">{RESTAURANT.ratingCount} оценок</p>
              <p className="mt-1">{RESTAURANT.reviewsCount} отзыва</p>
              <a
                href={RESTAURANT.gis}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-white underline underline-offset-4 hover:text-white/70"
              >
                Смотреть в 2ГИС →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-12 flex justify-center">
            <button onClick={() => setOpen(true)} className="btn-ghost">
              Читать отзывы
            </button>
          </div>
        </Reveal>
      </div>

      <ReviewsDrawer open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function ReviewsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/15 px-6 py-5">
              <div>
                <p className="serif-thin text-2xl text-white">Отзывы</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-white/60">
                  <span className="text-white">{RESTAURANT.rating}</span>
                  <Stars />
                  <span>· {RESTAURANT.ratingCount} оценок</span>
                </p>
              </div>
              <button
                aria-label="Закрыть"
                onClick={onClose}
                className="icon-frame"
              >
                <span className="cf-tr" />
                <span className="cf-bl" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-5 w-5">
                  <path d="M6 6l12 12M6 18 18 6" />
                </svg>
              </button>
            </div>

            {/* scrollable list */}
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {REVIEWS.slice(0, 8).map((r, i) => (
                <div key={r.name + i} className="border border-white/12 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 text-sm font-medium text-white">
                      {initials(r.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{r.name}</p>
                      <p className="text-xs text-white/50">{r.date}</p>
                    </div>
                  </div>
                  <Stars className="mt-3" />
                  <p className="mt-2.5 text-sm leading-relaxed text-white/80">{r.text}</p>
                </div>
              ))}

              <a
                href={RESTAURANT.gis}
                target="_blank"
                rel="noreferrer"
                className="block py-3 text-center text-sm text-white underline underline-offset-4 hover:text-white/70"
              >
                Все отзывы в 2ГИС →
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex gap-[3px] text-white ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.4L12 17.9 5.5 21.8l1.8-7.4L1.6 9.5l7.5-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}
