"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Icon } from "./Icons";
import { OrnamentDivider } from "./Ornament";
import {
  formatDateRu,
  formatPhone,
  isValidPhone,
  makeBookingCode,
  maxDateISO,
  timeSlots,
  todayISO,
  type Booking,
} from "@/lib/booking";
import { restaurant } from "@/lib/restaurant";

/** Заголовок шага: номер в кружке, название и галочка, когда шаг заполнен. */
function Step({
  n,
  title,
  hint,
  done,
}: {
  n: number;
  title: string;
  hint?: string;
  done?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className={clsx(
          "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[0.66rem] tabular-nums transition-colors duration-300",
          done ? "border-white bg-white text-night" : "border-white/25 text-ink-mute",
        )}
      >
        {done ? <Icon.Check className="h-3.5 w-3.5" /> : n}
      </span>
      <span className="text-[0.74rem] uppercase tracking-wider2 text-ink">{title}</span>
      {hint ? <span className="text-[0.74rem] text-ink-mute">{hint}</span> : null}
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/** Кнопка выбора: активная — белая заливка, обычная — тонкая рамка. */
const choice = (active: boolean) =>
  clsx(
    "border transition-all duration-200",
    active
      ? "border-white bg-white text-night"
      : "border-white/15 text-ink-dim hover:border-white/50 hover:text-ink",
  );

/** Подсказка об ошибке под шагом. */
function Hint({ text }: { text: string }) {
  return (
    <p className="mt-3 flex items-center gap-2 text-[0.82rem] text-ink" role="alert">
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-white/60 text-[0.6rem]">
        !
      </span>
      {text}
    </p>
  );
}

export function BookingForm() {
  const params = useSearchParams();

  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState<Booking | null>(null);

  const slots = useMemo(() => timeSlots(date), [date]);

  /* Слоты делим на день и вечер — так их проще разглядеть */
  const { day, evening } = useMemo(() => {
    const day: string[] = [];
    const evening: string[] = [];
    slots.forEach((s) => (Number(s.slice(0, 2)) < 17 ? day : evening).push(s));
    return { day, evening };
  }, [slots]);

  /* Предзаполнение из адресной строки */
  useEffect(() => {
    const qDate = params.get("date");
    const qTime = params.get("time");
    const qGuests = Number(params.get("guests"));

    if (qDate && /^\d{4}-\d{2}-\d{2}$/.test(qDate) && qDate >= todayISO()) setDate(qDate);
    if (qTime && /^\d{2}:\d{2}$/.test(qTime)) setTime(qTime);
    if (qGuests >= 1 && qGuests <= restaurant.booking.maxGuestsOnline) setGuests(qGuests);
  }, [params]);

  /* Слот мог стать недоступным при смене даты */
  useEffect(() => {
    if (time && !slots.includes(time)) setTime("");
  }, [slots, time]);

  const nameValid = name.trim().length >= 2;
  const phoneValid = isValidPhone(phone);
  const ready = Boolean(time) && nameValid && phoneValid;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, time: true });

    if (!time) {
      setError("Выберите время");
      document.getElementById("step-time")?.scrollIntoView({ block: "center" });
      return;
    }
    if (!nameValid || !phoneValid) {
      setError("Оставьте имя и телефон — по ним подтвердим бронь");
      document.getElementById("step-contacts")?.scrollIntoView({ block: "center" });
      return;
    }

    setResult({
      code: makeBookingCode(),
      date,
      time,
      guests,
      name: name.trim(),
      phone,
      comment: comment.trim() || undefined,
      createdAt: Date.now(),
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    return (
      <BookingSuccess
        booking={result}
        onReset={() => {
          setResult(null);
          setTime("");
          setName("");
          setPhone("");
          setComment("");
          setTouched({});
          setError("");
        }}
      />
    );
  }

  const guestWord = guests === 1 ? "гость" : guests < 5 ? "гостя" : "гостей";

  return (
    <form
      onSubmit={submit}
      className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12"
    >
      <div className="min-w-0 border border-white/12 bg-night-card/40 p-6 md:p-9">
        <div className="space-y-11">
          {/* 01 — дата */}
          <fieldset>
            <Step n={1} title="Дата" done />

            <div className="group/date relative">
              <div className="flex items-center gap-4 border border-white/20 bg-white/[0.04] px-5 py-4 transition-colors group-hover/date:border-white/45">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/20 text-ink">
                  <Icon.Calendar className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.66rem] uppercase tracking-wider2 text-ink-mute">
                    Дата визита
                  </span>
                  <span className="mt-1 block truncate text-[1.05rem] text-ink">
                    {formatDateRu(date)}
                  </span>
                </span>
                <span className="hidden shrink-0 text-[0.72rem] uppercase tracking-wider2 text-ink-mute sm:block">
                  Изменить
                </span>
                <Icon.ChevronDown className="h-4 w-4 shrink-0 text-ink-mute" />
              </div>

              <input
                type="date"
                value={date}
                min={todayISO()}
                max={maxDateISO()}
                aria-label="Дата визита"
                onChange={(e) => e.target.value && setDate(e.target.value)}
                onClick={(e) => {
                  const el = e.currentTarget as HTMLInputElement & {
                    showPicker?: () => void;
                  };
                  try {
                    el.showPicker?.();
                  } catch {
                    /* браузер откроет календарь сам */
                  }
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </fieldset>

          {/* 02 — время */}
          <fieldset id="step-time">
            <Step n={2} title="Время" done={Boolean(time)} />

            {slots.length ? (
              <div className="space-y-5">
                {[
                  ["Днём", day],
                  ["Вечером", evening],
                ].map(([label, list]) =>
                  (list as string[]).length ? (
                    <div key={label as string}>
                      <p className="mb-2.5 text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
                        {label as string}
                      </p>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-7">
                        {(list as string[]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setTime(s);
                              setError("");
                            }}
                            className={clsx("py-2.5 text-sm tabular-nums", choice(time === s))}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            ) : (
              <p className="border border-white/12 p-5 text-sm text-ink-dim">
                На сегодня онлайн-бронь закрыта. Выберите завтрашний день или позвоните
                — часто мы находим стол и в последний момент.
              </p>
            )}

            {touched.time && !time ? <Hint text="Выберите время" /> : null}
          </fieldset>

          {/* 03 — гости */}
          <fieldset>
            <Step n={3} title="Гости" hint={`${guests} ${guestWord}`} done />
            <div className="flex flex-wrap gap-2">
              {Array.from(
                { length: restaurant.booking.maxGuestsOnline },
                (_, i) => i + 1,
              ).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setGuests(n)}
                  className={clsx("h-12 w-12 text-sm tabular-nums", choice(guests === n))}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-mute">
              Компанию больше {restaurant.booking.maxGuestsOnline} гостей соберём отдельно —{" "}
              <a
                href={`tel:${restaurant.phoneHref}`}
                className="text-ink underline underline-offset-4"
              >
                позвоните нам
              </a>
              .
            </p>
          </fieldset>

          {/* 04 — контакты */}
          <fieldset id="step-contacts">
            <Step n={4} title="Ваши данные" done={nameValid && phoneValid} />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="bf-name">
                  Имя
                </label>
                <input
                  id="bf-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  placeholder="Как к вам обращаться"
                  autoComplete="name"
                  className={clsx("field", touched.name && !nameValid && "field-invalid")}
                />
                {touched.name && !nameValid ? (
                  <p className="mt-2 text-xs text-ink-dim">Напишите имя целиком</p>
                ) : null}
              </div>

              <div>
                <label className="label" htmlFor="bf-phone">
                  Телефон
                </label>
                <input
                  id="bf-phone"
                  value={phone}
                  inputMode="tel"
                  autoComplete="tel"
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  onFocus={() => !phone && setPhone("+7 (")}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  placeholder="+7 (___) ___-__-__"
                  className={clsx("field", touched.phone && !phoneValid && "field-invalid")}
                />
                {touched.phone && !phoneValid ? (
                  <p className="mt-2 text-xs text-ink-dim">Нужны все 11 цифр номера</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          {/* 05 — пожелания */}
          <fieldset>
            <Step n={5} title="Пожелания" hint="необязательно" done={Boolean(comment.trim())} />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Стол у окна, детский стул, торт к десерту, аллергии…"
              aria-label="Пожелания"
              className="field resize-none"
            />
          </fieldset>
        </div>
      </div>

      {/* Сводка */}
      <aside className="min-w-0 lg:sticky lg:top-[130px] lg:self-start">
        <div className="border border-white/20 bg-night-card/60 p-7">
          <span className="text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
            Ваша бронь
          </span>

          <p className="display-xl mt-4 text-[1.6rem] leading-tight text-ink">
            {formatDateRu(date, false)}
            {time ? <span className="text-ink">, {time}</span> : null}
          </p>
          <p className="mt-1.5 text-[0.85rem] text-ink-dim">
            {guests} {guestWord}
            {time ? "" : " · время не выбрано"}
          </p>

          <OrnamentDivider className="mt-6" />

          <dl className="mt-6 space-y-3.5 text-sm">
            <Row label="Имя" value={name || "—"} muted={!name} />
            <Row label="Телефон" value={phone || "—"} muted={!phone} />
          </dl>

          <button
            type="submit"
            className={clsx("btn btn-white mt-7 w-full", !ready && "opacity-90")}
          >
            Забронировать стол
          </button>

          {error ? <Hint text={error} /> : null}

          <ul className="mt-6 space-y-2.5 text-[0.78rem] leading-relaxed text-ink-mute">
            <li>Подтверждаем звонком в течение 15 минут.</li>
            <li>Стол держим {restaurant.booking.holdMinutes} минут от времени брони.</li>
            <li>Отмена и перенос — бесплатно, просто позвоните.</li>
          </ul>

          <a
            href={`tel:${restaurant.phoneHref}`}
            className="mt-6 flex items-center justify-center gap-2 border border-white/20 py-3 text-sm text-ink transition-colors hover:border-white/50"
          >
            <Icon.Phone className="h-4 w-4" />
            {restaurant.phoneLabel}
          </a>
        </div>
      </aside>

      {/* Мобильная панель брони — всегда под рукой */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/12 bg-night/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.85rem] text-ink">
              {formatDateRu(date, false)}
              {time ? ` · ${time}` : ""}
            </p>
            <p className="truncate text-[0.72rem] text-ink-mute">
              {guests} {guestWord}
              {time ? "" : " · выберите время"}
            </p>
          </div>
          <button type="submit" className="btn btn-white shrink-0 px-6 py-3.5">
            Забронировать
          </button>
        </div>
      </div>
    </form>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0">
      <dt className="text-[0.68rem] uppercase tracking-wider2 text-ink-mute">{label}</dt>
      <dd className={clsx("truncate text-right", muted ? "text-ink-mute" : "text-ink")}>
        {value}
      </dd>
    </div>
  );
}

/* ————— Экран подтверждения ————— */

function icsHref(b: Booking) {
  const [y, m, d] = b.date.split("-").map(Number);
  const [hh, mm] = b.time.split(":").map(Number);
  const start = new Date(y, m - 1, d, hh, mm);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const stamp = (dt: Date) =>
    `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, "0")}${String(
      dt.getDate(),
    ).padStart(2, "0")}T${String(dt.getHours()).padStart(2, "0")}${String(
      dt.getMinutes(),
    ).padStart(2, "0")}00`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pakhlava//Booking//RU",
    "BEGIN:VEVENT",
    `UID:${b.code}@pakhlava`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:Ужин в Pakhlava (${b.code})`,
    `DESCRIPTION:${b.guests} гостей. Бронь ${b.code}.`,
    `LOCATION:${restaurant.address.street}, ${restaurant.address.city}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

function BookingSuccess({ booking, onReset }: { booking: Booking; onReset: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(booking.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl animate-reveal-up">
      <div className="border border-white/20 bg-night-card/50 p-8 text-center md:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/40">
          <Icon.Check className="h-7 w-7" />
        </div>

        <h2 className="display-xl mt-7 text-[1.9rem] text-ink md:text-[2.4rem]">
          Стол забронирован
        </h2>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-dim">
          {booking.name}, ждём вас {formatDateRu(booking.date)} в {booking.time}.
          Перезвоним на {booking.phone} для подтверждения.
        </p>

        <OrnamentDivider className="mt-8" />

        <button
          type="button"
          onClick={copy}
          className="mx-auto mt-8 flex items-center gap-4 border border-white/25 px-7 py-4 transition-colors hover:border-white/60"
        >
          <span className="text-left">
            <span className="block text-[0.6rem] uppercase tracking-wider2 text-ink-mute">
              Код брони
            </span>
            <span className="text-[1.5rem] tracking-wider text-ink">{booking.code}</span>
          </span>
          {copied ? (
            <Icon.Check className="h-4 w-4" />
          ) : (
            <Icon.Copy className="h-4 w-4 text-ink-mute" />
          )}
        </button>

        <dl className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 text-left sm:grid-cols-2">
          <Cell label="Гостей" value={String(booking.guests)} />
          <Cell label="Адрес" value={restaurant.address.street} />
          {booking.comment ? (
            <div className="bg-night px-5 py-4 sm:col-span-2">
              <dt className="text-[0.62rem] uppercase tracking-wider2 text-ink-mute">
                Пожелания
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink">{booking.comment}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={icsHref(booking)}
            download={`pakhlava-${booking.code}.ics`}
            className="btn btn-outline"
          >
            <Icon.Calendar className="h-4 w-4" />В календарь
          </a>
          <button type="button" onClick={onReset} className="btn btn-ghost">
            Ещё одна бронь
          </button>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-night px-5 py-4">
      <dt className="text-[0.62rem] uppercase tracking-wider2 text-ink-mute">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink">{value}</dd>
    </div>
  );
}
