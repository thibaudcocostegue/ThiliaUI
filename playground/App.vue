<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ThSeparator } from '../src'

const tokens = [
  ['background', 'Fond'],
  ['surface', 'Surface'],
  ['surface-raised', 'Surface haute'],
  ['line', 'Filet'],
  ['border', 'Contour'],
  ['text', 'Texte'],
  ['text-secondary', 'Texte second.'],
  ['accent', 'Accent'],
  ['accent-hover', 'Accent survol'],
  ['on-accent', 'Sur accent'],
  ['success', 'Succès'],
  ['warning', 'Alerte'],
  ['danger', 'Erreur'],
  ['danger-hover', 'Erreur survol'],
  ['on-danger', 'Sur erreur'],
] as const

const modes = [
  ['dark', 'Sombre'],
  ['light', 'Clair'],
] as const

// Valeurs calculées par le navigateur, pour vérifier ce que chaque mode applique.
const zones = ref<Record<string, HTMLElement>>({})
const values = ref<Record<string, Record<string, string>>>({})

onMounted(() => {
  for (const [mode] of modes) {
    const style = getComputedStyle(zones.value[mode]!)
    values.value[mode] = Object.fromEntries(
      tokens.map(([token]) => [token, style.getPropertyValue(`--thilia-${token}`).trim()]),
    )
  }
})
</script>

<template>
  <main class="playground">
    <h1>ThiliaUI</h1>
    <p>Playground de développement.</p>

    <section>
      <h2>Polices</h2>
      <p class="playground__display">Affichage · Inter Tight 500</p>
      <p>Corps de texte · Inter Tight 400 · « Œuvre, ça, déjà. »</p>
      <p class="playground__mono">CN-1042 · Martian Mono 400</p>
    </section>

    <section>
      <h2>Couleurs</h2>
      <div class="playground__modes">
        <div
          v-for="[mode, label] in modes"
          :key="mode"
          :ref="(el) => { if (el) zones[mode] = el as HTMLElement }"
          :data-thilia-theme="mode"
          class="playground__mode"
        >
          <h3>{{ label }}</h3>
          <ul class="playground__swatches">
            <li v-for="[token, name] in tokens" :key="token">
              <span class="playground__swatch" :style="{ background: `var(--thilia-${token})` }" />
              <span>{{ name }}</span>
              <code class="playground__mono">{{ values[mode]?.[token] }}</code>
            </li>
          </ul>
          <ThSeparator />
          <div class="playground__row">
            <span>Gauche</span>
            <ThSeparator orientation="vertical" decorative />
            <span>Droite</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
/* Mise en page du playground seulement. Familles et échelle provisoires :
   les tokens typographiques arrivent avec TIB-149. */
body {
  margin: 0;
  background: var(--thilia-background);
  color: var(--thilia-text);
}

.playground {
  padding: 24px;
  font-family: 'Inter Tight', sans-serif;
  font-weight: 400;
}

.playground h1,
.playground h2,
.playground h3,
.playground__display {
  font-weight: 500;
}

.playground__display {
  font-size: 40px;
  line-height: 44px;
}

.playground__mono {
  font-family: 'Martian Mono', monospace;
  font-size: 12px;
  line-height: 18px;
  color: var(--thilia-text-secondary);
}

.playground__modes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.playground__mode {
  padding: 24px;
  background: var(--thilia-surface);
  color: var(--thilia-text);
  border: 1px solid var(--thilia-line);
}

.playground__swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  padding: 0;
  margin: 0 0 24px;
  list-style: none;
}

.playground__swatches li {
  display: grid;
  gap: 4px;
}

.playground__swatch {
  height: 48px;
  border: 1px solid var(--thilia-line);
}

.playground__row {
  display: flex;
  gap: 12px;
  align-items: center;
  height: 24px;
  margin-top: 16px;
}
</style>
