import type { ThMenuEntry } from '../dropdown-menu'

export interface ThMenubarMenu {
  value: string
  label: string
  items: ThMenuEntry[]
}

export interface ThMenubarProps {
  menus: ThMenubarMenu[]
  /** Nom accessible de la barre de menus. */
  label?: string
}
