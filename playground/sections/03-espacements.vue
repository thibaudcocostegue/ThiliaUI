<script lang="ts">
export const section = {
  title: 'Espacements',
  description: 'Espacements et hauteurs de contrôle, nommés d’après leur valeur en px.',
}
</script>

<script setup lang="ts">
const spaces = [4, 8, 12, 16, 24, 32, 48, 64]
const controls = [32, 40, 48]
</script>

<template>
  <div class="docs-demo">
    <p class="docs-label">Espacements</p>
    <ul class="docs-scale">
      <li v-for="space in spaces" :key="space">
        <code class="docs-mono">--thilia-space-{{ space }}</code>
        <span class="docs-scale__bar" :style="{ width: `var(--thilia-space-${space})` }" />
      </li>
    </ul>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Hauteurs de contrôle</p>
    <div class="docs-controls">
      <span
        v-for="control in controls"
        :key="control"
        class="docs-controls__box docs-mono"
        :style="{ height: `var(--thilia-control-${control})` }"
      >
        --thilia-control-{{ control }}
      </span>
    </div>
  </div>
</template>
