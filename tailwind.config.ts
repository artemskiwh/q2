import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Тёмный сланец — как каменный стол на фирменных фото
        night: {
          DEFAULT: "#0b0b0e",
          soft: "#101116",
          card: "#16171d",
          elev: "#1c1e25",
          line: "#2a2b33",
          warm: "#2e2a22",
        },
        // Слоновая кость — основной текст
        ink: {
          DEFAULT: "#f3ede2",
          dim: "#b6ae9f",
          mute: "#847c6e",
        },
        // Золото с ободка керамики
        gold: {
          DEFAULT: "#c9a25a",
          light: "#e6cd93",
          deep: "#8d6c2c",
          soft: "rgba(201, 162, 90, 0.12)",
          line: "rgba(201, 162, 90, 0.28)",
        },
        // Бирюза глазури
        turq: {
          DEFAULT: "#2f8f88",
          light: "#5cbdb4",
          soft: "rgba(47, 143, 136, 0.14)",
        },
        // Гранат
        pom: {
          DEFAULT: "#a02a35",
          light: "#d0505c",
          soft: "rgba(160, 42, 53, 0.14)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
        wider3: "0.32em",
      },
      boxShadow: {
        card: "0 24px 60px -30px rgba(0,0,0,0.9)",
        gold: "0 0 0 1px rgba(201,162,90,0.35), 0 18px 50px -24px rgba(201,162,90,0.4)",
        medallion: "0 40px 90px -30px rgba(0,0,0,0.95)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(120deg, #8d6c2c 0%, #c9a25a 35%, #e6cd93 52%, #c9a25a 68%, #8d6c2c 100%)",
        "night-fade":
          "linear-gradient(180deg, rgba(11,11,14,0) 0%, rgba(11,11,14,0.75) 55%, #0b0b0e 100%)",
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
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) backwards",
        "fade-in": "fade-in 0.9s ease-out backwards",
        "slow-zoom": "slow-zoom 22s ease-out forwards",
        marquee: "marquee-x 48s linear infinite",
        "spin-slow": "spin-slow 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
