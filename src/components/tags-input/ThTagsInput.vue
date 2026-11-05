<script setup lang="ts">
import { computed, useId } from 'vue'
import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'reka-ui'
import type { ThTagsInputProps } from './types'
import '../../shared/field.css'

const { label, placeholder, help, removeLabel = 'Retirer', id, ...rest } = defineProps<ThTagsInputProps>()
const model = defineModel<string[]>({ default: () => [] })

const generatedId = useId()
const inputId = computed(() => id ?? generatedId)
const helpId = computed(() => `${inputId.value}-help`)
</script>

<template>
  <div class="th-tags-input th-field">
    <label class="th-field__label" :for="inputId">{{ label }}</label>
    <TagsInputRoot v-bind="rest" v-model="model" class="th-tags-input__box">
      <TagsInputItem v-for="tag in model" :key="tag" :value="tag" class="th-tags-input__tag">
        <TagsInputItemText />
        <TagsInputItemDelete class="th-tags-input__remove" :aria-labelledby="undefined" :aria-label="`${removeLabel} ${tag}`">
          <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </TagsInputItemDelete>
      </TagsInputItem>
      <TagsInputInput
        :id="inputId"
        class="th-tags-input__field"
        :placeholder="placeholder"
        :aria-describedby="help ? helpId : undefined"
      />
    </TagsInputRoot>
    <p v-if="help" :id="helpId" class="th-field__help">{{ help }}</p>
  </div>
</template>

<style>
.th-tags-input__box {
  display: flex;
  flex-wrap: wrap;
  gap: var(--thilia-space-4);
  align-items: center;
  box-sizing: border-box;
  min-height: var(--thilia-control-40);
  padding: calc(var(--thilia-space-8) - var(--thilia-stroke)) var(--thilia-space-8);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition: border-color var(--thilia-duration-fast);
}

.th-tags-input__box:hover {
  border-color: var(--thilia-text);
}

.th-tags-input__box:focus-within {
  border-color: var(--thilia-accent);
}

.th-tags-input__box[data-disabled] {
  background: var(--thilia-background);
  border-color: var(--thilia-line);
}

.th-tags-input__tag {
  display: inline-flex;
  gap: var(--thilia-space-4);
  align-items: center;
  box-sizing: border-box;
  height: var(--thilia-space-24);
  padding: 0 var(--thilia-space-4) 0 var(--thilia-space-8);
  font: var(--thilia-type-mono);
  color: var(--thilia-text);
  background: var(--thilia-line);
  border-radius: var(--thilia-radius);
}

.th-tags-input__tag[data-state='active'] {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
}

.th-tags-input__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--thilia-space-16);
  height: var(--thilia-space-16);
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.th-tags-input__remove:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}

.th-tags-input__field {
  flex: 1 1 80px;
  min-width: 80px;
  height: var(--thilia-space-24);
  padding: 0;
  font: var(--thilia-type-body);
  color: var(--thilia-text);
  background: transparent;
  border: 0;
}

.th-tags-input__field:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-tags-input__field::placeholder {
  color: var(--thilia-text-secondary);
  opacity: 1;
}
</style>
