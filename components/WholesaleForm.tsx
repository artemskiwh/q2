"use client";

import { useState } from "react";
import { Icon } from "./Icons";

interface Fields {
  name: string;
  company: string;
  phone: string;
  city: string;
  channel: string;
  message: string;
}

const INITIAL: Fields = {
  name: "",
  company: "",
  phone: "",
  city: "",
  channel: "Telegram",
  message: "",
};

export function WholesaleForm() {
  const [data, setData] = useState<Fields>(INITIAL);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!data.name.trim()) errs.name = "Укажите имя";
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10) {
      errs.phone = "Нужен корректный телефон";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-bg-line bg-bg-card p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/15 text-brand">
          <Icon.Spark className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold">Заявка отправлена</h3>
        <p className="mt-2 text-sm text-muted">
          Спасибо, {data.name || "партнёр"}! Менеджер свяжется с вами в течение часа.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setData(INITIAL);
          }}
          className="btn-secondary mt-5"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  const field = (key: keyof Fields) => ({
    value: data[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData({ ...data, [key]: e.target.value }),
  });

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-bg-line bg-bg-card p-5 md:p-6"
    >
      <h3 className="text-xl font-bold">Заявка на сотрудничество</h3>
      <p className="mt-1 text-sm text-muted">
        Заполните форму — менеджер пришлёт актуальный прайс.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs text-muted">Имя*</span>
          <input className="input" placeholder="Алексей" {...field("name")} />
          {errors.name && <span className="mt-1 block text-xs text-brand">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted">Телефон*</span>
          <input
            type="tel"
            className="input"
            placeholder="+7 (999) 000-00-00"
            {...field("phone")}
          />
          {errors.phone && <span className="mt-1 block text-xs text-brand">{errors.phone}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted">Компания</span>
          <input className="input" placeholder="ИП / ООО" {...field("company")} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted">Город</span>
          <input className="input" placeholder="Москва" {...field("city")} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1 block text-xs text-muted">Удобный канал связи</span>
          <select className="input" {...field("channel")}>
            <option>Telegram</option>
            <option>WhatsApp</option>
            <option>Звонок</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1 block text-xs text-muted">Что интересует</span>
          <textarea
            className="input min-h-[110px]"
            placeholder="Опишите ассортимент или объёмы поставки"
            {...field("message")}
          />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-5 w-full justify-center text-base">
        Отправить заявку
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  );
}
