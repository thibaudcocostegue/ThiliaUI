<script lang="ts">
export const section = {
  title: 'Volet',
  description:
    'ThDrawer, volet latéral de 360 px bâti sur le Dialog de Reka UI : le focus reste dans le volet et revient au déclencheur à la fermeture. Il glisse en 200 ms ; Échap ou un clic sur le fond le ferment.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThButton, ThDrawer, ThInput, toast } from '../../src'

const name = ref('Passerelle')
</script>

<template>
  <div class="docs-demo">
    <div class="docs-controls">
      <ThDrawer title="Passerelle" description="Modifiez les réglages du service.">
        <template #trigger>
          <ThButton variant="secondary">Ouvrir à droite</ThButton>
        </template>
        <ThInput v-model="name" label="Nom" />
        <template #footer="{ close }">
          <ThButton variant="secondary" @click="close">Annuler</ThButton>
          <ThButton @click="close(), toast.success('Service enregistré')">Enregistrer</ThButton>
        </template>
      </ThDrawer>
      <ThDrawer title="Filtres" side="left">
        <template #trigger>
          <ThButton variant="secondary">Ouvrir à gauche</ThButton>
        </template>
        <p>Contenu du volet.</p>
      </ThDrawer>
    </div>
  </div>
</template>
