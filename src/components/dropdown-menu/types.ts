/** Une ligne d'un menu : action, intitulé de groupe ou filet de séparation. */
export type ThMenuEntry =
  | {
      type?: 'item'
      /** Valeur émise par `select` quand l'action est choisie. */
      value: string
      label: string
      /** Raccourci affiché à droite, par exemple « ⌘E ». Il ne déclenche rien. */
      shortcut?: string
      disabled?: boolean
      /** `danger` pour une action destructrice, à placer en dernier. */
      variant?: 'danger'
    }
  | { type: 'label'; label: string }
  | { type: 'separator' }

export interface ThDropdownMenuProps {
  items: ThMenuEntry[]
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}
