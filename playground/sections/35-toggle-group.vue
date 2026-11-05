<script lang="ts">
export const section = {
  title: 'Segments',
  description:
    'ThToggleGroup, basé sur le ToggleGroup de Reka UI. Segments joints, en choix simple ou multiple. Flèches pour passer d’un segment à l’autre.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThToggleGroup } from '../../src'

const periods = [
  { value: '1h', label: '1 h' },
  { value: '24h', label: '24 h' },
  { value: '7d', label: '7 j' },
  { value: '30d', label: '30 j' },
]
const period = ref('24h')
const levels = ref(['error'])
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThToggleGroup v-model="period" label="Période" :options="periods" />
    <ThToggleGroup
      v-model="levels"
      label="Niveaux"
      type="multiple"
      :options="[
        { value: 'info', label: 'Info' },
        { value: 'warn', label: 'Alerte' },
        { value: 'error', label: 'Erreur' },
      ]"
    />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">period = "{{ period }}" · levels = {{ levels }}</p>
  </div>
</template>
