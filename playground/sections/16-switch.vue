<script lang="ts">
export const section = {
  title: 'Interrupteur',
  description:
    'ThSwitch, basé sur le Switch de Reka UI. Piste et curseur à angles droits ; actif, la piste passe en contour accent et le curseur en accent. Espace pour basculer au clavier.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThSwitch } from '../../src'

const maintenance = ref(false)
const monitoring = ref(true)
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThSwitch v-model="maintenance" label="Mode maintenance" />
    <ThSwitch v-model="monitoring" label="Surveillance active" />
    <ThSwitch label="Inactif, désactivé" disabled />
    <ThSwitch :model-value="true" label="Actif, désactivé" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">maintenance = {{ maintenance }} · monitoring = {{ monitoring }}</p>
  </div>
</template>
