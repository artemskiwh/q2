import type { Product } from "@/lib/types";

/**
 * Stylized product visual. Uses real photo from /public if `product.image` is set,
 * otherwise draws a realistic device silhouette (stick / pod / cartridge box) in brand colors.
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
        className="relative h-full w-full overflow-hidden rounded-2xl bg-bg-soft"
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
  const { from, via, to, accent = "#ffffff" } = product.imageStyle;
  const gradient = via
    ? `radial-gradient(120% 80% at 20% 0%, ${from}30 0%, transparent 60%),
       radial-gradient(120% 80% at 80% 100%, ${via}40 0%, transparent 60%),
       linear-gradient(180deg, #16161b 0%, #0c0c10 100%)`
    : `linear-gradient(180deg, #16161b 0%, #0c0c10 100%)`;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ background: gradient }}
      aria-hidden
    >
      <div
        className="absolute -left-12 -top-12 h-44 w-44 rounded-full opacity-30 blur-3xl"
        style={{ background: from }}
      />
      <div
        className="absolute -bottom-14 -right-12 h-48 w-48 rounded-full opacity-25 blur-3xl"
        style={{ background: accent }}
      />

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

function deviceDefs(slug: string, from: string, to: string, accent: string) {
  return (
    <defs>
      <linearGradient id={`body-${slug}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
        <stop offset="50%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
      <linearGradient id={`metal-${slug}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2a2a32" />
        <stop offset="50%" stopColor="#444452" />
        <stop offset="100%" stopColor="#1c1c22" />
      </linearGradient>
      <linearGradient id={`gloss-${slug}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.45" />
        <stop offset="55%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`screen-${slug}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0b1a22" />
        <stop offset="100%" stopColor="#020608" />
      </linearGradient>
    </defs>
  );
}

function StickDevice({ product }: { product: Product }) {
  const { from, to, accent = "#fff" } = product.imageStyle;
  return (
    <svg
      viewBox="0 0 200 260"
      className="absolute inset-0 m-auto h-[92%] w-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
      preserveAspectRatio="xMidYMid meet"
    >
      {deviceDefs(product.slug, from, to, accent)}

      {/* Mouthpiece */}
      <rect x="78" y="14" width="44" height="14" rx="4" fill={`url(#metal-${product.slug})`} />
      <rect x="84" y="20" width="32" height="3" rx="1.5" fill="rgba(0,0,0,0.55)" />

      {/* Body */}
      <rect
        x="55"
        y="28"
        width="90"
        height="216"
        rx="18"
        fill={`url(#body-${product.slug})`}
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1"
      />
      <rect x="60" y="34" width="80" height="50" rx="12" fill={`url(#gloss-${product.slug})`} />

      {/* OLED screen */}
      {product.puffs && product.puffs >= 20000 && (
        <>
          <rect
            x="73"
            y="100"
            width="54"
            height="36"
            rx="5"
            fill={`url(#screen-${product.slug})`}
            stroke="rgba(255,255,255,0.18)"
          />
          <text
            x="100"
            y="116"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill={accent}
            fontFamily="Inter, sans-serif"
            letterSpacing="0.5"
          >
            {(product.puffs / 1000).toFixed(0)}K
          </text>
          <rect x="79" y="122" width="42" height="3" rx="1.5" fill={accent} opacity="0.7" />
          <rect x="79" y="128" width="28" height="2" rx="1" fill="white" opacity="0.4" />
        </>
      )}

      {/* Brand label */}
      <text
        x="100"
        y={product.puffs && product.puffs >= 20000 ? 160 : 130}
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="white"
        fontFamily="Inter, sans-serif"
        letterSpacing="1.5"
      >
        {product.brand.slice(0, 10).toUpperCase()}
      </text>

      {/* Decorative rings */}
      <rect x="55" y="195" width="90" height="2" fill="rgba(255,255,255,0.12)" />
      <rect x="55" y="200" width="90" height="1" fill="rgba(255,255,255,0.08)" />

      {/* Light indicator */}
      <circle cx="100" cy="225" r="4" fill={accent} opacity="0.6" />
    </svg>
  );
}

