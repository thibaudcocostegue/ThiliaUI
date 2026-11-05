<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui'
import type { ThComboboxProps } from './types'
import '../../shared/field.css'
import '../../shared/options.css'

const {
  label,
  options,
  placeholder,
  help,
  emptyLabel = 'Aucun résultat',
  size = '40',
  disabled = false,
  required = false,
  name,
  id,
} = defineProps<ThComboboxProps>()
const model = defineModel<string>()
const open = defineModel<boolean>('open', { default: false })

const generatedId = useId()
const inputId = computed(() => id ?? generatedId)
const helpId = computed(() => `${inputId.value}-help`)

// Le filtrage est fait ici : la liste suit la saisie, quelle que soit la valeur choisie.
const search = ref('')
const filtered = computed(() => {
  const term = search.value.trim().toLocaleLowerCase()
  return term ? options.filter((option) => option.label.toLocaleLowerCase().includes(term)) : options
})

const labelOf = (value: string | undefined) => options.find((option) => option.value === value)?.label ?? ''
</script>

<template>
  <div class="th-combobox th-field" :data-size="size">
    <label class="th-field__label" :for="inputId">{{ label }}</label>
    <ComboboxRoot
      v-model="model"
      v-model:open="open"
      ignore-filter
      :disabled="disabled"
      :required="required"
      :name="name"
    >
      <ComboboxAnchor class="th-combobox__anchor">
        <ComboboxInput
          :id="inputId"
          v-model="search"
          class="th-combobox__input"
          :placeholder="placeholder"
          :display-value="labelOf"
          :aria-describedby="help ? helpId : undefined"
        />
        <ComboboxTrigger class="th-combobox__trigger" aria-label="Afficher les options" tabindex="-1">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </ComboboxTrigger>
      </ComboboxAnchor>
      <ComboboxPortal>
        <ComboboxContent class="th-combobox__content th-options" position="popper" :side-offset="4">
          <ComboboxViewport>
            <ComboboxEmpty class="th-options__empty">{{ emptyLabel }}</ComboboxEmpty>
            <ComboboxItem
              v-for="option in filtered"
              :key="option.value"
              class="th-options__item"
              :value="option.value"
              :disabled="option.disabled"
            >
              <span>{{ option.label }}</span>
              <ComboboxItemIndicator class="th-options__check">
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
    <p v-if="help" :id="helpId" class="th-field__help">{{ help }}</p>
  </div>
</template>

<style>
.th-combobox__anchor {
  position: relative;
  display: flex;
}

.th-combobox__input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-48) 0 var(--thilia-space-16);
  margin: 0;
  font: var(--thilia-type-body);
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition: border-color var(--thilia-duration-fast);
}

.th-combobox[data-size='32'] .th-combobox__input {
  height: var(--thilia-control-32);
  padding-left: var(--thilia-space-12);
}

.th-combobox[data-size='48'] .th-combobox__input {
  height: var(--thilia-control-48);
}

.th-combobox__input::placeholder {
  color: var(--thilia-text-secondary);
  opacity: 1;
}

.th-combobox__input:hover {
  border-color: var(--thilia-text);
}

.th-combobox__input:focus-visible {
  border-color: var(--thilia-accent);
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-combobox__input:disabled {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}

.th-combobox__trigger {
  position: absolute;
  top: 0;
  right: var(--thilia-space-4);
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--thilia-control-32);
  padding: 0;
  color: var(--thilia-text-secondary);
  background: transparent;
  border: 0;
  cursor: pointer;
}

.th-combobox__content {
  width: var(--reka-combobox-trigger-width);
  max-height: var(--reka-combobox-content-available-height);
}
</style>
