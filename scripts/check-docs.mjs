// Chaque composant de src/components/ doit avoir sa section dans la page de
// documentation : playground/sections/NN-<nom>.vue.
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const components = readdirSync(join(root, 'src/components'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
const sections = readdirSync(join(root, 'playground/sections'))
  .map((file) => /^\d+-([\w-]+)\.vue$/.exec(file)?.[1])
  .filter(Boolean)

const missing = components.filter((name) => !sections.includes(name))
if (missing.length > 0) {
  console.error(
    `Composants sans section de documentation :\n${missing.map((name) => `${name} → playground/sections/NN-${name}.vue`).join('\n')}`,
  )
  process.exit(1)
}
console.log(`✓ ${components.length} composant(s), chacun avec sa section de documentation.`)
