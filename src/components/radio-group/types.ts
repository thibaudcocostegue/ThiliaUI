export interface ThRadioGroupProps {
  /** Nom accessible du groupe, quand aucun titre visible ne le décrit (sinon aria-labelledby). */
  label?: string
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
  required?: boolean
  /** Nom du champ, pour l'envoi dans un formulaire. */
  name?: string
}

export interface ThRadioProps {
  value: string
  /** Libellé à droite de l'indicateur. Le slot par défaut le remplace. */
  label?: string
  disabled?: boolean
  /** Identifiant du bouton. Généré s'il est absent. */
  id?: string
}
