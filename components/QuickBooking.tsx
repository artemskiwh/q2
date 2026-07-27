"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon } from "./Icons";
import { Rosette } from "./Ornament";
import { formatDateRu, nextDays, timeSlots, todayISO } from "@/lib/booking";
import { restaurant } from "@/lib/restaurant";

/** Компактная полоса брони на главной — переносит выбор в форму на /booking. */
export function QuickBooking() {
  const router = useRouter();
  const days = useMemo(() => nextDays(14), []);
  const [date, setDate] = useState(days[0].iso);
  const slots = useMemo(() => timeSlots(date), [date]);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  const effectiveTime = time && slots.includes(time) ? time : (slots[0] ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      date,
      guests: String(guests),
      ...(effectiveTime ? { time: effectiveTime } : {}),
    });
    router.push(`/booking?${params.toString()}`);
  };

  const selectClass = "field cursor-pointer appearance-none pr-10";

  return (
    <form
      onSubmit={submit}
      className="relative mx-auto w-full max-w-4xl border border-accent/20 bg-night-card/70 p-6 backdrop-blur-sm md:p-8"
    >
      <Rosette className="absolute -top-4 left-1/2 h-8 w-8 -translate-x-1/2 bg-night px-1 text-accent/70" />

      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
        <div>
          <label className="label" htmlFor="qb-date">
            Дата
          </label>
          <div className="relative">
            <select
              id="qb-date"
              className={selectClass}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
              {days.map((d) => (
                <option key={d.iso} value={d.iso} className="bg-night">
                  {d.iso === todayISO() ? "Сегодня, " : ""}
                  {formatDateRu(d.iso, d.iso !== todayISO())}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="qb-time">
            Время
          </label>
          <div className="relative">
            <select
              id="qb-time"
              className={selectClass}
              value={effectiveTime}
              onChange={(e) => setTime(e.target.value)}
              disabled={!slots.length}
            >
              {slots.length ? (
                slots.map((s) => (
                  <option key={s} value={s} className="bg-night">
                    {s}
                  </option>
                ))
              ) : (
                <option className="bg-night">на сегодня закрыто</option>
              )}
            </select>
            <Chevron />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="qb-guests">
            Гостей
          </label>
          <div className="relative">
            <select
              id="qb-guests"
              className={selectClass}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {Array.from(
                { length: restaurant.booking.maxGuestsOnline },
                (_, i) => i + 1,
              ).map((n) => (
                <option key={n} value={n} className="bg-night">
                  {n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        <button type="submit" className="btn btn-white h-[46px]">
          <Icon.Calendar className="h-4 w-4" />
          Забронировать
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-ink-mute">
        Стол держим {restaurant.booking.holdMinutes} минут от времени брони.
        Компанию больше {restaurant.booking.maxGuestsOnline} гостей — оформим по
        телефону.
      </p>
    </form>
  );
}

function Chevron() {
  return (
    <Icon.ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/70" />
  );
}
