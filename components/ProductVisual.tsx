import type { Product } from "@/lib/types";

/**
 * Stylized product visual built from the product's imageStyle gradient.
 * Uses pure SVG/CSS so it works without external photo hosting,
 * while keeping a recognizable brand identity per item.
 */
export function ProductVisual({
  product,
  variant = "card",
}: {
  product: Product;
  variant?: "card" | "hero";
}) {
  const { from, via, to, accent = "#ffffff" } = product.imageStyle;
  const big = variant === "hero";
  const gradient = via
    ? `linear-gradient(160deg, ${from} 0%, ${via} 55%, ${to} 100%)`
    : `linear-gradient(160deg, ${from} 0%, ${to} 100%)`;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ background: gradient }}
      aria-hidden
    >
      <div
        className="absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: accent }}
      />
      <div
        className="absolute -bottom-12 -right-10 h-44 w-44 rounded-full opacity-25 blur-3xl"
        style={{ background: accent }}
      />

      <svg
        viewBox="0 0 200 260"
        className="absolute inset-0 m-auto h-[88%] w-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`body-${product.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
            <stop offset="55%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <linearGradient id={`gloss-${product.slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="40%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="55"
          y="30"
          width="90"
          height="200"
          rx="22"
          fill={`url(#body-${product.slug})`}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
        />
        <rect x="60" y="38" width="80" height="60" rx="14" fill={`url(#gloss-${product.slug})`} />
        <rect
          x="78"
          y="34"
          width="44"
          height="8"
          rx="4"
          fill="rgba(0,0,0,0.35)"
        />
        <rect
          x="72"
          y="118"
          width="56"
          height="38"
          rx="6"
          fill="rgba(0,0,0,0.35)"
          stroke="rgba(255,255,255,0.12)"
        />
        <text
          x="100"
          y="138"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="white"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.5"
        >
          {product.brand.slice(0, 10)}
        </text>
        {product.puffs && (
          <text
            x="100"
            y="150"
            textAnchor="middle"
            fontSize="7"
            fill={accent}
            fontFamily="Inter, sans-serif"
            letterSpacing="0.3"
          >
            {product.puffs.toLocaleString("ru-RU")} puffs
          </text>
        )}
        <circle cx="100" cy="200" r="14" fill="rgba(0,0,0,0.4)" />
        <circle cx="100" cy="200" r="8" fill={accent} opacity="0.7" />
      </svg>

      {big && (
        <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {product.brand}
        </div>
      )}
    </div>
  );
}
