const path = require("path");

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/scss/main.scss';`,
      },
    },
  },
});
