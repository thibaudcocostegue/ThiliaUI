<script lang="ts">
export const section = {
  title: 'Infobulle',
  description:
    'ThTooltip, basé sur le Tooltip de Reka UI. Fond inversé par rapport au thème. S’affiche au survol et au focus clavier, se ferme avec Échap.',
}
</script>

<script setup lang="ts">
import { ThButton, ThTooltip } from '../../src'
</script>

<template>
  <div class="docs-demo">
    <p class="docs-label">Survoler ou Tab</p>
    <div class="docs-controls">
      <ThTooltip content="Copier l’identifiant">
        <ThButton variant="secondary">Copier</ThButton>
      </ThTooltip>
      <ThTooltip content="Ouvre les journaux du service" side="bottom">
        <ThButton variant="ghost">En dessous</ThButton>
      </ThTooltip>
      <ThTooltip side="right">
        <ThButton variant="ghost">Slot content</ThButton>
        <template #content>Raccourci <kbd>⌘ K</kbd></template>
      </ThTooltip>
    </div>
  </div>
</template>
