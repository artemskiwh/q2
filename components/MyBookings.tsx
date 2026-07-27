"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { Rosette } from "./Ornament";
import {
  formatDateRu,
  isUpcoming,
  loadBookings,
  removeBooking,
  type Booking,
} from "@/lib/booking";

export function MyBookings({ version = 0 }: { version?: number }) {
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    setBookings(loadBookings());
  }, [version]);

  const cancel = (code: string) => {
    removeBooking(code);
    setBookings(loadBookings());
  };

  // До гидратации ничего не рисуем, чтобы разметка сервера и клиента совпали
  if (bookings === null) return null;

  if (!bookings.length) {
    return (
      <div className="flex flex-col items-center border border-white/8 bg-night-card/30 px-6 py-16 text-center">
        <Rosette className="h-9 w-9 text-gold/35" />
        <p className="display-xl mt-5 text-[1.5rem] text-ink">Здесь появятся ваши брони</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-mute">
          Забронируйте стол выше — карточка с кодом сохранится в этом браузере,
          чтобы её было легко показать хостес.
        </p>
      </div>
    );
  }

  const upcoming = bookings.filter(isUpcoming);
  const past = bookings.filter((b) => !isUpcoming(b));

  return (
    <div className="space-y-10">
      {upcoming.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {upcoming.map((b) => (
            <BookingCard key={b.code} booking={b} onCancel={cancel} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-mute">Активных броней нет.</p>
      )}

      {past.length ? (
        <div>
          <h3 className="eyebrow">Прошедшие</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {past.map((b) => (
              <BookingCard key={b.code} booking={b} onCancel={cancel} past />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BookingCard({
  booking,
  onCancel,
  past,
}: {
  booking: Booking;
  onCancel: (code: string) => void;
  past?: boolean;
}) {
  return (
    <article
      className={`relative border p-6 transition-opacity ${
        past ? "border-white/8 bg-night-card/20 opacity-60" : "border-gold/20 bg-night-card/50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="display-xl block text-[1.5rem] leading-tight text-ink">
            {formatDateRu(booking.date, false)} · {booking.time}
          </span>
          <span className="mt-1 block text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
            {booking.guests}{" "}
            {booking.guests === 1 ? "гость" : booking.guests < 5 ? "гостя" : "гостей"} ·{" "}
            {booking.hallName}
          </span>
        </div>
        <span className="display-xl shrink-0 text-[1.1rem] tracking-wide text-gold">
          {booking.code}
        </span>
      </div>

      {booking.comment ? (
        <p className="mt-4 border-t border-white/8 pt-4 text-[0.82rem] leading-relaxed text-ink-dim">
          {booking.comment}
        </p>
      ) : null}

      <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
        <span className="text-[0.72rem] text-ink-mute">{booking.name}</span>
        <button
          type="button"
          onClick={() => onCancel(booking.code)}
          className="flex items-center gap-1.5 text-[0.66rem] uppercase tracking-wider2 text-ink-mute transition-colors hover:text-pom-light"
        >
          <Icon.Trash className="h-3.5 w-3.5" />
          {past ? "Убрать" : "Отменить"}
        </button>
      </div>
    </article>
  );
}
