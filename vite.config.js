import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the site from /muhammad_Sabit_portfolio/
export default defineConfig({
  base: "/muhammad_Sabit_portfolio/",
  plugins: [react()],
  // Unit tests only; browser smoke tests in e2e/ run with Playwright.
  test: {
    include: ["src/**/*.test.{js,jsx}"],
  },
});
