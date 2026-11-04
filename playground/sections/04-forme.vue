<script lang="ts">
export const section = {
  title: 'Forme et mouvement',
  description: 'Rayon 0, traits de 1 px, aucune ombre. Anneau de focus accent et durées de transition.',
}
</script>

<script setup lang="ts">
const durations = [
  { token: 'fast', name: 'Réaction · 120 ms' },
  { token: 'panel', name: 'Panneau · 200 ms' },
]
</script>

<template>
  <div class="docs-demo">
    <p class="docs-label">Rayon et trait</p>
    <div class="docs-shape">
      <code class="docs-mono">--thilia-radius</code>
      <code class="docs-mono">--thilia-stroke</code>
    </div>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Focus · Tab pour l’afficher</p>
    <div class="docs-shape">
      <button type="button" class="docs-focus docs-mono">--thilia-focus-width · --thilia-focus-offset</button>
    </div>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Durées · survoler</p>
    <div class="docs-shape">
      <span
        v-for="duration in durations"
        :key="duration.token"
        class="docs-motion docs-mono"
        :style="{ transition: `background-color var(--thilia-duration-${duration.token}), border-color var(--thilia-duration-${duration.token}), color var(--thilia-duration-${duration.token})` }"
      >
        {{ duration.name }}
      </span>
    </div>
  </div>
</template>
