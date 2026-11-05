<script lang="ts">
export const section = {
  title: 'Barre d’outils',
  description:
    'ThToolbar, basée sur la Toolbar de Reka UI. Une seule étape de Tab : les flèches parcourent les boutons. Chaque bouton icône porte un nom accessible.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThToolbar, ThToolbarButton, ThToolbarSeparator, ThToolbarToggle } from '../../src'

const bold = ref(true)
const italic = ref(false)
</script>

<template>
  <div class="docs-demo">
    <ThToolbar label="Mise en forme">
      <ThToolbarToggle v-model="bold" label="Gras">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2h5a3 3 0 010 6H4zM4 8h6a3 3 0 010 6H4z" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
      </ThToolbarToggle>
      <ThToolbarToggle v-model="italic" label="Italique">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10 2H6M10 14H6M10 2L6 14" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
      </ThToolbarToggle>
      <ThToolbarSeparator />
      <ThToolbarButton label="Aligner à gauche">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M1 3h14M1 8h9M1 13h11" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
      </ThToolbarButton>
      <ThToolbarButton label="Centrer">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M1 3h14M4 8h8M2 13h12" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
      </ThToolbarButton>
      <ThToolbarButton label="Verrouillé" disabled>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 7h8v7H4zM6 7V5a2 2 0 014 0v2" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
      </ThToolbarButton>
    </ThToolbar>
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">bold = {{ bold }} · italic = {{ italic }}</p>
  </div>
</template>
