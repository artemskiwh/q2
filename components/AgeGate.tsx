"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tyag_age_confirmed";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setOpen(false);
  };

  const reject = () => {
    window.location.href = "https://www.google.com/";
  };

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 backdrop-blur-md"
    >
      <div className="relative max-h-[100dvh] w-full overflow-y-auto px-4 py-6 sm:p-6">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-md rounded-3xl border border-bg-line bg-bg-card p-6 shadow-2xl sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              18<span className="text-brand">+</span>
            </div>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand sm:h-14 sm:w-14">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 sm:h-8 sm:w-8">
                <path
                  d="M5 14 Q12 6 19 14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <rect
                  x="4"
                  y="14"
                  width="16"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <path
                  d="M7 11 q1 -2 0 -3 m3 3 q1 -2 0 -3 m3 3 q1 -2 0 -3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Вам больше 18 лет?
          </h2>

          <p className="mt-4 text-[13px] leading-relaxed text-white/75 sm:text-sm">
            Данный сайт не является рекламой, так как предназначен для ограниченного круга лиц, а
            именно для совершеннолетних потребителей табачной и никотинсодержащей продукции (граждан
            России старше 18 лет) для предоставления им достоверной информации об основных
            потребительских свойствах и качественных характеристиках товара (п.1 и п.2 ст. 10
            Закона «О защите прав потребителя»). Лицам, не достигшим совершеннолетия, пользование
            сайтом запрещено (ст. 20 ФЗ № 15 «Об охране здоровья граждан…»). При переходе на сайт я
            подтверждаю, что мне уже исполнилось 18 лет, я являюсь потребителем табака или иной
            никотинсодержащей продукции и даю согласие на обработку персональных данных.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={confirm}
              className="rounded-xl bg-gradient-to-br from-brand to-[#d92414] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_25px_-12px_rgba(255,59,48,0.6)] transition hover:brightness-110 sm:text-base"
            >
              Больше 18
            </button>
            <button
              type="button"
              onClick={reject}
              className="rounded-xl border border-bg-line bg-bg-soft px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:text-white sm:text-base"
            >
              Меньше 18
            </button>
          </div>

          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-muted">
            Курение вредит вашему здоровью
          </p>
        </div>
      </div>
    </div>
  );
}
