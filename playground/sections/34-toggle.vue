<script lang="ts">
export const section = {
  title: 'Bouton à bascule',
  description:
    'ThToggle, basé sur le Toggle de Reka UI. L’état actif est marqué par le filet et le contour du texte, sans accent. Pour un réglage, préférez l’interrupteur.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThToggle } from '../../src'

const followed = ref(true)
const archives = ref(false)
</script>

<template>
  <div class="docs-demo">
    <div class="docs-controls">
      <ThToggle v-model="followed">Suivi</ThToggle>
      <ThToggle v-model="archives">Archives</ThToggle>
      <ThToggle disabled>Verrouillé</ThToggle>
    </div>
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">followed = {{ followed }} · archives = {{ archives }}</p>
  </div>
</template>
