import type { PinInputRootProps } from 'reka-ui'

export interface ThPinInputProps extends Omit<PinInputRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue'> {
  /** Intitulé du code, qui nomme le groupe de cases. */
  label: string
  /** Nombre de cases. */
  length?: number
  /** Texte d'aide sous les cases. */
  help?: string
  /** Début du nom accessible de chaque case : « Chiffre » donne « Chiffre 1 sur 6 ». */
  itemLabel?: string
}
