import path from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      catalog: path.resolve(__dirname, 'src/catalog'),
      core: path.resolve(__dirname, 'src/core'),
    },
  },
});
