<script setup lang="ts">
import { ToastClose, ToastDescription, ToastRoot, ToastTitle, useToastManager } from 'reka-ui'
import type { ThToastType } from './types'

// Interne à ThToaster : useToastManager() doit être appelé sous le ToastProvider.
const { labels, closeLabel } = defineProps<{
  labels: Record<ThToastType, string>
  closeLabel: string
}>()

const { toasts } = useToastManager()
</script>

<template>
  <ToastRoot v-for="item in toasts" :key="item.id" :toast="item" class="th-toast">
    <p class="th-toast__label">{{ labels[item.status as ThToastType] }}</p>
    <ToastTitle class="th-toast__title" />
    <ToastDescription v-if="item.description" class="th-toast__description" />
    <ToastClose class="th-toast__close" :aria-label="closeLabel">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </ToastClose>
  </ToastRoot>
</template>
