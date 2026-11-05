export interface ThSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface ThSelectProps {
    /** Libellé affiché au-dessus du déclencheur et relié à lui. */
    label: string;
    options: ThSelectOption[];
    /** Texte affiché tant qu'aucune option n'est choisie. */
    placeholder?: string;
    /** Texte d'aide sous le déclencheur. */
    help?: string;
    size?: '32' | '40' | '48';
    disabled?: boolean;
    required?: boolean;
    /** Nom du champ, pour l'envoi dans un formulaire. */
    name?: string;
    /** Identifiant du déclencheur. Généré s'il est absent. */
    id?: string;
}
