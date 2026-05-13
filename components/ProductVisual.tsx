import type { Product } from "@/lib/types";

/**
 * Lightweight device illustration. Renders an SVG of the device with
 * brand-specific styling. Optimised for many instances in a grid —
 * no per-card blur/gradient orbs (they bloat the GPU layer count).
 */
export function ProductVisual({
  product,
  variant = "card",
}: {
  product: Product;
  variant?: "card" | "hero";
}) {
  if (product.image) {
    return (
      <div
        className="h-full w-full overflow-hidden rounded-2xl bg-bg-soft"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    );
  }

  const shape = product.shape ?? guessShape(product);
  const { from, to, accent = "#ffffff" } = product.imageStyle;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{
        background: `radial-gradient(115% 80% at 20% 0%, ${hexA(from, 0.16)} 0%, transparent 55%), linear-gradient(180deg, #181820 0%, #0a0a10 100%)`,
      }}
      aria-hidden
    >
      {shape === "stick" && <StickDevice product={product} />}
      {shape === "box" && <BoxDevice product={product} />}
      {shape === "pod" && <PodDevice product={product} />}
      {shape === "cart" && <CartridgeDevice product={product} />}

      {variant === "hero" && (
        <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {product.brand}
        </div>
      )}
    </div>
  );
}

function guessShape(p: Product): NonNullable<Product["shape"]> {
  if (p.category === "cartridge") return "cart";
  if (p.category === "pod") return "pod";
  if (p.puffs && p.puffs >= 25000) return "box";
  return "stick";
}

