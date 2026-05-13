"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { useFavorites } from "./FavoritesProvider";
import { Icon } from "./Icons";

function formatPrice(p: number) {
  return p.toLocaleString("ru-RU") + " ₽";
}

export function ProductBuyPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const { isFav, toggle } = useFavorites();

  const flavors = product.flavors ?? [];
  const [flavor, setFlavor] = useState<string | null>(flavors[0] ?? null);
  const [qty, setQty] = useState(1);

  const stock = product.inStock !== false;
  const variantKey = flavor ?? undefined;
  const fav = isFav(product.slug, variantKey);
  const total = product.price * qty;

  return (
    <div className="space-y-5">
      {/* Stock + puffs row */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-semibold",
            stock
              ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
              : "bg-zinc-500/10 text-zinc-400 ring-1 ring-zinc-500/20",
          )}
        >
          <span
            className={clsx(
              "inline-block h-1.5 w-1.5 rounded-full",
              stock ? "bg-emerald-400" : "bg-zinc-400",
            )}
          />
          {stock ? "В наличии" : "Нет в наличии"}
        </span>

        {product.puffs && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand/10 px-2.5 py-1 text-[12px] font-semibold text-brand ring-1 ring-brand/25">
            <Icon.Bolt className="h-3 w-3" />
            {product.puffs.toLocaleString("ru-RU")} затяжек
          </span>
        )}
      </div>

      {flavors.length > 0 && (
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-sm font-semibold text-white">Вкус</p>
            <p className="text-xs text-muted">
              {flavor ?? "Выберите вкус"} · {flavors.length} вариантов
            </p>
          </div>
          <div className="grid max-h-[280px] grid-cols-1 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-2">
            {flavors.map((f) => {
              const active = f === flavor;
              const isF = isFav(product.slug, f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFlavor(f)}
                  className={clsx(
                    "group flex items-center justify-between rounded-xl border px-3 py-2 text-left text-[13px] transition",
                    active
                      ? "border-brand/60 bg-brand/10 text-white"
                      : "border-bg-line bg-bg-card text-muted hover:border-white/20 hover:text-white",
                  )}
                >
                  <span className="line-clamp-1">{f}</span>
                  {isF && <Icon.Heart className="h-3.5 w-3.5 shrink-0 fill-current text-brand" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="surface flex items-end justify-between gap-3 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted">Цена за шт.</p>
          <p className="mt-1 text-3xl font-black text-white">{formatPrice(product.price)}</p>
          {product.oldPrice && (
            <p className="mt-1 text-xs text-mute2 line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-bg-line bg-bg-elev p-1">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-bg-hover"
            aria-label="Уменьшить"
          >
            <Icon.Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="w-12 bg-transparent text-center text-base font-semibold focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-bg-hover"
            aria-label="Увеличить"
          >
            <Icon.Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-muted">
          Итого:{" "}
          <span className="font-semibold text-white">{formatPrice(total)}</span>
        </p>
        <p className="text-xs text-mute2">Доставка СДЭК / ПЭК · опт от 50 шт</p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!stock}
          onClick={() =>
            add(product.slug, qty, variantKey, `${product.name}${flavor ? ` (${flavor})` : ""}`)
          }
          className="btn-primary flex-1 justify-center text-base disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon.Cart className="h-5 w-5" />
          В корзину
        </button>
        <button
          type="button"
          onClick={() => toggle(product.slug, variantKey)}
          aria-label={fav ? "Убрать из избранного" : "Добавить в избранное"}
          aria-pressed={fav}
          className={clsx(
            "grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] border transition",
            fav
              ? "border-brand/40 bg-brand/15 text-brand"
              : "border-bg-line bg-bg-elev text-white/80 hover:border-brand/40 hover:text-brand",
          )}
        >
          <Icon.Heart className={clsx("h-5 w-5", fav && "fill-current")} />
        </button>
      </div>
    </div>
  );
}
