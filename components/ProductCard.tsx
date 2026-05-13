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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bg-line bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
    >
      <Link
        href={`/catalog/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden"
        aria-label={product.name}
      >
        <div className="absolute inset-2.5">
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
            <span className="chip chip-gold">
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
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition hover:scale-105 hover:bg-black/60 hover:text-brand"
        >
          <Icon.Heart className="h-4 w-4" />
        </button>

        <span className="pointer-events-none absolute bottom-3.5 left-3.5 z-10 inline-flex items-center rounded-xl bg-gradient-to-br from-brand to-[#d92414] px-2.5 py-1 text-[13px] font-black text-white shadow-[0_8px_22px_-8px_rgba(255,59,48,0.6)] price-glow">
          {formatPrice(product.price)}
        </span>

        {/* hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3.5 pt-3 md:p-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          {product.brand}
        </span>
        <Link
          href={`/catalog/${product.slug}`}
          className="line-clamp-2 text-[14px] font-semibold leading-snug text-white transition hover:text-brand"
        >
          {product.name}
        </Link>

        {product.puffs ? (
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted">
            <span className="inline-block h-1 w-1 rounded-full bg-accent" />
            {product.puffs.toLocaleString("ru-RU")} затяжек
          </p>
        ) : product.strength ? (
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted">
            <span className="inline-block h-1 w-1 rounded-full bg-accent" />
            {product.strength}
          </p>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2.5">
          {product.oldPrice ? (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : (
            <span className="text-[11px] text-mute2">в наличии</span>
          )}

          <button
            type="button"
            onClick={() => add(product.slug, 1, undefined, product.name)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-bg-line bg-bg-elev text-white/80 transition hover:border-brand/60 hover:bg-gradient-to-br hover:from-brand hover:to-[#d92414] hover:text-white"
            aria-label="Добавить в корзину"
          >
            <Icon.Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
