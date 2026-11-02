import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // ИИ-демо в dev ходит в бой, как и на проде через nginx
    proxy: {
      '/api/public/demo': {
        target: 'https://surveys.svodservice.ru',
        changeOrigin: true,
      },
    },
  },
});
