import 'thiliaui/tokens.css'
import 'thiliaui/style.css'
import { createApp } from 'vue'
import { ThFixture } from 'thiliaui'
import App from './App.vue'

type FixtureProps = InstanceType<typeof ThFixture>['$props']

// Les types du paquet doivent être réels, pas `any`.
const valid: FixtureProps = { label: 'ok' }
// @ts-expect-error label doit être une chaîne
const invalid: FixtureProps = { label: 1 }
void valid
void invalid

createApp(App).mount('#app')
