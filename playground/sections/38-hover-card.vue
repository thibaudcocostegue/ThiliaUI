<script lang="ts">
export const section = {
  title: 'Aperçu au survol',
  description:
    'ThHoverCard, basé sur le HoverCard de Reka UI. Un aperçu de lecture au survol d’un lien ; il s’ouvre aussi au focus clavier. Aucune action indispensable à l’intérieur.',
}
</script>

<script setup lang="ts">
import { ThHoverCard } from '../../src'
</script>

<template>
  <div class="docs-demo">
    <ThHoverCard>
      <a class="docs-link" href="#atelier">Atelier Nord</a>
      <template #content>
        <p class="docs-label">Client</p>
        <p>Atelier Nord · client depuis 2024, trois conversations ouvertes.</p>
      </template>
    </ThHoverCard>
  </div>
</template>
