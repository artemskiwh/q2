"use client";

import { useState } from "react";
import { FOOD, BAR, formatPrice } from "@/lib/icon-data";
import { DishCard } from "./DishCard";
import { Reveal } from "./Reveal";

const FOOD_TABS = FOOD.map((c) => ({ id: c.id, title: c.title }));
const TABS = [...FOOD_TABS, { id: "bar", title: "Бар & Напитки" }];

export function Menu() {
  const [active, setActive] = useState<string>(FOOD[0].id);
  const activeFood = FOOD.find((c) => c.id === active);

  return (
    <section id="menu" className="relative py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center">
          <span className="eyebrow mb-6">Меню</span>
          <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
            Авторская кухня <span className="text-gold-gradient">ICON</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted">
            Каждое блюдо — как исполнение на бис. Свежие продукты, эффектная
            подача и вкус, который запоминается.
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5 md:mt-12">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                active === t.id
                  ? "border-gold bg-gold-gradient text-ink shadow-gold"
                  : "border-gold/20 text-muted hover:border-gold/50 hover:text-gold"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Food grid */}
        {activeFood && (
          <div
            key={activeFood.id}
            className="mt-12 grid animate-fade-in-up grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeFood.items.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        )}

        {/* Bar list */}
        {active === "bar" && (
          <div className="mt-12 animate-fade-in-up">
            <div className="columns-1 gap-8 md:columns-2 lg:columns-3 [&>*]:mb-8 [&>*]:break-inside-avoid">
              {BAR.map((group) => (
                <div
                  key={group.title}
                  className="gold-frame bg-ink-card/40 px-6 py-6"
                >
                  <div className="mb-4 flex items-baseline justify-between border-b border-gold/20 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gold-light">
                      {group.title}
                    </h3>
                    {group.note && (
                      <span className="text-[10px] text-mute2">{group.note}</span>
                    )}
                  </div>
                  <ul className="space-y-2.5">
                    {group.items.map((d) => (
                      <li key={d.name} className="flex items-baseline gap-2 text-sm">
                        <span className="text-white/90">{d.name}</span>
                        <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-ink-line" />
                        <span className="whitespace-nowrap font-medium text-gold">
                          {formatPrice(d.price)}
                          {d.price2 ? (
                            <span className="text-mute2"> / {formatPrice(d.price2)}</span>
                          ) : null}
                          <span className="text-mute2"> ₽</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-mute2">
          При наличии пищевой аллергии, пожалуйста, сообщите официанту при заказе.
          Цены указаны в российских рублях. Меню может незначительно отличаться —
          актуальные позиции уточняйте у администратора.
        </p>
      </div>
    </section>
  );
}
