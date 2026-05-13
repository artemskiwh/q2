"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "./Icons";

const STATS = [
  { value: "120+", label: "позиций в наличии" },
  { value: "24/7", label: "приём заявок" },
  { value: "1 день", label: "отгрузка от заказа" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-bg-line hero-bg">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,59,48,0.55), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.5), transparent 65%)" }}
      />

      <div className="relative grid gap-8 px-5 py-8 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand"
          >
            <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-brand animate-pulse-glow" />
            TYAG · Moskva · Опт
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 text-[34px] font-black leading-[1.02] tracking-tight text-white sm:text-[42px] md:text-[52px] lg:text-[58px]"
          >
            Оптовые поставки <br />
            <span className="bg-gradient-to-r from-brand via-[#ff7a5e] to-[#ffb199] bg-clip-text text-transparent">
              вейпов и жидкостей
            </span>{" "}
            <br />
            по всей России
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-muted md:text-base"
          >
            DUALL, WAKA, ELFBAR, GEEK BAR, Vaporesso, GeekVape — официально и со склада в Москве.
            Цены от 110 ₽ за устройство при заказе от 50 шт.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link href="/catalog" className="btn-primary">
              <Icon.Bolt className="h-4 w-4" />
              Смотреть каталог
            </Link>
            <Link href="/wholesale" className="btn-ghost">
              <Icon.Handshake className="h-4 w-4" />
              Стать партнёром
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 grid grid-cols-3 gap-4 border-t border-bg-line pt-6 md:max-w-md"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-black text-white md:text-2xl">{s.value}</div>
                <div className="mt-1 text-[11px] leading-tight text-muted md:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative mx-auto h-[280px] w-full max-w-[480px] md:h-[400px]"
    >
      {/* Floating device 1 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[12%] top-[14%] w-[34%]"
      >
        <DevicePreview color="#ff3b30" accent="#ffd6cc" label="40K" puffs="40 000" />
      </motion.div>
      {/* Floating device 2 (center, larger) */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute left-[37%] top-[2%] z-10 w-[36%]"
      >
        <DevicePreview color="#22d3ee" accent="#cffafe" label="50K" puffs="50 000" big />
      </motion.div>
      {/* Floating device 3 */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-[8%] top-[20%] w-[32%]"
      >
        <DevicePreview color="#a855f7" accent="#e9d5ff" label="25K" puffs="25 000" />
      </motion.div>

      {/* Backlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(255,59,48,0.28) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

function DevicePreview({
  color,
  accent,
  label,
  puffs,
  big,
}: {
  color: string;
  accent: string;
  label: string;
  puffs: string;
  big?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 140 260"
      className={`drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)] ${big ? "scale-110" : ""}`}
    >
      <defs>
        <linearGradient id={`hb-${label}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="#1a0303" />
        </linearGradient>
        <linearGradient id={`hg-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`hs-${label}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c1822" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>

      {/* Mouthpiece */}
      <rect x="50" y="6" width="40" height="14" rx="4" fill="#2a2a32" />
      <rect x="58" y="13" width="24" height="3" rx="1.5" fill="#000" opacity="0.55" />

      {/* Body */}
      <rect
        x="20"
        y="20"
        width="100"
        height="230"
        rx="22"
        fill={`url(#hb-${label})`}
        stroke="rgba(255,255,255,0.18)"
      />
      <rect x="28" y="28" width="84" height="58" rx="16" fill={`url(#hg-${label})`} />

      {/* Screen */}
      <rect
        x="38"
        y="100"
        width="64"
        height="46"
        rx="6"
        fill={`url(#hs-${label})`}
        stroke="rgba(255,255,255,0.18)"
      />
      <text
        x="70"
        y="124"
        textAnchor="middle"
        fontSize="16"
        fontWeight="800"
        fill={color}
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
      <text
        x="70"
        y="138"
        textAnchor="middle"
        fontSize="7"
        fontWeight="600"
        fill="white"
        opacity="0.55"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.8"
      >
        {puffs} PUFFS
      </text>

      {/* Brand band */}
      <rect x="20" y="170" width="100" height="2" fill="rgba(255,255,255,0.18)" />
      <text
        x="70"
        y="194"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="white"
        fontFamily="Inter, sans-serif"
        letterSpacing="1.5"
      >
        TYAG
      </text>

      {/* Fire button */}
      <circle cx="42" cy="220" r="6" fill="rgba(0,0,0,0.55)" />
      <circle cx="42" cy="220" r="2" fill={color} />
      {/* USB */}
      <rect x="62" y="232" width="20" height="4" rx="2" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}
