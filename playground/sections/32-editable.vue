<script lang="ts">
export const section = {
  title: 'Texte modifiable',
  description:
    'ThEditable, basé sur l’Editable de Reka UI. La valeur est soulignée d’un filet tireté ; le bouton l’ouvre en édition, Entrée valide et Échap annule.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThEditable } from '../../src'

const name = ref('Passerelle')
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThEditable v-model="name" label="le nom" placeholder="Sans nom" />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">name = "{{ name }}"</p>
  </div>
</template>
