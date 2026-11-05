<script setup lang="ts">
import { ToolbarButton } from 'reka-ui'
import type { ThToolbarButtonProps } from './types'

const { label, disabled = false } = defineProps<ThToolbarButtonProps>()
</script>

<template>
  <ToolbarButton class="th-toolbar__button" :disabled="disabled" :aria-label="label">
    <slot />
  </ToolbarButton>
</template>
