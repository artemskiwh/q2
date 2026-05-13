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
          DEFAULT: "#0a0a0c",
          soft: "#111114",
          card: "#16161b",
          elev: "#1c1c22",
          line: "#26262e",
        },
        brand: {
          DEFAULT: "#e94e3c",
          hover: "#f15a48",
          soft: "rgba(233, 78, 60, 0.12)",
        },
        accent: {
          DEFAULT: "#4ad6c4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(233,78,60,0.4), 0 8px 30px -8px rgba(233,78,60,0.35)",
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
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
