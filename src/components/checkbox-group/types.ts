import type { CheckboxGroupRootProps } from 'reka-ui'

export interface ThCheckboxGroupOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ThCheckboxGroupProps extends Omit<CheckboxGroupRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue'> {
  /** Intitulé du groupe, qui le nomme pour les lecteurs d'écran. */
  label: string
  options: ThCheckboxGroupOption[]
}
