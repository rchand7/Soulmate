import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access from external networks
    port: 5173,  // Ensures it runs on a fixed port (Render may override)
    strictPort: true,
    allowedHosts: 'all',  // Allows all hosts (Fixes blocked request issue)
    cors: true
  },
  preview: {
    host: true,
    port: 10000  // Set a fixed preview port
  },
  build: {
    chunkSizeWarningLimit: 1600 // Increases chunk limit to avoid warnings
  }
});
