<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import type { ThInputProps } from './types'

// class et style vont à la racine ; les autres attributs (placeholder, name,
// autocomplete, écouteurs…) vont au champ.
defineOptions({ inheritAttrs: false })

const { label, help, error, type = 'text', size = '40', disabled = false, id } = defineProps<ThInputProps>()
const model = defineModel<string>({ default: '' })

const attrs = useAttrs()
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const generatedId = useId()
const inputId = computed(() => id ?? generatedId)
const messageId = computed(() => `${inputId.value}-message`)
const message = computed(() => error || help)
</script>

<template>
  <div class="th-input" v-bind="rootAttrs" :data-size="size" :data-invalid="error ? '' : undefined" :data-disabled="disabled ? '' : undefined">
    <label class="th-input__label" :for="inputId">{{ label }}</label>
    <input
      v-bind="inputAttrs"
      :id="inputId"
      v-model="model"
      class="th-input__field"
      :type="type"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="message ? messageId : undefined"
    />
    <p v-if="message" :id="messageId" class="th-input__message" :role="error ? 'alert' : undefined">{{ message }}</p>
  </div>
</template>

<style>
.th-input {
  display: grid;
  gap: var(--thilia-space-8);
}

.th-input__label {
  font: var(--thilia-type-small);
  font-weight: 500;
  color: var(--thilia-text);
}

.th-input__field {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-16);
  margin: 0;
  font: var(--thilia-type-body);
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition: border-color var(--thilia-duration-fast);
}

.th-input[data-size='32'] .th-input__field {
  height: var(--thilia-control-32);
  padding: 0 var(--thilia-space-12);
}

.th-input[data-size='48'] .th-input__field {
  height: var(--thilia-control-48);
}

.th-input__field::placeholder {
  color: var(--thilia-text-secondary);
  opacity: 1;
}

.th-input__field:hover {
  border-color: var(--thilia-text);
}

.th-input__field:focus-visible {
  border-color: var(--thilia-accent);
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-input[data-invalid] .th-input__field {
  border-color: var(--thilia-danger);
}

.th-input__field:disabled {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}

.th-input__message {
  margin: 0;
  font: var(--thilia-type-small);
  color: var(--thilia-text-secondary);
}

.th-input[data-invalid] .th-input__message {
  color: var(--thilia-danger);
}
</style>
