<script lang="ts">
export const section = {
  title: 'Autocomplétion',
  description:
    'ThAutocomplete, basé sur l’Autocomplete de Reka UI. Saisie libre accompagnée de suggestions : toute valeur est acceptée.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThAutocomplete } from '../../src'

const suggestions = ['latence médiane', 'latence par service', 'erreurs par minute', 'requêtes par minute']
const query = ref('latence')
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThAutocomplete v-model="query" label="Rechercher" placeholder="Une métrique" :suggestions="suggestions" />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">query = "{{ query }}"</p>
  </div>
</template>
