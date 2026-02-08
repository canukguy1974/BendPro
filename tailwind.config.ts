import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "bp-yellow": "#FEBD17",
        "bp-yellow-strong": "#f4a900",
        "bp-yellow-dim": "#c28c0b",
      },
      boxShadow: {
        "screen": "0 30px 80px rgba(0,0,0,0.55)",
        "rail": "0 0 0 1px rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "noise": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
        "bp-texture": "url('/brand/black_and_red_tex.jpeg')",
        "bp-ink": "url('/brand/black_tex.jpeg')",
        "bp-full": "url('/brand/fullsize.jpeg')",
      },
    },
  },
  plugins: [],
};

export default config;
