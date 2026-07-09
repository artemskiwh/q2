"use client";

import { useState } from "react";
import { RESTAURANT } from "@/lib/icon-data";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    title: "Профессиональный звук",
    text: "Студийная акустика и настройка, которую гости называют лучшей в городе.",
  },
  {
    title: "Огромный каталог песен",
    text: "От вечной классики до свежих хитов — найдётся композиция для каждого.",
  },
  {
    title: "Уютные залы и компании",
    text: "Идеально для дружеской встречи, дня рождения или шумного праздника.",
  },
  {
    title: "Бар и кухня рядом",
    text: "Авторские коктейли и закуски приносят прямо к микрофону.",
  },
];

export function Karaoke() {
  return (
    <section id="karaoke" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-gold/[0.06] blur-[110px]" />

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left — about karaoke */}
          <Reveal>
            <span className="eyebrow only-after mb-6">Караоке</span>
            <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
              Возьмите микрофон —<br />
              <span className="text-gold-gradient">и зажгите сцену</span>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
              В ICON караоке — это главное шоу вечера. Настоящий концертный звук,
              приятный свет и атмосфера, в которой раскрывается каждый голос.
              Приходите компанией и пойте любимые песни до самого утра.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-gold/12 bg-ink-card/50 p-5"
                >
                  <div className="mb-2 flex items-center gap-2.5">
                    <MicIcon className="h-5 w-5 text-gold" />
                    <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gold/15 bg-ink-card/40 px-6 py-4">
              <MicIcon className="h-7 w-7 shrink-0 text-gold" />
              <p className="text-sm text-muted">
                Караоке работает{" "}
                <span className="text-white">{RESTAURANT.hoursShort}</span>, ежедневно.
                Бронируйте стол заранее — вечера расписаны быстро.
              </p>
            </div>
          </Reveal>

          {/* Right — booking form */}
          <Reveal delay={120}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BookingForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    comment: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div id="book" className="gold-frame scroll-mt-28 bg-ink-card/60 p-7 md:p-9">
      <h3 className="font-display text-2xl text-white md:text-3xl">Забронировать стол</h3>
      <p className="mt-2 text-sm text-muted">
        Оставьте заявку — администратор перезвонит и подтвердит бронь.
      </p>

      {sent ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-gold/25 bg-gold-soft px-6 py-12 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-ink">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 5 5 9-12" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-white">Заявка отправлена!</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Спасибо, {form.name || "гость"}! Мы свяжемся с вами в ближайшее время,
            чтобы подтвердить бронь.
          </p>
          <button
            onClick={() => setSent(false)}
            className="btn-outline mt-6"
          >
            Отправить ещё одну
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Ваше имя">
              <input required className="input" placeholder="Как к вам обращаться" value={form.name} onChange={set("name")} />
            </Field>
            <Field label="Телефон">
              <input required type="tel" className="input" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label="Дата">
              <input type="date" className="input" value={form.date} onChange={set("date")} />
            </Field>
            <Field label="Время">
              <input type="time" className="input" value={form.time} onChange={set("time")} />
            </Field>
          </div>
          <Field label="Количество гостей">
            <select className="input" value={form.guests} onChange={set("guests")}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((g) => (
                <option key={g} value={g} className="bg-ink">
                  {g} {g === "10+" ? "гостей" : Number(g) === 1 ? "гость" : "гостей"}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Комментарий">
            <textarea className="input min-h-[84px] resize-none" placeholder="Повод, пожелания по столу, караоке…" value={form.comment} onChange={set("comment")} />
          </Field>

          <button type="submit" className="btn-gold w-full py-3.5 text-[15px]">
            Отправить заявку
          </button>

          <div className="flex flex-col gap-2 pt-1 sm:flex-row">
            <a href={RESTAURANT.phoneHref} className="btn-outline flex-1 text-sm">
              Позвонить
            </a>
            <a href={RESTAURANT.whatsapp} target="_blank" rel="noreferrer" className="btn-outline flex-1 text-sm">
              WhatsApp
            </a>
          </div>
          <p className="pt-1 text-center text-[11px] text-mute2">
            Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
    </svg>
  );
}
