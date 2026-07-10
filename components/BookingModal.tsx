"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RESTAURANT } from "@/lib/icon-data";
import { sendToTelegram, telegramEnabled, bookingText } from "@/lib/booking-config";

const WA_NUMBER = RESTAURANT.whatsapp.replace(/\D/g, "");

const TIME_SLOTS = [
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
];

const CONTACT_METHODS = [
  { value: "phone", label: "Позвонить по телефону" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
];

export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const data = { name, phone, guests, date, time, contact };

    if (telegramEnabled()) {
      setSending(true);
      const ok = await sendToTelegram(data);
      setSending(false);
      if (ok) {
        setSent(true);
      } else {
        setFailed(true); // show WhatsApp / phone fallback
      }
      return;
    }

    // No bot configured yet - hand off to WhatsApp with the details pre-filled.
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(bookingText(data))}`;
    window.open(url, "_blank", "noopener");
    setSent(true);
  };

  const reset = () => {
    setName("");
    setPhone("");
    setGuests("");
    setDate("");
    setTime("");
    setContact("");
    setSent(false);
    setSending(false);
    setFailed(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={() => {
              onClose();
              setTimeout(reset, 300);
            }}
          />
          <div className="fixed inset-0 z-[71] flex items-center justify-center p-3 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-[min(560px,100%)] overflow-y-auto border border-black/20 bg-white p-6 md:p-10"
          >
            <button
              aria-label="Закрыть"
              onClick={() => {
                onClose();
                setTimeout(reset, 300);
              }}
              className="icon-btn absolute right-3 top-3"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4">
                <path d="M6 6l12 12M6 18 18 6" />
              </svg>
            </button>

            {sent ? (
              <div className="pt-10 pb-4 text-center">
                <h3 className="section-title !text-2xl md:!text-3xl">Заявка отправлена</h3>
                <p className="section-sub mt-4 text-black/70">
                  Спасибо, {name || "гость"}! Мы свяжемся с вами в ближайшее время,
                  чтобы подтвердить бронь.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(reset, 300);
                  }}
                  className="btn-white mt-8"
                >
                  Хорошо
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="pt-6">
                <h3 className="section-title !text-lg md:!text-xl">Бронирование стола</h3>

                <div className="mt-8 space-y-1">
                  <label className="uf-field block">
                    <span className="uf-label">Имя</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="uf-input"
                      placeholder=" "
                      style={{ marginTop: "0.4rem" }}
                    />
                  </label>

                  <div className="uf-field flex items-end gap-3">
                    <div className="flex items-center gap-2 pb-[2px]">
                      <RuFlag />
                      <ChevIcon />
                      <span className="text-black">+7</span>
                    </div>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="uf-input flex-1"
                      placeholder="(000) 000-00-00"
                    />
                  </div>

                  <label className="uf-field block">
                    <span className="uf-label">Кол-во гостей</span>
                    <input
                      required
                      inputMode="numeric"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value.replace(/[^\d]/g, ""))}
                      className="uf-input"
                      placeholder=" "
                      style={{ marginTop: "0.4rem" }}
                    />
                  </label>

                  <label className="uf-field flex items-end justify-between gap-3">
                    <span className="uf-label">Дата посещения</span>
                    <input
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="uf-input flex-1"
                      style={{ marginTop: "0.4rem", colorScheme: "light" }}
                    />
                    <CalendarIcon className="mb-1 h-5 w-5 shrink-0 text-black/70" />
                  </label>

                  <p className="pt-2 text-sm text-black/60">
                    Ограничение во времени за столиком составляет два (2) часа
                  </p>

                  <label className="uf-field flex items-end gap-3">
                    <span className="uf-label">Время посещения</span>
                    <select
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="uf-input flex-1 cursor-pointer appearance-none bg-transparent"
                      style={{ marginTop: "0.4rem" }}
                    >
                      <option value="" disabled className="bg-white">Выберите время</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t} className="bg-white">{t}</option>
                      ))}
                    </select>
                    <ChevIcon className="mb-1" />
                  </label>

                  <label className="uf-field flex items-end gap-3">
                    <span className="uf-label">Как с Вами связаться?</span>
                    <select
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="uf-input flex-1 cursor-pointer appearance-none bg-transparent"
                      style={{ marginTop: "0.4rem" }}
                    >
                      <option value="" disabled className="bg-white">Выберите способ</option>
                      {CONTACT_METHODS.map((m) => (
                        <option key={m.value} value={m.value} className="bg-white">
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <ChevIcon className="mb-1" />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-white mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Отправляем…" : "Отправить"}
                </button>

                {failed && (
                  <div className="mt-4 border border-black/20 p-4 text-center text-xs text-black/70">
                    Не удалось отправить заявку автоматически. Напишите нам напрямую:
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <a
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(bookingText({ name, phone, guests, date, time, contact }))}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-white flex-1 !min-w-0 !py-2 !text-[11px]"
                      >
                        WhatsApp
                      </a>
                      <a href={RESTAURANT.phoneHref} className="btn-ghost flex-1 !min-w-0 !py-2 !text-[11px]">
                        Позвонить
                      </a>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-center text-xs text-black/50">
                  Или позвоните нам:{" "}
                  <a href={RESTAURANT.phoneHref} className="text-black hover:underline">
                    {RESTAURANT.phone}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function RuFlag() {
  return (
    <span className="inline-flex h-4 w-6 flex-col overflow-hidden border border-black/25">
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-[#0039A6]" />
      <span className="flex-1 bg-[#D52B1E]" />
    </span>
  );
}

function ChevIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 text-black/70 ${props.className ?? ""}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  );
}
