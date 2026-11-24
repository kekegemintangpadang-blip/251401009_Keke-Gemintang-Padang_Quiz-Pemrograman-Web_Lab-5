import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/251401009_Keke-Gemintang-Padang_Quiz-Pemrograman-Web-Lab-5/",
});
