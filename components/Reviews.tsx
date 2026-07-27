"use client";

import { useState } from "react";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";
import { rating, restaurant, reviews, type Review } from "@/lib/restaurant";

const VISIBLE = 4;

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
    <div className="mx-auto mt-12 max-w-[760px]">
      {/* Шапка с оценкой — как карточка заведения в 2ГИС */}
      <Reveal>
        <div className="flex flex-col gap-5 border border-white/12 p-6 sm:flex-row sm:items-center sm:gap-8 md:p-7">
          <div className="flex items-center gap-4">
            <span className="text-[3rem] font-light leading-none tabular-nums text-ink">
              {String(rating.score).replace(".", ",")}
            </span>
            <span className="flex flex-col gap-1.5">
              <Stars value={5} />
              <span className="text-[0.72rem] text-ink-mute">{rating.scores} оценок</span>
            </span>
          </div>

          <span className="hidden h-10 w-px bg-white/12 sm:block" />

          <div className="flex flex-1 items-center justify-between gap-4 border-t border-white/10 pt-4 sm:border-t-0 sm:pt-0">
            <span className="text-sm text-ink-dim">{rating.reviews} отзывов на 2ГИС</span>
            <a
              href={restaurant.reviewsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-ink transition-all hover:gap-3"
            >
              Открыть 2ГИС
              <Icon.Arrow className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Reveal>

      {/* Лента отзывов */}
      <div className="mt-4 border border-white/12">
        {shown.map((r, i) => (
          <ReviewCard key={r.name + r.date} review={r} first={i === 0} />
        ))}
      </div>

      {!expanded && reviews.length > VISIBLE ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="btn btn-ghost mt-6 w-full"
        >
          Показать ещё {reviews.length - VISIBLE}
        </button>
      ) : null}
    </div>
  );
}

function ReviewCard({ review, first }: { review: Review; first: boolean }) {
  return (
    <article className={`p-6 md:p-7 ${first ? "" : "border-t border-white/8"}`}>
      <header className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-[0.72rem] tracking-wide text-ink">
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

      <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">{review.text}</p>

      {review.truncated ? (
        <a
          href={restaurant.reviewsUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 inline-block text-[0.85rem] text-ink underline underline-offset-4 hover:opacity-70"
        >
          Читать целиком
        </a>
      ) : null}

      <div className="mt-4 flex items-center gap-3 text-[0.75rem]">
        <Icon.Check className="h-3.5 w-3.5 shrink-0 text-ink/70" />
        <span className="text-ink-mute">{review.visits}</span>
        <span className="h-3 w-px bg-white/15" />
        <span className="text-ink-mute">Отзыв подтверждён</span>
      </div>
    </article>
  );
}
