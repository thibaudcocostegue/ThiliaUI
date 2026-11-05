<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from 'reka-ui'
import type { ThContextMenuProps } from './types'
import '../../shared/menu.css'

const { items, disabled = false } = defineProps<ThContextMenuProps>()
const emit = defineEmits<{ select: [value: string] }>()

defineSlots<{
  /** La zone qui ouvre le menu au clic droit. */
  default?: () => unknown
}>()
</script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger class="th-context-menu" :disabled="disabled">
      <slot />
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent class="th-menu" :collision-padding="8">
        <template v-for="(entry, index) in items" :key="index">
          <ContextMenuSeparator v-if="entry.type === 'separator'" class="th-menu__separator" />
          <ContextMenuLabel v-else-if="entry.type === 'label'" class="th-menu__label">{{ entry.label }}</ContextMenuLabel>
          <ContextMenuItem
            v-else
            class="th-menu__item"
            :data-variant="entry.variant"
            :disabled="entry.disabled"
            @select="emit('select', entry.value)"
          >
            {{ entry.label }}
            <span v-if="entry.shortcut" class="th-menu__shortcut">{{ entry.shortcut }}</span>
          </ContextMenuItem>
        </template>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<style>
.th-context-menu {
  display: block;
}
</style>
