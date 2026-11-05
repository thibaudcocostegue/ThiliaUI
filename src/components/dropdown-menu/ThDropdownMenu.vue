<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'
import type { ThDropdownMenuProps } from './types'
import '../../shared/menu.css'

const { items, side = 'bottom', align = 'start' } = defineProps<ThDropdownMenuProps>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ select: [value: string] }>()

defineSlots<{
  /** Déclencheur : un bouton, qui reprend le focus à la fermeture et nomme le menu. */
  default?: () => unknown
}>()
</script>

<template>
  <DropdownMenuRoot v-model:open="open">
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="th-menu" :side="side" :align="align" :side-offset="4" :collision-padding="8">
        <template v-for="(entry, index) in items" :key="index">
          <DropdownMenuSeparator v-if="entry.type === 'separator'" class="th-menu__separator" />
          <DropdownMenuLabel v-else-if="entry.type === 'label'" class="th-menu__label">{{ entry.label }}</DropdownMenuLabel>
          <DropdownMenuItem
            v-else
            class="th-menu__item"
            :data-variant="entry.variant"
            :disabled="entry.disabled"
            @select="emit('select', entry.value)"
          >
            {{ entry.label }}
            <span v-if="entry.shortcut" class="th-menu__shortcut">{{ entry.shortcut }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
