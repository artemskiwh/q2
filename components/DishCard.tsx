"use client";

import { useState } from "react";
import type { Dish } from "@/lib/icon-data";
import { formatPrice } from "@/lib/icon-data";
import { withBasePath } from "@/lib/path";

export function DishCard({ dish }: { dish: Dish }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = withBasePath(`/dishes/${dish.img}.webp`);

  return (
    <article className="dish-card group relative flex flex-col items-center rounded-3xl border border-gold/10 bg-gradient-to-b from-ink-card/70 to-ink/40 px-5 pb-6 pt-8 text-center transition-colors duration-300 hover:border-gold/30">
      {/* 3D floating plate */}
      <div className="dish-plate dish-halo relative mb-5 flex aspect-square w-[62%] max-w-[190px] items-center justify-center">
        {/* Branded plate placeholder — shown until a real photo loads */}
        {(!loaded || failed) && (
          <div className="plate-fallback absolute inset-0 z-10 flex items-center justify-center rounded-full">
            <span className="font-display text-3xl tracking-wide text-gold/60">ICON</span>
          </div>
        )}
        {!failed && (
          <img
            src={src}
            alt={dish.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`dish-img relative z-20 h-full w-full rounded-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-white">{dish.name}</h3>
      {dish.desc && (
        <p className="mt-2 text-xs leading-relaxed text-muted">{dish.desc}</p>
      )}

      <div className="mt-auto flex w-full items-end justify-center gap-2 pt-4">
        <span className="font-display text-2xl text-gold-gradient">
          {formatPrice(dish.price)}&nbsp;₽
        </span>
        {dish.weight && (
          <span className="mb-1 text-xs text-mute2">/ {dish.weight}</span>
        )}
      </div>
    </article>
  );
}
