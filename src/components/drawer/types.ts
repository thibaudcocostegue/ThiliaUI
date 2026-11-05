export interface ThDrawerProps {
  /** Titre du volet, qui lui sert aussi de nom accessible. */
  title: string
  /** Texte sous le titre, relié au volet par aria-describedby. */
  description?: string
  /** Côté d'ouverture. */
  side?: 'right' | 'left'
  /** Nom accessible du bouton de fermeture. */
  closeLabel?: string
}
