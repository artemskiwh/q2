import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          soft: "#0b0b0d",
          card: "#101012",
          elev: "#161618",
          line: "#26262b",
        },
        gold: {
          DEFAULT: "#c9a24b",
          light: "#e7c877",
          bright: "#f3dd9a",
          deep: "#9a7a30",
          soft: "rgba(201, 162, 75, 0.12)",
          glow: "rgba(201, 162, 75, 0.45)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        brand: "0.35em",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 20px 50px -24px rgba(0,0,0,0.9)",
        gold: "0 0 0 1px rgba(201,162,75,0.35), 0 18px 44px -14px rgba(201,162,75,0.35)",
        dish: "0 30px 55px -20px rgba(0,0,0,0.85)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #f3dd9a 0%, #c9a24b 45%, #9a7a30 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, #c9a24b 20%, #e7c877 50%, #c9a24b 80%, transparent)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out",
        marquee: "marquee-x 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
