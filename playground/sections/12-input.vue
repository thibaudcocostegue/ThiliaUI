<script lang="ts">
export const section = {
  title: 'Champ de saisie',
  description:
    'ThInput : libellé relié au champ, texte d’aide et message d’erreur. L’erreur est écrite en toutes lettres, reliée au champ par aria-describedby et annoncée aux lecteurs d’écran.',
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ThInput } from '../../src'

const name = ref('')
const gateway = ref('Passerelle')
const invalid = ref('passerelle!')
const invalidError = computed(() => (/^[\p{L}\d]*$/u.test(invalid.value) ? undefined : 'Lettres et chiffres uniquement'))
</script>

<template>
  <div class="docs-demo docs-fields">
    <ThInput v-model="name" label="Défaut" placeholder="Nom du service" help="Visible dans le tableau de bord." />
    <ThInput v-model="gateway" label="Focus · Tab pour l’afficher" />
    <ThInput v-model="invalid" label="Erreur" :error="invalidError" />
    <ThInput model-value="Verrouillé" label="Désactivé" disabled />
  </div>
  <div class="docs-demo">
    <p class="docs-label">v-model</p>
    <p class="docs-mono">name = "{{ name }}"</p>
  </div>
</template>
