import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/2025-project-stopwatch/", // GitHub Pages의 repository name과 일치해야 함
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
