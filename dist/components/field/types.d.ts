export interface ThFieldProps {
    /** Libellé affiché au-dessus du contrôle et relié à lui. */
    label: string;
    /** Texte d'aide sous le contrôle. Remplacé par le message d'erreur s'il y en a un. */
    help?: string;
    /** Message d'erreur : annoncé aux lecteurs d'écran, en `thilia-danger`. */
    error?: string;
    /** Ajoute la mention « Requis » au libellé. */
    required?: boolean;
    /** Identifiant du contrôle. Généré s'il est absent. */
    id?: string;
}
