// Importe le paquet dans Node et rend le composant pour vérifier qu'il tourne.
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { ThFixture } from 'thiliaui'

const html = await renderToString(
  createSSRApp({ render: () => h(ThFixture, { label: 'Bonjour' }, () => '!') }),
)
if (!/<span class="th-fixture" data-v-\w+>Bonjour<!--\[-->!<!--\]--><\/span>/.test(html)) {
  throw new Error(`Rendu inattendu : ${html}`)
}
console.log(`Rendu SSR : ${html}`)
