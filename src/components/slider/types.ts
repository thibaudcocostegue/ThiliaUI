import type { SliderRootProps } from 'reka-ui'

export interface ThSliderProps extends Omit<SliderRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue'> {
  /** Libellé affiché au-dessus de la piste, qui nomme aussi chaque poignée. */
  label: string
  /** Unité affichée après la valeur, par exemple « % ». */
  unit?: string
}
