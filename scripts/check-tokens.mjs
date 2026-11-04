// Vérifie que chaque var(--thilia-*) utilisée dans src/ et playground/ est
// définie dans tokens.css : soit dans le bloc commun, soit dans les deux modes.
// Les deux modes doivent définir la même liste, sans reprendre un token commun.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const src = join(root, 'src')
const tokensFile = join(src, 'styles/tokens.css')
const tokens = readFileSync(tokensFile, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')

// Renvoie les tokens définis dans le premier bloc dont le sélecteur est donné.
function definedIn(selector) {
  const start = tokens.indexOf(selector)
  if (start === -1) throw new Error(`Bloc ${selector} introuvable dans tokens.css`)
  const block = tokens.slice(tokens.indexOf('{', start) + 1, tokens.indexOf('}', start))
  return new Set([...block.matchAll(/(--thilia-[\w-]+)\s*:/g)].map((match) => match[1]))
}

const common = definedIn(':root {')
const modes = { sombre: definedIn('[data-thilia-theme=\'dark\']'), clair: definedIn('[data-thilia-theme=\'light\']') }
const errors = []

for (const [mode, defined] of Object.entries(modes)) {
  for (const token of defined) {
    if (common.has(token)) errors.push(`${token} est commun et ne doit pas être redéfini en ${mode}`)
  }
  for (const [other, otherDefined] of Object.entries(modes)) {
    if (mode === other) continue
    for (const token of otherDefined) {
      if (!defined.has(token)) errors.push(`${token} est défini en ${other} mais pas en ${mode}`)
    }
  }
}

const files = ['src', 'playground']
  .flatMap((dir) => readdirSync(join(root, dir), { recursive: true }).map((file) => join(root, dir, String(file))))
  .filter((file) => /\.(vue|css)$/.test(file) && file !== tokensFile)

for (const file of files) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    // Un nom construit dans un gabarit (--thilia-space-${…}) n'est pas vérifiable.
    for (const [, token, template] of line.matchAll(/var\(\s*(--thilia-[\w-]+)(\$\{)?/g)) {
      if (template || common.has(token)) continue
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
console.log(
  `✓ ${common.size} tokens communs, ${modes.sombre.size} tokens de couleur en sombre et en clair, tous ceux utilisés existent.`,
)
