import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// tokens.css est livré tel quel, et style.css existe toujours pour que les
// exports du paquet restent valides même sans composant stylé.
function cssAssets(): Plugin {
  return {
    name: 'thiliaui:css-assets',
    // Après le plugin CSS de Vite, pour savoir si style.css a été produit.
    enforce: 'post',
    generateBundle(_options, bundle) {
      this.emitFile({
        type: 'asset',
        fileName: 'tokens.css',
        source: readFileSync(fromRoot('./src/styles/tokens.css'), 'utf8'),
      })
      if (!('style.css' in bundle)) {
        this.emitFile({ type: 'asset', fileName: 'style.css', source: '' })
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), cssAssets()],
  build: {
    lib: {
      entry: fromRoot('./src/index.ts'),
      formats: ['es'],
      cssFileName: 'style',
    },
    cssCodeSplit: false,
    rolldownOptions: {
      external: [/^vue(\/|$)/, /^reka-ui(\/|$)/],
      output: {
        preserveModules: true,
        preserveModulesRoot: fromRoot('./src'),
        entryFileNames: '[name].js',
      },
    },
  },
})
