export interface ThGaugeProps {
    /** Valeur entre 0 et `max`. `null` : progression inconnue. */
    value: number | null;
    max?: number;
    /** Étiquette mono au-dessus de la jauge, qui lui sert aussi de nom accessible (aria-label). */
    label: string;
    /** Affiche le pourcentage après l'étiquette. */
    showValue?: boolean;
    /** Texte lu par les lecteurs d'écran à la place du pourcentage, ex. « 3 Go sur 5 ». */
    valueText?: string;
}
