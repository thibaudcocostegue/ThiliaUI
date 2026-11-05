<script setup lang="ts">
import { Label } from 'reka-ui'
import type { ThLabelProps } from './types'

const { required = false, requiredLabel = 'Requis', ...rest } = defineProps<ThLabelProps>()
</script>

<template>
  <Label v-bind="rest" class="th-label">
    <slot />
    <span v-if="required" class="th-label__required">{{ requiredLabel }}</span>
  </Label>
</template>

<style>
.th-label {
  font: var(--thilia-type-small);
  font-weight: 500;
  color: var(--thilia-text);
}

.th-label__required {
  margin-left: var(--thilia-space-8);
  font: var(--thilia-type-label);
  font-weight: 400;
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text-secondary);
}
</style>
