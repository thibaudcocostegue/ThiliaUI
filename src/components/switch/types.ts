export interface ThSwitchProps {
  /** Libellé à gauche de l'interrupteur. Le slot par défaut le remplace. */
  label?: string
  disabled?: boolean
  required?: boolean
  /** Nom du champ, pour l'envoi dans un formulaire. */
  name?: string
  /** Valeur envoyée dans un formulaire quand l'interrupteur est actif. */
  value?: string
  /** Identifiant de l'interrupteur. Généré s'il est absent. */
  id?: string
}
