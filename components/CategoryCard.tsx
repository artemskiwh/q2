import Link from "next/link";
import type { Category } from "@/lib/types";

const STYLES: Record<
  Category,
  { gradient: string; accent: string; ring: string; orb: string }
> = {
  disposable: {
    gradient: "linear-gradient(135deg, #2a0d0d 0%, #441010 60%, #0c0608 100%)",
    accent: "#ff3b30",
    ring: "ring-brand/30",
    orb: "rgba(255,59,48,0.4)",
  },
  pod: {
    gradient: "linear-gradient(135deg, #061a2a 0%, #0c2a44 55%, #050a14 100%)",
    accent: "#22d3ee",
    ring: "ring-accent/30",
    orb: "rgba(34,211,238,0.35)",
  },
  cartridge: {
    gradient: "linear-gradient(135deg, #042018 0%, #053a2a 55%, #02100a 100%)",
    accent: "#10b981",
    ring: "ring-emerald-500/30",
    orb: "rgba(16,185,129,0.35)",
  },
  liquid: {
    gradient: "linear-gradient(135deg, #1c0830 0%, #3a0d54 55%, #0b0418 100%)",
    accent: "#a855f7",
    ring: "ring-purple-500/30",
    orb: "rgba(168,85,247,0.35)",
  },
  accessory: {
    gradient: "linear-gradient(135deg, #2a1605 0%, #4d2806 55%, #100a04 100%)",
    accent: "#fbbf24",
    ring: "ring-amber-500/30",
    orb: "rgba(251,191,36,0.35)",
  },
  sale: {
    gradient: "linear-gradient(135deg, #34060a 0%, #5a0e16 55%, #14040a 100%)",
    accent: "#ff5547",
    ring: "ring-red-500/40",
    orb: "rgba(239,68,68,0.4)",
  },
};

export function CategoryCard({
  id,
  label,
  subtitle,
}: {
  id: Category;
  label: string;
  subtitle: string;
  icon?: string;
  index?: number;
}) {
  const s = STYLES[id];
  return (
    <Link
      href={`/catalog?category=${id}`}
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-bg-line bg-bg-card p-3 transition-colors duration-200 hover:border-white/20 md:p-3.5"
    >
      <div
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl"
        style={{ background: s.gradient }}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-70"
          style={{ background: `radial-gradient(circle, ${s.orb}, transparent 70%)` }}
        />
        <div className="relative z-[1] transition-transform duration-300 group-hover:scale-105">
          <CategoryIllustration id={id} accent={s.accent} />
        </div>
      </div>
      <div className="px-0.5">
        <p className="text-[13px] font-bold text-white md:text-sm">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted md:text-xs">{subtitle}</p>
      </div>
    </Link>
  );
}

