<script lang="ts">
export const section = {
  title: 'Champ',
  description:
    'ThField assemble un libellé, un contrôle et un message d’aide ou d’erreur. Le contrôle reçoit son id et son aria-describedby par le slot ; l’erreur est annoncée aux lecteurs d’écran.',
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ThButton, ThField } from '../../src'

const slug = ref('passerelle!')
const error = computed(() => (/^[a-z0-9-]*$/.test(slug.value) ? '' : 'Minuscules, chiffres et tirets uniquement'))
</script>

<template>
  <form class="docs-demo docs-fields" @submit.prevent>
    <ThField v-slot="{ id, describedby, invalid }" label="Identifiant" required help="Visible dans l’adresse du service." :error="error">
      <input :id="id" v-model="slug" class="docs-native" :aria-describedby="describedby" :aria-invalid="invalid || undefined" />
    </ThField>
    <div class="docs-controls">
      <ThButton variant="secondary" type="button">Annuler</ThButton>
      <ThButton type="submit">Enregistrer</ThButton>
    </div>
  </form>
</template>
