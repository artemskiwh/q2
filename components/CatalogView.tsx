"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { BRANDS, CATEGORIES, PRODUCTS, CATEGORY_LABEL } from "@/lib/products";
import type { Category } from "@/lib/types";
import { Icon } from "./Icons";
import { CategoryIcons } from "./CategoryIcons";
import { ProductCard } from "./ProductCard";

type Sort = "popular" | "price-asc" | "price-desc" | "new";

const SORT_LABELS: Record<Sort, string> = {
  popular: "По популярности",
  "price-asc": "Сначала дешёвые",
  "price-desc": "Сначала дорогие",
  new: "Сначала новинки",
};

const PRICE_MIN = 0;
const PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));

export function CatalogView() {
  const router = useRouter();
  const params = useSearchParams();

  const category = (params.get("category") as Category | null) ?? null;
  const query = params.get("q") ?? "";

  const [activeCat, setActiveCat] = useState<Category | "all">(category ?? "all");
  const [brands, setBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(PRICE_MAX);
  const [sort, setSort] = useState<Sort>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Restore scroll position when returning from a product page.
  useEffect(() => {
    try {
      const key = `tyag_scroll:${window.location.pathname}${window.location.search}`;
      const saved = sessionStorage.getItem(key);
      if (!saved) return;
      sessionStorage.removeItem(key);
      const y = parseInt(saved, 10);
      // Wait two frames so the grid has been rendered before scrolling.
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
    } catch {}
  }, []);

  const filtered = useMemo(() => {
    let list = PRODUCTS;

    if (activeCat !== "all") {
      list = activeCat === "sale" ? list.filter((p) => p.isSale) : list.filter((p) => p.category === activeCat);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDesc?.toLowerCase().includes(q) ||
          p.flavors?.some((f) => f.toLowerCase().includes(q)),
      );
    }
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "new":
        list = [...list].sort((a, b) => Number(b.isNew ?? 0) - Number(a.isNew ?? 0));
        break;
    }
    return list;
  }, [activeCat, query, brands, priceMax, sort]);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const resetAll = () => {
    setActiveCat("all");
    setBrands([]);
    setPriceMax(PRICE_MAX);
    setSort("popular");
    router.replace("/catalog");
  };

  return (
    <div className="container-page py-6 md:py-10">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Каталог</h1>
          <p className="mt-1 text-sm text-muted">
            {filtered.length} {filtered.length === 1 ? "товар" : "товаров"}
            {activeCat !== "all" && ` · ${CATEGORY_LABEL[activeCat as Category]}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="input w-auto pr-8 text-sm"
          >
            {Object.entries(SORT_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn-secondary md:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <Icon.Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-visible">
        <CatTab active={activeCat === "all"} onClick={() => setActiveCat("all")}>
          Все
        </CatTab>
        {CATEGORIES.map((c) => {
          const Cat = CategoryIcons[c.id];
          return (
            <CatTab
              key={c.id}
              active={activeCat === c.id}
              onClick={() => setActiveCat(c.id)}
            >
              <Cat className="mr-1.5 h-4 w-4" />
              {c.label}
            </CatTab>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className="hidden md:block">
          <FiltersPanel
            brands={brands}
            toggleBrand={toggleBrand}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            reset={resetAll}
          />
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-bg-line bg-bg-card py-20 text-center">
              <p className="text-lg font-semibold">Ничего не найдено</p>
              <p className="mt-1 text-sm text-muted">Попробуйте сбросить фильтры или поиск</p>
              <button type="button" onClick={resetAll} className="btn-primary mt-4">
                Сбросить
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setFiltersOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border-t border-bg-line bg-bg-soft p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-bg-line" />
            <FiltersPanel
              brands={brands}
              toggleBrand={toggleBrand}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              reset={resetAll}
            />
            <button
              type="button"
              className="btn-primary mt-4 w-full justify-center"
              onClick={() => setFiltersOpen(false)}
            >
              Показать {filtered.length} товаров
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CatTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-sm font-medium transition",
        active
          ? "border-brand/60 bg-brand/15 text-white"
          : "border-bg-line bg-bg-card text-muted hover:border-bg-line/80 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function FiltersPanel({
  brands,
  toggleBrand,
  priceMax,
  setPriceMax,
  reset,
}: {
  brands: string[];
  toggleBrand: (b: string) => void;
  priceMax: number;
  setPriceMax: (n: number) => void;
  reset: () => void;
}) {
  return (
    <div className="space-y-6 rounded-2xl border border-bg-line bg-bg-card p-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold">Цена</span>
          <span className="text-xs text-muted">
            до {priceMax.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={50}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-brand"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Бренды</p>
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((b) => {
            const active = brands.includes(b);
            return (
              <button
                key={b}
                type="button"
                onClick={() => toggleBrand(b)}
                className={clsx(
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  active
                    ? "border-brand/60 bg-brand/15 text-white"
                    : "border-bg-line bg-bg-soft text-muted hover:text-white",
                )}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      <button type="button" onClick={reset} className="btn-secondary w-full justify-center">
        Сбросить фильтры
      </button>
    </div>
  );
}