function BoxDevice({ product }: { product: Product }) {
  const { from, to, accent = "#fff" } = product.imageStyle;
  return (
    <svg
      viewBox="0 0 220 260"
      className="absolute inset-0 m-auto h-[90%] w-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
      preserveAspectRatio="xMidYMid meet"
    >
      {deviceDefs(product.slug, from, to, accent)}

      {/* Mouthpiece */}
      <rect x="90" y="6" width="40" height="16" rx="4" fill={`url(#metal-${product.slug})`} />
      <rect x="98" y="14" width="24" height="3" rx="1.5" fill="rgba(0,0,0,0.55)" />

      {/* Body with rounded chunky shape */}
      <rect
        x="40"
        y="22"
        width="140"
        height="220"
        rx="26"
        fill={`url(#body-${product.slug})`}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <rect x="46" y="28" width="128" height="60" rx="18" fill={`url(#gloss-${product.slug})`} />

      {/* Large display */}
      <rect
        x="60"
        y="102"
        width="100"
        height="62"
        rx="8"
        fill={`url(#screen-${product.slug})`}
        stroke="rgba(255,255,255,0.18)"
      />
      {/* Display content */}
      <text
        x="110"
        y="124"
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill={accent}
        fontFamily="Inter, sans-serif"
      >
        {product.puffs ? (product.puffs / 1000).toFixed(0) + "K" : product.brand.slice(0, 6)}
      </text>
      <rect x="68" y="132" width="84" height="3" rx="1.5" fill={accent} opacity="0.8" />
      <rect x="68" y="140" width="60" height="2.5" rx="1.25" fill="white" opacity="0.45" />
      <rect x="68" y="148" width="40" height="2.5" rx="1.25" fill="white" opacity="0.3" />

      {/* Brand */}
      <text
        x="110"
        y="190"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="white"
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
      >
        {product.brand.slice(0, 12).toUpperCase()}
      </text>

      {/* Fire button */}
      <circle cx="60" cy="222" r="8" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="60" cy="222" r="3" fill={accent} opacity="0.85" />

      {/* USB-C */}
      <rect x="95" y="232" width="30" height="6" rx="3" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}

function PodDevice({ product }: { product: Product }) {
  const { from, to, accent = "#fff" } = product.imageStyle;
  return (
    <svg
      viewBox="0 0 200 260"
      className="absolute inset-0 m-auto h-[88%] w-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
      preserveAspectRatio="xMidYMid meet"
    >
      {deviceDefs(product.slug, from, to, accent)}

      {/* Pod cartridge top */}
      <rect x="70" y="10" width="60" height="76" rx="8" fill={`url(#metal-${product.slug})`} />
      <rect x="76" y="14" width="48" height="50" rx="4" fill="rgba(0,0,0,0.55)" />
      {/* Liquid level */}
      <rect x="80" y="22" width="40" height="38" rx="3" fill={accent} opacity="0.18" />
      <rect x="80" y="38" width="40" height="22" rx="3" fill={accent} opacity="0.35" />

      {/* Body */}
      <rect
        x="55"
        y="80"
        width="90"
        height="160"
        rx="14"
        fill={`url(#body-${product.slug})`}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <rect x="60" y="86" width="80" height="40" rx="8" fill={`url(#gloss-${product.slug})`} />

      {/* Brand */}
      <text
        x="100"
        y="158"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="white"
        fontFamily="Inter, sans-serif"
        letterSpacing="1.5"
      >
        {product.brand.slice(0, 10).toUpperCase()}
      </text>
      <text
        x="100"
        y="174"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill={accent}
        opacity="0.8"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.5"
      >
        {product.name.replace(product.brand, "").trim().slice(0, 14)}
      </text>

      {/* Fire button */}
      <rect x="86" y="192" width="28" height="14" rx="4" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.18)" />
      <circle cx="100" cy="199" r="3" fill={accent} opacity="0.7" />

      {/* USB-C */}
      <rect x="85" y="222" width="30" height="6" rx="3" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}

function CartridgeDevice({ product }: { product: Product }) {
  const { from, to, accent = "#fff" } = product.imageStyle;
  return (
    <svg
      viewBox="0 0 200 260"
      className="absolute inset-0 m-auto h-[80%] w-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
      preserveAspectRatio="xMidYMid meet"
    >
      {deviceDefs(product.slug, from, to, accent)}

      {/* Mouthpiece */}
      <rect x="85" y="14" width="30" height="14" rx="3" fill={`url(#metal-${product.slug})`} />
      <rect x="91" y="20" width="18" height="3" rx="1.5" fill="rgba(0,0,0,0.55)" />

      {/* Transparent cartridge body */}
      <rect
        x="70"
        y="28"
        width="60"
        height="190"
        rx="6"
        fill="rgba(20,20,28,0.6)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      {/* Liquid */}
      <rect x="74" y="40" width="52" height="170" rx="3" fill={from} opacity="0.35" />
      <rect x="74" y="100" width="52" height="110" rx="3" fill={from} opacity="0.55" />
      {/* Bubble */}
      <circle cx="86" cy="80" r="4" fill="white" opacity="0.5" />
      <circle cx="115" cy="60" r="2.5" fill="white" opacity="0.4" />

      {/* Coil silhouette */}
      <rect x="92" y="190" width="16" height="20" rx="2" fill={`url(#metal-${product.slug})`} />
      <circle cx="100" cy="200" r="3" fill="rgba(0,0,0,0.6)" />

      {/* 510 pin */}
      <rect x="92" y="228" width="16" height="14" rx="2" fill={`url(#metal-${product.slug})`} />
      <circle cx="100" cy="236" r="4" fill="#444" />

      {/* Resistance label */}
      <text
        x="100"
        y="260"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={accent}
        fontFamily="Inter, sans-serif"
      >
        {product.tags?.[0] ?? product.brand}
      </text>
    </svg>
  );
}
