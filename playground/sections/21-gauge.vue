<script lang="ts">
export const section = {
  title: 'Jauge graduée',
  description:
    'ThGauge, basé sur le Progress de Reka UI. Graduations de 2 px espacées de 4 px, en accent sur fond de filet. Les lecteurs d’écran lisent l’étiquette et la valeur (role="progressbar", aria-label, aria-valuenow).',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThButton, ThGauge } from '../../src'

const load = ref(60)
const step = (delta: number) => {
  load.value = Math.min(100, Math.max(0, load.value + delta))
}
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThGauge :value="load" label="Jauge" />
    <div class="docs-controls">
      <ThButton size="32" variant="secondary" @click="step(-10)">−10</ThButton>
      <ThButton size="32" variant="secondary" @click="step(10)">+10</ThButton>
    </div>
  </div>
  <div class="docs-demo docs-fields">
    <ThGauge :value="3" :max="5" label="Stockage" value-text="3 Go sur 5" />
    <ThGauge :value="null" label="Progression inconnue" />
  </div>
</template>
