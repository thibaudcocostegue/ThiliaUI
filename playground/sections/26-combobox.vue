<script lang="ts">
export const section = {
  title: 'Combobox',
  description:
    'ThCombobox, basé sur le Combobox de Reka UI. Liste filtrable à la saisie : la valeur doit être une option existante. Un message s’affiche quand rien ne correspond.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThCombobox } from '../../src'

const services = [
  { value: 'gateway', label: 'Passerelle' },
  { value: 'fallback', label: 'Passerelle de secours' },
  { value: 'auth', label: 'Authentification' },
  { value: 'queue', label: 'File de tâches' },
  { value: 'mail', label: 'Messagerie', disabled: true },
]
const service = ref('gateway')
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThCombobox v-model="service" label="Service" placeholder="Choisir un service" :options="services" help="Tapez pour filtrer." />
    <ThCombobox model-value="auth" label="Désactivé" :options="services" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">service = "{{ service }}"</p>
  </div>
</template>
