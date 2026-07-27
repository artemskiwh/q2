"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Icon } from "./Icons";
import { DishRow } from "./DishCard";
import { OrnamentDivider, Rosette } from "./Ornament";
import { Reveal } from "./Reveal";
import { categories, dishes, TAG_LABELS, type DishTag } from "@/lib/menu";

const FILTERS: DishTag[] = ["hit", "chef", "spicy", "veg", "new"];

export function MenuView() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<DishTag[]>([]);
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  const filtering = query.trim().length > 0 || activeTags.length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      const matchesTags =
        !activeTags.length || activeTags.every((t) => d.tags?.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags]);

  // Подсветка активного раздела при прокрутке
  useEffect(() => {
    if (filtering || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveCat(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [filtering]);

  // Держим активную вкладку в поле зрения на мобильных
  useEffect(() => {
    const nav = navRef.current;
    const chip = nav?.querySelector<HTMLElement>(`[data-cat="${activeCat}"]`);
    if (!nav || !chip) return;
    const target = chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2;
    nav.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeCat]);

  const toggleTag = (tag: DishTag) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  return (
    <>
      {/* Панель фильтров */}
      <div className="sticky top-[74px] z-30 border-b border-gold/12 bg-night/92 backdrop-blur-xl md:top-[86px]">
        <div className="container-page py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative lg:w-[280px] lg:shrink-0">
              <Icon.Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Найти блюдо"
                aria-label="Поиск по меню"
                className="field pl-10"
              />
            </div>

            <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 lg:mx-0 lg:flex-wrap lg:px-0">
              {FILTERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  aria-pressed={activeTags.includes(t)}
                  className={clsx(
                    "shrink-0 border px-3.5 py-1.5 text-[0.66rem] uppercase tracking-wider2 transition-all",
                    activeTags.includes(t)
                      ? "border-gold/60 bg-gold/12 text-gold-light"
                      : "border-white/10 text-ink-dim hover:border-gold/35 hover:text-ink",
                  )}
                >
                  {TAG_LABELS[t]}
                </button>
              ))}
              {filtering ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveTags([]);
                  }}
                  className="flex shrink-0 items-center gap-1.5 px-2 text-[0.66rem] uppercase tracking-wider2 text-ink-mute transition-colors hover:text-gold"
                >
                  <Icon.Close className="h-3.5 w-3.5" />
                  Сбросить
                </button>
              ) : null}
            </div>
          </div>

          {!filtering ? (
            <div
              ref={navRef}
              className="scrollbar-hide -mx-1 mt-4 flex gap-1 overflow-x-auto"
            >
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  data-cat={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={clsx(
                    "whitespace-nowrap px-3.5 py-2 text-[0.68rem] uppercase tracking-wider2 transition-colors",
                    activeCat === c.id
                      ? "text-gold"
                      : "text-ink-mute hover:text-ink",
                  )}
                >
                  {c.name}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Содержимое */}
      <div className="container-page py-14 md:py-20">
        {filtering ? (
          <div>
            <p className="text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
              Найдено блюд: {filtered.length}
            </p>
            {filtered.length ? (
              <div className="mt-6">
                {filtered.map((d) => (
                  <DishRow key={d.id} dish={d} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-24 text-center">
                <Rosette className="h-10 w-10 text-gold/40" />
                <p className="display-xl mt-6 text-[1.6rem] text-ink">
                  Такого блюда у нас нет
                </p>
                <p className="mt-3 max-w-sm text-sm text-ink-dim">
                  Попробуйте другой запрос — или спросите официанта, шеф часто
                  готовит вне меню.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-20 md:space-y-28">
            {categories.map((c) => {
              const items = dishes.filter((d) => d.category === c.id);
              if (!items.length) return null;
              return (
                <section key={c.id} id={c.id} className="scroll-mt-[190px]">
                  <Reveal className="flex flex-col items-center text-center">
                    <h2 className="display-xl text-[2rem] text-ink md:text-[2.6rem]">
                      {c.name}
                    </h2>
                    <p className="mt-3 text-[0.85rem] text-ink-mute">{c.subtitle}</p>
                    <OrnamentDivider className="mt-6 max-w-[320px]" />
                  </Reveal>

                  <div className="mt-8">
                    {items.map((d) => (
                      <DishRow key={d.id} dish={d} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
