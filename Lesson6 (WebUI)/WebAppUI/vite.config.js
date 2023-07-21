import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "assets",
  root: "src",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/u, ""),
        target: "http://localhost:5140",
      },
    },
  },
});
