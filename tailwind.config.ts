import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        fi: {
          purple: "#712CDC",
          "purple-hover": "#5e23ba",
          "purple-dark": "#4a1999",
          "purple-light": "#f5f0ff",
          "purple-border": "#ece5ff",
          "purple-glow": "rgba(113, 44, 220, 0.12)",
          "purple-soft": "#ede8ff",
        },
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "28px",
      },
      boxShadow: {
        dock: "0 8px 32px rgba(20, 14, 50, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.18) inset",
        card: "0 2px 8px rgba(20, 14, 50, 0.05)",
        "card-hover": "0 8px 24px rgba(113, 44, 220, 0.12)",
        tab: "0 1px 3px rgba(20, 14, 50, 0.10), 0 0 0 1px rgba(113, 44, 220, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
