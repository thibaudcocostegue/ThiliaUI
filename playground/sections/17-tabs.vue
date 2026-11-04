<script lang="ts">
export const section = {
  title: 'Onglets',
  description:
    'ThTabs, basé sur les Tabs de Reka UI. Étiquettes mono, soulignement accent de l’onglet actif. Tab entre dans la liste, les flèches changent d’onglet, Tab encore va au contenu.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThTabs } from '../../src'

const tabs = [
  { value: 'general', label: 'Général' },
  { value: 'access', label: 'Accès' },
  { value: 'logs', label: 'Journaux' },
  { value: 'billing', label: 'Facturation', disabled: true },
]
const current = ref('general')
</script>

<template>
  <div class="docs-demo">
    <ThTabs v-model="current" :tabs="tabs" label="Paramètres du service">
      <template #general><p class="docs-tabs-text">Nom, région et description du service.</p></template>
      <template #access><p class="docs-tabs-text">Clés d’API et membres autorisés.</p></template>
      <template #logs><p class="docs-tabs-text">Derniers événements du service.</p></template>
      <template #billing><p class="docs-tabs-text">Bientôt disponible.</p></template>
    </ThTabs>
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">current = "{{ current }}"</p>
  </div>
</template>
