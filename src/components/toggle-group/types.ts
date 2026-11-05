import type { ToggleGroupRootProps } from 'reka-ui'

export interface ThToggleGroupOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ThToggleGroupProps extends Omit<ToggleGroupRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'type'> {
  /** Nom du groupe, lu par les lecteurs d'écran. */
  label: string
  options: ThToggleGroupOption[]
  /** `single` : un seul segment actif ; `multiple` : plusieurs. */
  type?: 'single' | 'multiple'
  size?: '32' | '40' | '48'
}
