import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/tokenized-tbills/',
  plugins: [react()],
  server: {
    port: 5174,
  },
})
