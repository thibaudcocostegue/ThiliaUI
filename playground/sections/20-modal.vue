<script lang="ts">
export const section = {
  title: 'Modale',
  description:
    'ThModal, basé sur le Dialog de Reka UI. Fond assombri, surface haute, contour net, sans ombre. Le focus reste dans la modale et revient au déclencheur à la fermeture ; Échap ou un clic sur le fond la ferment.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThButton, ThInput, ThModal, toast } from '../../src'

const name = ref('passerelle-eu')
const confirmOpen = ref(false)
</script>

<template>
  <div class="docs-demo">
    <div class="docs-controls">
      <ThModal title="Renommer le service" description="Le nouveau nom apparaît dans le tableau de bord.">
        <template #trigger>
          <ThButton>Ouvrir la modale</ThButton>
        </template>
        <ThInput v-model="name" label="Nom du service" />
        <template #footer="{ close }">
          <ThButton variant="ghost" @click="close">Annuler</ThButton>
          <ThButton @click="close(), toast.success('Service renommé')">Enregistrer</ThButton>
        </template>
      </ThModal>

      <ThButton variant="danger" @click="confirmOpen = true">Supprimer · v-model:open</ThButton>
      <ThModal v-model:open="confirmOpen" title="Supprimer le service ?" description="Cette action est définitive.">
        <template #footer="{ close }">
          <ThButton variant="secondary" @click="close">Annuler</ThButton>
          <ThButton variant="danger" @click="close(), toast.danger('Service supprimé')">Supprimer</ThButton>
        </template>
      </ThModal>
    </div>
  </div>
</template>
