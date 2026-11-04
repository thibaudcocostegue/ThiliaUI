<script lang="ts">
export const section = {
  title: 'Case à cocher',
  description:
    'ThCheckbox, basé sur le Checkbox de Reka UI. Case carrée de 16 px, cochée en accent. Espace pour cocher au clavier.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThCheckbox } from '../../src'

const alerts = ref(true)
const digest = ref(false)
</script>

<template>
  <div class="docs-demo docs-choices">
    <ThCheckbox v-model="alerts" label="Recevoir les alertes" />
    <ThCheckbox v-model="digest" label="Recevoir le résumé · Tab pour le focus" />
    <ThCheckbox model-value="indeterminate" label="Indéterminé" />
    <ThCheckbox :model-value="true" label="Coché, désactivé" disabled />
    <ThCheckbox label="Non coché, désactivé" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">alerts = {{ alerts }} · digest = {{ digest }}</p>
  </div>
</template>
