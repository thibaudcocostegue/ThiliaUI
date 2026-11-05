export interface ThCheckboxProps {
    /** Libellé à droite de la case. Le slot par défaut le remplace. */
    label?: string;
    disabled?: boolean;
    required?: boolean;
    /** Nom du champ, pour l'envoi dans un formulaire. */
    name?: string;
    /** Valeur envoyée dans un formulaire quand la case est cochée. */
    value?: string;
    /** Identifiant de la case. Généré s'il est absent. */
    id?: string;
}
