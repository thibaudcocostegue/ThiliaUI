<script setup lang="ts">
// Composant de test : ajouté au paquet seulement par test:consumer.
defineProps<{ label: string }>()
</script>

<template>
  <span class="th-fixture">{{ label }}<slot /></span>
</template>

<style scoped>
.th-fixture {
  display: inline-block;
}
</style>
