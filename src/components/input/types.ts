export interface ThInputProps {
  /** Libellé affiché au-dessus du champ et relié à lui. */
  label: string
  /** Texte d'aide sous le champ. Remplacé par le message d'erreur s'il y en a un. */
  help?: string
  /** Message d'erreur : passe le champ en erreur et l'annonce aux lecteurs d'écran. */
  error?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  size?: '32' | '40' | '48'
  disabled?: boolean
  /** Identifiant du champ. Généré s'il est absent. */
  id?: string
}
