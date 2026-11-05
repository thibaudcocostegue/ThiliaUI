<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import type { ThDrawerProps } from './types'

const { title, description, side = 'right', closeLabel = 'Fermer' } = defineProps<ThDrawerProps>()
const open = defineModel<boolean>('open', { default: false })

defineSlots<{
  /** Déclencheur : un élément focalisable, qui reprend le focus à la fermeture. */
  trigger?: () => unknown
  default?: (props: { close: () => void }) => unknown
  /** Actions en bas à droite. */
  footer?: (props: { close: () => void }) => unknown
}>()

const close = () => {
  open.value = false
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="th-drawer__overlay" />
      <DialogContent class="th-drawer" :data-side="side">
        <header class="th-drawer__header">
          <DialogTitle class="th-drawer__title">{{ title }}</DialogTitle>
          <DialogClose class="th-drawer__close" :aria-label="closeLabel">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </DialogClose>
        </header>
        <DialogDescription v-if="description" class="th-drawer__description">{{ description }}</DialogDescription>
        <div v-if="$slots.default" class="th-drawer__body">
          <slot :close="close" />
        </div>
        <div v-if="$slots.footer" class="th-drawer__footer">
          <slot name="footer" :close="close" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
.th-drawer__overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--thilia-background);
  opacity: 0.8;
  transition: opacity var(--thilia-duration-panel);
}

.th-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--thilia-space-16);
  width: min(360px, 100vw);
  padding: var(--thilia-space-24);
  overflow-y: auto;
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border-left: var(--thilia-stroke) solid var(--thilia-border);
  transition:
    opacity var(--thilia-duration-panel),
    transform var(--thilia-duration-panel);
}

.th-drawer[data-side='left'] {
  right: auto;
  left: 0;
  border-right: var(--thilia-stroke) solid var(--thilia-border);
  border-left: 0;
}

@starting-style {
  .th-drawer__overlay[data-state='open'] {
    opacity: 0;
  }

  .th-drawer[data-state='open'] {
    transform: translateX(100%);
  }

  .th-drawer[data-side='left'][data-state='open'] {
    transform: translateX(-100%);
  }
}

.th-drawer:focus-visible {
  outline: none;
}

.th-drawer__header {
  display: flex;
  gap: var(--thilia-space-16);
  align-items: center;
  justify-content: space-between;
}

.th-drawer__title {
  margin: 0;
  font: var(--thilia-type-title-2);
}

.th-drawer__description {
  margin: calc(-1 * var(--thilia-space-8)) 0 0;
  color: var(--thilia-text-secondary);
}

.th-drawer__body {
  flex: 1;
}

.th-drawer__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--thilia-space-12);
  justify-content: flex-end;
  margin-top: auto;
}

.th-drawer__close {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: var(--thilia-control-32);
  height: var(--thilia-control-32);
  padding: 0;
  color: var(--thilia-text-secondary);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: var(--thilia-radius);
  transition:
    background-color var(--thilia-duration-fast),
    color var(--thilia-duration-fast);
}

.th-drawer__close:hover {
  color: var(--thilia-text);
  background: var(--thilia-line);
}

.th-drawer__close:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}
</style>
