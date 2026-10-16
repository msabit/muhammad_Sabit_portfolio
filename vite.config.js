import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the site from /muhammad_Sabit_portfolio/
export default defineConfig({
  base: "/muhammad_Sabit_portfolio/",
  plugins: [react()],
});
