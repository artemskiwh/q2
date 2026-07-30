"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";
import { rating, restaurant, reviews, type Review } from "@/lib/restaurant";

const VISIBLE = 4;

/** Цвет кружка-аватара, как в 2ГИС: свой на каждого автора. */
const AVATAR_COLORS = [
  "#8a5a34",
  "#3d7a56",
  "#3a5f8a",
  "#7a3a63",
  "#8a3a3a",
  "#4a5a7a",
  "#6d6438",
  "#3f6f74",
];

function avatarColor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

/** Ряд звёзд: закрашенные — белые, остальные — контурные. */
function Stars({ value = 5, className = "" }: { value?: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon.Star
          key={i}
          className={i < value ? "h-3.5 w-3.5 fill-current text-ink" : "h-3.5 w-3.5 text-white/25"}
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? reviews : reviews.slice(0, VISIBLE);

  return (
    <div className="mx-auto mt-12 max-w-5xl">
      {/* Лента отзывов: одна колонка на телефоне, две на широком экране */}
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {shown.map((r, i) => (
          <Reveal key={r.name + r.date} className="h-full" delay={(i % 2) * 90}>
            <ReviewCard review={r} />
          </Reveal>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row md:mt-5">
        {reviews.length > VISIBLE ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="btn btn-ghost flex-1"
          >
            {expanded ? "Свернуть отзывы" : `Показать ещё ${reviews.length - VISIBLE}`}
          </button>
        ) : null}

        <a
          href={restaurant.reviewsUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-outline flex-1"
        >
          Все {rating.reviews} отзывов на 2ГИС
          <Icon.Arrow className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [clipped, setClipped] = useState(false);

  /* Кнопку показываем только если текст правда не поместился в три строки */
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setClipped(el.scrollHeight - el.clientHeight > 4);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="flex h-full flex-col border border-white/10 bg-night-card/30 p-5 transition-colors hover:border-white/25 md:p-7">
      <header className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[0.78rem] font-medium tracking-wide text-white"
          style={{ backgroundColor: avatarColor(review.name) }}
          aria-hidden="true"
        >
          {review.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.95rem] text-ink">{review.name}</span>
          <span className="block text-[0.72rem] text-ink-mute">{review.authorReviews}</span>
        </span>
      </header>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Stars value={5} />
        <span className="text-[0.75rem] text-ink-mute">
          {review.date}
          {review.edited ? ", изменён" : ""}
        </span>
      </div>

      <div className="mb-5">
        <p
          ref={textRef}
          className={`mt-3 text-[0.9rem] leading-relaxed text-ink-dim md:text-[0.92rem] ${
            open ? "" : "line-clamp-4"
          }`}
        >
          {review.text}
        </p>

        {clipped || open ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-[0.85rem] text-ink underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            {open ? "Свернуть" : "Читать целиком"}
          </button>
        ) : null}
      </div>

      <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4 text-[0.72rem] md:text-[0.75rem]">
        <Icon.Check className="h-3.5 w-3.5 shrink-0 text-ink/70" />
        <span className="text-ink-mute">{review.visits}</span>
        <span className="h-3 w-px bg-white/15" />
        <span className="text-ink-mute">Отзыв подтверждён</span>
      </div>
    </article>
  );
}
