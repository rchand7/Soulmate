import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Explicitly setting the port
    host: '0.0.0.0' // Ensuring it's accessible from Render
  },
  build: {
    chunkSizeWarningLimit: 1000, // Suppressing large chunk warning
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Code-splitting for optimization
          }
        }
      }
    }
  }
});
