import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f5ef",
        foreground: "#1d1d1d",
        brand: {
          DEFAULT: "#0e7c86",
          dark: "#09535a",
          light: "#d3eef1"
        },
        sand: "#efe3d0"
      }
    }
  },
  plugins: []
} satisfies Config;
