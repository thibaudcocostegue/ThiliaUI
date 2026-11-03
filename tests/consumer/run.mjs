// Construit le paquet avec un composant de test, l'empaquette comme pour une
// installation réelle, puis l'installe dans une app Vue qui l'importe.
import { execSync } from 'node:child_process'
import { appendFileSync, copyFileSync, cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync } from 'node:fs'
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
  run('npm run ssr', app)

  console.log('\n✓ Le paquet s’installe et s’importe dans une app Vue.')
} finally {
  rmSync(work, { recursive: true, force: true })
}

// Vue et Reka UI doivent rester des imports, pas du code embarqué.
function checkExternals(dist) {
  const code = readdirSync(dist, { recursive: true })
    .filter((file) => String(file).endsWith('.js'))
    .map((file) => readFileSync(join(dist, String(file)), 'utf8'))
    .join('\n')
  if (!/from\s*["']vue["']/.test(code)) throw new Error('dist n’importe pas "vue" : il est peut-être embarqué.')
  if (/createRenderer|@vue\/runtime-core/.test(code)) throw new Error('dist contient le runtime de Vue.')
  console.log('\n✓ Vue reste externe au bundle.')
}
