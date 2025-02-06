import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensures a fixed port
    strictPort: true, // Prevents fallback to another port
    host: 'localhost' // Ensures accessibility
  },
  build: {
    outDir: 'dist',
    sourcemap: true // Helps with debugging
  }
});
