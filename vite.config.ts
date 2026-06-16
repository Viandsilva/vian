import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      sitemap({
        hostname: 'https://www.senvo.in',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
