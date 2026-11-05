import type { RatingRootProps } from 'reka-ui'

export interface ThRatingProps extends Omit<RatingRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue'> {
  /** Nom de l'échelle, lu par les lecteurs d'écran. */
  label: string
  /** Affiche la valeur en texte à droite de l'échelle, comme « 4 / 5 ». */
  showValue?: boolean
}
