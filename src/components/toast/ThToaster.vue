<script setup lang="ts">
import { computed } from 'vue'
import { ToastProvider, ToastViewport } from 'reka-ui'
import ThToastList from './ThToastList.vue'
import { toastManager } from './toast'
import type { ThToasterProps } from './types'

const { labels, closeLabel = 'Fermer', duration = 5000 } = defineProps<ThToasterProps>()

const allLabels = computed(() => ({ success: 'Succès', warning: 'Alerte', danger: 'Erreur', ...labels }))
</script>

<template>
  <ToastProvider :toast-manager="toastManager" :duration="duration" label="Notification">
    <ThToastList :labels="allLabels" :close-label="closeLabel" />
    <ToastViewport class="th-toaster" label="Notifications ({hotkey})" />
  </ToastProvider>
</template>

<style>
.th-toaster {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: var(--thilia-space-8);
  box-sizing: border-box;
  width: 400px;
  max-width: 100vw;
  padding: var(--thilia-space-24);
  margin: 0;
  list-style: none;
  outline: none;
}

.th-toaster:empty {
  padding: 0;
}

/* F8 met le focus sur la zone ; l'anneau reste à l'intérieur, la zone touche le bord de l'écran. */
.th-toaster:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}

.th-toast {
  position: relative;
  display: grid;
  gap: var(--thilia-space-4);
  padding: var(--thilia-space-12) var(--thilia-space-48) var(--thilia-space-12) var(--thilia-space-16);
  color: var(--thilia-text);
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition:
    opacity var(--thilia-duration-panel),
    transform var(--thilia-duration-panel);
}

@starting-style {
  .th-toast[data-state='open'] {
    opacity: 0;
    transform: translateY(var(--thilia-space-8));
  }
}

.th-toast[data-swipe='move'] {
  transform: translateX(var(--reka-toast-swipe-move-x));
  transition: none;
}

.th-toast:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-toast__label {
  margin: 0;
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
}

.th-toast[data-status='success'] .th-toast__label {
  color: var(--thilia-success);
}

.th-toast[data-status='warning'] .th-toast__label {
  color: var(--thilia-warning);
}

.th-toast[data-status='danger'] .th-toast__label {
  color: var(--thilia-danger);
}

.th-toast__title {
  font: var(--thilia-type-body);
}

.th-toast__description {
  font: var(--thilia-type-small);
  color: var(--thilia-text-secondary);
}

.th-toast__close {
  position: absolute;
  top: var(--thilia-space-8);
  right: var(--thilia-space-8);
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

.th-toast__close:hover {
  color: var(--thilia-text);
  background: var(--thilia-line);
}

.th-toast__close:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}
</style>
