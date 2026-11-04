<script lang="ts">
export const section = {
  title: 'Select',
  description:
    'ThSelect, basé sur le Select de Reka UI. Liste sur surface haute, option survolée sur filet, coche accent sur l’option choisie. Flèches, Entrée, Échap et saisie de la première lettre au clavier.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThSelect } from '../../src'

const regions = [
  { value: 'eu-west', label: 'Europe Ouest' },
  { value: 'eu-central', label: 'Europe Centrale' },
  { value: 'us-north', label: 'Amérique du Nord' },
  { value: 'ap-south', label: 'Asie du Sud', disabled: true },
]
const region = ref('eu-west')
const empty = ref<string>()
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThSelect v-model="region" label="Région" :options="regions" help="Asie du Sud : bientôt disponible." />
    <ThSelect v-model="empty" label="Sans valeur" placeholder="Choisir une région" :options="regions" />
    <ThSelect model-value="eu-west" label="Désactivé" :options="regions" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">region = "{{ region }}"</p>
  </div>
</template>
