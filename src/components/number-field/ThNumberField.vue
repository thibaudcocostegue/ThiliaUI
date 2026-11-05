<script setup lang="ts">
import { computed, useId } from 'vue'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'reka-ui'
import type { ThNumberFieldProps } from './types'
import '../../shared/field.css'

const {
  label,
  help,
  unit,
  decrementLabel = 'Diminuer',
  incrementLabel = 'Augmenter',
  id,
  // Vue passe un booléen absent à false : on redonne à Reka ses défauts « vrai ».
  stepSnapping = true,
  focusOnChange = true,
  ...rest
} = defineProps<ThNumberFieldProps>()
const model = defineModel<number>()

const generatedId = useId()
const inputId = computed(() => id ?? generatedId)
const helpId = computed(() => `${inputId.value}-help`)
</script>

<template>
  <NumberFieldRoot v-bind="rest" v-model="model" :step-snapping="stepSnapping" :focus-on-change="focusOnChange" class="th-number-field th-field">
    <label class="th-field__label" :for="inputId">{{ label }}</label>
    <div class="th-number-field__group">
      <NumberFieldInput :id="inputId" class="th-number-field__input" :aria-describedby="help ? helpId : undefined" />
      <NumberFieldDecrement class="th-number-field__step" :aria-label="decrementLabel">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M3 8h10" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </NumberFieldDecrement>
      <NumberFieldIncrement class="th-number-field__step" :aria-label="incrementLabel">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M3 8h10M8 3v10" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </NumberFieldIncrement>
      <span v-if="unit" class="th-number-field__unit">{{ unit }}</span>
    </div>
    <p v-if="help" :id="helpId" class="th-field__help">{{ help }}</p>
  </NumberFieldRoot>
</template>

<style>
.th-number-field__group {
  display: flex;
  align-items: center;
}

.th-number-field__input {
  box-sizing: border-box;
  width: 96px;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-12);
  margin: 0;
  font: var(--thilia-type-body);
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
}

.th-number-field__input:hover {
  border-color: var(--thilia-text);
}

.th-number-field__input:focus-visible {
  border-color: var(--thilia-accent);
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-number-field__input:disabled {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}

.th-number-field__step {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--thilia-control-40);
  height: var(--thilia-control-40);
  padding: 0;
  margin-left: calc(-1 * var(--thilia-stroke));
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition: border-color var(--thilia-duration-fast);
}

.th-number-field__step:hover {
  border-color: var(--thilia-text);
}

.th-number-field__step:focus-visible {
  position: relative;
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-number-field__step[data-disabled],
.th-number-field__step:disabled {
  color: var(--thilia-text-secondary);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}

.th-number-field__unit {
  margin-left: var(--thilia-space-8);
  font: var(--thilia-type-mono);
  color: var(--thilia-text-secondary);
}
</style>
