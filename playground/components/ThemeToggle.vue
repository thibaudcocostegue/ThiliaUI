<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme, toggle } = useTheme()
const label = computed(() => (theme.value === 'dark' ? 'Mode clair' : 'Mode sombre'))
</script>

<template>
  <button
    type="button"
    class="docs-toggle"
    :aria-pressed="theme === 'light'"
    :aria-label="`Passer en ${label.toLowerCase()}`"
    @click="toggle"
  >
    {{ label }}
  </button>
</template>
