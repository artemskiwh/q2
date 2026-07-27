import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Чёрно-белая палитра: тёмный фон + белые акценты
        night: {
          DEFAULT: "#0a0a0a",
          soft: "#0f0f0f",
          card: "#151515",
          elev: "#1c1c1c",
          line: "#272727",
        },
        ink: {
          DEFAULT: "#ffffff",
          dim: "#b4b4b4",
          mute: "#7c7c7c",
        },
        // Акцент — белый: рамки, иконки, активные состояния
        accent: {
          DEFAULT: "#ffffff",
          light: "#ffffff",
          deep: "#d6d6d6",
          soft: "rgba(255, 255, 255, 0.08)",
          line: "rgba(255, 255, 255, 0.22)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
        wider3: "0.32em",
      },
      boxShadow: {
        card: "0 24px 60px -30px rgba(0,0,0,0.9)",
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(-4%, -2%, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, 3%, 0) scale(1.12)" },
        },
        "scroll-hint": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "35%": { transform: "scaleY(1)", transformOrigin: "top", opacity: "1" },
          "65%": { transform: "scaleY(1)", transformOrigin: "bottom", opacity: "1" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom", opacity: "0" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) backwards",
        "fade-in": "fade-in 0.9s ease-out backwards",
        marquee: "marquee-x 48s linear infinite",
        "spin-slow": "spin-slow 90s linear infinite",
        drift: "drift 26s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
