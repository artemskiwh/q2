"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icons";
import { DishCard } from "./DishCard";
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
      {/* Место под фиксированную шапку */}
      <div style={{ height: "var(--header-h, 96px)" }} aria-hidden="true" />

      {/* Поиск — липнет под шапкой и остаётся хорошо читаемым */}
      <div
        className="sticky z-30 border-b border-white/15 bg-night shadow-[0_18px_40px_-24px_rgba(0,0,0,1)]"
        style={{ top: "var(--header-h, 96px)" }}
      >
        <div className="container-page py-4">
          <div className="relative mx-auto max-w-xl">
            <Icon.Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти блюдо"
              aria-label="Поиск по меню"
              className="w-full border border-white/35 bg-white/[0.06] py-3 pl-12 pr-11 text-[0.95rem] text-ink transition-colors placeholder:text-white/55 focus:border-white focus:bg-white/[0.1] focus:outline-none"
            />
            {filtering ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Очистить поиск"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center text-ink/70 transition-colors hover:text-ink"
              >
                <Icon.Close className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container-page py-14 md:py-20">
        {filtering ? (
          <div>
            <p className="text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
              Найдено блюд: {filtered.length}
            </p>
            {filtered.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((d, i) => (
                  <Reveal key={d.id} delay={(i % 3) * 90} variant="zoom">
                    <DishCard dish={d} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-24 text-center">
                <p className="display-xl text-[1.6rem] text-ink">Такого блюда у нас нет</p>
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
                <section key={c.id} id={c.id} className="scroll-mt-[calc(var(--header-h,96px)+90px)]">
                  <Reveal className="flex flex-col items-center text-center">
                    <h2 className="display-xl text-[1.9rem] text-ink md:text-[2.6rem]">
                      {c.name}
                    </h2>
                    <p className="mt-3 text-[0.85rem] text-ink-mute">{c.subtitle}</p>
                    <OrnamentDivider className="rule-draw mt-6 max-w-[320px]" />
                  </Reveal>

                  <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((d, i) => (
                      <Reveal key={d.id} delay={(i % 3) * 110} variant="zoom">
                        <DishCard dish={d} />
                      </Reveal>
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
