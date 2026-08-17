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
        background: "#F3F1E9",
        panel: "#EAE6D9",
        primary: "#143C36",
        "primary-tint": "#DCE6E1",
        gold: "#B08A46",
        "gold-soft": "#EFE3CB",
        ink: "#1D2B27",
        "ink-soft": "#5B655F",
        line: "#D9D3C3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
