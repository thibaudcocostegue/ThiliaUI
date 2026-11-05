<script lang="ts">
export const section = {
  title: 'Menu contextuel',
  description:
    'ThContextMenu, basé sur le ContextMenu de Reka UI. Ouvert au clic droit sur sa zone, ou avec la touche Menu du clavier. Ne remplace jamais une action visible ailleurs.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThContextMenu, type ThMenuEntry } from '../../src'

const items: ThMenuEntry[] = [
  { value: 'open', label: 'Ouvrir' },
  { value: 'copy', label: 'Copier l’identifiant' },
  { type: 'separator' },
  { value: 'delete', label: 'Supprimer', variant: 'danger' },
]
const last = ref('')
</script>

<template>
  <div class="docs-demo">
    <ThContextMenu :items="items" @select="last = $event">
      <div class="docs-zone" tabindex="0">Clic droit sur cette ligne · CN-1042</div>
    </ThContextMenu>
  </div>
  <div class="docs-demo">
    <p class="docs-label">select</p>
    <p class="docs-mono">last = "{{ last }}"</p>
  </div>
</template>
