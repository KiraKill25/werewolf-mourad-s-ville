/**
 * Config Vite dédiée au build mobile (Capacitor / Android APK).
 * Produit un bundle statique dans dist/ (aucun SSR, chemins relatifs).
 * Utilisée par `bun run build:mobile`.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), tsConfigPaths({ projects: ["./tsconfig.json"] })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    // Le bundle est chargé localement depuis le WebView : on scinde par gros
    // groupes pour accélérer le démarrage sans multiplier les requêtes.
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      input: fileURLToPath(new URL("./index.mobile.html", import.meta.url)),
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@tanstack")) return "router";
          if (id.includes("react")) return "react";
          return "vendor";
        },
      },
    },
  },
});
