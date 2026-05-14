import type { SVGProps } from "react";
import type { Category } from "@/lib/types";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const CategoryIcons: Record<
  Category,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  disposable: (p) => (
    <svg {...base} {...p}>
      <rect x="9" y="2.5" width="6" height="2.5" rx="0.6" />
      <rect x="7.5" y="5" width="9" height="16.5" rx="2.2" />
      <rect x="9.5" y="9" width="5" height="3.5" rx="0.6" />
      <circle cx="12" cy="18.5" r="0.9" />
    </svg>
  ),
  pod: (p) => (
    <svg {...base} {...p}>
      <rect x="8" y="2.5" width="8" height="6.5" rx="1.2" />
      <rect x="10" y="9" width="4" height="2" rx="0.4" />
      <rect x="7" y="11" width="10" height="10.5" rx="1.6" />
      <path d="M9.5 14.5h5" />
      <circle cx="12" cy="18.5" r="0.8" />
    </svg>
  ),
  cartridge: (p) => (
    <svg {...base} {...p}>
      <rect x="10" y="2.5" width="4" height="1.8" rx="0.4" />
      <rect x="9" y="4.3" width="6" height="14.5" rx="0.8" />
      <path d="M11 7v9" />
      <path d="M13 7v9" />
      <rect x="10" y="18.8" width="4" height="2.7" rx="0.4" />
    </svg>
  ),
  liquid: (p) => (
    <svg {...base} {...p}>
      <rect x="9.5" y="2.5" width="5" height="3" rx="0.6" />
      <path d="M7.5 5.5h9v13.5a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5V5.5z" />
      <path d="M9 11h6" />
      <path d="M9 14h4" />
    </svg>
  ),
  accessory: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="10" width="6" height="4" rx="0.8" />
      <path d="M9 12h3c2 0 4 0 5-2s3-2 4 0" />
      <path d="M2.2 11v2" />
      <rect x="19" y="9.5" width="3" height="5" rx="0.8" />
    </svg>
  ),
  sale: (p) => (
    <svg {...base} {...p}>
      <path d="m3.5 12.5 8.5-8.5h7v7l-8.5 8.5a1.4 1.4 0 0 1-2 0l-5-5a1.4 1.4 0 0 1 0-2z" />
      <circle cx="15.5" cy="8.5" r="1.2" />
      <path d="m9.5 13 4 4" />
    </svg>
  ),
};
