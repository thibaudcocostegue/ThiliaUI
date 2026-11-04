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
  background-color: var(--thilia-line);
}

.th-separator[data-orientation='horizontal'] {
  width: 100%;
  height: var(--thilia-stroke);
}

.th-separator[data-orientation='vertical'] {
  width: var(--thilia-stroke);
  height: 100%;
}
</style>
