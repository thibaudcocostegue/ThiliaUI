// Vérifie que chaque var(--thilia-*) utilisée dans src/ est définie dans les
// deux modes de tokens.css, et que les deux modes définissent la même liste.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const src = join(root, 'src')
const tokensFile = join(src, 'styles/tokens.css')
const tokens = readFileSync(tokensFile, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')

// Renvoie les tokens définis dans le bloc dont le sélecteur est donné.
function definedIn(selector) {
  const start = tokens.indexOf(selector)
  if (start === -1) throw new Error(`Bloc ${selector} introuvable dans tokens.css`)
  const block = tokens.slice(tokens.indexOf('{', start) + 1, tokens.indexOf('}', start))
  return new Set([...block.matchAll(/(--thilia-[\w-]+)\s*:/g)].map((match) => match[1]))
}

const modes = { sombre: definedIn('[data-thilia-theme=\'dark\']'), clair: definedIn('[data-thilia-theme=\'light\']') }
const errors = []

for (const [mode, defined] of Object.entries(modes)) {
  for (const [other, otherDefined] of Object.entries(modes)) {
    if (mode === other) continue
    for (const token of otherDefined) {
      if (!defined.has(token)) errors.push(`${token} est défini en ${other} mais pas en ${mode}`)
    }
  }
}

const files = readdirSync(src, { recursive: true })
  .map((file) => join(src, String(file)))
  .filter((file) => /\.(vue|css)$/.test(file) && file !== tokensFile)

for (const file of files) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const [, token] of line.matchAll(/var\(\s*(--thilia-[\w-]+)/g)) {
      for (const [mode, defined] of Object.entries(modes)) {
        if (!defined.has(token)) errors.push(`${relative(root, file)}:${i + 1}  ${token} n'existe pas en ${mode}`)
      }
    }
  })
}

if (errors.length > 0) {
  console.error(`Tokens incohérents :\n${[...new Set(errors)].join('\n')}`)
  process.exit(1)
}
console.log(`✓ ${modes.sombre.size} tokens définis en sombre et en clair, tous ceux utilisés existent.`)
