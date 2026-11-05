<script setup lang="ts">
import { ToolbarRoot } from 'reka-ui'
import type { ThToolbarProps } from './types'

const { label, orientation = 'horizontal' } = defineProps<ThToolbarProps>()
</script>

<template>
  <ToolbarRoot class="th-toolbar" :orientation="orientation" :aria-label="label">
    <slot />
  </ToolbarRoot>
</template>

<style>
.th-toolbar {
  display: inline-flex;
  gap: var(--thilia-space-4);
  align-items: center;
  padding: var(--thilia-space-4);
  background: var(--thilia-surface);
  border: var(--thilia-stroke) solid var(--thilia-line);
  border-radius: var(--thilia-radius);
}

.th-toolbar[data-orientation='vertical'] {
  flex-direction: column;
}

.th-toolbar__button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: var(--thilia-control-32);
  height: var(--thilia-control-32);
  padding: 0;
  color: var(--thilia-text);
  cursor: pointer;
  background: transparent;
  border: var(--thilia-stroke) solid transparent;
  border-radius: var(--thilia-radius);
  transition: background-color var(--thilia-duration-fast);
}

.th-toolbar__button:hover {
  background: var(--thilia-surface-raised);
}

.th-toolbar__button[data-state='on'] {
  background: var(--thilia-line);
  border-color: var(--thilia-text);
}

.th-toolbar__button:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-toolbar__button[data-disabled] {
  color: var(--thilia-text-secondary);
  cursor: not-allowed;
}

.th-toolbar__separator {
  align-self: stretch;
  width: var(--thilia-stroke);
  margin: var(--thilia-space-4);
  background: var(--thilia-line);
}

.th-toolbar[data-orientation='vertical'] .th-toolbar__separator {
  width: auto;
  height: var(--thilia-stroke);
}
</style>
