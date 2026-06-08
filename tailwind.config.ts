import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "Syne", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        /* shadcn compat */
        border:    "rgb(var(--border-subtle) / <alpha-value>)",
        input:     "rgb(var(--border-subtle) / <alpha-value>)",
        ring:      "rgb(var(--brand-fire-1) / <alpha-value>)",
        background:"rgb(var(--bg-base) / <alpha-value>)",
        foreground:"rgb(var(--text-primary) / <alpha-value>)",
        primary: {
          DEFAULT:    "rgb(var(--brand-fire-1) / <alpha-value>)",
          foreground: "rgb(8 8 10 / <alpha-value>)",
        },
        secondary: {
          DEFAULT:    "rgb(var(--bg-surface-3) / <alpha-value>)",
          foreground: "rgb(var(--text-secondary) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:    "rgb(var(--error) / <alpha-value>)",
          foreground: "rgb(var(--text-primary) / <alpha-value>)",
        },
        muted: {
          DEFAULT:    "rgb(var(--bg-surface-2) / <alpha-value>)",
          foreground: "rgb(var(--text-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT:    "rgb(var(--bg-surface-3) / <alpha-value>)",
          foreground: "rgb(var(--text-primary) / <alpha-value>)",
        },
        popover: {
          DEFAULT:    "rgb(var(--bg-surface-2) / <alpha-value>)",
          foreground: "rgb(var(--text-primary) / <alpha-value>)",
        },
        card: {
          DEFAULT:    "rgb(var(--bg-surface-1) / <alpha-value>)",
          foreground: "rgb(var(--text-primary) / <alpha-value>)",
        },
        /* Brand tokens */
        fire: {
          1: "rgb(var(--brand-fire-1) / <alpha-value>)",
          2: "rgb(var(--brand-fire-2) / <alpha-value>)",
        },
        surface: {
          1: "rgb(var(--bg-surface-1) / <alpha-value>)",
          2: "rgb(var(--bg-surface-2) / <alpha-value>)",
          3: "rgb(var(--bg-surface-3) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
        xl:  "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in":        "fade-in 0.5s ease both",
        "fade-in-up":     "fade-in-up 0.6s ease both",
        "scale-in":       "scale-in 0.4s ease both",
        "slide-down":     "slide-down 0.3s ease both",
        shimmer:          "shimmer 1.5s infinite",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
