<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import type { ThToggleGroupProps } from './types'

// Vue passe un booléen absent à false : on redonne à Reka ses défauts « vrai ».
const { label, options, type = 'single', size = '40', rovingFocus = true, loop = true, ...rest } = defineProps<ThToggleGroupProps>()
const model = defineModel<string | string[]>()
</script>

<template>
  <ToggleGroupRoot v-bind="rest" v-model="model" :type="type" :roving-focus="rovingFocus" :loop="loop" class="th-toggle-group" :aria-label="label" :data-size="size">
    <ToggleGroupItem v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled" class="th-toggle-group__item">
      {{ option.label }}
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>

<style>
.th-toggle-group {
  display: inline-flex;
}

.th-toggle-group__item {
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

.th-toggle-group__item + .th-toggle-group__item {
  margin-left: calc(-1 * var(--thilia-stroke));
}

.th-toggle-group[data-size='32'] .th-toggle-group__item {
  min-width: var(--thilia-control-32);
  height: var(--thilia-control-32);
}

.th-toggle-group[data-size='48'] .th-toggle-group__item {
  min-width: var(--thilia-control-48);
  height: var(--thilia-control-48);
}

.th-toggle-group__item:hover {
  background: var(--thilia-surface-raised);
}

.th-toggle-group__item[data-state='on'] {
  position: relative;
  color: var(--thilia-text);
  background: var(--thilia-line);
  border-color: var(--thilia-text);
}

.th-toggle-group__item:focus-visible {
  position: relative;
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-toggle-group__item[data-disabled] {
  color: var(--thilia-text-secondary);
  background: transparent;
  border-color: var(--thilia-line);
  cursor: not-allowed;
}
</style>
