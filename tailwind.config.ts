import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#030406",
          900: "#06080c",
          850: "#0b0e14",
          800: "#10141d",
          700: "#181e2b",
        },
        celestial: {
          gold: "#f5d77f",
          "gold-light": "#fff1be",
          "gold-dark": "#cda64b",
          amber: "#fba94b",
          rose: "#f8b4b4",
          blue: "#89c4f4",
          matcha: "#a8c087",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      animation: {
        "subtle-pulse": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "soft-float": "float 6s ease-in-out infinite",
        "glow-flicker": "flicker 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        flicker: {
          "0%": { opacity: "0.85", filter: "drop-shadow(0 0 10px rgba(245, 215, 127, 0.6))" },
          "100%": { opacity: "1", filter: "drop-shadow(0 0 25px rgba(245, 215, 127, 0.95))" },
        },
      },
      boxShadow: {
        "celestial-glow": "0 0 40px -10px rgba(245, 215, 127, 0.35)",
        "celestial-glow-lg": "0 0 80px -15px rgba(245, 215, 127, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
