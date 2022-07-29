import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), eslintPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  proxy: {
    "^/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
      ws: true,
    },
    "^/rotld": {
      target: "http://localhost:80",
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
});
