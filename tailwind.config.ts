import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          50: "#f6f6f7",
          100: "#e7e7ea",
          200: "#cfcfd6",
          300: "#b0b1bb",
          400: "#8c8e9a",
          500: "#6f717d",
          600: "#575963",
          700: "#3f4148",
          800: "#2a2c31",
          900: "#17181b",
          950: "#0b0c0e"
        },
        accent: {
          500: "#82e0ff",
          600: "#57c5ff",
          700: "#2aa7f7"
        },
        pinkish: "#c79bff"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 0 40px rgba(130,224,255,0.06)",
        insetSoft: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.4)",
        surface: "0 28px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.4)",
        tile: "0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      keyframes: {
        in: { from: { opacity: "0", transform: "scale(.98)" }, to: { opacity: "1", transform: "scale(1)" } },
        out: { from: { opacity: "1" }, to: { opacity: "0" } }
      },
      animation: {
        in: "in .15s ease-out",
        out: "out .12s ease-in"
      }
    }
  },
  plugins: [],
};
export default config;
