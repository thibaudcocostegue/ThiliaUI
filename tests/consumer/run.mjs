// Construit le paquet avec un composant de test, l'empaquette comme pour une
// installation réelle, puis l'installe dans une app Vue qui l'importe.
import { execSync, spawnSync } from 'node:child_process'
import { appendFileSync, copyFileSync, cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = fileURLToPath(new URL('../..', import.meta.url))
const here = fileURLToPath(new URL('.', import.meta.url))
const work = mkdtempSync(join(tmpdir(), 'thiliaui-consumer-'))
const pkg = join(work, 'pkg')
const app = join(work, 'app')

const run = (command, cwd) => {
  console.log(`\n$ ${command}  (${relative(work, cwd) || '.'})`)
  execSync(command, { cwd, stdio: 'inherit' })
}

const ignored = new Set(['node_modules', 'dist', '.git', 'tests'])

try {
  cpSync(repo, pkg, {
    recursive: true,
    filter: (src) => !ignored.has(relative(repo, src).split(/[\\/]/)[0]),
  })
  symlinkSync(join(repo, 'node_modules'), join(pkg, 'node_modules'), 'dir')
  copyFileSync(join(here, 'fixtures/ThFixture.vue'), join(pkg, 'src/ThFixture.vue'))
  appendFileSync(join(pkg, 'src/index.ts'), "export { default as ThFixture } from './ThFixture.vue'\n")

  // npm pack lance le script prepare, donc le build, comme une installation depuis Git.
  run(`npm pack --pack-destination ${JSON.stringify(work)}`, pkg)
  checkExternals(join(pkg, 'dist'))
  const tarball = readdirSync(work).find((name) => name.endsWith('.tgz'))

  cpSync(join(here, 'app'), app, {
    recursive: true,
    filter: (src) => !['node_modules', 'dist'].includes(relative(join(here, 'app'), src).split(/[\\/]/)[0]),
  })
  run(`npm install --no-audit --no-fund --prefer-offline ${JSON.stringify(join(work, tarball))}`, app)
  run('npm run typecheck', app)
  run('npm run build', app)
  checkFonts(join(pkg, 'dist'), join(app, 'dist'))
  checkTokens(join(pkg, 'dist'))
  checkContrast(app)
  run('npm run ssr', app)

  console.log('\n✓ Le paquet s’installe et s’importe dans une app Vue.')
} finally {
  rmSync(work, { recursive: true, force: true })
}

// Les polices sont livrées avec leurs licences, sans URL externe, et finissent
// dans le build de l'app.
function checkFonts(dist, appDist) {
  const fontsCss = readFileSync(join(dist, 'fonts/fonts.css'), 'utf8')
  if (/url\(\s*['"]?(?:https?:)?\/\//.test(fontsCss)) throw new Error('fonts.css charge une police depuis une URL externe.')
  for (const license of ['inter-tight/OFL.txt', 'martian-mono/OFL.txt']) {
    if (!existsSync(join(dist, 'fonts', license))) throw new Error(`Licence manquante : fonts/${license}`)
  }
  const shipped = readdirSync(join(dist, 'fonts'), { recursive: true }).filter((file) => String(file).endsWith('.woff2'))
  const bundled = readdirSync(join(appDist, 'assets')).filter((file) => file.endsWith('.woff2'))
  if (shipped.length === 0 || bundled.length !== shipped.length) {
    throw new Error(`Polices attendues dans le build de l'app : ${shipped.length}, trouvées : ${bundled.length}`)
  }
  console.log(`\n✓ ${bundled.length} polices locales dans le build de l'app, licences présentes.`)
}

// Les tokens livrés définissent le bloc commun, le mode sombre par défaut et
// le mode clair.
function checkTokens(dist) {
  const css = readFileSync(join(dist, 'tokens.css'), 'utf8')
  for (const selector of [':root {', ":root:not([data-thilia-theme='light'])", "[data-thilia-theme='dark']", "[data-thilia-theme='light'] {"]) {
    if (!css.includes(selector)) throw new Error(`tokens.css ne contient pas ${selector}`)
  }
  const count = new Set([...css.matchAll(/(--thilia-[\w-]+)\s*:/g)].map((match) => match[1])).size
  if (count === 0) throw new Error('tokens.css ne définit aucun token.')
  console.log(`\n✓ tokens.css livre ${count} tokens : communs, et couleurs en sombre et en clair.`)
}

// La commande de contraste est installée avec le paquet : elle valide le thème
// par défaut et un thème conforme, et refuse un thème en échec.
function checkContrast(app) {
  const contrast = (...args) => spawnSync('npx', ['--no-install', 'thiliaui-contrast', ...args], { cwd: app, encoding: 'utf8' })
  for (const args of [[], [join(here, 'fixtures/theme-ok.css')]]) {
    const result = contrast(...args)
    if (result.status !== 0) throw new Error(`thiliaui-contrast ${args.join(' ')} a échoué :\n${result.stdout}${result.stderr}`)
  }
  const failing = contrast(join(here, 'fixtures/theme-ko.css'))
  if (failing.status !== 1 || !failing.stderr.includes('text-secondary sur surface')) {
    throw new Error(`thiliaui-contrast aurait dû refuser theme-ko.css :\n${failing.stdout}${failing.stderr}`)
  }
  console.log('\n✓ thiliaui-contrast valide le thème par défaut et signale les paires en échec.')
}

// Vue et Reka UI doivent rester des imports, pas du code embarqué.
function checkExternals(dist) {
  const code = readdirSync(dist, { recursive: true })
    .filter((file) => String(file).endsWith('.js'))
    .map((file) => readFileSync(join(dist, String(file)), 'utf8'))
    .join('\n')
  for (const dependency of ['vue', 'reka-ui']) {
    if (!new RegExp(`from\\s*["']${dependency}["']`).test(code)) {
      throw new Error(`dist n’importe pas "${dependency}" : il est peut-être embarqué.`)
    }
  }
  if (/createRenderer|@vue\/runtime-core/.test(code)) throw new Error('dist contient le runtime de Vue.')
  // Tout composant présent dans dist doit être un composant ThiliaUI.
  const foreign = [...code.matchAll(/__name:\s*"([^"]+)"/g)].map((match) => match[1]).filter((name) => !name.startsWith('Th'))
  if (foreign.length > 0) throw new Error(`dist embarque des composants externes : ${foreign.join(', ')}`)
  console.log('\n✓ Vue et Reka UI restent externes au bundle.')
}
