export interface ThTab {
  value: string
  label: string
  disabled?: boolean
}

export interface ThTabsProps {
  /** Onglets, dans l'ordre. Le contenu de chacun passe par le slot qui porte sa valeur. */
  tabs: ThTab[]
  /** Nom accessible de la liste d'onglets. */
  label?: string
  /** `automatic` : les flèches activent l'onglet ; `manual` : Entrée ou Espace l'activent. */
  activationMode?: 'automatic' | 'manual'
}
