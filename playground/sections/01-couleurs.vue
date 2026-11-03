<script lang="ts">
export const section = {
  title: 'Couleurs',
  description: 'Tokens --thilia-* du thème Télémétrie, pour le mode affiché. Valeurs lues dans le navigateur.',
}
</script>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useTheme } from '../composables/useTheme'

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

const { theme } = useTheme()
const values = ref<Record<string, string>>({})

async function readValues() {
  await nextTick()
  const style = getComputedStyle(document.documentElement)
  values.value = Object.fromEntries(
    tokens.map(([token]) => [token, style.getPropertyValue(`--thilia-${token}`).trim()]),
  )
}

onMounted(readValues)
watch(theme, readValues)
</script>

<template>
  <ul class="docs-swatches">
    <li v-for="[token, name] in tokens" :key="token">
      <span class="docs-swatches__color" :style="{ background: `var(--thilia-${token})` }" />
      <span>{{ name }}</span>
      <code class="docs-mono">--thilia-{{ token }}</code>
      <code class="docs-mono">{{ values[token] }}</code>
    </li>
  </ul>
</template>
