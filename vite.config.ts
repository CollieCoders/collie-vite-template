import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import collie from '@collie-lang/vite';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
    plugins: [collie(), react(), tailwindcss()]
});
