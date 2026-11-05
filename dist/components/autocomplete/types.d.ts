export interface ThAutocompleteProps {
    /** Libellé affiché au-dessus du champ et relié à lui. */
    label: string;
    /** Suggestions proposées pendant la saisie. Toute autre valeur reste acceptée. */
    suggestions: string[];
    placeholder?: string;
    /** Texte d'aide sous le champ. */
    help?: string;
    size?: '32' | '40' | '48';
    disabled?: boolean;
    required?: boolean;
    /** Nom du champ, pour l'envoi dans un formulaire. */
    name?: string;
    /** Identifiant du champ. Généré s'il est absent. */
    id?: string;
}
