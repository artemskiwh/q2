"use client";

import { useState } from "react";
import clsx from "clsx";
import { useCart } from "./CartProvider";
import type { Product } from "@/lib/types";
import { Icon } from "./Icons";

export function AddToCartPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);

  const variant = product.variants?.[variantIdx];
  const unitPrice = variant && variant.price > 0 ? variant.price : product.price;
  const total = unitPrice * qty;
  const note = variant?.note;

  return (
    <div className="space-y-5">
      {product.variants && product.variants.length > 1 && (
        <div>
          <p className="mb-2 text-sm font-semibold">Вариант поставки</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, i) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setVariantIdx(i)}
                className={clsx(
                  "rounded-xl border px-3 py-2 text-sm transition",
                  i === variantIdx
                    ? "border-brand/60 bg-brand/15 text-white"
                    : "border-bg-line bg-bg-soft text-muted hover:text-white",
                )}
              >
                <span className="block font-medium">{v.label}</span>
                <span className="block text-xs text-muted">
                  {v.price > 0 ? `${v.price.toLocaleString("ru-RU")} ₽` : "по запросу"}
                  {v.note && ` · ${v.note}`}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-bg-line bg-bg-card p-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Итого</p>
          <p className="mt-1 text-3xl font-bold">
            {unitPrice > 0 ? total.toLocaleString("ru-RU") + " ₽" : "По запросу"}
          </p>
          {note && <p className="mt-1 text-xs text-muted">{note}</p>}
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-bg-line bg-bg-soft p-1">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-bg-elev"
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
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-bg-elev"
            aria-label="Увеличить"
          >
            <Icon.Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => add(product.slug, qty, variant?.label, product.name)}
        className="btn-primary w-full justify-center text-base"
      >
        <Icon.Cart className="h-5 w-5" />
        Добавить в корзину
      </button>

      <p className="text-center text-xs text-muted">
        Опт от 100 шт — индивидуальная цена · доставка СДЭК / ПЭК
      </p>
    </div>
  );
}
