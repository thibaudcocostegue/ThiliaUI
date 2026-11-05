<script setup lang="ts">
import { computed, useId } from 'vue'
import { ThLabel } from '../label'
import type { ThFieldProps } from './types'
import '../../shared/field.css'

const { label, help, error, required = false, id } = defineProps<ThFieldProps>()

defineSlots<{
  /** Le contrôle : il reçoit son `id`, son `aria-describedby` et son état d'erreur. */
  default?: (props: { id: string; describedby: string | undefined; invalid: boolean }) => unknown
}>()

const generatedId = useId()
const controlId = computed(() => id ?? generatedId)
const messageId = computed(() => `${controlId.value}-message`)
const message = computed(() => error || help)
</script>

<template>
  <div class="th-field" :data-invalid="error ? '' : undefined">
    <ThLabel :for="controlId" :required="required">{{ label }}</ThLabel>
    <slot :id="controlId" :describedby="message ? messageId : undefined" :invalid="!!error" />
    <p v-if="message" :id="messageId" class="th-field__help" :role="error ? 'alert' : undefined">{{ message }}</p>
  </div>
</template>
