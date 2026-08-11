import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"
import containerQueries from "@tailwindcss/container-queries"
// import fluid from "tailwindcss-fluid" // (opzionale, decommenta se vuoi usarlo)

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "off-black": "#0A0A0A",
        "off-cream": "#F2EDE4",
        "off-amber": "#E0A96D",
        "off-gray": "#6B6B6B",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "pulse-amber": "pulse-amber 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-amber": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [typography, containerQueries],
}

export default config