<script lang="ts">
export const section = {
  title: 'Curseur',
  description:
    'ThSlider, basé sur le Slider de Reka UI et sur la signature de la jauge : piste graduée de 2 px tous les 6 px, poignée en accent. Le modèle est un tableau, d’une valeur pour un curseur simple, de deux pour une plage. Flèches, Début et Fin au clavier.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThSlider } from '../../src'

const threshold = ref([60])
const range = ref([20, 80])
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThSlider v-model="threshold" label="Seuil d’alerte" unit="%" />
    <ThSlider v-model="range" label="Plage" unit="%" :step="5" />
    <ThSlider :model-value="[30]" label="Désactivé" unit="%" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">threshold = {{ threshold }} · range = {{ range }}</p>
  </div>
</template>
