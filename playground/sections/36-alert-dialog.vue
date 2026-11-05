<script lang="ts">
export const section = {
  title: 'Confirmation',
  description:
    'ThAlertDialog, basé sur l’AlertDialog de Reka UI. Décision bloquante : le focus démarre sur « Annuler », un clic à l’extérieur ne ferme pas la fenêtre, Échap l’annule.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThAlertDialog, ThButton, toast } from '../../src'

const open = ref(false)
</script>

<template>
  <div class="docs-demo">
    <div class="docs-controls">
      <ThAlertDialog
        title="Purger les journaux ?"
        description="Les journaux de ce service seront définitivement supprimés."
        kind="Action irréversible"
        action-label="Purger"
        @action="toast.danger('Journaux purgés')"
      >
        <template #trigger>
          <ThButton variant="danger">Purger</ThButton>
        </template>
      </ThAlertDialog>
      <ThButton variant="secondary" @click="open = true">Archiver · v-model:open</ThButton>
      <ThAlertDialog
        v-model:open="open"
        title="Archiver le service ?"
        description="Il ne recevra plus de trafic."
        action-label="Archiver"
        variant="primary"
      />
    </div>
  </div>
</template>
