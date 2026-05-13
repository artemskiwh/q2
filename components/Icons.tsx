import type { SVGProps } from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icon = {
  Search: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  Cart: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h7.2a2 2 0 0 0 2-1.6L20 8H6" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  ),
  Heart: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 21s-7-4.35-9.5-9C1 8.5 3 5 6.5 5c2 0 3.5 1.2 5.5 3.5C13.9 6.2 15.5 5 17.5 5 21 5 23 8.5 21.5 12c-2.5 4.65-9.5 9-9.5 9z" />
    </svg>
  ),
  User: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  Menu: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  X: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M6 18 18 6" />
    </svg>
  ),
  Plus: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Minus: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M5 12h14" />
    </svg>
  ),
  Chevron: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  Filter: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  ),
  Home: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  ),
  Catalog: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Phone: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M3 5a2 2 0 0 1 2-2h2l2 5-2.5 1.5a12 12 0 0 0 6 6L14 13l5 2v2a2 2 0 0 1-2 2A14 14 0 0 1 3 5z" />
    </svg>
  ),
  Telegram: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M22 3 2 11l7 2 9-7-7 9 2 7z" />
    </svg>
  ),
  Whatsapp: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M3 20l1.5-4A8 8 0 1 1 8 20.5L3 20z" />
      <path d="M8 11s.5 2 1.5 3 3 1.5 3 1.5l1.5-1 2 1c0 1.5-1.5 2.5-3 2.5-3 0-7-4-7-7 0-1.5 1-3 2.5-3l1 2-1 1.5z" />
    </svg>
  ),
  Truck: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M3 6h12v10H3z" />
      <path d="M15 9h4l2 3v4h-6" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
  Shield: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" />
    </svg>
  ),
  Spark: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </svg>
  ),
  Fire: (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
      <path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 1 1 2 1 2 0 0-2-1-3 1-5z" />
    </svg>
  ),
};
