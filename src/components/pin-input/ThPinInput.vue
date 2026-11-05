<script setup lang="ts">
import { useId } from 'vue'
import { PinInputInput, PinInputRoot } from 'reka-ui'
import type { ThPinInputProps } from './types'
import '../../shared/field.css'

const { label, length = 6, help, itemLabel = 'Chiffre', type = 'number', ...rest } = defineProps<ThPinInputProps>()
const model = defineModel<string[]>({ default: () => [] })
const emit = defineEmits<{ complete: [value: string[]] }>()

const labelId = useId()
const helpId = useId()
</script>

<template>
  <div class="th-pin-input th-field">
    <span :id="labelId" class="th-field__label">{{ label }}</span>
    <PinInputRoot
      v-bind="rest"
      v-model="model"
      :type="type"
      class="th-pin-input__group"
      role="group"
      :aria-labelledby="labelId"
      :aria-describedby="help ? helpId : undefined"
      @complete="emit('complete', $event)"
    >
      <PinInputInput
        v-for="index in length"
        :key="index"
        :index="index - 1"
        class="th-pin-input__cell"
        :aria-label="`${itemLabel} ${index} sur ${length}`"
      />
    </PinInputRoot>
    <p v-if="help" :id="helpId" class="th-field__help">{{ help }}</p>
  </div>
</template>

<style>
.th-pin-input__group {
  display: flex;
  gap: var(--thilia-space-8);
}

.th-pin-input__cell {
  box-sizing: border-box;
  width: var(--thilia-control-40);
  height: var(--thilia-control-48);
  padding: 0;
  margin: 0;
  font: var(--thilia-type-mono);
  font-size: 15px;
  text-align: center;
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition: border-color var(--thilia-duration-fast);
}

.th-pin-input__cell:hover {
  border-color: var(--thilia-text);
}

.th-pin-input__cell:focus-visible {
  border-color: var(--thilia-accent);
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-pin-input__cell:disabled {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}
</style>
