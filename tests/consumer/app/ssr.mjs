// Importe le paquet dans Node et rend les composants pour vérifier qu'ils tournent.
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { ThButton, ThCheckbox, ThFixture, ThGauge, ThInput, ThSeparator, ThTabs } from 'thiliaui'

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
  {
    html: await render(ThButton, { variant: 'danger', disabled: true }, () => 'Action'),
    expected: /^<button(?=[^>]*class="th-button")(?=[^>]*type="button")(?=[^>]*disabled)(?=[^>]*data-variant="danger")[^>]*>/,
  },
  {
    // L'erreur est reliée au champ et annoncée.
    html: await render(ThInput, { label: 'Nom', error: 'Requis', id: 'nom' }),
    expected: /<label[^>]*for="nom"[^>]*>Nom<\/label><input(?=[^>]*id="nom")(?=[^>]*aria-invalid="true")(?=[^>]*aria-describedby="nom-message")[^>]*><p id="nom-message"[^>]*role="alert"[^>]*>Requis<\/p>/,
  },
  {
    html: await render(ThCheckbox, { label: 'Alertes', modelValue: true }),
    expected: /<button(?=[^>]*role="checkbox")(?=[^>]*aria-checked="true")[^>]*>/,
  },
  {
    html: await render(ThTabs, { tabs: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] }),
    expected: /role="tablist"[\s\S]*<button(?=[^>]*role="tab")(?=[^>]*aria-selected="true")[^>]*>(?:<!--\[-->)?A/,
  },
  {
    html: await render(ThGauge, { value: 60, label: 'Charge' }),
    expected: /<div(?=[^>]*role="progressbar")(?=[^>]*aria-valuenow="60")(?=[^>]*aria-label="Charge")[^>]*>/,
  },
]

for (const { html, expected } of checks) {
  if (!expected.test(html)) throw new Error(`Rendu inattendu : ${html}`)
  console.log(`Rendu SSR : ${html}`)
}
