/**
 * Tailwind v4 reads design tokens from `app/globals.css` via `@theme inline`.
 * This file documents the shared NIJA token contract for extraction into a
 * common design-system package consumed by both City Club and Luxury Wellness.
 *
 * Canonical source of truth: app/globals.css `:root` + `@theme inline`.
 */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        cream: "var(--color-cream)",
        sand: "var(--color-sand)",
        line: "var(--color-line)",
        accent: "var(--color-accent)",
        stone: "var(--color-stone)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        logo: ["var(--font-logo)", "sans-serif"],
      },
      fontSize: {
        hero: "var(--text-hero)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        body: "var(--text-body)",
        small: "var(--text-small)",
      },
      maxWidth: {
        content: "var(--content-max)",
      },
      spacing: {
        "section-y": "var(--section-y)",
        "section-x": "var(--section-x)",
      },
    },
  },
};

export default config;
