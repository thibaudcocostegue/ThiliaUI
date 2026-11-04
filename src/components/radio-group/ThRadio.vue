<script setup lang="ts">
import { computed, useId } from 'vue'
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui'
import type { ThRadioProps } from './types'

const { value, label, disabled = false, id } = defineProps<ThRadioProps>()

const generatedId = useId()
const itemId = computed(() => id ?? generatedId)
</script>

<template>
  <div class="th-radio">
    <RadioGroupItem :id="itemId" class="th-radio__box" :value="value" :disabled="disabled">
      <RadioGroupIndicator class="th-radio__indicator" />
    </RadioGroupItem>
    <label v-if="label || $slots.default" class="th-radio__label" :for="itemId">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<style>
.th-radio {
  display: inline-flex;
  gap: var(--thilia-space-12);
  align-items: center;
  color: var(--thilia-text);
}

.th-radio__box {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--thilia-space-16);
  height: var(--thilia-space-16);
  padding: 0;
  margin: 0;
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition: border-color var(--thilia-duration-fast);
}

.th-radio__box:hover {
  border-color: var(--thilia-text);
}

.th-radio__box[data-state='checked'] {
  border-color: var(--thilia-accent);
}

.th-radio__box:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

/* Indicateur carré plein de 8 px au centre. */
.th-radio__indicator {
  width: var(--thilia-space-8);
  height: var(--thilia-space-8);
  background: var(--thilia-accent);
}

.th-radio__label {
  font: var(--thilia-type-body);
  cursor: pointer;
}

.th-radio:has([data-disabled]) {
  color: var(--thilia-text-secondary);
}

.th-radio:has([data-disabled]) .th-radio__box,
.th-radio:has([data-disabled]) .th-radio__label {
  cursor: not-allowed;
}

.th-radio__box[data-disabled] {
  background: var(--thilia-background);
  border-color: var(--thilia-line);
}

.th-radio__box[data-disabled] .th-radio__indicator {
  background: var(--thilia-text-secondary);
}
</style>
