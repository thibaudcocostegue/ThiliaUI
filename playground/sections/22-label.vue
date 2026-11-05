<script lang="ts">
export const section = {
  title: 'Libellé',
  description:
    'ThLabel, basé sur le Label de Reka UI. Texte de 13 px en graisse 500. Le mot « Requis » en étiquette mono remplace l’astérisque seul.',
}
</script>

<script setup lang="ts">
import { ThLabel } from '../../src'
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThLabel>Nom du service</ThLabel>
    <ThLabel required>Identifiant</ThLabel>
  </div>
</template>
