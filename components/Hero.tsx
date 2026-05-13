import Link from "next/link";
import { Icon } from "./Icons";

const STATS = [
  { value: "120+", label: "позиций в наличии" },
  { value: "24/7", label: "приём заявок" },
  { value: "1 день", label: "отгрузка" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-bg-line hero-bg md:rounded-3xl">
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-50 bg-brand/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 hidden h-56 w-56 rounded-full opacity-40 bg-accent/30 blur-3xl md:block" />

      <div className="relative grid gap-6 px-4 py-6 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand md:text-[11px]">
            <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-brand" />
            TYAG · Moskva · Опт
          </span>

          <h1 className="mt-3 text-[24px] font-black leading-[1.05] tracking-tight text-white md:mt-4 md:text-[44px] lg:text-[56px]">
            Оптовые поставки{" "}
            <span className="bg-gradient-to-r from-brand via-[#ff7a5e] to-[#ffb199] bg-clip-text text-transparent">
              вейпов
            </span>{" "}
            по всей России
          </h1>

          <p className="mt-3 max-w-[520px] text-[13px] leading-relaxed text-muted md:mt-4 md:text-base">
            DUALL, WAKA, ELFBAR, GEEK BAR, Vaporesso, GeekVape — официально и со склада в Москве.
            Цены от 110 ₽ за устройство при заказе от 50 шт.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
            <Link href="/catalog" className="btn-primary text-[13px] md:text-[15px]">
              <Icon.Bolt className="h-4 w-4" />
              Каталог
            </Link>
            <Link href="/wholesale" className="btn-ghost text-[13px] md:text-[15px]">
              <Icon.Handshake className="h-4 w-4" />
              Партнёрам
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-bg-line pt-4 md:mt-8 md:max-w-md md:gap-4 md:pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-base font-black text-white md:text-2xl">{s.value}</div>
                <div className="mt-0.5 text-[10px] leading-tight text-muted md:mt-1 md:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[480px]">
      <div className="absolute left-[12%] top-[14%] w-[34%] hero-float-1">
        <DevicePreview color="#ff3b30" accent="#ffd6cc" label="40K" puffs="40 000" />
      </div>
      <div className="absolute left-[37%] top-[2%] z-10 w-[36%] hero-float-2">
        <DevicePreview color="#22d3ee" accent="#cffafe" label="50K" puffs="50 000" big />
      </div>
      <div className="absolute right-[8%] top-[20%] w-[32%] hero-float-3">
        <DevicePreview color="#a855f7" accent="#e9d5ff" label="25K" puffs="25 000" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(255,59,48,0.22) 0%, transparent 70%)",
        }}
      />
    </div>
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
  const id = label;
  return (
    <svg
      viewBox="0 0 140 260"
      className={big ? "scale-110" : ""}
      style={{ filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.55))" }}
    >
      <defs>
        <linearGradient id={`hb-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="#1a0303" />
        </linearGradient>
        <linearGradient id={`hg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`hs-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c1822" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>

      <rect x="50" y="6" width="40" height="14" rx="4" fill="#2a2a32" />
      <rect x="58" y="13" width="24" height="3" rx="1.5" fill="#000" opacity="0.55" />

      <rect
        x="20"
        y="20"
        width="100"
        height="230"
        rx="22"
        fill={`url(#hb-${id})`}
        stroke="rgba(255,255,255,0.18)"
      />
      <rect x="28" y="28" width="84" height="58" rx="16" fill={`url(#hg-${id})`} />

      <rect
        x="38"
        y="100"
        width="64"
        height="46"
        rx="6"
        fill={`url(#hs-${id})`}
        stroke="rgba(255,255,255,0.18)"
      />
      <text x="70" y="124" textAnchor="middle" fontSize="16" fontWeight="800" fill={color}>
        {label}
      </text>
      <text x="70" y="138" textAnchor="middle" fontSize="7" fontWeight="600" fill="white" opacity="0.55" letterSpacing="0.8">
        {puffs} PUFFS
      </text>

      <rect x="20" y="170" width="100" height="2" fill="rgba(255,255,255,0.18)" />
      <text x="70" y="194" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" letterSpacing="1.5">
        TYAG
      </text>

      <circle cx="42" cy="220" r="6" fill="rgba(0,0,0,0.55)" />
      <circle cx="42" cy="220" r="2" fill={color} />
      <rect x="62" y="232" width="20" height="4" rx="2" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}
