import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,   // note: client listens on 5173 by default
    open: true,   // automatically open the browser to the url on start
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
