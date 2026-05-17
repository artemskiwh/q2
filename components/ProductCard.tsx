"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { useFavorites } from "./FavoritesProvider";
import { Icon } from "./Icons";
import { ProductVisual } from "./ProductVisual";

function formatPrice(p: number) {
  return p.toLocaleString("ru-RU") + " ₽";
}

function inStock(p: Product) {
  return !p.tags?.includes("out-of-stock");
}

function rememberScroll() {
  if (typeof window === "undefined") return;
  try {
    const path = window.location.pathname + window.location.search;
    sessionStorage.setItem(`tyag_scroll:${path}`, String(window.scrollY));
  } catch {}
}

export function ProductCard({ product }: { product: Product; index?: number }) {
  const { add } = useCart();
  const { isFav, toggle } = useFavorites();
  const fav = isFav(product.slug);
  const stock = inStock(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bg-line bg-bg-card transition-colors duration-200 hover:border-brand/40">
      <Link
        href={`/catalog/${product.slug}`}
        onClick={rememberScroll}
        className="relative block aspect-[4/5] overflow-hidden"
        aria-label={product.name}
      >
        <div className="absolute inset-2.5">
          <ProductVisual product={product} />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.slug);
          }}
          aria-label={fav ? "Убрать из избранного" : "В избранное"}
          aria-pressed={fav}
          className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border backdrop-blur-md transition ${
            fav
              ? "border-brand/40 bg-brand/20 text-brand"
              : "border-white/15 bg-black/40 text-white/80 hover:text-brand"
          }`}
        >
          <Icon.Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
        </button>

        <span className="pointer-events-none absolute bottom-3.5 left-3.5 z-10 inline-flex items-center rounded-xl bg-gradient-to-br from-brand to-[#d92414] px-2.5 py-1 text-[13px] font-black text-white price-glow">
          {formatPrice(product.price)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5 pt-3 md:p-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          {product.brand}
        </span>
        <Link
          href={`/catalog/${product.slug}`}
          onClick={rememberScroll}
          className="line-clamp-2 text-[14px] font-semibold leading-snug text-white transition hover:text-brand"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
              stock ? "text-emerald-400" : "text-mute2"
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                stock ? "bg-emerald-400" : "bg-mute2"
              }`}
            />
            {stock ? "В наличии" : "Нет в наличии"}
          </span>

          <button
            type="button"
            onClick={() => add(product.slug, 1, undefined, product.name)}
            disabled={!stock}
            className="grid h-9 w-9 place-items-center rounded-xl border border-bg-line bg-bg-elev text-white/80 transition hover:border-brand/60 hover:bg-gradient-to-br hover:from-brand hover:to-[#d92414] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bg-elev disabled:hover:text-white/80"
            aria-label="Добавить в корзину"
          >
            <Icon.Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
