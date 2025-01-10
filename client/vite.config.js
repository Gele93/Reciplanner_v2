import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7034', // Your ASP.NET backend URL
        changeOrigin: true,
        secure: false, // Set to false if using self-signed certificates
      }
      /*,
      "/static": {
        target: "http://localhost:7034",
        changeOrigin: true,
        secure: false, // Set to false if using self-signed certificates
      } 
        */
    },
  }
})
