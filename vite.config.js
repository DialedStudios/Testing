import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        pricing: resolve(__dirname, "pricing.html"),
        newsletter: resolve(__dirname, "newsletter.html"),
      },
    },
  },
});
