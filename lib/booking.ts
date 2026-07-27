import { restaurant } from "./restaurant";

export type Booking = {
  code: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  name: string;
  phone: string;
  comment?: string;
  createdAt: number;
};

/* ————— Даты ————— */

export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO() {
  return toISODate(new Date());
}

export function maxDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + restaurant.booking.maxDaysAhead);
  return toISODate(d);
}

const MONTHS_GEN = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const WEEKDAYS = [
  "воскресенье", "понедельник", "вторник", "среда",
  "четверг", "пятница", "суббота",
];

/** «14 августа, четверг» */
export function formatDateRu(iso: string, withWeekday = true) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  const base = `${d} ${MONTHS_GEN[m - 1]}`;
  return withWeekday ? `${base}, ${WEEKDAYS[date.getDay()]}` : base;
}

/** Ближайшие N дней для быстрых кнопок выбора даты. */
export function nextDays(count: number) {
  const out: { iso: string; day: number; month: string; weekday: string }[] = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      iso: toISODate(d),
      day: d.getDate(),
      month: MONTHS_GEN[d.getMonth()].slice(0, 3),
      weekday: i === 0 ? "сегодня" : i === 1 ? "завтра" : WEEKDAYS[d.getDay()].slice(0, 2),
    });
  }
  return out;
}

/* ————— Слоты ————— */

/** Слоты бронирования; на сегодня — только те, что ещё впереди. */
export function timeSlots(dateISO: string) {
  const { openHour, lastSlotHour, slotStepMinutes } = restaurant.booking;
  const slots: string[] = [];
  for (let h = openHour; h <= lastSlotHour; h += 1) {
    for (let m = 0; m < 60; m += slotStepMinutes) {
      if (h === lastSlotHour && m > 0) break;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  if (dateISO !== todayISO()) return slots;

  const now = new Date();
  const cutoff = now.getHours() * 60 + now.getMinutes() + 60; // бронь минимум за час
  return slots.filter((s) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m >= cutoff;
  });
}

/* ————— Телефон ————— */

/** Приводит ввод к виду +7 (999) 123-45-67. */
export function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

export function isValidPhone(value: string) {
  return value.replace(/\D/g, "").length === 11;
}

/* ————— Код брони ————— */

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeBookingCode() {
  let tail = "";
  for (let i = 0; i < 4; i += 1) {
    tail += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `PKH-${tail}`;
}
