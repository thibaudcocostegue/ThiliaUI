<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import type { ThRadioGroupProps } from './types'

const { label, orientation = 'vertical', disabled = false, required = false, name } = defineProps<ThRadioGroupProps>()
const model = defineModel<string>()
</script>

<template>
  <RadioGroupRoot
    v-model="model"
    class="th-radio-group"
    :aria-label="label"
    :orientation="orientation"
    :disabled="disabled"
    :required="required"
    :name="name"
  >
    <slot />
  </RadioGroupRoot>
</template>

<style>
.th-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--thilia-space-12);
  align-items: flex-start;
}

.th-radio-group[data-orientation='horizontal'] {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--thilia-space-12) var(--thilia-space-24);
}
</style>
