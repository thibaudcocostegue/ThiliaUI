#!/usr/bin/env node
// Vérifie les contrastes d'un thème, en sombre et en clair : 4,5:1 pour le
// texte, 3:1 pour les contours de contrôle (WCAG 2). Sans argument, contrôle
// le thème par défaut ; avec une feuille de projet, contrôle les tokens après
// sa surcharge.
//   npx thiliaui-contrast src/styles/theme.css
import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const surfaces = ['background', 'surface', 'surface-raised']
const text = { name: 'texte', min: 4.5 }
const outline = { name: 'contour', min: 3 }

// Chaque couleur de texte ou de contour, avec les fonds sur lesquels elle se pose.
const pairs = [
  ...['text', 'text-secondary', 'success', 'warning', 'danger'].flatMap((fg) => surfaces.map((bg) => [fg, bg, text])),
  ...['accent', 'accent-hover'].map((bg) => ['on-accent', bg, text]),
  ...['danger', 'danger-hover'].map((bg) => ['on-danger', bg, text]),
  // Contour des contrôles et anneau de focus.
  ...['border', 'accent'].flatMap((fg) => surfaces.map((bg) => [fg, bg, outline])),
]

// Le sélecteur clair se cherche avec son accolade : le sélecteur sombre
// contient aussi [data-thilia-theme='light'], dans son :not().
const modes = {
  sombre: /\[data-thilia-theme=['"]?dark['"]?\][^{]*\{([^}]*)\}/,
  clair: /\[data-thilia-theme=['"]?light['"]?\]\s*\{([^}]*)\}/,
}

const root = fileURLToPath(new URL('..', import.meta.url))
// Dans le dépôt, les tokens sources ; dans le paquet installé, ceux de dist.
const tokensFile = ['src/styles/tokens.css', 'dist/tokens.css'].map((file) => resolve(root, file)).find(existsSync)
const themeArg = process.argv[2]
const themeFile = themeArg && resolve(themeArg)

function fail(message) {
  console.error(message)
  process.exit(1)
}

if (!tokensFile) fail('tokens.css introuvable dans le paquet ThiliaUI.')
if (themeFile && !existsSync(themeFile)) fail(`Feuille introuvable : ${themeArg}`)

// Renvoie les couleurs définies dans le bloc d'un mode, ou rien si le bloc est absent.
function colorsIn(css, mode) {
  const block = css.replace(/\/\*[\s\S]*?\*\//g, '').match(modes[mode])?.[1] ?? ''
  return Object.fromEntries([...block.matchAll(/--thilia-([\w-]+)\s*:\s*([^;]+)/g)].map(([, name, value]) => [name, value.trim()]))
}

// Renvoie les composantes 0-1 d'une couleur #rgb ou #rrggbb, sinon null.
function parseHex(value) {
  const match = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!match) return null
  const hex = match[1].length === 3 ? [...match[1]].map((c) => c + c).join('') : match[1]
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

// Arrondi vers le bas : un ratio affiché 4,5:1 ne doit pas être en échec.
const format = (ratio) => `${(Math.floor(ratio * 100) / 100).toString().replace('.', ',')}:1`

const tokens = readFileSync(tokensFile, 'utf8')
const theme = themeFile ? readFileSync(themeFile, 'utf8') : ''
const errors = []

for (const mode of Object.keys(modes)) {
  const colors = { ...colorsIn(tokens, mode), ...colorsIn(theme, mode) }
  const rgb = {}
  for (const name of new Set(pairs.flatMap(([fg, bg]) => [fg, bg]))) {
    if (!(name in colors)) errors.push(`${mode}  --thilia-${name} n'est pas défini`)
    else if (!(rgb[name] = parseHex(colors[name]))) {
      errors.push(`${mode}  --thilia-${name}: ${colors[name]}  format non vérifiable, utiliser #rgb ou #rrggbb`)
    }
  }
  for (const [fg, bg, { name, min }] of pairs) {
    if (!rgb[fg] || !rgb[bg]) continue
    const ratio = contrast(rgb[fg], rgb[bg])
    if (ratio < min) {
      errors.push(`${mode}  ${name}  ${fg} sur ${bg}  ${format(ratio)} < ${format(min)}  (${colors[fg]} / ${colors[bg]})`)
    }
  }
}

const checked = themeFile ? relative(process.cwd(), themeFile) : 'thème par défaut'
if (errors.length > 0) fail(`Contrastes insuffisants (${checked}) :\n${errors.join('\n')}`)
console.log(`✓ ${checked} : ${pairs.length} paires vérifiées en sombre et en clair, contrastes conformes.`)
