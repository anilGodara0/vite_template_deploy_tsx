import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "VITE",
        short_name: "VITE",
        description: "VITE",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/img/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/img/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  build: {
    sourcemap: false
  }
});
