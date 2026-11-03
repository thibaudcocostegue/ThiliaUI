// Refuse les couleurs en dur dans les styles du paquet et de la page de doc :
// seules les variables --thilia-* sont permises. Les tokens sont le seul
// fichier exempté.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const scanned = ['src', 'playground'].map((dir) => join(root, dir))
const exempt = new Set(['src/styles/tokens.css'])

const namedColors = 'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen'

const rules = [
  { name: 'couleur hexadécimale', pattern: /#[0-9a-f]{3,8}\b/i },
  { name: 'fonction de couleur', pattern: /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/i },
  { name: 'couleur nommée', pattern: new RegExp(`(?<![\\w-])(?:${namedColors.split(' ').join('|')})(?![\\w-])`, 'i') },
]

// Renvoie les lignes de style d'un fichier, avec leur numéro dans le fichier.
function styleLines(file, text) {
  const lines = text.split('\n')
  if (file.endsWith('.css')) return lines.map((line, i) => ({ line, number: i + 1 }))
  const result = []
  let inStyle = false
  lines.forEach((line, i) => {
    if (/^<style\b/.test(line)) inStyle = true
    else if (/^<\/style>/.test(line)) inStyle = false
    else if (inStyle) result.push({ line, number: i + 1 })
  })
  return result
}

const files = scanned
  .flatMap((dir) => readdirSync(dir, { recursive: true }).map((file) => join(dir, String(file))))
  .filter((file) => /\.(vue|css)$/.test(file))
  .filter((file) => !exempt.has(relative(root, file)))

const errors = []
for (const file of files) {
  for (const { line, number } of styleLines(file, readFileSync(file, 'utf8'))) {
    // Les noms de variables et les commentaires ne sont pas des couleurs.
    const code = line.replace(/\/\*.*?\*\//g, '').replace(/--[\w-]+/g, '')
    for (const rule of rules) {
      if (rule.pattern.test(code)) errors.push(`${relative(root, file)}:${number}  ${rule.name}  ${line.trim()}`)
    }
  }
}

if (errors.length > 0) {
  console.error(`Couleurs en dur interdites, utiliser var(--thilia-*) :\n${errors.join('\n')}`)
  process.exit(1)
}
console.log(`✓ Aucune couleur en dur (${files.length} fichier(s) vérifié(s)).`)
