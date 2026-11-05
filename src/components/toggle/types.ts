import type { ToggleProps } from 'reka-ui'

export interface ThToggleProps extends Omit<ToggleProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue'> {
  size?: '32' | '40' | '48'
}
