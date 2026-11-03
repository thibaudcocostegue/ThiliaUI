<script lang="ts">
export const section = {
  title: 'Séparateur',
  description: 'ThSeparator, basé sur le Separator de Reka UI. Trait de 1 px, couleur Filet.',
}
</script>

<script setup lang="ts">
import { ThSeparator } from '../../src'
</script>

<template>
  <div class="docs-demo">
    <p class="docs-label">Horizontal</p>
    <ThSeparator />
  </div>
  <div class="docs-demo">
    <p class="docs-label">Vertical, décoratif</p>
    <div class="docs-row">
      <span>Gauche</span>
      <ThSeparator orientation="vertical" decorative />
      <span>Droite</span>
    </div>
  </div>
</template>
