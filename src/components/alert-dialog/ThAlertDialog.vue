<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'reka-ui'
import type { ThAlertDialogProps } from './types'

const { title, description, actionLabel, cancelLabel = 'Annuler', kind, variant = 'danger' } = defineProps<ThAlertDialogProps>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ action: []; cancel: [] }>()

defineSlots<{
  /** Déclencheur : un élément focalisable, qui reprend le focus à la fermeture. */
  trigger?: () => unknown
}>()
</script>

<template>
  <AlertDialogRoot v-model:open="open">
    <AlertDialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="th-alert-dialog__overlay" />
      <AlertDialogContent class="th-alert-dialog">
        <span v-if="kind" class="th-alert-dialog__kind" :data-variant="variant">{{ kind }}</span>
        <AlertDialogTitle class="th-alert-dialog__title">{{ title }}</AlertDialogTitle>
        <AlertDialogDescription class="th-alert-dialog__description">{{ description }}</AlertDialogDescription>
        <div class="th-alert-dialog__footer">
          <AlertDialogCancel class="th-alert-dialog__button" data-variant="secondary" @click="emit('cancel')">
            {{ cancelLabel }}
          </AlertDialogCancel>
          <AlertDialogAction class="th-alert-dialog__button" :data-variant="variant" @click="emit('action')">
            {{ actionLabel }}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style>
.th-alert-dialog__overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--thilia-background);
  opacity: 0.8;
  transition: opacity var(--thilia-duration-panel);
}

.th-alert-dialog {
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
  .th-alert-dialog__overlay[data-state='open'] {
    opacity: 0;
  }

  .th-alert-dialog[data-state='open'] {
    opacity: 0;
    transform: translate(-50%, calc(-50% + var(--thilia-space-8)));
  }
}

.th-alert-dialog:focus-visible {
  outline: none;
}

.th-alert-dialog__kind {
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text-secondary);
}

.th-alert-dialog__kind[data-variant='danger'] {
  color: var(--thilia-danger);
}

.th-alert-dialog__title {
  margin: 0;
  font: var(--thilia-type-title-2);
}

.th-alert-dialog__description {
  margin: 0;
  color: var(--thilia-text-secondary);
}

.th-alert-dialog__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--thilia-space-12);
  justify-content: flex-end;
  margin-top: var(--thilia-space-16);
}

.th-alert-dialog__button {
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
  transition:
    background-color var(--thilia-duration-fast),
    border-color var(--thilia-duration-fast);
}

.th-alert-dialog__button[data-variant='secondary']:hover {
  background: var(--thilia-surface-raised);
  border-color: var(--thilia-text);
}

.th-alert-dialog__button[data-variant='primary'] {
  color: var(--thilia-on-accent);
  background: var(--thilia-accent);
  border-color: var(--thilia-accent);
}

.th-alert-dialog__button[data-variant='primary']:hover {
  background: var(--thilia-accent-hover);
  border-color: var(--thilia-accent-hover);
}

.th-alert-dialog__button[data-variant='danger'] {
  color: var(--thilia-on-danger);
  background: var(--thilia-danger);
  border-color: var(--thilia-danger);
}

.th-alert-dialog__button[data-variant='danger']:hover {
  background: var(--thilia-danger-hover);
  border-color: var(--thilia-danger-hover);
}

.th-alert-dialog__button:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}
</style>
