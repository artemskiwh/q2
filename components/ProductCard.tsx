"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { Icon } from "./Icons";
import { ProductVisual } from "./ProductVisual";

function formatPrice(p: number) {
  return p.toLocaleString("ru-RU") + " ₽";
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.03, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bg-line bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card"
    >
      <Link
        href={`/catalog/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden"
        aria-label={product.name}
      >
        <div className="absolute inset-3">
          <ProductVisual product={product} />
        </div>

        <div className="absolute left-3 top-3 z-10 flex flex-wrap items-start gap-1.5">
          {product.isHot && (
            <span className="chip chip-brand">
              <Icon.Fire className="h-3 w-3" /> Хит
            </span>
          )}
          {product.isNew && <span className="chip chip-accent">Новинка</span>}
          {product.isSale && product.oldPrice && (
            <span className="chip chip-brand">
              −{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label="В избранное"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/35 text-white/80 backdrop-blur-md transition hover:bg-black/55 hover:text-brand"
        >
          <Icon.Heart className="h-4 w-4" />
        </button>

        <span className="pointer-events-none absolute bottom-4 left-4 z-10 inline-flex items-center rounded-lg bg-brand px-2.5 py-1 text-sm font-bold text-white shadow-glow">
          {formatPrice(product.price)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4 pt-3">
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
          {product.brand}
        </span>
        <Link
          href={`/catalog/${product.slug}`}
          className="line-clamp-2 text-[14px] font-semibold leading-snug text-white transition hover:text-brand"
        >
          {product.name}
        </Link>

        {product.puffs && (
          <p className="mt-0.5 text-xs text-muted">
            {product.puffs.toLocaleString("ru-RU")} затяжек
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          {product.oldPrice ? (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={() => add(product.slug, 1, undefined, product.name)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-bg-line bg-bg-elev text-white/80 transition hover:border-brand/60 hover:bg-brand hover:text-white"
            aria-label="Добавить в корзину"
          >
            <Icon.Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
