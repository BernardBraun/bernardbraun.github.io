import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// User site: https://bernardbraun.github.io/ → base "/"
export default defineConfig({
  plugins: [react()],
  base: "/",
});
