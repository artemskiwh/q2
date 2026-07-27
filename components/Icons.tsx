type P = React.SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const Icon = {
  Menu: (p: P) => (
    <svg {...base} {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  Close: (p: P) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Phone: (p: P) => (
    <svg {...base} {...p}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006.5 6.5L17 13l4 1.5v3a2 2 0 01-2.2 2A17 17 0 013.1 5.2 2 2 0 015 3z" />
    </svg>
  ),
  Clock: (p: P) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Pin: (p: P) => (
    <svg {...base} {...p}>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  Calendar: (p: P) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  Users: (p: P) => (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0112 0" />
      <path d="M16 5.3a3.2 3.2 0 010 5.4M17.5 20a6 6 0 00-2-4.5" />
    </svg>
  ),
  Check: (p: P) => (
    <svg {...base} {...p}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  ),
  Arrow: (p: P) => (
    <svg {...base} {...p}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  ),
  ChevronDown: (p: P) => (
    <svg {...base} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  ChevronLeft: (p: P) => (
    <svg {...base} {...p}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  Search: (p: P) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  ),
  Star: (p: P) => (
    <svg {...base} {...p}>
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9 6.7 19.7l1.1-5.9-4.3-4.1 5.9-.8z" />
    </svg>
  ),
  Flame: (p: P) => (
    <svg {...base} {...p}>
      <path d="M12 3s4.5 3.8 4.5 8a4.5 4.5 0 01-9 0c0-1.4.6-2.6 1.3-3.6.4 1.3 1.2 2 2.2 2 .6-2.6 1-4.6 1-6.4z" />
      <path d="M7.5 13.5A6.5 6.5 0 1018.5 18" opacity="0.5" />
    </svg>
  ),
  Leaf: (p: P) => (
    <svg {...base} {...p}>
      <path d="M4 20c0-9 6-14 16-14 0 10-5 15-14 15H4z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </svg>
  ),
  Copy: (p: P) => (
    <svg {...base} {...p}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M15 5H5a2 2 0 00-2 2v10" />
    </svg>
  ),
  Trash: (p: P) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M10 7V5a1 1 0 011-1h2a1 1 0 011 1v2M6 7l1 13h10l1-13" />
    </svg>
  ),
  Telegram: (p: P) => (
    <svg {...base} {...p}>
      <path d="M21 4.5L2.8 11.3c-.8.3-.8 1.4 0 1.7l4.6 1.6 1.7 5c.2.7 1.1.9 1.6.3l2.4-2.6 4.6 3.4c.6.4 1.4.1 1.6-.6L22.3 5.6c.2-.8-.6-1.4-1.3-1.1z" />
      <path d="M7.6 14.7L18.4 7l-8.2 8.4-.2 3.4" />
    </svg>
  ),
  Instagram: (p: P) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  Whatsapp: (p: P) => (
    <svg {...base} {...p}>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-3.8-.9z" />
      <path d="M9 9.2c.3 2.6 3.2 5.1 5.6 5.4.7.1 1.3-.5 1.3-1.2v-.6l-1.9-.8-.9 1a6.6 6.6 0 01-2.3-2.3l1-.9-.8-1.9h-.7c-.7 0-1.4.6-1.3 1.3z" />
    </svg>
  ),
  Sparkle: (p: P) => (
    <svg {...base} {...p}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M18.5 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </svg>
  ),
};
