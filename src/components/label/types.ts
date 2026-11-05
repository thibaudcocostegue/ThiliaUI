import type { LabelProps } from 'reka-ui'

export interface ThLabelProps extends LabelProps {
  /** Ajoute le mot « Requis » : un astérisque seul ne suffit pas. */
  required?: boolean
  /** Texte de la mention de champ requis. */
  requiredLabel?: string
}
