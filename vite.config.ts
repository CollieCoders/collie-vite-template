import { defineConfig } from 'vite'
import collie from '@collie-lang/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [collie(), react()],
})
