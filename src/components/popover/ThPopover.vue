<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import type { ThPopoverProps } from './types'

const { side = 'bottom', align = 'start' } = defineProps<ThPopoverProps>()
const open = defineModel<boolean>('open', { default: false })

defineSlots<{
  /** Déclencheur : un élément focalisable, qui reprend le focus à la fermeture et nomme le panneau. */
  trigger?: () => unknown
  default?: (props: { close: () => void }) => unknown
}>()

const close = () => {
  open.value = false
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="th-popover" :side="side" :align="align" :side-offset="8" :collision-padding="8">
        <slot :close="close" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
.th-popover {
  box-sizing: border-box;
  display: grid;
  gap: var(--thilia-space-8);
  width: 320px;
  max-width: calc(100vw - 2 * var(--thilia-space-16));
  padding: var(--thilia-space-16);
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition: opacity var(--thilia-duration-fast);
}

@starting-style {
  .th-popover[data-state='open'] {
    opacity: 0;
  }
}

.th-popover:focus-visible {
  outline: none;
}
</style>
