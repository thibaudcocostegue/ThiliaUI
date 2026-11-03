import { fileURLToPath } from 'node:url'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// tokens.css et src/fonts/ (CSS, polices, licences) sont livrés tels quels.
// style.css existe toujours pour que les exports du paquet restent valides
// même sans composant stylé.
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
      const fonts = fromRoot('./src/fonts')
      for (const file of readdirSync(fonts, { recursive: true, encoding: 'utf8' })) {
        if (!/\.(css|woff2|txt)$/.test(file)) continue
        this.emitFile({
          type: 'asset',
          fileName: `fonts/${file.split('\\').join('/')}`,
          source: readFileSync(join(fonts, file)),
        })
      }
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
