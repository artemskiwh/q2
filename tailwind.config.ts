import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#000000",
          soft: "#0a0a0a",
          panel: "#111111",
          line: "rgba(255,255,255,0.35)",
          lineSoft: "rgba(255,255,255,0.15)",
        },
        bone: "#f2efe9",
        mute: "rgba(255,255,255,0.55)",
        mute2: "rgba(255,255,255,0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.4em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out both",
        "fade-in-up": "fade-in-up 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
