import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") 
    },
  },
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js') ,
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
