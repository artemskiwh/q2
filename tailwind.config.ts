import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#07070a",
          soft: "#0f0f14",
          card: "#15151c",
          elev: "#1c1c25",
          line: "#262631",
          hover: "#22222d",
        },
        brand: {
          DEFAULT: "#ff3b30",
          hover: "#ff5347",
          dark: "#c41e1e",
          soft: "rgba(255, 59, 48, 0.12)",
          glow: "rgba(255, 59, 48, 0.45)",
        },
        accent: {
          DEFAULT: "#22d3ee",
          hover: "#67e8f9",
          soft: "rgba(34, 211, 238, 0.12)",
        },
        gold: {
          DEFAULT: "#fbbf24",
          soft: "rgba(251, 191, 36, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(0,0,0,0.65)",
        glow: "0 0 0 1px rgba(255,59,48,0.45), 0 12px 36px -10px rgba(255,59,48,0.45)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.35), 0 12px 36px -10px rgba(34,211,238,0.35)",
        inner: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #ff3b30 0%, #c41e1e 100%)",
        "accent-gradient": "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        "hero-radial":
          "radial-gradient(120% 100% at 0% 0%, rgba(255,59,48,0.18) 0%, transparent 55%), radial-gradient(100% 80% at 100% 100%, rgba(34,211,238,0.10) 0%, transparent 55%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,59,48,0.5)" },
          "50%": { boxShadow: "0 0 0 14px rgba(255,59,48,0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out",
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee-x 38s linear infinite",
        "pulse-glow": "pulse-glow 2.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
