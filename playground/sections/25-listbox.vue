<script lang="ts">
export const section = {
  title: 'Liste',
  description:
    'ThListbox, basé sur le Listbox de Reka UI. Options toujours visibles, à sélection simple ou multiple. Flèches pour parcourir, Entrée ou Espace pour choisir.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThListbox } from '../../src'

const services = [
  { value: 'gateway', label: 'Passerelle' },
  { value: 'auth', label: 'Authentification' },
  { value: 'queue', label: 'File de tâches' },
  { value: 'mail', label: 'Messagerie', disabled: true },
]
const followed = ref<string[]>(['gateway', 'queue'])
const single = ref('auth')
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThListbox v-model="followed" label="Services suivis" :options="services" multiple />
    <ThListbox v-model="single" label="Service principal" :options="services" />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">followed = {{ followed }} · single = "{{ single }}"</p>
  </div>
</template>
