/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Schibsted Grotesk Variable"', '"Schibsted Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Theme-aware colors backed by the CSS variables in src/index.css.
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        line: "var(--glass-border)",
        "line-strong": "var(--glass-border-strong)",
        surface: "var(--bg)",
        live: "var(--live-ink)",
      },
      borderRadius: {
        glass: "var(--radius-lg)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
