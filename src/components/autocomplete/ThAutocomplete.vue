<script setup lang="ts">
import { computed, useId } from 'vue'
import {
  AutocompleteAnchor,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompletePortal,
  AutocompleteRoot,
  AutocompleteViewport,
} from 'reka-ui'
import type { ThAutocompleteProps } from './types'
import '../../shared/field.css'
import '../../shared/options.css'

const {
  label,
  suggestions,
  placeholder,
  help,
  size = '40',
  disabled = false,
  required = false,
  name,
  id,
} = defineProps<ThAutocompleteProps>()
const model = defineModel<string>({ default: '' })

const generatedId = useId()
const inputId = computed(() => id ?? generatedId)
const helpId = computed(() => `${inputId.value}-help`)

// Le filtrage est fait ici : on ne garde que les suggestions qui contiennent la saisie.
const filtered = computed(() => {
  const term = model.value.trim().toLocaleLowerCase()
  return suggestions.filter((suggestion) => suggestion.toLocaleLowerCase().includes(term) && suggestion.toLocaleLowerCase() !== term)
})
</script>

<template>
  <div class="th-autocomplete th-field" :data-size="size">
    <label class="th-field__label" :for="inputId">{{ label }}</label>
    <AutocompleteRoot v-model="model" ignore-filter :disabled="disabled" :required="required" :name="name">
      <AutocompleteAnchor class="th-autocomplete__anchor">
        <AutocompleteInput
          :id="inputId"
          class="th-autocomplete__input"
          :placeholder="placeholder"
          :aria-describedby="help ? helpId : undefined"
        />
      </AutocompleteAnchor>
      <AutocompletePortal>
        <AutocompleteContent v-if="filtered.length" class="th-autocomplete__content th-options" position="popper" :side-offset="4">
          <AutocompleteViewport>
            <AutocompleteItem v-for="suggestion in filtered" :key="suggestion" class="th-options__item" :value="suggestion">
              {{ suggestion }}
            </AutocompleteItem>
          </AutocompleteViewport>
        </AutocompleteContent>
      </AutocompletePortal>
    </AutocompleteRoot>
    <p v-if="help" :id="helpId" class="th-field__help">{{ help }}</p>
  </div>
</template>

<style>
.th-autocomplete__anchor {
  display: flex;
}

.th-autocomplete__input {
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

.th-autocomplete[data-size='32'] .th-autocomplete__input {
  height: var(--thilia-control-32);
  padding: 0 var(--thilia-space-12);
}

.th-autocomplete[data-size='48'] .th-autocomplete__input {
  height: var(--thilia-control-48);
}

.th-autocomplete__input::placeholder {
  color: var(--thilia-text-secondary);
  opacity: 1;
}

.th-autocomplete__input:hover {
  border-color: var(--thilia-text);
}

.th-autocomplete__input:focus-visible {
  border-color: var(--thilia-accent);
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-autocomplete__input:disabled {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}

.th-autocomplete__content {
  width: var(--reka-popper-anchor-width);
}
</style>
