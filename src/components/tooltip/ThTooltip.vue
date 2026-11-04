<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'
import type { ThTooltipProps } from './types'

const { content, side = 'top', delayDuration = 400, disabled = false } = defineProps<ThTooltipProps>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot v-model:open="open" :disabled="disabled">
      <!-- Le slot par défaut est le déclencheur : un élément focalisable (bouton, lien…). -->
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="th-tooltip" :side="side" :side-offset="8" :collision-padding="8">
          <slot name="content">{{ content }}</slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style>
/* Fond inversé : la couleur du texte du thème sert de fond, et inversement. */
.th-tooltip {
  max-width: 320px;
  padding: var(--thilia-space-4) var(--thilia-space-8);
  font: var(--thilia-type-small);
  color: var(--thilia-background);
  background: var(--thilia-text);
  border-radius: var(--thilia-radius);
  transition: opacity var(--thilia-duration-fast);
}

@starting-style {
  .th-tooltip[data-state] {
    opacity: 0;
  }
}
</style>