function CategoryIllustration({ id, accent }: { id: Category; accent: string }) {
  switch (id) {
    case "disposable":
      return (
        <svg viewBox="0 0 120 100" className="h-20 w-28 md:h-24 md:w-32">
          <defs>
            <linearGradient id="cd-b" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="45%" stopColor={accent} />
              <stop offset="100%" stopColor="#1a0303" />
            </linearGradient>
            <linearGradient id="cd-b2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#cc2317" />
              <stop offset="100%" stopColor="#0a0202" />
            </linearGradient>
            <linearGradient id="cd-sc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1822" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
          {/* Back device */}
          <g transform="translate(8, 14) rotate(-8, 22, 35)">
            <rect x="18" y="0" width="12" height="5" rx="1.5" fill="#2a2a32" />
            <rect x="10" y="5" width="28" height="70" rx="6" fill="url(#cd-b2)" stroke="rgba(255,255,255,0.15)" />
            <rect x="14" y="26" width="20" height="14" rx="2" fill="url(#cd-sc)" />
            <text x="24" y="36" textAnchor="middle" fontSize="6" fontWeight="800" fill={accent}>25K</text>
          </g>
          {/* Front device */}
          <g transform="translate(58, 8)">
            <rect x="18" y="0" width="14" height="6" rx="1.5" fill="#2a2a32" />
            <rect x="8" y="6" width="34" height="84" rx="8" fill="url(#cd-b)" stroke="rgba(255,255,255,0.22)" />
            <rect x="12" y="14" width="26" height="18" rx="3" fill="rgba(255,255,255,0.18)" />
            <rect x="14" y="38" width="22" height="14" rx="2" fill="url(#cd-sc)" stroke="rgba(255,255,255,0.2)" />
            <text x="25" y="48" textAnchor="middle" fontSize="6" fontWeight="900" fill={accent}>40K</text>
            <rect x="14" y="56" width="22" height="2" fill="rgba(255,255,255,0.4)" />
            <text x="25" y="72" textAnchor="middle" fontSize="6" fontWeight="900" fill="#fff" letterSpacing="0.5">TYAG</text>
            <circle cx="25" cy="82" r="1.6" fill={accent} />
          </g>
        </svg>
      );
    case "pod":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-24 md:w-24">
          <defs>
            <linearGradient id="cp-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0a1a22" />
            </linearGradient>
            <linearGradient id="cp-met" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2a2a32" />
              <stop offset="50%" stopColor="#52525e" />
              <stop offset="100%" stopColor="#15151c" />
            </linearGradient>
          </defs>
          {/* Pod cartridge */}
          <rect x="32" y="8" width="36" height="30" rx="4" fill="url(#cp-met)" />
          <rect x="36" y="12" width="28" height="20" rx="2" fill="#000" opacity="0.6" />
          <rect x="38" y="16" width="24" height="16" rx="1" fill={accent} opacity="0.4" />
          <rect x="38" y="22" width="24" height="10" rx="1" fill={accent} opacity="0.6" />
          <rect x="44" y="36" width="12" height="6" rx="1" fill="rgba(0,0,0,0.6)" />
          {/* Body */}
          <rect x="28" y="42" width="44" height="50" rx="8" fill="url(#cp-b)" stroke="rgba(255,255,255,0.22)" />
          <rect x="32" y="46" width="36" height="14" rx="3" fill="rgba(255,255,255,0.18)" />
          <rect x="38" y="66" width="24" height="10" rx="2" fill="#0c1822" stroke="rgba(255,255,255,0.15)" />
          <text x="50" y="73" textAnchor="middle" fontSize="5" fontWeight="900" fill={accent}>POD</text>
          <circle cx="50" cy="84" r="2" fill={accent} opacity="0.85" />
        </svg>
      );
    case "cartridge":
      return (
        <svg viewBox="0 0 120 100" className="h-20 w-28 md:h-24 md:w-32">
          <defs>
            <linearGradient id="cc-glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
              <stop offset="100%" stopColor="#04140e" />
            </linearGradient>
            <linearGradient id="cc-met" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2a2a32" />
              <stop offset="50%" stopColor="#52525e" />
              <stop offset="100%" stopColor="#15151c" />
            </linearGradient>
          </defs>
          {/* Cartridge 1 */}
          <g transform="translate(18, 8)">
            <rect x="6" y="0" width="10" height="5" rx="1.5" fill="url(#cc-met)" />
            <rect x="2" y="5" width="18" height="68" rx="3" fill="rgba(15,15,22,0.7)" stroke="rgba(255,255,255,0.28)" />
            <rect x="5" y="12" width="12" height="48" rx="1" fill={accent} opacity="0.35" />
            <rect x="5" y="32" width="12" height="28" rx="1" fill={accent} opacity="0.6" />
            <rect x="6" y="64" width="10" height="6" rx="1" fill="url(#cc-met)" />
            <rect x="6" y="72" width="10" height="8" rx="1" fill="url(#cc-met)" />
            <circle cx="11" cy="78" r="2" fill="#222" />
          </g>
          {/* Cartridge 2 */}
          <g transform="translate(56, 14)">
            <rect x="6" y="0" width="10" height="5" rx="1.5" fill="url(#cc-met)" />
            <rect x="2" y="5" width="18" height="60" rx="3" fill="rgba(15,15,22,0.7)" stroke="rgba(255,255,255,0.28)" />
            <rect x="5" y="10" width="12" height="42" rx="1" fill={accent} opacity="0.32" />
            <rect x="5" y="28" width="12" height="24" rx="1" fill={accent} opacity="0.55" />
            <rect x="6" y="58" width="10" height="6" rx="1" fill="url(#cc-met)" />
          </g>
          {/* Cartridge 3 */}
          <g transform="translate(88, 22)">
            <rect x="6" y="0" width="10" height="5" rx="1.5" fill="url(#cc-met)" />
            <rect x="2" y="5" width="18" height="52" rx="3" fill="rgba(15,15,22,0.7)" stroke="rgba(255,255,255,0.28)" />
            <rect x="5" y="10" width="12" height="36" rx="1" fill={accent} opacity="0.3" />
            <rect x="5" y="24" width="12" height="22" rx="1" fill={accent} opacity="0.5" />
          </g>
        </svg>
      );
    case "liquid":
      return (
        <svg viewBox="0 0 120 100" className="h-20 w-28 md:h-24 md:w-32">
          <defs>
            <linearGradient id="cl-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1a0830" />
            </linearGradient>
            <linearGradient id="cl-b2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0a1a30" />
            </linearGradient>
          </defs>
          {/* Bottle 1 (back) */}
          <g transform="translate(8, 18) rotate(-6, 24, 35)">
            <rect x="18" y="0" width="12" height="8" rx="1.5" fill="#22232c" />
            <path d="M14 8 H34 V70 Q34 76 28 76 H20 Q14 76 14 70 Z" fill="url(#cl-b2)" stroke="rgba(255,255,255,0.22)" />
            <rect x="17" y="34" width="14" height="20" rx="1.5" fill="rgba(0,0,0,0.5)" />
            <text x="24" y="45" textAnchor="middle" fontSize="5" fontWeight="800" fill="#fff" opacity="0.7">SALT</text>
          </g>
          {/* Bottle 2 (front, taller) */}
          <g transform="translate(58, 8)">
            <rect x="18" y="0" width="14" height="10" rx="2" fill="#22232c" />
            <path d="M12 10 H38 V82 Q38 90 30 90 H20 Q12 90 12 82 Z" fill="url(#cl-b)" stroke="rgba(255,255,255,0.28)" />
            <rect x="16" y="34" width="18" height="24" rx="2" fill="rgba(0,0,0,0.55)" />
            <text x="25" y="46" textAnchor="middle" fontSize="6" fontWeight="900" fill={accent}>SALT</text>
            <text x="25" y="54" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#fff" opacity="0.7">20MG</text>
            <rect x="16" y="62" width="12" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
            <rect x="16" y="66" width="8" height="1.5" rx="0.75" fill="rgba(255,255,255,0.3)" />
            <rect x="14" y="78" width="22" height="4" fill={accent} opacity="0.7" />
          </g>
        </svg>
      );
    case "accessory":
      return (
        <svg viewBox="0 0 120 100" className="h-20 w-28 md:h-24 md:w-32">
          <defs>
            <linearGradient id="ca-b" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          {/* Charging cable */}
          <path
            d="M10 60 Q30 40, 50 60 T90 60"
            stroke="#1c1c25"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="6" y="56" width="10" height="10" rx="1.5" fill="url(#ca-b)" stroke="rgba(255,255,255,0.2)" />
          <rect x="84" y="56" width="20" height="10" rx="2" fill="#2a2a32" stroke="rgba(255,255,255,0.2)" />
          <rect x="100" y="58" width="6" height="6" rx="1" fill="#0a0a10" />
          {/* USB-C plug at bottom */}
          <rect x="38" y="76" width="44" height="14" rx="3" fill="url(#ca-b)" stroke="rgba(255,255,255,0.25)" />
          <rect x="78" y="80" width="10" height="6" rx="1.5" fill="#0a0a10" />
          <rect x="44" y="80" width="30" height="6" rx="1" fill="rgba(0,0,0,0.3)" />
          {/* Pod replacement */}
          <g transform="translate(10, 8)">
            <rect x="0" y="4" width="20" height="34" rx="3" fill="#2a2a32" stroke="rgba(255,255,255,0.2)" />
            <rect x="3" y="8" width="14" height="22" rx="2" fill={accent} opacity="0.4" />
            <rect x="6" y="0" width="8" height="6" rx="1" fill="rgba(0,0,0,0.5)" />
          </g>
        </svg>
      );
    case "sale":
      return (
        <svg viewBox="0 0 120 100" className="h-20 w-28 md:h-24 md:w-32">
          <defs>
            <linearGradient id="cs-tag" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff7766" />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
            <linearGradient id="cs-dev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2a0808" />
            </linearGradient>
          </defs>
          {/* Discount tag (rotated) */}
          <g transform="translate(10, 20) rotate(-12, 40, 30)">
            <path
              d="M2 8 L24 2 L62 14 L74 50 L40 60 Z"
              fill="url(#cs-tag)"
              stroke="rgba(255,255,255,0.3)"
            />
            <circle cx="18" cy="14" r="3" fill="#0a0a10" />
            <circle cx="18" cy="14" r="1.4" fill="rgba(255,255,255,0.4)" />
            <text x="44" y="32" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" fontFamily="Inter, sans-serif">
              SALE
            </text>
            <text x="44" y="46" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" opacity="0.85" letterSpacing="1">
              −40%
            </text>
          </g>
          {/* Small device */}
          <g transform="translate(78, 22)">
            <rect x="6" y="0" width="10" height="4" rx="1" fill="#2a2a32" />
            <rect x="2" y="4" width="18" height="56" rx="4" fill="url(#cs-dev)" stroke="rgba(255,255,255,0.22)" />
            <rect x="5" y="20" width="12" height="10" rx="1.5" fill="#000" opacity="0.6" />
            <circle cx="11" cy="48" r="1.4" fill={accent} />
          </g>
        </svg>
      );
  }
}
