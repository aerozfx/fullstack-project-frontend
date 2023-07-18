import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/players": "http://localhost:3000",
      "/api/currency": "http://localhost:3000",
      "/api/buy": "http://localhost:3000",
      "/api/register": "http://localhost:3000",
      "/api/login": "http://localhost:3000",
      "/api/logout": "http://localhost:3000",
    },
  },
});
