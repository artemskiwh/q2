"use client";

import { useState } from "react";
import type { Dish } from "@/lib/icon-data";
import { formatPrice } from "@/lib/icon-data";
import { withBasePath } from "@/lib/path";
import { DISH_IMAGES } from "@/lib/dish-images";

/**
 * 3D "floating plate" dish card: the dish photo is cropped to a circle
 * (like a plate), lifts and tilts on hover, with a soft halo behind it.
 */
export function DishCard({ dish }: { dish: Dish }) {
  const [failed, setFailed] = useState(false);
  const file = DISH_IMAGES[dish.img] ?? `${dish.img}.webp`;
  const src = withBasePath(`/dishes/${file}`);

  return (
    <article className="dish-card group flex flex-col items-center px-1 text-center">
      {/* plate */}
      <div className="dish-plate relative mb-6 flex aspect-square w-[80%] max-w-[240px] items-center justify-center">
        <div className="dish-halo pointer-events-none absolute inset-0" />
        {failed ? (
          <div className="plate-fallback relative z-10 flex h-full w-full items-center justify-center rounded-full">
            <span className="serif-thin text-2xl tracking-[0.3em] text-white/40">ICON</span>
          </div>
        ) : (
          <img
            src={src}
            alt={dish.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="dish-img relative z-10 h-full w-full rounded-full object-cover ring-1 ring-white/10"
          />
        )}
      </div>

      <h3 className="text-[15px] font-medium leading-snug text-white">{dish.name}</h3>
      {dish.desc && (
        <p className="mt-2 max-w-[26ch] text-xs leading-relaxed text-white/55">{dish.desc}</p>
      )}

      <div className="mt-3 flex items-baseline gap-2">
        <span className="serif-thin text-2xl text-white">{formatPrice(dish.price)}&nbsp;₽</span>
        {dish.weight && <span className="text-xs text-white/45">/ {dish.weight}</span>}
      </div>
    </article>
  );
}
