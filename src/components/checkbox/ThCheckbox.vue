<script setup lang="ts">
import { computed, useId } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import type { ThCheckboxProps } from './types'

const { label, disabled = false, required = false, name, value, id } = defineProps<ThCheckboxProps>()
const model = defineModel<boolean | 'indeterminate'>({ default: false })

const generatedId = useId()
const boxId = computed(() => id ?? generatedId)
</script>

<template>
  <div class="th-checkbox" :data-disabled="disabled ? '' : undefined">
    <CheckboxRoot
      :id="boxId"
      v-model="model"
      class="th-checkbox__box"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
    >
      <CheckboxIndicator class="th-checkbox__indicator">
        <svg v-if="model === 'indeterminate'" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M3 8h10" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
        <svg v-else viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </CheckboxIndicator>
    </CheckboxRoot>
    <label v-if="label || $slots.default" class="th-checkbox__label" :for="boxId">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<style>
.th-checkbox {
  display: inline-flex;
  gap: var(--thilia-space-12);
  align-items: center;
  color: var(--thilia-text);
}

.th-checkbox__box {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--thilia-space-16);
  height: var(--thilia-space-16);
  padding: 0;
  margin: 0;
  color: var(--thilia-on-accent);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition:
    background-color var(--thilia-duration-fast),
    border-color var(--thilia-duration-fast);
}

.th-checkbox__box:hover {
  border-color: var(--thilia-text);
}

.th-checkbox__box[data-state='checked'],
.th-checkbox__box[data-state='indeterminate'] {
  background: var(--thilia-accent);
  border-color: var(--thilia-accent);
}

.th-checkbox__box:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-checkbox__indicator {
  display: flex;
}

.th-checkbox__label {
  font: var(--thilia-type-body);
  cursor: pointer;
}

.th-checkbox[data-disabled] {
  color: var(--thilia-text-secondary);
}

.th-checkbox[data-disabled] .th-checkbox__box,
.th-checkbox[data-disabled] .th-checkbox__label {
  cursor: not-allowed;
}

.th-checkbox[data-disabled] .th-checkbox__box {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
}
</style>
