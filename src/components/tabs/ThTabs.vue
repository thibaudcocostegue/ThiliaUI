<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import type { ThTabsProps } from './types'

const { tabs, label, activationMode = 'automatic' } = defineProps<ThTabsProps>()
const model = defineModel<string>()

defineSlots<Record<string, () => unknown>>()
</script>

<template>
  <!-- Sans v-model, le premier onglet est actif. -->
  <TabsRoot v-model="model" :default-value="tabs[0]?.value" class="th-tabs" :activation-mode="activationMode">
    <TabsList class="th-tabs__list" :aria-label="label">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        class="th-tabs__tab"
        :value="tab.value"
        :disabled="tab.disabled"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in tabs" :key="tab.value" class="th-tabs__panel" :value="tab.value">
      <slot :name="tab.value" />
    </TabsContent>
  </TabsRoot>
</template>

<style>
.th-tabs__list {
  display: flex;
  border-bottom: var(--thilia-stroke) solid var(--thilia-line);
}

.th-tabs__tab {
  position: relative;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-16);
  margin: 0;
  font: var(--thilia-type-mono);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text-secondary);
  background: transparent;
  border: 0;
  border-radius: var(--thilia-radius);
  cursor: pointer;
  transition: color var(--thilia-duration-fast);
}

/* Soulignement de 2 px posé sur le filet de la liste. */
.th-tabs__tab::after {
  position: absolute;
  right: 0;
  bottom: calc(-1 * var(--thilia-stroke));
  left: 0;
  height: var(--thilia-focus-width);
  content: '';
  background: transparent;
  transition: background-color var(--thilia-duration-fast);
}

.th-tabs__tab:hover {
  color: var(--thilia-text);
}

.th-tabs__tab[data-state='active'] {
  color: var(--thilia-text);
}

.th-tabs__tab[data-state='active']::after {
  background: var(--thilia-accent);
}

.th-tabs__tab:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}

.th-tabs__tab[data-disabled] {
  color: var(--thilia-border);
  cursor: not-allowed;
}

.th-tabs__panel {
  padding-top: var(--thilia-space-24);
}

.th-tabs__panel:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}
</style>
