import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escucha en todas las interfaces (0.0.0.0)
    port: 5173, // Puedes cambiarlo si quieres
    strictPort: true, // Falla si el puerto está ocupado, en vez de buscar otro
  },
});
