<script setup lang="ts">
import { RatingItem, RatingItemIndicator, RatingRoot } from 'reka-ui'
import type { ThRatingProps } from './types'

const { label, showValue = true, length = 5, ...rest } = defineProps<ThRatingProps>()
const model = defineModel<number>({ default: 0 })
</script>

<template>
  <RatingRoot v-slot="{ items }" v-bind="rest" v-model="model" :length="length" class="th-rating" :aria-label="label">
    <RatingItem v-for="item in items" :key="item" :item="item" class="th-rating__item">
      <template #default="{ steps }">
        <RatingItemIndicator v-for="step in steps" :key="step" :step="step" class="th-rating__square" :aria-label="`${step} sur ${length}`" />
      </template>
    </RatingItem>
    <span v-if="showValue" class="th-rating__value">{{ model }} / {{ length }}</span>
  </RatingRoot>
</template>

<style>
.th-rating {
  display: inline-flex;
  gap: var(--thilia-space-4);
  align-items: center;
}

.th-rating__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--thilia-space-24);
  height: var(--thilia-space-24);
}

/* Le carré est le bouton radio : il porte le focus et l'anneau. */
.th-rating__square {
  box-sizing: border-box;
  width: var(--thilia-space-16);
  height: var(--thilia-space-16);
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
  transition: background-color var(--thilia-duration-fast);
}

.th-rating__square:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: var(--thilia-focus-offset);
}

.th-rating__square[data-state='active'] {
  background: var(--thilia-accent);
  border-color: var(--thilia-accent);
}

.th-rating[data-disabled] .th-rating__square {
  cursor: not-allowed;
}

.th-rating__value {
  margin-left: var(--thilia-space-8);
  font: var(--thilia-type-mono);
  color: var(--thilia-text-secondary);
}
</style>
