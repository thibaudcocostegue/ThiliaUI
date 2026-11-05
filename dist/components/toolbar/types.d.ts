export interface ThToolbarProps {
    /** Nom accessible de la barre d'outils. */
    label: string;
    orientation?: 'horizontal' | 'vertical';
}
export interface ThToolbarButtonProps {
    /** Nom accessible du bouton : obligatoire, un bouton icône n'a pas de texte. */
    label: string;
    disabled?: boolean;
}
export type ThToolbarToggleProps = ThToolbarButtonProps;
