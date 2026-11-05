export type ThToastType = 'success' | 'warning' | 'danger';
export interface ThToastOptions {
    /** Texte secondaire sous le titre. */
    description?: string;
    /** Durée d'affichage en ms. `Infinity` garde le toast jusqu'à sa fermeture. */
    duration?: number;
    /** Identifiant : un toast ajouté avec le même id remplace le précédent. */
    id?: string;
}
export interface ThToasterProps {
    /** Étiquette mono de chaque type, en tête du toast. */
    labels?: Partial<Record<ThToastType, string>>;
    /** Nom accessible du bouton de fermeture. */
    closeLabel?: string;
    /** Durée d'affichage par défaut, en ms. */
    duration?: number;
}
