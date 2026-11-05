<script setup lang="ts">
import { computed } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import type { ThSliderProps } from './types'

const { label, unit, ...rest } = defineProps<ThSliderProps>()
// Un tableau : une valeur pour un curseur simple, deux pour une plage.
const model = defineModel<number[]>({ default: () => [0] })

const text = computed(() => `${model.value.join(' – ')}${unit ? ` ${unit}` : ''}`)
</script>

<template>
  <SliderRoot v-bind="rest" v-model="model" class="th-slider">
    <div class="th-slider__header">
      <span class="th-slider__label">{{ label }}</span>
      <span class="th-slider__value">{{ text }}</span>
    </div>
    <div class="th-slider__control">
      <SliderTrack class="th-slider__track">
        <SliderRange class="th-slider__range" />
      </SliderTrack>
      <SliderThumb v-for="(_, index) in model" :key="index" class="th-slider__thumb" :aria-label="label" />
    </div>
  </SliderRoot>
</template>

<style>
.th-slider {
  display: grid;
  gap: var(--thilia-space-8);
  min-width: 0;
}

.th-slider__header {
  display: flex;
  justify-content: space-between;
}

.th-slider__label,
.th-slider__value {
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-transform: uppercase;
  color: var(--thilia-text-secondary);
}

.th-slider__control {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--thilia-space-24);
  touch-action: none;
}

/* Graduations de la jauge : 2 px de trait, 4 px d'écart. */
.th-slider__track {
  position: relative;
  flex: 1;
  height: var(--thilia-space-8);
  background: repeating-linear-gradient(
    to right,
    var(--thilia-line) 0 var(--thilia-focus-width),
    transparent var(--thilia-focus-width) calc(var(--thilia-focus-width) + var(--thilia-space-4))
  );
}

.th-slider__range {
  position: absolute;
  height: 100%;
  background: repeating-linear-gradient(
    to right,
    var(--thilia-accent) 0 var(--thilia-focus-width),
    transparent var(--thilia-focus-width) calc(var(--thilia-focus-width) + var(--thilia-space-4))
  );
}

.th-slider__thumb {
  display: block;
  box-sizing: border-box;
  width: var(--thilia-space-12);
  height: 20px;
  padding: 0;
  background: var(--thilia-accent);
  border: var(--thilia-stroke) solid var(--thilia-background);
  border-radius: var(--thilia-radius);
  cursor: grab;
}

.th-slider__thumb:active {
  cursor: grabbing;
}

.th-slider__thumb:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-slider[data-disabled] .th-slider__thumb {
  background: var(--thilia-text-secondary);
  cursor: not-allowed;
}

.th-slider[data-disabled] .th-slider__range {
  background: repeating-linear-gradient(
    to right,
    var(--thilia-text-secondary) 0 var(--thilia-focus-width),
    transparent var(--thilia-focus-width) calc(var(--thilia-focus-width) + var(--thilia-space-4))
  );
}
</style>
