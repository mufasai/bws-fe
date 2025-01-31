import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: {
    host: '0.0.0.0', // Membuat server dapat diakses melalui alamat IP lokal
    port: 5173,      // Port yang digunakan oleh Vite
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Proxy untuk backend pada localhost:8080
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Hilangkan "/api" di depan
      },
    },
  },
});
