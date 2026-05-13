"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "./CartProvider";
import { getProduct } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";
import { Icon } from "./Icons";

export function CartView() {
  const { lines, remove, setQty, clear } = useCart();

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.slug);
          if (!product) return null;
          const variant = product.variants?.find((v) => v.label === l.variant);
          const unit = variant && variant.price > 0 ? variant.price : product.price;
          return { line: l, product, unit, subtotal: unit * l.qty };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [lines],
  );

  const total = items.reduce((s, it) => s + it.subtotal, 0);
  const totalQty = items.reduce((s, it) => s + it.line.qty, 0);

  if (!items.length) {
    return (
      <div className="container-page py-16 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
          <Icon.Cart className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Корзина пуста</h1>
        <p className="mt-2 text-sm text-muted">
          Загляните в каталог — у нас более 300 позиций для опта.
        </p>
        <Link href="/catalog" className="btn-primary mx-auto mt-6 w-fit">
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-6 flex items-end justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Корзина</h1>
        <button type="button" onClick={clear} className="text-sm text-muted hover:text-brand">
          Очистить
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-3">
          {items.map(({ line, product, unit, subtotal }) => (
            <li
              key={`${line.slug}-${line.variant ?? ""}`}
              className="flex gap-4 rounded-2xl border border-bg-line bg-bg-card p-3 md:p-4"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <ProductVisual product={product} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted">
                      {product.brand}
                    </p>
                    <Link
                      href={`/catalog/${product.slug}`}
                      className="line-clamp-2 text-sm font-semibold hover:text-brand md:text-base"
                    >
                      {product.name}
                    </Link>
                    {line.variant && (
                      <p className="mt-1 text-xs text-muted">Вариант: {line.variant}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.slug, line.variant)}
                    aria-label="Удалить"
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-bg-elev hover:text-brand"
                  >
                    <Icon.X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between gap-3">
                  <div className="flex items-center gap-1 rounded-xl border border-bg-line bg-bg-soft p-0.5">
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.qty - 1, line.variant)}
                      className="grid h-8 w-8 place-items-center rounded-lg hover:bg-bg-elev"
                      aria-label="Уменьшить"
                    >
                      <Icon.Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.qty + 1, line.variant)}
                      className="grid h-8 w-8 place-items-center rounded-lg hover:bg-bg-elev"
                      aria-label="Увеличить"
                    >
                      <Icon.Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted">
                      {unit.toLocaleString("ru-RU")} ₽ × {line.qty}
                    </p>
                    <p className="text-base font-bold">
                      {subtotal.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-bg-line bg-bg-card p-5 lg:sticky lg:top-24">
          <h3 className="text-lg font-bold">Итого</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-muted">
              <span>Позиций</span>
              <span>{items.length}</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>Товаров</span>
              <span>{totalQty} шт</span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-bg-line pt-4">
            <span className="text-sm text-muted">К оплате</span>
            <span className="text-2xl font-bold">{total.toLocaleString("ru-RU")} ₽</span>
          </div>
          <button type="button" className="btn-primary mt-5 w-full justify-center">
            Оформить заказ
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            После оформления менеджер свяжется в Telegram для уточнения деталей.
          </p>
        </aside>
      </div>
    </div>
  );
}
