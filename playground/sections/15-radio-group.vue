<script lang="ts">
export const section = {
  title: 'Boutons radio',
  description:
    'ThRadioGroup et ThRadio, basés sur le RadioGroup de Reka UI. Indicateur carré, carré plein accent quand il est choisi. Tab entre dans le groupe, les flèches changent le choix.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThRadio, ThRadioGroup } from '../../src'

const frequency = ref('daily')
</script>

<template>
  <div class="docs-demo">
    <p id="radio-frequency" class="docs-label">Fréquence</p>
    <ThRadioGroup v-model="frequency" aria-labelledby="radio-frequency">
      <ThRadio value="immediate" label="Immédiate" />
      <ThRadio value="daily" label="Quotidienne" />
      <ThRadio value="weekly" label="Hebdomadaire" />
      <ThRadio value="monthly" label="Mensuelle · désactivé" disabled />
    </ThRadioGroup>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Horizontal, groupe désactivé</p>
    <ThRadioGroup model-value="a" label="Exemple désactivé" orientation="horizontal" disabled>
      <ThRadio value="a" label="Option A" />
      <ThRadio value="b" label="Option B" />
    </ThRadioGroup>
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">frequency = "{{ frequency }}"</p>
  </div>
</template>
