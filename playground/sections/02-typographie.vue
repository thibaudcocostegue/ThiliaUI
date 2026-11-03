<script lang="ts">
export const section = {
  title: 'Typographie',
  description: 'Inter Tight et Martian Mono, servies en local. Échelle de la planche Fondations.',
}
</script>

<script setup lang="ts">
const samples = [
  { name: 'Affichage', spec: '40/44 · 500', className: 'docs-type--display' },
  { name: 'Titre 1', spec: '28/34 · 500', className: 'docs-type--title-1' },
  { name: 'Titre 2', spec: '20/26 · 500', className: 'docs-type--title-2' },
  { name: 'Corps de texte', spec: '15/22 · 400', className: 'docs-type--body' },
  { name: 'Texte secondaire', spec: '13/18 · 400', className: 'docs-type--small' },
  { name: 'Étiquette', spec: 'Mono 11/16 · +4 %', className: 'docs-label' },
  { name: 'CN-1042', spec: 'Mono 12/18', className: 'docs-type--mono' },
]
</script>

<template>
  <ul class="docs-type">
    <li v-for="sample in samples" :key="sample.name">
      <span :class="sample.className">{{ sample.name }}</span>
      <code class="docs-mono">{{ sample.spec }}</code>
    </li>
  </ul>
</template>
