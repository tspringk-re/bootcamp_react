import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

const env = process.env.NODE_ENV || "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: env !== "test" ? 3000 : 5173,
    proxy: {
      "/api": `http://localhost:${env !== "test" ? 8000 : 4444}`,
      "/image": `http://localhost:${env !== "test" ? 8000 : 4444}`,
    },
  },
});
