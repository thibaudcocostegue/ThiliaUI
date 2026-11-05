<script setup lang="ts">
import { useId } from 'vue'
import { ListboxContent, ListboxItem, ListboxItemIndicator, ListboxRoot } from 'reka-ui'
import type { ThListboxProps } from './types'
import '../../shared/field.css'
import '../../shared/options.css'

const { label, options, multiple = false, disabled = false, name } = defineProps<ThListboxProps>()
const model = defineModel<string | string[]>()

const labelId = useId()
</script>

<template>
  <div class="th-listbox th-field">
    <span :id="labelId" class="th-field__label">{{ label }}</span>
    <ListboxRoot v-model="model" :multiple="multiple" :disabled="disabled" :name="name" class="th-listbox__root th-options">
      <ListboxContent class="th-listbox__content" :aria-labelledby="labelId">
        <ListboxItem v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled" class="th-options__item">
          <span>{{ option.label }}</span>
          <ListboxItemIndicator class="th-options__check">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </ListboxItemIndicator>
        </ListboxItem>
      </ListboxContent>
    </ListboxRoot>
  </div>
</template>

<style>
.th-listbox__root:focus-within {
  border-color: var(--thilia-accent);
}

.th-listbox__root:focus-visible,
.th-listbox__root :focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}
</style>
