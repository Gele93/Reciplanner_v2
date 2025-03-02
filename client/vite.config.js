import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend:5000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
      }
    },
  }
})
