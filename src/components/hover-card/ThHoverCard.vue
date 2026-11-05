<script setup lang="ts">
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui'
import type { ThHoverCardProps } from './types'

const { openDelay = 400, closeDelay = 200, side = 'bottom' } = defineProps<ThHoverCardProps>()
const open = defineModel<boolean>('open', { default: false })

defineSlots<{
  /** Déclencheur : un lien ou un bouton, focalisable. */
  default?: () => unknown
  /** Contenu de l'aperçu : de la lecture, sans action indispensable. */
  content?: () => unknown
}>()
</script>

<template>
  <HoverCardRoot v-model:open="open" :open-delay="openDelay" :close-delay="closeDelay">
    <HoverCardTrigger as-child>
      <slot />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent class="th-hover-card" :side="side" :side-offset="8" :collision-padding="8">
        <slot name="content" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>

<style>
.th-hover-card {
  box-sizing: border-box;
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
  .th-hover-card[data-state='open'] {
    opacity: 0;
  }
}
</style>
