<script setup lang="ts">
import { computed, useId } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import type { ThSwitchProps } from './types'

const { label, disabled = false, required = false, name, value, id } = defineProps<ThSwitchProps>()
const model = defineModel<boolean>({ default: false })

const generatedId = useId()
const switchId = computed(() => id ?? generatedId)
</script>

<template>
  <div class="th-switch" :data-disabled="disabled ? '' : undefined">
    <label v-if="label || $slots.default" class="th-switch__label" :for="switchId">
      <slot>{{ label }}</slot>
    </label>
    <SwitchRoot
      :id="switchId"
      v-model="model"
      class="th-switch__track"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
    >
      <SwitchThumb class="th-switch__thumb" />
    </SwitchRoot>
  </div>
</template>

<style>
.th-switch {
  display: flex;
  gap: var(--thilia-space-16);
  align-items: center;
  justify-content: space-between;
  color: var(--thilia-text);
}

.th-switch__label {
  font: var(--thilia-type-body);
  cursor: pointer;
}

/* Piste 44 × 24 px, curseur carré de 16 px décalé de 3 px du contour. */
.th-switch__track {
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  width: calc(var(--thilia-space-48) - var(--thilia-space-4));
  height: var(--thilia-space-24);
  padding: 0;
  margin: 0;
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition: border-color var(--thilia-duration-fast);
}

.th-switch__track:hover {
  border-color: var(--thilia-text);
}

.th-switch__track[data-state='checked'] {
  border-color: var(--thilia-accent);
}

.th-switch__track:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-switch__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: var(--thilia-space-16);
  height: var(--thilia-space-16);
  background: var(--thilia-border);
  transition:
    transform var(--thilia-duration-fast),
    background-color var(--thilia-duration-fast);
}

.th-switch__thumb[data-state='checked'] {
  background: var(--thilia-accent);
  transform: translateX(var(--thilia-space-16));
}

.th-switch[data-disabled] {
  color: var(--thilia-text-secondary);
}

.th-switch[data-disabled] .th-switch__label,
.th-switch[data-disabled] .th-switch__track {
  cursor: not-allowed;
}

.th-switch[data-disabled] .th-switch__track {
  background: var(--thilia-background);
  border-color: var(--thilia-line);
}

.th-switch[data-disabled] .th-switch__thumb {
  background: var(--thilia-line);
}
</style>
