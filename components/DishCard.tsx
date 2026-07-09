"use client";

import { useState } from "react";
import type { Dish } from "@/lib/icon-data";
import { formatPrice } from "@/lib/icon-data";
import { withBasePath } from "@/lib/path";

/**
 * Compact menu row: small circular photo thumbnail on the left,
 * dish name + weight, dotted leader and price on the right.
 * Falls back to a subtle plate placeholder until a real photo
 * (/dishes/<slug>.webp) is added.
 */
export function DishCard({ dish }: { dish: Dish }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = withBasePath(`/dishes/${dish.img}.webp`);

  return (
    <article className="group flex items-center gap-4 border-b border-white/10 py-4">
      {/* thumbnail */}
      <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full">
        {(!loaded || failed) && (
          <div className="plate-fallback absolute inset-0 flex items-center justify-center rounded-full">
            <CutleryIcon className="h-6 w-6 text-white/25" />
          </div>
        )}
        {!failed && (
          <img
            src={src}
            alt={dish.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full rounded-full object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="text-[15px] font-medium leading-snug text-white">{dish.name}</h3>
          <span className="mx-1 hidden flex-1 translate-y-[-3px] border-b border-dotted border-white/20 sm:block" />
          <span className="ml-auto whitespace-nowrap text-[15px] text-white sm:ml-0">
            {formatPrice(dish.price)}&nbsp;₽
          </span>
        </div>
        {(dish.weight || dish.desc) && (
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            {dish.weight}
            {dish.weight && dish.desc ? " · " : ""}
            {dish.desc}
          </p>
        )}
      </div>
    </article>
  );
}

function CutleryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M18 3c-1.5 0-3 1.5-3 5s1.5 4 3 4m0 0v9" />
    </svg>
  );
}
