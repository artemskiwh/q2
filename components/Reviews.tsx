"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { REVIEWS, RESTAURANT } from "@/lib/icon-data";
import { Reveal } from "./Reveal";

const ORANGE = "#ff9d33";
const LINK = "#6aa4ff";
const AVATAR_COLORS = [
  "#4c8bf5", "#28a745", "#ff8a00", "#9b51e0",
  "#e5484d", "#0fa0a0", "#e8a100", "#d6409f",
];
const DIST = [93, 4, 1, 1, 1];
const CHIPS = ["Музыка", "Персонал", "Караоке", "Еда", "Сервис"];

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase();
}

function Stars({ n = 5, size = 15 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex gap-[2px]" style={{ color: ORANGE }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? "currentColor" : "rgba(0,0,0,0.15)"}>
          <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.4L12 17.9 5.5 21.8l1.8-7.4L1.6 9.5l7.5-.6L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Avatar({ name, i }: { name: string; i: number }) {
  return (
    <div
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
      style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
    >
      {initials(name)}
    </div>
  );
}

function RatingSummary() {
  return (
    <div className="flex items-center gap-6 px-5 py-5">
      <div className="shrink-0 text-center">
        <div className="text-[44px] font-semibold leading-none text-black">{RESTAURANT.rating}</div>
        <div className="mt-1.5 flex justify-center">
          <Stars n={5} size={14} />
        </div>
        <div className="mt-1.5 text-xs text-black/65">{RESTAURANT.ratingCount} оценок</div>
      </div>
      <div className="flex-1 space-y-1.5">
        {DIST.map((pct, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-3 text-right text-[11px] text-black/65">{5 - idx}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill={ORANGE}>
              <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.4L12 17.9 5.5 21.8l1.8-7.4L1.6 9.5l7.5-.6L12 2z" />
            </svg>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
              <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: ORANGE }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chips() {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-4 scrollbar-hide">
      {CHIPS.map((c) => (
        <span key={c} className="whitespace-nowrap rounded-full bg-black/[0.07] px-3.5 py-1.5 text-[13px] text-black/90">
          {c}
        </span>
      ))}
    </div>
  );
}

function SortRow() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <span className="text-[15px] font-semibold text-black">{RESTAURANT.reviewsCount} отзыва</span>
      <span className="inline-flex items-center gap-1 text-[13px] text-black/65">
        По новизне
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}

function ReviewItem({ r, i }: { r: (typeof REVIEWS)[number]; i: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="border-t border-black/10 px-5 py-4">
      <div className="flex items-start gap-3">
        <Avatar name={r.name} i={i} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-black">{r.name}</p>
          <p className="text-xs text-black/60">{r.count ?? "1 отзыв"}</p>
        </div>
        <span className="text-black/45">···</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Stars n={r.rating} size={15} />
        <span className="text-[13px] text-black/60">{r.date}</span>
      </div>
      <p className="mt-2.5 text-[14px] leading-relaxed text-black/90">{r.text}</p>
      <button
        onClick={() => setLiked((v) => !v)}
        className="mt-3 inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-1.5 text-[13px] text-black/70 transition-colors hover:bg-black/5"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? "#e5484d" : "none"} stroke={liked ? "#e5484d" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
        Полезно?
      </button>
    </div>
  );
}

/** Dark 2GIS-styled reviews panel. `full` renders every review; otherwise a preview. */
function GisPanel({ full = false }: { full?: boolean }) {
  const list = full ? REVIEWS : REVIEWS.slice(0, 3);
  return (
    <div className="bg-white text-black">
      <RatingSummary />
      <Chips />
      <div className="h-px bg-black/10" />
      <SortRow />
      <div>
        {list.map((r, i) => (
          <ReviewItem key={r.name + i} r={r} i={i} />
        ))}
      </div>
    </div>
  );
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
          <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-2xl border border-black/15">
            <GisPanel />
            <button
              onClick={() => setOpen(true)}
              className="block w-full border-t border-black/10 bg-white py-4 text-[15px] font-medium transition-colors hover:bg-black/[0.04]"
              style={{ color: LINK }}
            >
              Читать все отзывы ({RESTAURANT.reviewsCount})
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
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-white"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4">
              <span className="text-lg font-semibold text-black">Отзывы</span>
              <button
                aria-label="Закрыть"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-black/85 transition-colors hover:bg-black/8"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18 18 6" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <GisPanel full />
              <a
                href={RESTAURANT.gis}
                target="_blank"
                rel="noreferrer"
                className="block border-t border-black/10 py-4 text-center text-[15px] font-medium hover:bg-black/[0.04]"
                style={{ color: LINK }}
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
