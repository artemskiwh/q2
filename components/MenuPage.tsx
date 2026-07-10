"use client";

import { useState } from "react";
import Link from "next/link";
import { FOOD, BAR, formatPrice } from "@/lib/icon-data";
import { DishCard } from "./DishCard";
import { Reveal } from "./Reveal";
import { Divider } from "./Divider";
import { BookingModal } from "./BookingModal";
import { useOpenBooking } from "@/lib/use-open-booking";

// All kitchen dishes as one flat list (no category split)
const KITCHEN_ITEMS = FOOD.flatMap((c) => c.items);

// Split bar items into "bar" (spirits, cocktails, non-alco) and "wine" (wines, champagne, sparkling)
const WINE_GROUPS = BAR.filter((g) => g.kind === "wine");
const BAR_GROUPS = BAR.filter((g) => g.kind !== "wine");

export function MenuPage() {
  const [booking, setBooking] = useState(false);
  useOpenBooking(() => setBooking(true));

  return (
    <>
      <div className="pt-32 md:pt-40" />

      {/* Kitchen */}
      <section id="kitchen" className="relative py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <h1 className="section-title">Меню кухни</h1>
            <p className="section-sub mx-auto mt-4 max-w-md">
              Авторские сочетания и подача,
              <br />
              которая удивляет
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-x-12 md:grid-cols-2">
            {KITCHEN_ITEMS.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Bar */}
      <section id="bar" className="relative py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <h2 className="section-title">Бар</h2>
            <p className="section-sub mx-auto mt-4 max-w-md">
              Авторские коктейли, классика и напитки,
              <br />
              с которыми вечер звучит по-новому
            </p>
          </Reveal>

          <div className="mt-14 columns-1 gap-10 md:columns-2 lg:columns-3 [&>*]:mb-10 [&>*]:break-inside-avoid">
            {BAR_GROUPS.map((group) => (
              <DrinkGroup key={group.title} group={group} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Wine */}
      <section id="wine" className="relative py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <h2 className="section-title">Винная карта</h2>
            <p className="section-sub mx-auto mt-4 max-w-md">
              Тихие вина и игристое,
              <br />
              подобранные к вашему вечеру
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {WINE_GROUPS.map((group) => (
              <DrinkGroup key={group.title} group={group} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="pb-24 pt-4 md:pb-32">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="section-title !text-2xl md:!text-3xl">Готовы отметить вечер?</h2>
            <p className="section-sub mx-auto mt-4 max-w-md">
              Забронируйте стол за пару минут - администратор перезвонит, чтобы подтвердить.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setBooking(true)} className="btn-white">
                Забронировать
              </button>
              <Link href="/" className="btn-ghost">
                На главную
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  );
}

function DrinkGroup({ group }: { group: (typeof BAR)[number] }) {
  return (
    <div className="border border-white/15 bg-white/[0.02] px-6 py-7">
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-white/15 pb-3">
        <h3 className="serif-thin text-lg tracking-[0.14em] text-white md:text-xl">
          {group.title}
        </h3>
        {group.note && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
            {group.note}
          </span>
        )}
      </div>
      <ul className="space-y-2.5">
        {group.items.map((d) => (
          <li key={d.name} className="flex items-baseline gap-2 text-sm">
            <span className="text-white/90">{d.name}</span>
            <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-white/25" />
            <span className="whitespace-nowrap font-medium text-white">
              {formatPrice(d.price)}
              {d.price2 ? (
                <span className="text-white/45"> / {formatPrice(d.price2)}</span>
              ) : null}
              <span className="text-white/45"> ₽</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
