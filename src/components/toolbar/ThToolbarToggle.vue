<script setup lang="ts">
import { ToolbarToggleGroup, ToolbarToggleItem } from 'reka-ui'
import type { ThToolbarToggleProps } from './types'

const { label, disabled = false } = defineProps<ThToolbarToggleProps>()
const model = defineModel<boolean>({ default: false })

// ToolbarToggleItem vit dans un ToolbarToggleGroup : un bouton seul, donc un groupe d'un élément.
function update(value: unknown) {
  model.value = Array.isArray(value) && value.length > 0
}
</script>

<template>
  <ToolbarToggleGroup type="multiple" :model-value="model ? ['on'] : []" @update:model-value="update">
    <ToolbarToggleItem value="on" class="th-toolbar__button" :disabled="disabled" :aria-label="label">
      <slot />
    </ToolbarToggleItem>
  </ToolbarToggleGroup>
</template>
