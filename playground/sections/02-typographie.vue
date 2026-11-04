<script lang="ts">
export const section = {
  title: 'Typographie',
  description: 'Inter Tight et Martian Mono, servies en local. Échelle de la planche Fondations, un token font par style.',
}
</script>

<script setup lang="ts">
const samples = [
  { name: 'Affichage', spec: '40/44 · 500', token: 'display' },
  { name: 'Titre 1', spec: '28/34 · 500', token: 'title-1' },
  { name: 'Titre 2', spec: '20/26 · 500', token: 'title-2' },
  { name: 'Corps de texte', spec: '15/22 · 400', token: 'body' },
  { name: 'Texte secondaire', spec: '13/18 · 400', token: 'small' },
  { name: 'Étiquette', spec: 'Mono 11/16 · +4 %', token: 'label' },
  { name: 'CN-1042', spec: 'Mono 12/18', token: 'mono' },
]
</script>

<template>
  <ul class="docs-type">
    <li v-for="sample in samples" :key="sample.token">
      <span
        :class="{ 'docs-label': sample.token === 'label' }"
        :style="{ font: `var(--thilia-type-${sample.token})` }"
      >
        {{ sample.name }}
      </span>
      <span class="docs-type__name">
        <code class="docs-mono">--thilia-type-{{ sample.token }}</code>
        <code class="docs-mono">{{ sample.spec }}</code>
      </span>
    </li>
  </ul>
</template>
