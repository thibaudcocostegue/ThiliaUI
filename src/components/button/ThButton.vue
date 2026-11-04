<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import type { ThButtonProps } from './types'

const {
  variant = 'primary',
  size = '40',
  disabled = false,
  type = 'button',
  as = 'button',
  asChild,
} = defineProps<ThButtonProps>()

const isNativeButton = computed(() => as === 'button' && !asChild)
</script>

<template>
  <Primitive
    class="th-button"
    :as="as"
    :as-child="asChild"
    :type="isNativeButton ? type : undefined"
    :disabled="isNativeButton ? disabled : undefined"
    :aria-disabled="!isNativeButton && disabled ? 'true' : undefined"
    :data-variant="variant"
    :data-size="size"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>

<style>
.th-button {
  display: inline-flex;
  flex-shrink: 0;
  gap: var(--thilia-space-8);
  align-items: center;
  justify-content: center;
  padding: 0 var(--thilia-space-16);
  font: var(--thilia-type-mono);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  color: var(--thilia-text);
  background: transparent;
  border: var(--thilia-stroke) solid transparent;
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition:
    background-color var(--thilia-duration-fast),
    border-color var(--thilia-duration-fast),
    color var(--thilia-duration-fast);
}

.th-button:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-button[data-size='32'] {
  height: var(--thilia-control-32);
  padding: 0 var(--thilia-space-12);
}

.th-button[data-size='40'] {
  height: var(--thilia-control-40);
}

.th-button[data-size='48'] {
  height: var(--thilia-control-48);
  padding: 0 var(--thilia-space-24);
}

.th-button[data-variant='primary'] {
  color: var(--thilia-on-accent);
  background: var(--thilia-accent);
  border-color: var(--thilia-accent);
}

.th-button[data-variant='primary']:hover {
  background: var(--thilia-accent-hover);
  border-color: var(--thilia-accent-hover);
}

.th-button[data-variant='secondary'] {
  border-color: var(--thilia-border);
}

.th-button[data-variant='secondary']:hover {
  background: var(--thilia-surface-raised);
  border-color: var(--thilia-text);
}

.th-button[data-variant='ghost']:hover {
  background: var(--thilia-surface-raised);
}

.th-button[data-variant='danger'] {
  color: var(--thilia-on-danger);
  background: var(--thilia-danger);
  border-color: var(--thilia-danger);
}

.th-button[data-variant='danger']:hover {
  background: var(--thilia-danger-hover);
  border-color: var(--thilia-danger-hover);
}

/* Désactivé : même aspect pour toutes les variantes. */
.th-button[data-disabled],
.th-button[data-disabled]:hover {
  color: var(--thilia-text-secondary);
  background: var(--thilia-background);
  border-color: var(--thilia-line);
  cursor: not-allowed;
}
</style>
