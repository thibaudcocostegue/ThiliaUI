<script setup lang="ts">
import { ref } from 'vue'
import {
  ThButton,
  ThCheckbox,
  ThFixture,
  ThGauge,
  ThInput,
  ThModal,
  ThRadio,
  ThRadioGroup,
  ThSelect,
  ThSeparator,
  ThSwitch,
  ThTabs,
  ThToaster,
  ThTooltip,
  toast,
} from 'thiliaui'

const name = ref('')
const region = ref('eu')
const checked = ref(false)
const frequency = ref('daily')
const enabled = ref(true)
const tab = ref('general')
const open = ref(false)
</script>

<template>
  <ThFixture label="Bonjour">!</ThFixture>
  <ThSeparator orientation="vertical" />
  <ThButton variant="danger" size="32" @click="toast.success('Enregistré')">Action</ThButton>
  <ThInput v-model="name" label="Nom" error="Requis" />
  <ThSelect v-model="region" label="Région" :options="[{ value: 'eu', label: 'Europe' }]" />
  <ThCheckbox v-model="checked" label="Alertes" />
  <ThRadioGroup v-model="frequency" label="Fréquence">
    <ThRadio value="daily" label="Quotidienne" />
  </ThRadioGroup>
  <ThSwitch v-model="enabled" label="Actif" />
  <ThTabs v-model="tab" :tabs="[{ value: 'general', label: 'Général' }]">
    <template #general>Contenu</template>
  </ThTabs>
  <ThTooltip content="Aide"><button type="button">?</button></ThTooltip>
  <ThModal v-model:open="open" title="Titre">Corps</ThModal>
  <ThGauge :value="60" label="Charge" />
  <ThToaster />
</template>
