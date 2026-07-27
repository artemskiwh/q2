"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Icon } from "./Icons";
import { OrnamentDivider, Rosette, FramedCorners } from "./Ornament";
import {
  formatDateRu,
  formatPhone,
  isValidPhone,
  makeBookingCode,
  maxDateISO,
  nextDays,
  saveBooking,
  timeSlots,
  todayISO,
  type Booking,
} from "@/lib/booking";
import { halls, occasions, restaurant } from "@/lib/restaurant";

const STEPS = ["Дата и стол", "Контакты", "Готово"];

export function BookingForm({ onCreated }: { onCreated?: (b: Booking) => void }) {
  const params = useSearchParams();

  const days = useMemo(() => nextDays(7), []);
  const [step, setStep] = useState(0);

  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [hallId, setHallId] = useState(halls[0].id);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(occasions[0].id);
  const [comment, setComment] = useState("");
  const [agreed, setAgreed] = useState(true);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState<Booking | null>(null);

  const slots = useMemo(() => timeSlots(date), [date]);

  /* Предзаполнение из адресной строки (кнопки с главной и из карточек залов) */
  useEffect(() => {
    const qDate = params.get("date");
    const qTime = params.get("time");
    const qGuests = Number(params.get("guests"));
    const qHall = params.get("hall");

    if (qDate && /^\d{4}-\d{2}-\d{2}$/.test(qDate) && qDate >= todayISO()) setDate(qDate);
    if (qTime && /^\d{2}:\d{2}$/.test(qTime)) setTime(qTime);
    if (qGuests >= 1 && qGuests <= restaurant.booking.maxGuestsOnline) setGuests(qGuests);
    if (qHall && halls.some((h) => h.id === qHall)) setHallId(qHall);
  }, [params]);

  /* Если слот больше не доступен на выбранную дату — сбрасываем */
  useEffect(() => {
    if (time && !slots.includes(time)) setTime("");
  }, [slots, time]);

  const hall = halls.find((h) => h.id === hallId) ?? halls[0];
  const nameValid = name.trim().length >= 2;
  const phoneValid = isValidPhone(phone);

  const goToContacts = () => {
    if (!time) {
      setError("Выберите время — на эту дату есть свободные слоты ниже.");
      return;
    }
    setError("");
    setStep(1);
    window.scrollTo({ top: document.getElementById("booking-form")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });

    if (!nameValid || !phoneValid) {
      setError("Проверьте имя и телефон — по ним мы подтвердим бронь.");
      return;
    }
    if (!agreed) {
      setError("Нужно согласие на обработку данных.");
      return;
    }

    const booking: Booking = {
      code: makeBookingCode(),
      date,
      time,
      guests,
      hallId: hall.id,
      hallName: hall.name,
      name: name.trim(),
      phone,
      occasion: occasions.find((o) => o.id === occasion)?.label ?? "",
      comment: comment.trim() || undefined,
      createdAt: Date.now(),
    };

    saveBooking(booking);
    setResult(booking);
    setError("");
    setStep(2);
    onCreated?.(booking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetAll = () => {
    setResult(null);
    setStep(0);
    setTime("");
    setName("");
    setPhone("");
    setComment("");
    setOccasion(occasions[0].id);
    setTouched({});
  };

  if (step === 2 && result) {
    return <BookingSuccess booking={result} onReset={resetAll} />;
  }

  return (
    <div id="booking-form" className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
      <div>
        <Stepper step={step} />

        <form onSubmit={submit} className="mt-10">
          {step === 0 ? (
            <div className="space-y-10">
              {/* Дата */}
              <fieldset>
                <legend className="label">Когда вас ждать</legend>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {days.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setDate(d.iso)}
                      className={clsx(
                        "flex flex-col items-center border py-3 transition-all",
                        date === d.iso
                          ? "border-accent/70 bg-accent/12 text-ink"
                          : "border-white/10 text-ink-dim hover:border-accent/35 hover:text-ink",
                      )}
                    >
                      <span className="text-[0.58rem] uppercase tracking-wider2 text-ink-mute">
                        {d.weekday}
                      </span>
                      <span className="display-xl mt-1 text-[1.5rem] leading-none">{d.day}</span>
                      <span className="mt-1 text-[0.6rem] uppercase tracking-wide text-ink-mute">
                        {d.month}
                      </span>
                    </button>
                  ))}
                </div>

                <label className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-mute">
                  <span className="text-[0.68rem] uppercase tracking-wider2">
                    или другая дата
                  </span>
                  <input
                    type="date"
                    value={date}
                    min={todayISO()}
                    max={maxDateISO()}
                    onChange={(e) => e.target.value && setDate(e.target.value)}
                    className="field w-auto py-2 text-sm"
                  />
                </label>
              </fieldset>

              {/* Время */}
              <fieldset>
                <legend className="label">Время</legend>
                {slots.length ? (
                  <div className="flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setTime(s);
                          setError("");
                        }}
                        className={clsx(
                          "border px-4 py-2.5 text-sm tabular-nums transition-all",
                          time === s
                            ? "border-accent/70 bg-accent/12 text-accent-light"
                            : "border-white/10 text-ink-dim hover:border-accent/35 hover:text-ink",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="border border-white/10 bg-night-card/40 p-5 text-sm text-ink-dim">
                    На сегодня онлайн-бронь закрыта. Выберите завтрашний день или
                    позвоните — часто мы находим стол и в последний момент.
                  </p>
                )}
              </fieldset>

              {/* Гости */}
              <fieldset>
                <legend className="label">Сколько гостей</legend>
                <div className="flex items-center gap-5">
                  <div className="flex items-center border border-white/10">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      aria-label="Меньше гостей"
                      className="grid h-12 w-12 place-items-center text-xl text-ink-dim transition-colors hover:text-accent"
                    >
                      −
                    </button>
                    <span className="display-xl w-14 text-center text-[1.6rem] text-ink">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setGuests((g) => Math.min(restaurant.booking.maxGuestsOnline, g + 1))
                      }
                      aria-label="Больше гостей"
                      className="grid h-12 w-12 place-items-center text-xl text-ink-dim transition-colors hover:text-accent"
                    >
                      +
                    </button>
                  </div>
                  <p className="max-w-xs text-xs leading-relaxed text-ink-mute">
                    Компанию больше {restaurant.booking.maxGuestsOnline} гостей соберём
                    в каминном кабинете — {" "}
                    <a href={`tel:${restaurant.phoneHref}`} className="text-accent hover:underline">
                      позвоните нам
                    </a>
                    .
                  </p>
                </div>
              </fieldset>

              {/* Зал */}
              <fieldset>
                <legend className="label">Зал</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {halls.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setHallId(h.id)}
                      className={clsx(
                        "flex flex-col border p-5 text-left transition-all",
                        hallId === h.id
                          ? "border-accent/70 bg-accent/[0.07]"
                          : "border-white/10 hover:border-accent/35",
                      )}
                    >
                      <span className="display-xl text-[1.25rem] text-ink">{h.name}</span>
                      <span className="mt-1 text-[0.68rem] uppercase tracking-wider2 text-accent/70">
                        {h.seats}
                      </span>
                      <span className="mt-3 text-[0.8rem] leading-relaxed text-ink-mute">
                        {h.features[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {error ? <ErrorNote text={error} /> : null}

              <button
                type="button"
                onClick={goToContacts}
                disabled={!slots.length}
                className="btn btn-white w-full sm:w-auto"
              >
                Дальше — контакты
                <Icon.Arrow className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
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
                    <p className="mt-2 text-xs text-pom-light">Напишите имя целиком</p>
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
                    <p className="mt-2 text-xs text-pom-light">Нужны все 11 цифр номера</p>
                  ) : null}
                </div>
              </div>

              <fieldset>
                <legend className="label">Повод</legend>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setOccasion(o.id)}
                      className={clsx(
                        "border px-4 py-2 text-[0.7rem] uppercase tracking-wider2 transition-all",
                        occasion === o.id
                          ? "border-accent/70 bg-accent/12 text-accent-light"
                          : "border-white/10 text-ink-dim hover:border-accent/35 hover:text-ink",
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label className="label" htmlFor="bf-comment">
                  Пожелания
                </label>
                <textarea
                  id="bf-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Стол у окна, детский стул, торт к десерту, аллергии…"
                  className="field resize-none"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-[0.82rem] leading-relaxed text-ink-mute">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9a25a]"
                />
                Согласен на обработку персональных данных — только для подтверждения брони.
              </label>

              {error ? <ErrorNote text={error} /> : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setError("");
                  }}
                  className="btn btn-ghost"
                >
                  <Icon.ChevronLeft className="h-4 w-4" />
                  Назад
                </button>
                <button type="submit" className="btn btn-white flex-1 sm:flex-none">
                  <Icon.Check className="h-4 w-4" />
                  Забронировать стол
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Сводка */}
      <aside className="lg:sticky lg:top-[120px] lg:self-start">
        <div className="relative border border-accent/20 bg-night-card/60 p-8">
          <FramedCorners />
          <div className="flex items-center gap-3">
            <Rosette className="h-6 w-6 text-accent" />
            <span className="eyebrow">Ваша бронь</span>
          </div>

          <dl className="mt-7 space-y-4 text-sm">
            <SummaryRow label="Дата" value={formatDateRu(date)} />
            <SummaryRow label="Время" value={time || "не выбрано"} muted={!time} />
            <SummaryRow label="Гостей" value={String(guests)} />
            <SummaryRow label="Зал" value={hall.name} />
            {step === 1 ? (
              <>
                <SummaryRow label="Имя" value={name || "—"} muted={!name} />
                <SummaryRow label="Телефон" value={phone || "—"} muted={!phone} />
              </>
            ) : null}
          </dl>

          <OrnamentDivider className="mt-7" />

          <ul className="mt-7 space-y-3 text-[0.8rem] leading-relaxed text-ink-mute">
            <li className="flex gap-2.5">
              <Icon.Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Подтверждаем звонком в течение 15 минут.
            </li>
            <li className="flex gap-2.5">
              <Icon.Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Стол держим {restaurant.booking.holdMinutes} минут от времени брони.
            </li>
            <li className="flex gap-2.5">
              <Icon.Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Отмена и перенос — бесплатно, просто позвоните.
            </li>
          </ul>

          <a
            href={`tel:${restaurant.phoneHref}`}
            className="mt-7 flex items-center justify-center gap-2 border border-accent/25 py-3 text-sm text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            <Icon.Phone className="h-4 w-4 text-accent" />
            {restaurant.phoneLabel}
          </a>
        </div>
      </aside>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-3">
      {STEPS.map((label, i) => (
        <li key={label} className="flex flex-1 items-center gap-3">
          <span
            className={clsx(
              "grid h-9 w-9 shrink-0 place-items-center border text-[0.75rem] transition-colors",
              i < step && "border-accent bg-accent/15 text-accent",
              i === step && "border-accent bg-accent text-night",
              i > step && "border-white/12 text-ink-mute",
            )}
          >
            {i < step ? <Icon.Check className="h-4 w-4" /> : i + 1}
          </span>
          <span
            className={clsx(
              "hidden text-[0.68rem] uppercase tracking-wider2 sm:block",
              i <= step ? "text-ink" : "text-ink-mute",
            )}
          >
            {label}
          </span>
          {i < STEPS.length - 1 ? (
            <span
              className={clsx(
                "h-px flex-1 transition-colors",
                i < step ? "bg-accent/50" : "bg-white/10",
              )}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function SummaryRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3 last:border-b-0">
      <dt className="text-[0.68rem] uppercase tracking-wider2 text-ink-mute">{label}</dt>
      <dd className={clsx("text-right", muted ? "text-ink-mute" : "text-ink")}>{value}</dd>
    </div>
  );
}

function ErrorNote({ text }: { text: string }) {
  return (
    <p className="border border-pom/40 bg-pom-soft px-4 py-3 text-sm text-pom-light" role="alert">
      {text}
    </p>
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
    `DESCRIPTION:${b.guests} гостей, ${b.hallName}. Бронь ${b.code}.`,
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
    <div className="mx-auto max-w-2xl">
      <div className="relative border border-accent/25 bg-night-card/60 p-8 text-center md:p-12">
        <FramedCorners />

        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-accent/40 bg-accent/10">
          <Icon.Check className="h-7 w-7 text-accent" />
        </div>

        <h2 className="display-xl mt-7 text-[2rem] text-ink md:text-[2.6rem]">
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
          className="mx-auto mt-8 flex items-center gap-3 border border-accent/30 px-6 py-4 transition-colors hover:border-accent/60"
        >
          <span className="text-left">
            <span className="block text-[0.6rem] uppercase tracking-wider2 text-ink-mute">
              Код брони
            </span>
            <span className="display-xl text-[1.6rem] tracking-wide text-ink">
              {booking.code}
            </span>
          </span>
          {copied ? (
            <Icon.Check className="h-4 w-4 text-accent" />
          ) : (
            <Icon.Copy className="h-4 w-4 text-ink-mute" />
          )}
        </button>

        <dl className="mt-8 grid gap-px overflow-hidden border border-white/8 bg-white/8 text-left sm:grid-cols-2">
          <SuccessCell label="Гостей" value={String(booking.guests)} />
          <SuccessCell label="Зал" value={booking.hallName} />
          <SuccessCell label="Повод" value={booking.occasion} />
          <SuccessCell label="Адрес" value={restaurant.address.street} />
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
            <Icon.Calendar className="h-4 w-4" />
            В календарь
          </a>
          <button type="button" onClick={onReset} className="btn btn-ghost">
            Ещё одна бронь
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-ink-mute">
        Бронь сохранена в этом браузере — найдёте её в разделе «Мои брони» ниже.
      </p>
    </div>
  );
}

function SuccessCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-night px-5 py-4">
      <dt className="text-[0.62rem] uppercase tracking-wider2 text-ink-mute">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink">{value}</dd>
    </div>
  );
}
