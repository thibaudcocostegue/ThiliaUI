<script lang="ts">
export const section = {
  title: 'Note',
  description:
    'ThRating, basé sur le Rating de Reka UI. Une échelle de carrés, jamais d’étoiles, avec la valeur en texte. Flèches pour changer la note.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThRating } from '../../src'

const score = ref(4)
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThRating v-model="score" label="Note" />
    <ThRating :model-value="2" label="Note désactivée" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">score = {{ score }}</p>
  </div>
</template>
