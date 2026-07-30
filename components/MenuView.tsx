"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { Icon } from "./Icons";
import { DishCard } from "./DishCard";
import { OrnamentDivider } from "./Ornament";
import { Reveal } from "./Reveal";
import { categories, dishes } from "@/lib/menu";

/** «41 блюдо», «43 блюда», «45 блюд». */
function dishWord(n: number) {
  const last = n % 10;
  const twoLast = n % 100;
  if (twoLast >= 11 && twoLast <= 14) return "блюд";
  if (last === 1) return "блюдо";
  if (last >= 2 && last <= 4) return "блюда";
  return "блюд";
}

export function MenuView() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
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
      {/* Заголовок страницы — та же высота, что на странице бронирования */}
      <div className="container-page pb-10 pt-[130px] md:pb-14 md:pt-[165px]">
        <Reveal className="flex flex-col items-center text-center">
          <h1 className="display-xl text-[1.8rem] leading-none text-ink md:text-[2.6rem]">
            Меню
          </h1>

          <OrnamentDivider className="rule-draw mt-6 max-w-[360px] md:mt-8" />
        </Reveal>
      </div>

      {/* Поиск — липнет под шапкой, фон тот же, что у страницы */}
      <div
        className="sticky z-30 border-b border-white/10 bg-night/85 backdrop-blur-xl"
        style={{ top: "var(--header-h, 96px)" }}
      >
        <div className="container-page py-3.5 md:py-4">
          <div
            className={clsx(
              "group relative mx-auto flex max-w-xl items-center border transition-colors duration-300",
              focused ? "border-white/70 bg-white/[0.07]" : "border-white/20 bg-white/[0.03]",
            )}
          >
            <Icon.Search
              className={clsx(
                "pointer-events-none ml-4 h-[18px] w-[18px] shrink-0 transition-colors duration-300",
                focused ? "text-ink" : "text-ink-mute",
              )}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Найти блюдо"
              aria-label="Поиск по меню"
              className="w-full bg-transparent py-3.5 pl-3.5 pr-3 text-[0.95rem] text-ink placeholder:text-ink-mute focus:outline-none"
            />
            {filtering ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Очистить поиск"
                className="mr-2 grid h-8 w-8 shrink-0 place-items-center text-ink-mute transition-colors hover:text-ink"
              >
                <Icon.Close className="h-4 w-4" />
              </button>
            ) : (
              <span className="mr-4 hidden shrink-0 text-[0.68rem] uppercase tracking-wider2 text-ink-mute sm:block">
                {dishes.length} {dishWord(dishes.length)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="container-page pb-16 pt-10 md:pb-24 md:pt-14">
        {filtering ? (
          <div>
            <p className="text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
              Найдено: {filtered.length} {dishWord(filtered.length)}
            </p>
            {filtered.length ? (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {filtered.map((d, i) => (
                  <Reveal key={d.id} className="h-full" delay={(i % 2) * 90} variant="zoom">
                    <DishCard dish={d} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-24 text-center">
                <p className="display-xl text-[1.4rem] text-ink">Такого блюда у нас нет</p>
                <p className="mt-3 max-w-sm text-sm text-ink-dim">
                  Попробуйте другой запрос — или спросите официанта, шеф часто
                  готовит вне меню.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-16 md:space-y-24">
            {categories.map((c, ci) => {
              const items = dishes.filter((d) => d.category === c.id);
              if (!items.length) return null;
              return (
                <section key={c.id} id={c.id} className="scroll-mt-[calc(var(--header-h,96px)+90px)]">
                  <Reveal>
                    <div className="rule-draw h-px w-full bg-white/10" />
                    <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-1 md:mt-6">
                      <span className="text-[0.72rem] tabular-nums tracking-wider2 text-ink-mute">
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                      <h2 className="display-xl text-[1.45rem] text-ink md:text-[1.95rem]">
                        {c.name}
                      </h2>
                      <span className="hidden h-px flex-1 bg-white/10 md:block" />
                      <p className="w-full text-[0.82rem] text-ink-mute md:w-auto md:text-[0.85rem]">
                        {c.subtitle}
                      </p>
                    </div>
                  </Reveal>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-10 lg:grid-cols-3">
                    {items.map((d, i) => (
                      <Reveal key={d.id} className="h-full" delay={(i % 2) * 110} variant="zoom">
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
