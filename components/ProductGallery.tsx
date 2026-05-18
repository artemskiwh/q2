"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { withBasePath } from "@/lib/path";
import { ProductVisual } from "./ProductVisual";

/**
 * Image gallery for a product detail page. If PRODUCT_IMAGES has multiple
 * real photos for this slug, show them as separate angles. Otherwise fall
 * back to the SVG visual against three different background tones.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);

  const realPhotos = (
    product.image ? [product.image] : PRODUCT_IMAGES[product.slug] ?? []
  ).map((u) => withBasePath(u)!);

  // SVG fallback backdrops (used when there are no real photos).
  const tones = [
    "linear-gradient(180deg, #181820 0%, #0a0a10 100%)",
    "radial-gradient(80% 60% at 50% 30%, rgba(255,59,48,0.18) 0%, #0a0a10 70%)",
    "radial-gradient(80% 60% at 50% 30%, rgba(34,211,238,0.16) 0%, #0a0a10 70%)",
  ];

  // Use exactly as many thumbnails as there are real photos — no padding.
  const slides = realPhotos.length > 0 ? realPhotos : null;
  const thumbs: (string | null)[] = slides ?? tones;
  const safeIdx = Math.min(idx, thumbs.length - 1);

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-2xl border border-bg-line md:rounded-3xl"
        style={{
          background: slides ? "#0a0a10" : (tones[safeIdx] as string),
        }}
      >
        {slides ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slides[safeIdx]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div className="absolute inset-4 md:inset-8">
            <ProductVisual product={product} variant="hero" />
          </div>
        )}
      </div>

      {thumbs.length > 1 && (
        <div
          className="grid gap-2 md:gap-3"
          style={{ gridTemplateColumns: `repeat(${thumbs.length}, minmax(0, 1fr))` }}
        >
          {thumbs.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Ракурс ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                i === safeIdx ? "border-brand" : "border-bg-line hover:border-white/20"
              }`}
              style={{
                background: slides ? "#0a0a10" : (s as string),
                backgroundImage: slides ? `url(${s})` : undefined,
                backgroundSize: slides ? "cover" : undefined,
                backgroundPosition: slides ? "center" : undefined,
              }}
            >
              {!slides && (
                <div className="absolute inset-2">
                  <ProductVisual product={product} />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
