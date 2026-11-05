<script lang="ts">
export const section = {
  title: 'Groupe de cases',
  description:
    'ThCheckboxGroup, basé sur le CheckboxGroup de Reka UI. Plusieurs cases liées par un intitulé ; le modèle est la liste des valeurs cochées.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThCheckboxGroup } from '../../src'

const channels = [
  { value: 'email', label: 'E-mail' },
  { value: 'app', label: 'Application' },
  { value: 'sms', label: 'SMS', disabled: true },
]
const selected = ref(['email', 'app'])
</script>

<template>
  <div class="docs-demo">
    <ThCheckboxGroup v-model="selected" label="Canaux d’alerte" :options="channels" />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">selected = {{ selected }}</p>
  </div>
</template>
