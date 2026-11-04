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
import type { ThModalProps } from './types'

const { title, description, closeLabel = 'Fermer' } = defineProps<ThModalProps>()
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
      <DialogOverlay class="th-modal__overlay" />
      <DialogContent class="th-modal">
        <DialogTitle class="th-modal__title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description" class="th-modal__description">{{ description }}</DialogDescription>
        <div v-if="$slots.default" class="th-modal__body">
          <slot :close="close" />
        </div>
        <div v-if="$slots.footer" class="th-modal__footer">
          <slot name="footer" :close="close" />
        </div>
        <DialogClose class="th-modal__close" :aria-label="closeLabel">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
/* Fond assombri : la couleur de fond du thème, à 80 %. */
.th-modal__overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--thilia-background);
  opacity: 0.8;
  transition: opacity var(--thilia-duration-panel);
}

.th-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  box-sizing: border-box;
  display: grid;
  gap: var(--thilia-space-8);
  width: min(480px, calc(100vw - 2 * var(--thilia-space-16)));
  max-height: calc(100vh - 2 * var(--thilia-space-16));
  padding: var(--thilia-space-24);
  overflow-y: auto;
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transform: translate(-50%, -50%);
  transition:
    opacity var(--thilia-duration-panel),
    transform var(--thilia-duration-panel);
}

@starting-style {
  .th-modal__overlay[data-state='open'] {
    opacity: 0;
  }

  .th-modal[data-state='open'] {
    opacity: 0;
    transform: translate(-50%, calc(-50% + var(--thilia-space-8)));
  }
}

.th-modal:focus-visible {
  outline: none;
}

.th-modal__title {
  padding-right: var(--thilia-space-32);
  margin: 0;
  font: var(--thilia-type-title-2);
}

.th-modal__description {
  margin: 0;
  color: var(--thilia-text-secondary);
}

.th-modal__body {
  margin-top: var(--thilia-space-16);
}

.th-modal__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--thilia-space-12);
  justify-content: flex-end;
  margin-top: var(--thilia-space-16);
}

.th-modal__close {
  position: absolute;
  top: var(--thilia-space-16);
  right: var(--thilia-space-16);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--thilia-control-32);
  height: var(--thilia-control-32);
  padding: 0;
  color: var(--thilia-text-secondary);
  background: transparent;
  border: 0;
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition:
    background-color var(--thilia-duration-fast),
    color var(--thilia-duration-fast);
}

.th-modal__close:hover {
  color: var(--thilia-text);
  background: var(--thilia-line);
}

.th-modal__close:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}
</style>
