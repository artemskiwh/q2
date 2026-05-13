"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductVisual } from "./ProductVisual";

/**
 * Image gallery for a product. We don't have real photos, so render the
 * generated visual against three different background tones to simulate
 * different angles / lifestyle shots.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);

  const variants = [
    { bg: "linear-gradient(180deg, #181820 0%, #0a0a10 100%)" },
    { bg: "radial-gradient(80% 60% at 50% 30%, rgba(255,59,48,0.18) 0%, #0a0a10 70%)" },
    { bg: "radial-gradient(80% 60% at 50% 30%, rgba(34,211,238,0.16) 0%, #0a0a10 70%)" },
  ];

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-2xl border border-bg-line md:rounded-3xl"
        style={{ background: variants[idx].bg }}
      >
        <div className="absolute inset-4 md:inset-8">
          <ProductVisual product={product} variant="hero" />
        </div>

        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-1.5 md:left-6 md:top-6">
          {product.isHot && <span className="chip chip-brand">Хит</span>}
          {product.isNew && <span className="chip chip-accent">Новинка</span>}
          {product.isSale && product.oldPrice && (
            <span className="chip chip-gold">
              −{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {variants.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Ракурс ${i + 1}`}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
              i === idx ? "border-brand" : "border-bg-line hover:border-white/20"
            }`}
            style={{ background: v.bg }}
          >
            <div className="absolute inset-2">
              <ProductVisual product={product} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
