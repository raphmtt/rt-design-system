import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    conditions: ['development', 'import', 'module', 'browser', 'default'],
  },
  server: {
    port: 3000,
  },
});
