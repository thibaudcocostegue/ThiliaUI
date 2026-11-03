// Importe le paquet dans Node et rend les composants pour vérifier qu'ils tournent.
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { ThFixture, ThSeparator } from 'thiliaui'

const render = (component, props, slot) => renderToString(createSSRApp({ render: () => h(component, props, slot) }))

const checks = [
  {
    html: await render(ThFixture, { label: 'Bonjour' }, () => '!'),
    expected: /<span class="th-fixture" data-v-\w+>Bonjour<!--\[-->!<!--\]--><\/span>/,
  },
  {
    // Reka pose le rôle ARIA et l'orientation : l'enveloppe doit les conserver.
    html: await render(ThSeparator, { orientation: 'vertical' }),
    expected: /^<div(?=[^>]*class="th-separator")(?=[^>]*role="separator")(?=[^>]*aria-orientation="vertical")(?=[^>]*data-orientation="vertical")[^>]*>/,
  },
]

for (const { html, expected } of checks) {
  if (!expected.test(html)) throw new Error(`Rendu inattendu : ${html}`)
  console.log(`Rendu SSR : ${html}`)
}
