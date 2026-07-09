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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] flex flex-col bg-black/95 backdrop-blur-2xl"
        >
          {/* header */}
          <div className="relative flex h-[110px] shrink-0 items-center justify-between px-4 md:h-[130px] md:px-6">
            <span className="corner-frame pointer-events-none h-11 w-11 opacity-0" aria-hidden />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="serif-thin text-2xl tracking-[0.14em] text-white md:text-3xl">Отзывы</span>
              <span className="mt-1 flex items-center gap-2 text-xs text-white/60">
                <span className="text-white">{RESTAURANT.rating}</span>
                <Stars />
                <span>· {RESTAURANT.ratingCount}</span>
              </span>
            </div>
            <button aria-label="Закрыть" onClick={onClose} className="icon-frame">
              <span className="cf-tr" />
              <span className="cf-bl" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="h-5 w-5">
                <path d="M6 6l12 12M6 18 18 6" />
              </svg>
            </button>
          </div>

          {/* scrollable list */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl px-6 pb-16 pt-2 md:px-8">
              {REVIEWS.slice(0, 8).map((r, i) => (
                <motion.div
                  key={r.name + i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/10 py-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 text-sm text-white">
                      {initials(r.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="serif-thin truncate text-lg text-white">{r.name}</p>
                      <p className="text-xs text-white/45">{r.date}</p>
                    </div>
                    <Stars className="ml-auto" />
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/80">{r.text}</p>
                </motion.div>
              ))}

              <a
                href={RESTAURANT.gis}
                target="_blank"
                rel="noreferrer"
                className="mt-8 block text-center text-sm uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
              >
                Все отзывы в 2ГИС →
              </a>
            </div>
          </div>
        </motion.div>
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
