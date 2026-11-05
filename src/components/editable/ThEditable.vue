<script setup lang="ts">
import { ref } from 'vue'
import {
  EditableArea,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditableRoot,
  EditableSubmitTrigger,
} from 'reka-ui'
import type { ThEditableProps } from './types'

const { label, submitLabel = 'Valider', cancelLabel = 'Annuler', submitMode = 'enter', ...rest } = defineProps<ThEditableProps>()
const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ submit: [value: string | null | undefined] }>()

// En quittant l'édition, le bouton de modification revient : le focus doit y retourner.
// Le report d'un tour évite que l'Entrée qui valide ne réactive aussitôt ce bouton.
const trigger = ref<{ $el: HTMLElement } | null>(null)
function onState(state: string) {
  if (state !== 'edit') setTimeout(() => trigger.value?.$el.focus())
}
</script>

<template>
  <!-- Entrée valide, Échap annule. Le bouton de modification est le seul chemin d'entrée en édition : pas d'édition au simple focus. -->
  <EditableRoot
    v-slot="{ isEditing }"
    v-bind="rest"
    v-model="model"
    activation-mode="none"
    :submit-mode="submitMode"
    class="th-editable"
    @submit="emit('submit', $event)"
    @update:state="onState"
  >
    <EditableArea v-show="isEditing" class="th-editable__area">
      <EditableInput class="th-editable__input" :aria-label="label" />
      <EditableCancelTrigger class="th-editable__button" data-variant="secondary" :aria-label="cancelLabel">{{ cancelLabel }}</EditableCancelTrigger>
      <EditableSubmitTrigger class="th-editable__button" data-variant="primary" :aria-label="submitLabel">{{ submitLabel }}</EditableSubmitTrigger>
    </EditableArea>
    <EditableEditTrigger v-if="!isEditing" ref="trigger" class="th-editable__value" :aria-label="`Modifier ${label} : ${model || rest.placeholder || ''}`">
      {{ model || rest.placeholder }}
    </EditableEditTrigger>
  </EditableRoot>
</template>

<style>
.th-editable {
  display: block;
}

.th-editable__value {
  padding: var(--thilia-space-4) 0;
  font: var(--thilia-type-body);
  text-align: left;
  color: var(--thilia-text);
  cursor: text;
  background: transparent;
  border: 0;
  border-bottom: var(--thilia-stroke) dashed var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition: border-color var(--thilia-duration-fast);
}

.th-editable__value:hover {
  border-bottom-color: var(--thilia-text);
}

.th-editable__value:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-editable__area {
  display: flex;
  gap: var(--thilia-space-8);
}

.th-editable__area[hidden] {
  display: none;
}

.th-editable__input {
  box-sizing: border-box;
  flex: 1 1 auto;
  min-width: 0;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-12);
  font: var(--thilia-type-body);
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-accent);
  border-radius: var(--thilia-radius);
}

.th-editable__input:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-editable__button {
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-16);
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text);
  cursor: pointer;
  background: transparent;
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
}

.th-editable__button[data-variant='primary'] {
  color: var(--thilia-on-accent);
  background: var(--thilia-accent);
  border-color: var(--thilia-accent);
}

.th-editable__button[data-variant='primary']:hover {
  background: var(--thilia-accent-hover);
  border-color: var(--thilia-accent-hover);
}

.th-editable__button[data-variant='secondary']:hover {
  background: var(--thilia-surface-raised);
  border-color: var(--thilia-text);
}

.th-editable__button:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}
</style>
