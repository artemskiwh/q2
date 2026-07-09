"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RESTAURANT } from "@/lib/icon-data";

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
  const [consent, setConsent] = useState(false);
  const [ackKids, setAckKids] = useState(false);
  const [ackPets, setAckPets] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSent(true);
  };

  const reset = () => {
    setName("");
    setPhone("");
    setGuests("");
    setDate("");
    setTime("");
    setContact("");
    setConsent(false);
    setAckKids(false);
    setAckPets(false);
    setSent(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm"
            onClick={() => {
              onClose();
              setTimeout(reset, 300);
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[71] max-h-[92vh] w-[min(560px,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-white/25 bg-black p-6 md:p-10"
          >
            <button
              aria-label="Закрыть"
              onClick={() => {
                onClose();
                setTimeout(reset, 300);
              }}
              className="icon-frame absolute right-4 top-4"
              style={{ width: 44, height: 44 }}
            >
              <span className="cf-tr" />
              <span className="cf-bl" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4">
                <path d="M6 6l12 12M6 18 18 6" />
              </svg>
            </button>

            {sent ? (
              <div className="pt-10 pb-4 text-center">
                <h3 className="section-title !text-2xl md:!text-3xl">Заявка отправлена</h3>
                <p className="section-sub mt-4 text-white/70">
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
                      <span className="text-white">+7</span>
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
                      style={{ marginTop: "0.4rem", colorScheme: "dark" }}
                    />
                    <CalendarIcon className="mb-1 h-5 w-5 shrink-0 text-white/80" />
                  </label>

                  <p className="pt-2 text-sm text-white/60">
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
                      <option value="" disabled className="bg-black">Выберите время</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t} className="bg-black">{t}</option>
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
                      <option value="" disabled className="bg-black">Выберите способ</option>
                      {CONTACT_METHODS.map((m) => (
                        <option key={m.value} value={m.value} className="bg-black">
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <ChevIcon className="mb-1" />
                  </label>
                </div>

                <div className="mt-6 space-y-3 text-sm text-white/80">
                  <Check checked={consent} onChange={setConsent}>
                    Настоящим подтверждаю, что ознакомлен с условиями Политики оператора
                    в отношении обработки персональных данных и даю согласие на обработку
                    моих персональных данных.
                  </Check>
                  <Check checked={ackKids} onChange={setAckKids}>
                    Мы не рекомендуем приходить с детьми младше 7 лет из-за продолжительности
                    и характера дегустационного меню.
                  </Check>
                  <Check checked={ackPets} onChange={setAckPets}>
                    Посещение ресторана с животными не предусмотрено
                  </Check>
                </div>

                <button
                  type="submit"
                  disabled={!consent}
                  className="btn-white mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Отправить
                </button>

                <p className="mt-4 text-center text-xs text-white/50">
                  Или позвоните нам:{" "}
                  <a href={RESTAURANT.phoneHref} className="text-white hover:underline">
                    {RESTAURANT.phone}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 leading-snug">
      <span
        onClick={() => onChange(!checked)}
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors ${
          checked ? "border-white bg-white text-black" : "border-white/50"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <path d="m5 12 5 5 9-12" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="flex-1 text-[13px]">{children}</span>
    </label>
  );
}

function RuFlag() {
  return (
    <span className="inline-flex h-4 w-6 flex-col overflow-hidden border border-white/30">
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-[#0039A6]" />
      <span className="flex-1 bg-[#D52B1E]" />
    </span>
  );
}

function ChevIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 text-white/80 ${props.className ?? ""}`}>
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
