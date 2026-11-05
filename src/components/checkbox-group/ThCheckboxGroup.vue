<script setup lang="ts">
import { CheckboxGroupRoot } from 'reka-ui'
import { ThCheckbox } from '../checkbox'
import type { ThCheckboxGroupProps } from './types'

// Vue passe un booléen absent à false : on redonne à Reka son défaut « vrai ».
const { label, options, rovingFocus = true, ...rest } = defineProps<ThCheckboxGroupProps>()
const model = defineModel<string[]>({ default: () => [] })
</script>

<template>
  <CheckboxGroupRoot v-bind="rest" v-model="model" :roving-focus="rovingFocus" class="th-checkbox-group" role="group" :aria-label="label">
    <span class="th-checkbox-group__legend" aria-hidden="true">{{ label }}</span>
    <ThCheckbox
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled || rest.disabled"
    />
  </CheckboxGroupRoot>
</template>

<style>
.th-checkbox-group {
  display: grid;
  gap: var(--thilia-space-12);
  justify-items: start;
}

.th-checkbox-group__legend {
  font: var(--thilia-type-small);
  font-weight: 500;
  color: var(--thilia-text);
}
</style>
