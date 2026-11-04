export interface ThModalProps {
  /** Titre de la modale, qui lui sert aussi de nom accessible. */
  title: string
  /** Texte sous le titre, relié à la modale par aria-describedby. */
  description?: string
  /** Nom accessible du bouton de fermeture. */
  closeLabel?: string
}
