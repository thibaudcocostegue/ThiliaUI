<script setup lang="ts">
import { Toggle } from 'reka-ui'
import type { ThToggleProps } from './types'

const { size = '40', ...rest } = defineProps<ThToggleProps>()
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <Toggle v-bind="rest" v-model="model" class="th-toggle" :data-size="size">
    <slot />
  </Toggle>
</template>

<style>
.th-toggle {
  box-sizing: border-box;
  min-width: var(--thilia-control-40);
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-12);
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text-secondary);
  cursor: pointer;
  background: transparent;
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition:
    background-color var(--thilia-duration-fast),
    color var(--thilia-duration-fast);
}

.th-toggle[data-size='32'] {
  min-width: var(--thilia-control-32);
  height: var(--thilia-control-32);
}

.th-toggle[data-size='48'] {
  min-width: var(--thilia-control-48);
  height: var(--thilia-control-48);
}

.th-toggle:hover {
  background: var(--thilia-surface-raised);
}

/* Actif : fond du filet et contour du texte, sans accent. */
.th-toggle[data-state='on'] {
  color: var(--thilia-text);
  background: var(--thilia-line);
  border-color: var(--thilia-text);
}

.th-toggle:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-toggle[data-disabled] {
  color: var(--thilia-text-secondary);
  background: transparent;
  border-color: var(--thilia-line);
  cursor: not-allowed;
}
</style>
