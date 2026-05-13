"use client";

import { motion } from "framer-motion";
import { Icon } from "./Icons";

const ITEMS = [
  {
    icon: <Icon.Box className="h-6 w-6" />,
    title: "Склад в Москве",
    text: "Более 5 000 устройств в наличии. Отгрузка день в день при заказе до 14:00.",
    accent: "from-brand to-[#ff7a5e]",
  },
  {
    icon: <Icon.Shield className="h-6 w-6" />,
    title: "Только оригинал",
    text: "Работаем напрямую с производителями — DUALL, WAKA, ELFBAR, GEEK BAR, Vaporesso.",
    accent: "from-accent to-[#67e8f9]",
  },
  {
    icon: <Icon.Coin className="h-6 w-6" />,
    title: "Прозрачный прайс",
    text: "Цены от 110 ₽ за устройство. Доп. скидки от 200, 500 и 1 000 штук.",
    accent: "from-gold to-[#fcd34d]",
  },
  {
    icon: <Icon.Truck className="h-6 w-6" />,
    title: "Доставка по РФ",
    text: "СДЭК, ПЭК, Boxberry — отправка в день оплаты. По Москве — собственный курьер.",
    accent: "from-[#a855f7] to-[#c084fc]",
  },
  {
    icon: <Icon.Headphones className="h-6 w-6" />,
    title: "Личный менеджер",
    text: "Закреплённый партнёрский менеджер. Связь в Telegram, WhatsApp и по телефону.",
    accent: "from-[#10b981] to-[#34d399]",
  },
  {
    icon: <Icon.Star className="h-6 w-6" />,
    title: "Программа лояльности",
    text: "Накопительные бонусы, эксклюзивные новинки и приоритетная отгрузка.",
    accent: "from-[#f59e0b] to-[#fbbf24]",
  },
];

export function AdvantagesSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">Почему мы</p>
          <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">
            Партнёрам — лучшие условия
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted">
          Десятки оптовых клиентов в Москве, СПб и регионах. Прозрачные условия и стабильные
          поставки даже для крупных сетей.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: (i % 3) * 0.05, ease: "easeOut" }}
            className="surface group relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:border-brand/30"
          >
            <div
              className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${it.accent} text-white shadow-lg`}
            >
              {it.icon}
            </div>
            <h3 className="mt-4 text-base font-bold text-white">{it.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{it.text}</p>
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/[0.04] blur-3xl transition-opacity group-hover:bg-brand/[0.08]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
