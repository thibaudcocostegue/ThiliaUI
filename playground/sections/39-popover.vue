<script lang="ts">
export const section = {
  title: 'Popover',
  description:
    'ThPopover, basé sur le Popover de Reka UI. Panneau flottant ouvert au clic pour une courte tâche ; Échap ou un clic à l’extérieur le ferment et le focus revient au déclencheur.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThButton, ThInput, ThPopover } from '../../src'

const service = ref('')
</script>

<template>
  <div class="docs-demo">
    <ThPopover>
      <template #trigger>
        <ThButton variant="secondary">Filtrer</ThButton>
      </template>
      <template #default="{ close }">
        <ThInput v-model="service" label="Service" placeholder="Passerelle" />
        <ThButton size="32" @click="close">Appliquer</ThButton>
      </template>
    </ThPopover>
  </div>
</template>
