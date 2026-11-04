<script lang="ts">
export const section = {
  title: 'Bouton',
  description:
    'ThButton, basé sur le Primitive de Reka UI. Quatre variantes, trois tailles ; libellé mono en capitales.',
}
</script>

<script setup lang="ts">
import { ThButton } from '../../src'

const variants = [
  { value: 'primary', name: 'Primaire' },
  { value: 'secondary', name: 'Secondaire' },
  { value: 'ghost', name: 'Fantôme' },
  { value: 'danger', name: 'Danger' },
] as const
const sizes = ['32', '40', '48'] as const
</script>

<template>
  <div class="docs-demo">
    <div class="docs-matrix">
      <p class="docs-label">Variante</p>
      <p class="docs-label">Défaut · survoler, Tab</p>
      <p class="docs-label">Désactivé</p>
      <template v-for="variant in variants" :key="variant.value">
        <span>{{ variant.name }}</span>
        <div><ThButton :variant="variant.value">Action</ThButton></div>
        <div><ThButton :variant="variant.value" disabled>Action</ThButton></div>
      </template>
    </div>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Tailles · 32, 40, 48 px</p>
    <div class="docs-controls">
      <ThButton v-for="size in sizes" :key="size" :size="size" variant="secondary">Taille {{ size }}</ThButton>
    </div>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Lien · as="a"</p>
    <ThButton as="a" href="#button" variant="ghost">Retour en haut</ThButton>
  </div>
</template>
