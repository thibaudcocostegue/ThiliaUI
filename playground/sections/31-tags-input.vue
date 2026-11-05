<script lang="ts">
export const section = {
  title: 'Étiquettes',
  description:
    'ThTagsInput, basé sur le TagsInput de Reka UI. Entrée ajoute une étiquette, Retour arrière retire la dernière, chaque étiquette a son bouton de retrait nommé.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThTagsInput } from '../../src'

const tags = ref(['prod', 'europe'])
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThTagsInput v-model="tags" label="Étiquettes" placeholder="Ajouter" help="Entrée pour valider chaque étiquette." />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">tags = {{ tags }}</p>
  </div>
</template>
