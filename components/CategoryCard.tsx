"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

const STYLES: Record<
  Category,
  { gradient: string; accent: string; ring: string; orb: string }
> = {
  disposable: {
    gradient: "linear-gradient(135deg, #2a0d0d 0%, #441010 60%, #0c0608 100%)",
    accent: "#ff3b30",
    ring: "ring-brand/30",
    orb: "rgba(255,59,48,0.55)",
  },
  pod: {
    gradient: "linear-gradient(135deg, #061a2a 0%, #0c2a44 55%, #050a14 100%)",
    accent: "#22d3ee",
    ring: "ring-accent/30",
    orb: "rgba(34,211,238,0.5)",
  },
  cartridge: {
    gradient: "linear-gradient(135deg, #042018 0%, #053a2a 55%, #02100a 100%)",
    accent: "#10b981",
    ring: "ring-emerald-500/30",
    orb: "rgba(16,185,129,0.5)",
  },
  liquid: {
    gradient: "linear-gradient(135deg, #1c0830 0%, #3a0d54 55%, #0b0418 100%)",
    accent: "#a855f7",
    ring: "ring-purple-500/30",
    orb: "rgba(168,85,247,0.5)",
  },
  accessory: {
    gradient: "linear-gradient(135deg, #2a1605 0%, #4d2806 55%, #100a04 100%)",
    accent: "#fbbf24",
    ring: "ring-amber-500/30",
    orb: "rgba(251,191,36,0.5)",
  },
  sale: {
    gradient: "linear-gradient(135deg, #34060a 0%, #5a0e16 55%, #14040a 100%)",
    accent: "#ff5547",
    ring: "ring-red-500/40",
    orb: "rgba(239,68,68,0.55)",
  },
};

export function CategoryCard({
  id,
  label,
  subtitle,
  index = 0,
}: {
  id: Category;
  label: string;
  subtitle: string;
  icon: string;
  index?: number;
}) {
  const s = STYLES[id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.32, delay: index * 0.04, ease: "easeOut" }}
    >
      <Link
        href={`/catalog?category=${id}`}
        className={`tile-shine group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-bg-line bg-bg-card p-3.5 ring-0 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:ring-2 hover:${s.ring} md:p-4`}
      >
        <div
          className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl"
          style={{ background: s.gradient }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 blur-3xl"
            style={{ background: s.orb }}
          />
          <div className="relative z-[1] transition-transform duration-500 group-hover:scale-110">
            <CategoryIllustration id={id} accent={s.accent} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40" />
        </div>
        <div className="px-0.5">
          <p className="text-[13px] font-bold text-white md:text-sm">{label}</p>
          <p className="mt-0.5 text-[11px] text-muted md:text-xs">{subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryIllustration({ id, accent }: { id: Category; accent: string }) {
  switch (id) {
    case "disposable":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-24 md:w-24">
          <defs>
            <linearGradient id="cat-d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <rect x="40" y="12" width="20" height="6" rx="1.5" fill="#3a3a44" />
          <rect
            x="32"
            y="18"
            width="36"
            height="74"
            rx="10"
            fill="url(#cat-d)"
            stroke="rgba(255,255,255,0.2)"
          />
          <rect x="38" y="42" width="24" height="14" rx="2" fill="#000" opacity="0.55" />
          <text
            x="50"
            y="52"
            textAnchor="middle"
            fontSize="7"
            fontWeight="800"
            fill={accent}
            fontFamily="Inter, sans-serif"
          >
            40K
          </text>
          <circle cx="50" cy="78" r="3" fill="#fff" opacity="0.5" />
        </svg>
      );
    case "pod":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-24 md:w-24">
          <defs>
            <linearGradient id="cat-p" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0a1a22" />
            </linearGradient>
          </defs>
          <rect x="36" y="14" width="28" height="30" rx="3" fill="#22232c" />
          <rect x="40" y="18" width="20" height="22" rx="2" fill={accent} opacity="0.45" />
          <rect
            x="30"
            y="44"
            width="40"
            height="48"
            rx="8"
            fill="url(#cat-p)"
            stroke="rgba(255,255,255,0.2)"
          />
          <rect x="42" y="56" width="16" height="4" rx="1" fill="rgba(255,255,255,0.6)" />
          <circle cx="50" cy="78" r="3" fill={accent} opacity="0.85" />
        </svg>
      );
    case "cartridge":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-24 md:w-24">
          <defs>
            <linearGradient id="cat-c" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
              <stop offset="100%" stopColor="#04140e" />
            </linearGradient>
          </defs>
          <rect x="44" y="10" width="12" height="6" rx="1.5" fill="#3a3a44" />
          <rect
            x="38"
            y="16"
            width="24"
            height="70"
            rx="4"
            fill="url(#cat-c)"
            stroke="rgba(255,255,255,0.22)"
          />
          <rect x="42" y="22" width="16" height="58" rx="2" fill={accent} opacity="0.18" />
          <circle cx="46" cy="34" r="2.5" fill="#fff" opacity="0.55" />
          <rect x="44" y="86" width="12" height="6" rx="1" fill="#3a3a44" />
        </svg>
      );
    case "liquid":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-24 md:w-24">
          <defs>
            <linearGradient id="cat-l" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1a0830" />
            </linearGradient>
          </defs>
          <rect x="42" y="10" width="16" height="10" rx="2" fill="#2a2a36" />
          <path
            d="M30 26 Q30 20 38 20 H62 Q70 20 70 26 V86 Q70 92 64 92 H36 Q30 92 30 86 Z"
            fill="url(#cat-l)"
            stroke="rgba(255,255,255,0.25)"
          />
          <rect x="36" y="48" width="28" height="14" rx="2" fill="rgba(0,0,0,0.45)" />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="8"
            fontWeight="800"
            fill={accent}
            fontFamily="Inter, sans-serif"
          >
            SALT
          </text>
          <rect x="36" y="68" width="20" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
        </svg>
      );
    case "accessory":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-24 md:w-24">
          <defs>
            <linearGradient id="cat-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <rect
            x="22"
            y="38"
            width="56"
            height="24"
            rx="6"
            fill="url(#cat-a)"
            stroke="rgba(255,255,255,0.25)"
          />
          <rect x="74" y="44" width="6" height="12" rx="1.5" fill="#3a3a44" />
          <path d="M20 42 V58" stroke="rgba(0,0,0,0.55)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="36" cy="50" r="3" fill="#fff" opacity="0.6" />
          <rect x="46" y="46" width="22" height="8" rx="2" fill="rgba(0,0,0,0.35)" />
        </svg>
      );
    case "sale":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20 md:h-24 md:w-24">
          <defs>
            <linearGradient id="cat-s" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff7766" />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <path
            d="M30 14 H68 L86 32 V90 Q86 92 84 92 H30 Q28 92 28 90 V16 Q28 14 30 14 Z"
            fill="url(#cat-s)"
            stroke="rgba(255,255,255,0.25)"
          />
          <path d="M68 14 V30 H86" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
          <text
            x="56"
            y="60"
            textAnchor="middle"
            fontSize="20"
            fontWeight="900"
            fill="#fff"
            fontFamily="Inter, sans-serif"
          >
            −40%
          </text>
          <text
            x="56"
            y="76"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#fff"
            opacity="0.7"
            fontFamily="Inter, sans-serif"
            letterSpacing="1"
          >
            SALE
          </text>
        </svg>
      );
  }
}
