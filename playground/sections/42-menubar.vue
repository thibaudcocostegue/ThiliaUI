<script lang="ts">
export const section = {
  title: 'Barre de menus',
  description:
    'ThMenubar, basé sur le Menubar de Reka UI. Pour les applications desktop denses : flèches gauche et droite passent d’un menu à l’autre, flèches haut et bas parcourent les actions.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThMenubar, type ThMenubarMenu } from '../../src'

const menus: ThMenubarMenu[] = [
  {
    value: 'file',
    label: 'Fichier',
    items: [
      { value: 'new', label: 'Nouveau', shortcut: '⌘N' },
      { value: 'open', label: 'Ouvrir', shortcut: '⌘O' },
      { value: 'save', label: 'Enregistrer', shortcut: '⌘S' },
    ],
  },
  {
    value: 'edit',
    label: 'Édition',
    items: [
      { value: 'undo', label: 'Annuler', shortcut: '⌘Z' },
      { value: 'redo', label: 'Rétablir', shortcut: '⇧⌘Z' },
    ],
  },
  { value: 'view', label: 'Affichage', items: [{ value: 'zoom', label: 'Zoom avant', shortcut: '⌘+' }] },
]
const last = ref('')
</script>

<template>
  <div class="docs-demo">
    <ThMenubar :menus="menus" label="Menu principal" @select="(menu, value) => (last = `${menu}/${value}`)" />
  </div>
  <div class="docs-demo">
    <p class="docs-label">select</p>
    <p class="docs-mono">last = "{{ last }}"</p>
  </div>
</template>
