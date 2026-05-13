"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "./Icons";

export function CTABanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-brand/25"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand/25 via-bg-card to-bg-card" />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff3b30 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 65%)" }}
      />

      <div className="relative flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <span className="chip chip-brand">
            <Icon.Bolt className="h-3 w-3" /> Оптовый прайс
          </span>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white md:text-3xl lg:text-4xl">
            Получите оптовый прайс <br className="hidden md:block" />
            и стартовую скидку 10%
          </h2>
          <p className="mt-3 text-sm text-white/70 md:text-base">
            Оставьте заявку — менеджер пришлёт актуальный прайс в Telegram или WhatsApp в течение
            5 минут. Без обязательств и звонков-роботов.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/wholesale" className="btn-primary">
            <Icon.Handshake className="h-4 w-4" />
            Стать партнёром
          </Link>
          <a
            href="https://t.me/tyag_moskva"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Icon.Telegram className="h-4 w-4" />
            Telegram
          </a>
        </div>
      </div>
    </motion.section>
  );
}
