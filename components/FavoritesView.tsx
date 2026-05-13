"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useFavorites } from "./FavoritesProvider";
import { useCart } from "./CartProvider";
import { getProduct } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";
import { Icon } from "./Icons";

export function FavoritesView() {
  const { lines, remove, clear } = useFavorites();
  const { add } = useCart();

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.slug);
          if (!product) return null;
          return { line: l, product };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [lines],
  );

  if (!items.length) {
    return (
      <div className="container-page py-16 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
          <Icon.Heart className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">В избранном пока пусто</h1>
        <p className="mt-2 text-sm text-muted">
          Сохраняйте товары и отдельные вкусы — будем держать актуальную цену для опта.
        </p>
        <Link href="/catalog" className="btn-primary mx-auto mt-6 w-fit">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-6 md:py-10">
      <div className="mb-5 flex items-end justify-between gap-3 md:mb-6">
        <h1 className="text-2xl font-black tracking-tight md:text-4xl">Избранное</h1>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-muted hover:text-brand"
        >
          Очистить
        </button>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ line, product }) => (
          <li
            key={`${line.slug}-${line.variant ?? ""}`}
            className="surface flex gap-3 p-3"
          >
            <Link
              href={`/catalog/${product.slug}`}
              className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"
            >
              <ProductVisual product={product} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted">
                    {product.brand}
                  </p>
                  <Link
                    href={`/catalog/${product.slug}`}
                    className="line-clamp-2 text-sm font-semibold text-white hover:text-brand"
                  >
                    {product.name}
                  </Link>
                  {line.variant && (
                    <p className="mt-1 line-clamp-1 text-[11px] text-accent">
                      Вкус: {line.variant}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(line.slug, line.variant)}
                  aria-label="Удалить"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted hover:bg-bg-elev hover:text-brand"
                >
                  <Icon.X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                <span className="text-sm font-bold text-white">
                  {product.price.toLocaleString("ru-RU")} ₽
                </span>
                <button
                  type="button"
                  onClick={() =>
                    add(
                      line.slug,
                      1,
                      line.variant,
                      `${product.name}${line.variant ? ` (${line.variant})` : ""}`,
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg bg-brand/15 px-2.5 py-1.5 text-[12px] font-semibold text-brand hover:bg-brand hover:text-white"
                >
                  <Icon.Cart className="h-3.5 w-3.5" />
                  В корзину
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
