import Link from "next/link";
import type { Category } from "@/lib/types";
import { withBasePath } from "@/lib/path";

const STYLES: Record<Category, { gradient: string; orb: string }> = {
  disposable: {
    gradient: "linear-gradient(135deg, #ff5a4f 0%, #c41e1e 55%, #5c0d0d 100%)",
    orb: "rgba(255,120,110,0.55)",
  },
  pod: {
    gradient: "linear-gradient(135deg, #45e0f5 0%, #0891b2 55%, #0c4a5b 100%)",
    orb: "rgba(80,220,240,0.5)",
  },
  cartridge: {
    gradient: "linear-gradient(135deg, #34d399 0%, #059669 55%, #053a2a 100%)",
    orb: "rgba(80,230,170,0.5)",
  },
  liquid: {
    gradient: "linear-gradient(135deg, #c084fc 0%, #7c3aed 55%, #3a0d54 100%)",
    orb: "rgba(200,140,255,0.5)",
  },
  accessory: {
    gradient: "linear-gradient(135deg, #fbbf24 0%, #d97706 55%, #4d2806 100%)",
    orb: "rgba(255,210,100,0.55)",
  },
  sale: {
    gradient: "linear-gradient(135deg, #ff7a92 0%, #be123c 55%, #4c0519 100%)",
    orb: "rgba(255,140,160,0.55)",
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
        {/* SVG filter "kill-white" turns near-white pixels in the photo
            transparent so each photo sits cleanly on the card gradient. */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <filter id="cat-kill-white" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -1 -1 -1 0 2.4"
            />
          </filter>
        </svg>
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="relative z-[1] h-[80%] w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
          style={{
            filter: "url(#cat-kill-white) drop-shadow(0 12px 22px rgba(0,0,0,0.5))",
          }}
        />
      </div>
      <div className="px-0.5">
        <p className="text-[13px] font-bold text-white md:text-sm">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted md:text-xs">{subtitle}</p>
      </div>
    </Link>
  );
}
