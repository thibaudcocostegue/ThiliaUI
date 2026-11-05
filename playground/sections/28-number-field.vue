<script lang="ts">
export const section = {
  title: 'Champ numérique',
  description:
    'ThNumberField, basé sur le NumberField de Reka UI. Chiffres alignés à droite, boutons de pas désactivés aux bornes. Flèches haut et bas pour le pas.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThNumberField } from '../../src'

const instances = ref(3)
const timeout = ref(120)
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThNumberField v-model="instances" label="Instances" :min="1" :max="8" help="Entre 1 et 8." />
    <ThNumberField v-model="timeout" label="Délai" unit="ms" :min="0" :step="10" />
    <ThNumberField :model-value="2" label="Désactivé" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">instances = {{ instances }} · timeout = {{ timeout }}</p>
  </div>
</template>
