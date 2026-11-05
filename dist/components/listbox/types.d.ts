export interface ThListboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface ThListboxProps {
    /** Intitulé de la liste, qui la nomme pour les lecteurs d'écran. */
    label: string;
    options: ThListboxOption[];
    /** Sélection multiple : le modèle est alors un tableau de valeurs. */
    multiple?: boolean;
    disabled?: boolean;
    /** Nom du champ, pour l'envoi dans un formulaire. */
    name?: string;
}
