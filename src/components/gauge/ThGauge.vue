<script setup lang="ts">
import { computed, useId } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import type { ThGaugeProps } from './types'

const { value, max = 100, label, showValue = true, valueText } = defineProps<ThGaugeProps>()

const labelId = useId()
const percent = computed(() => (value === null ? null : Math.round((Math.min(Math.max(value, 0), max) / max) * 100)))
</script>

<template>
  <div class="th-gauge">
    <p :id="labelId" class="th-gauge__label">
      {{ label }}<template v-if="showValue && percent !== null"> · {{ percent }} %</template>
    </p>
    <ProgressRoot
      class="th-gauge__track"
      :model-value="value"
      :max="max"
      :aria-labelledby="labelId"
      :get-value-text="valueText ? () => valueText : undefined"
    >
      <ProgressIndicator v-if="percent !== null" class="th-gauge__fill" :style="{ '--th-gauge-percent': `${percent}%` }" />
    </ProgressRoot>
  </div>
</template>

<style>
.th-gauge {
  display: grid;
  gap: var(--thilia-space-8);
}

.th-gauge__label {
  margin: 0;
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text-secondary);
}

/* Graduations de 2 px tous les 6 px (2 px de trait, 4 px d'écart), en filet. */
.th-gauge__track {
  position: relative;
  height: var(--thilia-space-8);
  overflow: hidden;
  background: repeating-linear-gradient(
    to right,
    var(--thilia-line) 0 var(--thilia-focus-width),
    transparent var(--thilia-focus-width) calc(var(--thilia-focus-width) + var(--thilia-space-4))
  );
}

/* Les mêmes graduations en accent, sur la part atteinte, arrondie à une graduation entière. */
.th-gauge__fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--th-gauge-percent);
  width: round(up, var(--th-gauge-percent), calc(var(--thilia-focus-width) + var(--thilia-space-4)));
  max-width: 100%;
  background: repeating-linear-gradient(
    to right,
    var(--thilia-accent) 0 var(--thilia-focus-width),
    transparent var(--thilia-focus-width) calc(var(--thilia-focus-width) + var(--thilia-space-4))
  );
  transition: width var(--thilia-duration-panel);
}
</style>
