<script lang="ts">
export const section = {
  title: 'Menu déroulant',
  description:
    'ThDropdownMenu, basé sur le DropdownMenu de Reka UI. Actions regroupées par des filets, raccourcis en mono, action destructrice en dernier. Flèches, Entrée et Échap au clavier.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThButton, ThDropdownMenu, type ThMenuEntry } from '../../src'

const items: ThMenuEntry[] = [
  { type: 'label', label: 'Service' },
  { value: 'edit', label: 'Modifier', shortcut: '⌘E' },
  { value: 'duplicate', label: 'Dupliquer', shortcut: '⌘D' },
  { value: 'archive', label: 'Archiver', disabled: true },
  { type: 'separator' },
  { value: 'delete', label: 'Supprimer', variant: 'danger' },
]
const last = ref('')
</script>

<template>
  <div class="docs-demo">
    <ThDropdownMenu :items="items" @select="last = $event">
      <ThButton variant="secondary">Actions</ThButton>
    </ThDropdownMenu>
  </div>
  <div class="docs-demo">
    <p class="docs-label">select</p>
    <p class="docs-mono">last = "{{ last }}"</p>
  </div>
</template>
