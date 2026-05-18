import Link from "next/link";
import type { Category } from "@/lib/types";
import { withBasePath } from "@/lib/path";

const STYLES: Record<Category, { gradient: string; orb: string }> = {
  disposable: {
    gradient: "linear-gradient(135deg, #2a0d0d 0%, #441010 60%, #0c0608 100%)",
    orb: "rgba(255,59,48,0.4)",
  },
  pod: {
    gradient: "linear-gradient(135deg, #061a2a 0%, #0c2a44 55%, #050a14 100%)",
    orb: "rgba(34,211,238,0.35)",
  },
  cartridge: {
    gradient: "linear-gradient(135deg, #042018 0%, #053a2a 55%, #02100a 100%)",
    orb: "rgba(16,185,129,0.35)",
  },
  liquid: {
    gradient: "linear-gradient(135deg, #1c0830 0%, #3a0d54 55%, #0b0418 100%)",
    orb: "rgba(168,85,247,0.35)",
  },
  accessory: {
    gradient: "linear-gradient(135deg, #2a1605 0%, #4d2806 55%, #100a04 100%)",
    orb: "rgba(251,191,36,0.35)",
  },
  sale: {
    gradient: "linear-gradient(135deg, #34060a 0%, #5a0e16 55%, #14040a 100%)",
    orb: "rgba(239,68,68,0.4)",
  },
};

export function CategoryCard({
  id,
  label,
  subtitle,
  image,
}: {
  id: Category;
  label: string;
  subtitle: string;
  image: string;
}) {
  const s = STYLES[id];
  const src = withBasePath(image) ?? image;
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
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="relative z-[1] h-[80%] w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.5))" }}
        />
      </div>
      <div className="px-0.5">
        <p className="text-[13px] font-bold text-white md:text-sm">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted md:text-xs">{subtitle}</p>
      </div>
    </Link>
  );
}
