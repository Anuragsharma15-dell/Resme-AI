import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // safer than "::" for Vercel & Docker
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // add dev-only plugins here later if needed
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
