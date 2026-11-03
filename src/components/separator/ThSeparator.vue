<script setup lang="ts">
import { Separator } from 'reka-ui'
import type { ThSeparatorProps } from './types'

const { orientation = 'horizontal', decorative = false, as, asChild } = defineProps<ThSeparatorProps>()
</script>

<template>
  <Separator
    class="th-separator"
    :orientation="orientation"
    :decorative="decorative"
    :as="as"
    :as-child="asChild"
  />
</template>

<style>
.th-separator {
  flex-shrink: 0;
  background-color: var(--thilia-border);
}

.th-separator[data-orientation='horizontal'] {
  width: 100%;
  height: 1px;
}

.th-separator[data-orientation='vertical'] {
  width: 1px;
  height: 100%;
}
</style>
