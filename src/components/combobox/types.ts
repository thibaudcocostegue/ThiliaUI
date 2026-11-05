export interface ThComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ThComboboxProps {
  /** Libellé affiché au-dessus du champ et relié à lui. */
  label: string
  options: ThComboboxOption[]
  placeholder?: string
  /** Texte d'aide sous le champ. */
  help?: string
  /** Message affiché quand aucune option ne correspond à la saisie. */
  emptyLabel?: string
  size?: '32' | '40' | '48'
  disabled?: boolean
  required?: boolean
  /** Nom du champ, pour l'envoi dans un formulaire. */
  name?: string
  /** Identifiant du champ. Généré s'il est absent. */
  id?: string
}