function hexA(hex: string, alpha: number): string {
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) return hex;
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function deviceDefs(slug: string, from: string, to: string, accent: string) {
  return (
    <defs>
      <linearGradient id={`b-${slug}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
        <stop offset="45%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
      <linearGradient id={`s-${slug}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
        <stop offset="20%" stopColor="rgba(0,0,0,0)" />
        <stop offset="80%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
      </linearGradient>
      <linearGradient id={`m-${slug}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1c1c22" />
        <stop offset="50%" stopColor="#52525e" />
        <stop offset="100%" stopColor="#15151c" />
      </linearGradient>
      <linearGradient id={`g-${slug}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="60%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`sc-${slug}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0b1822" />
        <stop offset="100%" stopColor="#020608" />
      </linearGradient>
    </defs>
  );
}

function StickDevice({ product }: { product: Product }) {
  const { from, to, accent = "#fff" } = product.imageStyle;
  const showScreen = !!product.puffs && product.puffs >= 20000;

  return (
    <svg
      viewBox="0 0 200 280"
      className="absolute inset-0 m-auto h-[92%] w-auto"
      preserveAspectRatio="xMidYMid meet"
      style={{ filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.55))" }}
    >
      {deviceDefs(product.slug, from, to, accent)}
      <rect x="77" y="10" width="46" height="16" rx="5" fill={`url(#m-${product.slug})`} />
      <rect x="84" y="17" width="32" height="3.5" rx="1.5" fill="rgba(0,0,0,0.65)" />

      <rect
        x="52"
        y="26"
        width="96"
        height="232"
        rx="20"
        fill={`url(#b-${product.slug})`}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <rect x="52" y="26" width="96" height="232" rx="20" fill={`url(#s-${product.slug})`} />
      <rect x="58" y="32" width="84" height="56" rx="14" fill={`url(#g-${product.slug})`} />

      {showScreen && (
        <>
          <rect
            x="70"
            y="100"
            width="60"
            height="42"
            rx="6"
            fill={`url(#sc-${product.slug})`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
          />
          <text
            x="100"
            y="120"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill={accent}
            fontFamily="Inter, sans-serif"
            letterSpacing="0.5"
          >
            {(product.puffs! / 1000).toFixed(0)}K
          </text>
          <rect x="78" y="126" width="44" height="3" rx="1.5" fill={accent} opacity="0.85" />
          <rect x="78" y="132" width="32" height="2" rx="1" fill="white" opacity="0.45" />
        </>
      )}

      <text
        x="100"
        y={showScreen ? 170 : 138}
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="white"
        fontFamily="Inter, sans-serif"
        letterSpacing="1.8"
      >
        {product.brand.slice(0, 11).toUpperCase()}
      </text>
      <text
        x="100"
        y={showScreen ? 184 : 154}
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fill={accent}
        opacity="0.75"
        fontFamily="Inter, sans-serif"
        letterSpacing="1.2"
      >
        {product.puffs ? `${(product.puffs / 1000).toFixed(0)}K PUFFS` : "PREMIUM"}
      </text>

      <rect x="52" y="208" width="96" height="2" fill="rgba(255,255,255,0.18)" />
      <circle cx="100" cy="238" r="3" fill={accent} />
      <rect x="85" y="252" width="30" height="4" rx="2" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}

function BoxDevice({ product }: { product: Product }) {
  const { from, to, accent = "#fff" } = product.imageStyle;

  return (
    <svg
      viewBox="0 0 240 280"
      className="absolute inset-0 m-auto h-[92%] w-auto"
      preserveAspectRatio="xMidYMid meet"
      style={{ filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.55))" }}
    >
      {deviceDefs(product.slug, from, to, accent)}
      <rect x="100" y="4" width="40" height="18" rx="5" fill={`url(#m-${product.slug})`} />
      <rect x="108" y="12" width="24" height="4" rx="1.5" fill="rgba(0,0,0,0.65)" />

      <rect
        x="42"
        y="22"
        width="156"
        height="244"
        rx="28"
        fill={`url(#b-${product.slug})`}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
      <rect x="42" y="22" width="156" height="244" rx="28" fill={`url(#s-${product.slug})`} />
      <rect x="50" y="30" width="140" height="68" rx="20" fill={`url(#g-${product.slug})`} />

      <rect
        x="62"
        y="110"
        width="116"
        height="76"
        rx="10"
        fill={`url(#sc-${product.slug})`}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.2"
      />
      <text
        x="120"
        y="142"
        textAnchor="middle"
        fontSize="22"
        fontWeight="900"
        fill={accent}
        fontFamily="Inter, sans-serif"
      >
        {product.puffs ? (product.puffs / 1000).toFixed(0) + "K" : product.brand.slice(0, 6)}
      </text>
      <text
        x="120"
        y="158"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="white"
        opacity="0.55"
        fontFamily="Inter, sans-serif"
        letterSpacing="1.6"
      >
        PUFFS
      </text>
      <rect x="72" y="172" width="38" height="3" rx="1.5" fill={accent} opacity="0.85" />
      <rect x="72" y="178" width="56" height="2" rx="1" fill="white" opacity="0.35" />

      <text
        x="120"
        y="218"
        textAnchor="middle"
        fontSize="14"
        fontWeight="900"
        fill="white"
        fontFamily="Inter, sans-serif"
        letterSpacing="2.5"
      >
        {product.brand.slice(0, 12).toUpperCase()}
      </text>

      <circle cx="64" cy="240" r="8" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.22)" />
      <circle cx="64" cy="240" r="3" fill={accent} />
      <rect x="106" y="252" width="34" height="6" rx="3" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}

function PodDevice({ product }: { product: Product }) {
  const { from, to, accent = "#fff" } = product.imageStyle;
  return (
    <svg
      viewBox="0 0 200 280"
      className="absolute inset-0 m-auto h-[90%] w-auto"
      preserveAspectRatio="xMidYMid meet"
      style={{ filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.55))" }}
    >
      {deviceDefs(product.slug, from, to, accent)}
      <rect x="68" y="6" width="64" height="78" rx="9" fill={`url(#m-${product.slug})`} />
      <rect x="74" y="11" width="52" height="50" rx="4" fill="rgba(0,0,0,0.6)" />
      <rect x="78" y="22" width="44" height="36" rx="3" fill={accent} opacity="0.16" />
      <rect x="78" y="36" width="44" height="22" rx="3" fill={accent} opacity="0.4" />
      <rect x="78" y="50" width="44" height="8" rx="3" fill={accent} opacity="0.55" />
      <rect x="90" y="66" width="20" height="14" rx="3" fill="rgba(0,0,0,0.6)" />

      <rect
        x="50"
        y="84"
        width="100"
        height="176"
        rx="16"
        fill={`url(#b-${product.slug})`}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
      <rect x="50" y="84" width="100" height="176" rx="16" fill={`url(#s-${product.slug})`} />
      <rect x="56" y="90" width="88" height="50" rx="10" fill={`url(#g-${product.slug})`} />

      <rect
        x="72"
        y="148"
        width="56"
        height="20"
        rx="3"
        fill={`url(#sc-${product.slug})`}
        stroke="rgba(255,255,255,0.18)"
      />
      <text
        x="100"
        y="162"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill={accent}
        fontFamily="Inter, sans-serif"
      >
        {product.brand.includes("XROS") ? "XROS" : "POD"}
      </text>

      <text
        x="100"
        y="190"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="white"
        fontFamily="Inter, sans-serif"
        letterSpacing="1.8"
      >
        {product.brand.slice(0, 11).toUpperCase()}
      </text>

      <rect x="82" y="220" width="36" height="14" rx="4" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="100" cy="227" r="3" fill={accent} opacity="0.85" />
      <rect x="83" y="246" width="34" height="6" rx="3" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}

function CartridgeDevice({ product }: { product: Product }) {
  const { from, accent = "#fff" } = product.imageStyle;
  return (
    <svg
      viewBox="0 0 200 290"
      className="absolute inset-0 m-auto h-[88%] w-auto"
      preserveAspectRatio="xMidYMid meet"
      style={{ filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.55))" }}
    >
      {deviceDefs(product.slug, from, "#000", accent)}
      <rect x="82" y="10" width="36" height="16" rx="4" fill={`url(#m-${product.slug})`} />
      <rect x="90" y="18" width="20" height="3" rx="1.5" fill="rgba(0,0,0,0.65)" />

      <rect
        x="66"
        y="26"
        width="68"
        height="208"
        rx="6"
        fill="rgba(20,20,28,0.6)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.2"
      />
      <rect x="71" y="36" width="58" height="190" rx="3" fill={from} opacity="0.32" />
      <rect x="71" y="110" width="58" height="116" rx="3" fill={from} opacity="0.55" />

      <rect x="88" y="202" width="24" height="22" rx="2" fill={`url(#m-${product.slug})`} />
      <circle cx="100" cy="213" r="4" fill="rgba(0,0,0,0.6)" />
      <rect x="88" y="244" width="24" height="14" rx="2" fill={`url(#m-${product.slug})`} />
      <circle cx="100" cy="252" r="5" fill="#444" />

      <text
        x="100"
        y="278"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fill={accent}
        fontFamily="Inter, sans-serif"
        letterSpacing="1"
      >
        {product.tags?.[0] ?? "0.6 Ω"}
      </text>
    </svg>
  );
}
