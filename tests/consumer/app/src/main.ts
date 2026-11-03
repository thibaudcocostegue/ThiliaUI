import 'thiliaui/tokens.css'
import 'thiliaui/style.css'
import { createApp } from 'vue'
import { ThFixture, ThSeparator } from 'thiliaui'
import App from './App.vue'

type FixtureProps = InstanceType<typeof ThFixture>['$props']

// Les types du paquet doivent être réels, pas `any`.
const valid: FixtureProps = { label: 'ok' }
// @ts-expect-error label doit être une chaîne
const invalid: FixtureProps = { label: 1 }
void valid
void invalid

// Les props héritées de Reka UI sont typées elles aussi.
type SeparatorProps = InstanceType<typeof ThSeparator>['$props']
const vertical: SeparatorProps = { orientation: 'vertical', decorative: true }
// @ts-expect-error l'orientation n'accepte que horizontal ou vertical
const diagonal: SeparatorProps = { orientation: 'diagonal' }
void vertical
void diagonal

createApp(App).mount('#app')
