<script setup lang="ts">
import { computed, useId } from 'vue'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import type { ThSelectProps } from './types'

const {
  label,
  options,
  placeholder,
  help,
  size = '40',
  disabled = false,
  required = false,
  name,
  id,
} = defineProps<ThSelectProps>()
const model = defineModel<string>()
const open = defineModel<boolean>('open', { default: false })

const generatedId = useId()
const triggerId = computed(() => id ?? generatedId)
const helpId = computed(() => `${triggerId.value}-help`)
</script>

<template>
  <div class="th-select" :data-size="size">
    <label class="th-select__label" :for="triggerId">{{ label }}</label>
    <SelectRoot v-model="model" v-model:open="open" :disabled="disabled" :required="required" :name="name">
      <SelectTrigger :id="triggerId" class="th-select__trigger" :aria-describedby="help ? helpId : undefined">
        <SelectValue class="th-select__value" :placeholder="placeholder" />
        <SelectIcon class="th-select__icon">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent class="th-select__content" position="popper" :side-offset="4">
          <SelectViewport>
            <SelectItem
              v-for="option in options"
              :key="option.value"
              class="th-select__item"
              :value="option.value"
              :disabled="option.disabled"
            >
              <SelectItemText>{{ option.label }}</SelectItemText>
              <SelectItemIndicator class="th-select__check">
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
    <p v-if="help" :id="helpId" class="th-select__help">{{ help }}</p>
  </div>
</template>

<style>
.th-select {
  display: grid;
  gap: var(--thilia-space-8);
}

.th-select__label {
  font: var(--thilia-type-small);
  font-weight: 500;
  color: var(--thilia-text);
}

.th-select__trigger {
  display: flex;
  gap: var(--thilia-space-8);
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-12) 0 var(--thilia-space-16);
  margin: 0;
  font: var(--thilia-type-body);
  text-align: left;
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition: border-color var(--thilia-duration-fast);
}

.th-select[data-size='32'] .th-select__trigger {
  height: var(--thilia-control-32);
  padding-left: var(--thilia-space-12);
}

.th-select[data-size='48'] .th-select__trigger {
  height: var(--thilia-control-48);
}

.th-select__trigger:hover {
  border-color: var(--thilia-text);
}

.th-select__trigger[data-state='open'] {
  border-color: var(--thilia-accent);
}

.th-select__trigger:focus-visible {
  border-color: var(--thilia-accent);
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-select__trigger[data-disabled] {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}

.th-select__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.th-select__trigger[data-placeholder] .th-select__value {
  color: var(--thilia-text-secondary);
}

.th-select__icon {
  display: flex;
  flex-shrink: 0;
  transition: transform var(--thilia-duration-fast);
}

.th-select__trigger[data-state='open'] .th-select__icon {
  transform: rotate(180deg);
}

.th-select__content {
  box-sizing: border-box;
  width: var(--reka-select-trigger-width);
  max-height: var(--reka-select-content-available-height);
  overflow: hidden;
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
}

.th-select__item {
  display: flex;
  gap: var(--thilia-space-8);
  align-items: center;
  justify-content: space-between;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-12) 0 var(--thilia-space-16);
  font: var(--thilia-type-body);
  cursor: pointer;
  outline: none;
  user-select: none;
}

.th-select__item[data-highlighted] {
  background: var(--thilia-line);
}

.th-select__item[data-disabled] {
  color: var(--thilia-text-secondary);
  cursor: not-allowed;
}

.th-select__check {
  display: flex;
  color: var(--thilia-accent);
}

.th-select__help {
  margin: 0;
  font: var(--thilia-type-small);
  color: var(--thilia-text-secondary);
}
</style>
