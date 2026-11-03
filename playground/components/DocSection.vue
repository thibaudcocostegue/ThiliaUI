<script setup lang="ts">
defineProps<{
  id: string
  number: string
  title: string
  description?: string
}>()
</script>

<template>
  <section :id="id" class="docs-section" :aria-labelledby="`${id}-title`">
    <h2 :id="`${id}-title`" class="docs-label">{{ number }} {{ title }}</h2>
    <div class="docs-section__body">
      <p v-if="description" class="docs-section__description">{{ description }}</p>
      <slot />
    </div>
  </section>
</template>
