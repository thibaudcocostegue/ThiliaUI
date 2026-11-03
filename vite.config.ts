import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Le playground sert d'app de dev ; le mode bibliothèque arrive avec TIB-144.
export default defineConfig({
  root: fileURLToPath(new URL('./playground', import.meta.url)),
  plugins: [vue()],
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
  },
})
