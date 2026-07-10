"use client";

import { useState } from "react";
import type { Dish } from "@/lib/icon-data";
import { formatPrice } from "@/lib/icon-data";
import { withBasePath } from "@/lib/path";
import { DISH_IMAGES } from "@/lib/dish-images";

/**
 * Dish card: the photo is cropped to a uniform square (rounded corners),
 * identical size for every dish, lifting slightly on hover.
 */
export function DishCard({ dish }: { dish: Dish }) {
  const [failed, setFailed] = useState(false);
  const file = DISH_IMAGES[dish.img] ?? `${dish.img}.webp`;
  const src = withBasePath(`/dishes/${file}`);

  return (
    <article className="dish-card group flex flex-col items-center px-1 text-center">
      {/* square photo — uniform size for every dish */}
      <div className="dish-square relative mb-6 aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-black/10">
        {failed ? (
          <div className="plate-fallback flex h-full w-full items-center justify-center">
            <span className="serif-thin text-2xl tracking-[0.3em] text-black/40">ICON</span>
          </div>
        ) : (
          <img
            src={src}
            alt={dish.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="dish-img h-full w-full object-cover"
          />
        )}
      </div>

      <h3 className="serif-thin text-[17px] leading-snug text-black">{dish.name}</h3>
      {dish.desc && (
        <p className="mt-2 max-w-[26ch] text-xs leading-relaxed text-black/55">{dish.desc}</p>
      )}

      <div className="mt-3 flex items-baseline gap-2">
        <span className="serif-thin text-2xl text-black">{formatPrice(dish.price)}&nbsp;₽</span>
        {dish.weight && <span className="text-xs text-black/45">/ {dish.weight}</span>}
      </div>
    </article>
  );
}
