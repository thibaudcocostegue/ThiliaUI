<script lang="ts">
export const section = {
  title: 'Code',
  description:
    'ThPinInput, basé sur le PinInput de Reka UI. Une case par chiffre en mono, avance automatique, collage du code complet, retour arrière vers la case précédente.',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ThPinInput } from '../../src'

const code = ref<string[]>([])
const done = ref('')
</script>

<template>
  <div class="docs-demo">
    <ThPinInput v-model="code" label="Code de vérification" help="Six chiffres envoyés par e-mail." @complete="done = $event.join('')" />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">code = {{ code }} · complete = "{{ done }}"</p>
  </div>
</template>
