"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icons";
import { DishRow } from "./DishCard";
import { OrnamentDivider } from "./Ornament";
import { Reveal } from "./Reveal";
import { categories, dishes } from "@/lib/menu";

export function MenuView() {
  const [query, setQuery] = useState("");

  const filtering = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      {/* Поиск по меню */}
      <div className="sticky top-[92px] z-30 border-b border-white/10 bg-night/95 backdrop-blur-xl md:top-[106px]">
        <div className="container-page py-4">
          <div className="relative mx-auto max-w-xl">
            <Icon.Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти блюдо"
              aria-label="Поиск по меню"
              className="field pl-10"
            />
          </div>
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
                <p className="display-xl text-[1.6rem] text-ink">
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
                <section key={c.id} id={c.id} className="scroll-mt-[210px]">
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
