<script setup lang="ts">
import {
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRoot,
  MenubarSeparator,
  MenubarTrigger,
} from 'reka-ui'
import type { ThMenubarProps } from './types'
import '../../shared/menu.css'

const { menus, label } = defineProps<ThMenubarProps>()
// Le menu ouvert, ou une chaîne vide quand tous sont fermés.
const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ select: [menu: string, value: string] }>()
</script>

<template>
  <MenubarRoot v-model="model" class="th-menubar" :aria-label="label">
    <MenubarMenu v-for="menu in menus" :key="menu.value" :value="menu.value">
      <MenubarTrigger class="th-menubar__trigger">{{ menu.label }}</MenubarTrigger>
      <MenubarPortal>
        <MenubarContent class="th-menu" :side-offset="4" :align="'start'" :collision-padding="8">
          <template v-for="(entry, index) in menu.items" :key="index">
            <MenubarSeparator v-if="entry.type === 'separator'" class="th-menu__separator" />
            <MenubarLabel v-else-if="entry.type === 'label'" class="th-menu__label">{{ entry.label }}</MenubarLabel>
            <MenubarItem
              v-else
              class="th-menu__item"
              :data-variant="entry.variant"
              :disabled="entry.disabled"
              @select="emit('select', menu.value, entry.value)"
            >
              {{ entry.label }}
              <span v-if="entry.shortcut" class="th-menu__shortcut">{{ entry.shortcut }}</span>
            </MenubarItem>
          </template>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>
  </MenubarRoot>
</template>

<style>
.th-menubar {
  display: flex;
  gap: var(--thilia-space-4);
  padding: var(--thilia-space-4);
  background: var(--thilia-surface);
  border: var(--thilia-stroke) solid var(--thilia-line);
  border-radius: var(--thilia-radius);
}

.th-menubar__trigger {
  height: var(--thilia-control-32);
  padding: 0 var(--thilia-space-12);
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: var(--thilia-radius);
}

.th-menubar__trigger:hover,
.th-menubar__trigger[data-state='open'] {
  background: var(--thilia-line);
}

.th-menubar__trigger:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}
</style>
